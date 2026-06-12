<?php

namespace App\Services;

use App\Models\News;
use Illuminate\Database\Eloquent\Collection;

class NewsRecommendationService
{
    /**
     * @return Collection<int, News>
     */
    public function recommendedFor(News $news, int $limit = 3): Collection
    {
        $sameCategory = News::query()
            ->with('category')
            ->whereKeyNot($news->getKey())
            ->where('category_id', $news->category_id)
            ->latest('published_at')
            ->limit($limit)
            ->get();

        if ($sameCategory->count() >= $limit) {
            return $sameCategory;
        }

        $fallback = News::query()
            ->with('category')
            ->whereKeyNot($news->getKey())
            ->whereNotIn('id', $sameCategory->modelKeys())
            ->latest('published_at')
            ->limit($limit - $sameCategory->count())
            ->get();

        return $sameCategory->concat($fallback);
    }
}
