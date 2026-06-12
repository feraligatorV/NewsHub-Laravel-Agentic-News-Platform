<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_register_and_receive_jwt_token(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('data.user.email', 'jane@example.com')
            ->assertJsonPath('data.token_type', 'bearer')
            ->assertJsonStructure([
                'data' => [
                    'user' => ['id', 'name', 'email'],
                    'access_token',
                    'expires_in',
                ],
            ]);
    }

    public function test_user_can_login_and_receive_jwt_token(): void
    {
        User::factory()->create([
            'email' => 'jane@example.com',
            'password' => 'password',
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'jane@example.com',
            'password' => 'password',
        ]);

        $response
            ->assertOk()
            ->assertJsonPath('data.user.email', 'jane@example.com')
            ->assertJsonPath('data.token_type', 'bearer')
            ->assertJsonStructure(['data' => ['access_token', 'expires_in']]);
    }

    public function test_protected_route_rejects_unauthenticated_requests(): void
    {
        $this->getJson('/api/auth/me')->assertUnauthorized();
    }

    public function test_authenticated_user_can_access_me_endpoint(): void
    {
        User::factory()->create([
            'email' => 'jane@example.com',
            'password' => 'password',
        ]);

        $token = $this->postJson('/api/auth/login', [
            'email' => 'jane@example.com',
            'password' => 'password',
        ])->json('data.access_token');

        $this->withHeader('Authorization', "Bearer {$token}")
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('data.email', 'jane@example.com');
    }
}
