<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\NewsResource;
use App\Models\Category;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CategoryController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return CategoryResource::collection(Category::query()->orderBy('name')->get());
    }

    public function news(Category $category): AnonymousResourceCollection
    {
        $news = $category->news()
            ->with('category')
            ->latest('published_at')
            ->paginate(10);

        return NewsResource::collection($news);
    }
}
