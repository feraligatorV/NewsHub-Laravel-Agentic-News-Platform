<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\News;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalNews' => News::query()->count(),
                'draftNews' => News::query()->where('status', 'draft')->count(),
                'publishedNews' => News::query()->where('status', 'published')->count(),
                'aiDrafts' => News::query()->where('ai_generated', true)->where('status', 'draft')->count(),
                'totalUsers' => User::query()->count(),
                'adminUsers' => User::query()->where('is_admin', true)->count(),
            ],
        ]);
    }
}
