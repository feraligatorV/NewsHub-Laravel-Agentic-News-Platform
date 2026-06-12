<?php

namespace Tests\Feature\Api;

use App\Models\Category;
use App\Models\News;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NewsApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_news_listing_returns_seeded_news(): void
    {
        News::factory()->count(5)->create();

        $this->getJson('/api/news')
            ->assertOk()
            ->assertJsonCount(5, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'title', 'slug', 'summary', 'published_at', 'category'],
                ],
            ]);
    }

    public function test_news_detail_returns_correct_news(): void
    {
        $news = News::factory()->create([
            'title' => 'Expected News',
            'slug' => 'expected-news',
        ]);

        $this->getJson("/api/news/{$news->slug}")
            ->assertOk()
            ->assertJsonPath('data.title', 'Expected News')
            ->assertJsonPath('data.slug', 'expected-news')
            ->assertJsonStructure(['data' => ['content']]);
    }

    public function test_recommended_news_excludes_current_news(): void
    {
        $category = Category::factory()->create();
        $current = News::factory()->for($category)->create();
        News::factory()->count(3)->for($category)->create();

        $response = $this->getJson("/api/news/{$current->slug}/recommended")
            ->assertOk()
            ->assertJsonCount(3, 'data');

        $ids = collect($response->json('data'))->pluck('id');

        $this->assertFalse($ids->contains($current->id));
    }
}
