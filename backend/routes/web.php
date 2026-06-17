<?php

use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\AiDraftController as AdminAiDraftController;
use App\Http\Controllers\Admin\NewsController as AdminNewsController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('News/Index');
})->name('home');

Route::get('/news/{news}', function (string $news) {
    return Inertia::render('News/Show', [
        'slug' => $news,
    ]);
})->name('news.show');

Route::get('/categories', function () {
    return Inertia::render('Categories/Index');
})->name('categories.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function (): void {
    Route::get('/', AdminDashboardController::class)->name('dashboard');
    Route::get('ai-drafts', [AdminAiDraftController::class, 'index'])->name('ai-drafts.index');
    Route::post('ai-drafts/process-url', [AdminAiDraftController::class, 'processUrl'])->name('ai-drafts.process-url');
    Route::post('ai-drafts/save', [AdminAiDraftController::class, 'save'])->name('ai-drafts.save');
    Route::resource('news', AdminNewsController::class)->except(['show']);
    Route::post('news/{news}/publish', [AdminNewsController::class, 'publish'])->name('news.publish');
    Route::post('news/{news}/unpublish', [AdminNewsController::class, 'unpublish'])->name('news.unpublish');
    Route::get('users', [AdminUserController::class, 'index'])->name('users.index');
    Route::post('users/{user}/grant-admin', [AdminUserController::class, 'grantAdmin'])->name('users.grant-admin');
    Route::post('users/{user}/revoke-admin', [AdminUserController::class, 'revokeAdmin'])->name('users.revoke-admin');
    Route::delete('users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/auth.php';
