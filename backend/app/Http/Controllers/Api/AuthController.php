<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Requests\Api\Auth\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::query()->create($request->validated());
        $token = Auth::guard('api')->login($user);

        return $this->respondWithToken($token, $user, Response::HTTP_CREATED);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $token = Auth::guard('api')->attempt($request->validated());

        if (! $token) {
            return response()->json([
                'message' => 'Invalid credentials.',
            ], Response::HTTP_UNAUTHORIZED);
        }

        return $this->respondWithToken($token, Auth::guard('api')->user());
    }

    public function me(Request $request): UserResource
    {
        return new UserResource($request->user('api'));
    }

    public function refresh(): JsonResponse
    {
        return $this->respondWithToken(Auth::guard('api')->refresh());
    }

    public function logout(): Response
    {
        Auth::guard('api')->logout();

        return response()->noContent();
    }

    private function respondWithToken(string $token, ?User $user = null, int $status = Response::HTTP_OK): JsonResponse
    {
        return response()->json([
            'data' => [
                'user' => $user ? (new UserResource($user))->resolve() : null,
                'token_type' => 'bearer',
                'access_token' => $token,
                'expires_in' => Auth::guard('api')->factory()->getTTL() * 60,
            ],
        ], $status);
    }
}
