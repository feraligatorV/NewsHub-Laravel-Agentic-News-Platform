<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::query()
                ->orderByDesc('is_admin')
                ->orderBy('name')
                ->paginate(15)
                ->through(fn (User $user): array => $this->serializeUser($user)),
            'adminCount' => User::query()->where('is_admin', true)->count(),
        ]);
    }

    public function grantAdmin(User $user): RedirectResponse
    {
        $user->update(['is_admin' => true]);

        return back()->with('status', 'Admin role granted.');
    }

    public function revokeAdmin(User $user): RedirectResponse
    {
        if (! $user->is_admin) {
            return back()->with('status', 'User is not an admin.');
        }

        if ($this->isLastAdmin($user)) {
            return back()->withErrors([
                'users' => 'The last admin user cannot be revoked.',
            ]);
        }

        $user->update(['is_admin' => false]);

        return back()->with('status', 'Admin role revoked.');
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        if ($request->user()?->is($user)) {
            return back()->withErrors([
                'users' => 'Admins cannot delete themselves.',
            ]);
        }

        if ($this->isLastAdmin($user)) {
            return back()->withErrors([
                'users' => 'The last admin user cannot be deleted.',
            ]);
        }

        $user->delete();

        return back()->with('status', 'User deleted.');
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'is_admin' => $user->is_admin,
            'email_verified_at' => $user->email_verified_at?->toISOString(),
            'created_at' => $user->created_at?->toISOString(),
        ];
    }

    private function isLastAdmin(User $user): bool
    {
        return $user->is_admin && User::query()->where('is_admin', true)->count() <= 1;
    }
}
