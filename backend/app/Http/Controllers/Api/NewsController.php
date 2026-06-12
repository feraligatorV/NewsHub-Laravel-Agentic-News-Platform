<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NewsResource;
use App\Models\News;
use App\Services\NewsRecommendationService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NewsController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $news = News::query()
            ->with('category')
            ->when($request->string('search')->toString(), function ($query, string $search): void {
                $query->where(function ($query) use ($search): void {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('summary', 'like', "%{$search}%");
                });
            })
            ->when($request->string('category')->toString(), function ($query, string $category): void {
                $query->whereHas('category', fn ($query) => $query->where('slug', $category));
            })
            ->latest('published_at')
            ->paginate(min((int) $request->integer('per_page', 10), 20));

        return NewsResource::collection($news);
    }

    public function show(News $news): NewsResource
    {
        return new NewsResource($news->load('category'));
    }

    public function recommended(News $news, NewsRecommendationService $recommendations): AnonymousResourceCollection
    {
        return NewsResource::collection($recommendations->recommendedFor($news));
    }
}
