<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\NewsController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function (): void {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function (): void {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

Route::get('news', [NewsController::class, 'index'])->name('api.news.index');
Route::get('news/{news}', [NewsController::class, 'show'])->name('api.news.show');
Route::get('news/{news}/recommended', [NewsController::class, 'recommended'])->name('api.news.recommended');

Route::get('categories', [CategoryController::class, 'index'])->name('api.categories.index');
Route::get('categories/{category}/news', [CategoryController::class, 'news'])->name('api.categories.news');
