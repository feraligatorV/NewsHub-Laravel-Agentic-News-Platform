<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminUserManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_user_cannot_access_user_management(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)
            ->get('/admin/users')
            ->assertForbidden();
    }

    public function test_admin_user_can_list_registered_users(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create(['is_admin' => false]);

        $this->withoutVite();

        $this->actingAs($admin)
            ->get('/admin/users')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/Users/Index')
                ->where('adminCount', 1)
                ->has('users.data', 2)
                ->where('users.data.0.email', $admin->email)
                ->where('users.data.1.email', $user->email));
    }

    public function test_admin_user_can_grant_admin_role(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($admin)
            ->post("/admin/users/{$user->id}/grant-admin")
            ->assertRedirect();

        $this->assertTrue($user->refresh()->is_admin);
    }

    public function test_admin_user_can_revoke_admin_role_when_another_admin_remains(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $target = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->post("/admin/users/{$target->id}/revoke-admin")
            ->assertRedirect();

        $this->assertFalse($target->refresh()->is_admin);
    }

    public function test_admin_user_cannot_revoke_last_admin_role(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->post("/admin/users/{$admin->id}/revoke-admin")
            ->assertSessionHasErrors('users');

        $this->assertTrue($admin->refresh()->is_admin);
    }

    public function test_admin_user_cannot_delete_themselves(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->delete("/admin/users/{$admin->id}")
            ->assertSessionHasErrors('users');

        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }

    public function test_admin_user_cannot_delete_last_admin_user(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $target = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->delete("/admin/users/{$target->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('users', ['id' => $target->id]);

        $this->delete("/admin/users/{$admin->id}")
            ->assertSessionHasErrors('users');

        $this->assertDatabaseHas('users', ['id' => $admin->id]);
    }

    public function test_admin_user_can_delete_non_admin_user(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($admin)
            ->delete("/admin/users/{$user->id}")
            ->assertRedirect();

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }
}
