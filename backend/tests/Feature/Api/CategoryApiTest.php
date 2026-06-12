<?php

namespace Tests\Feature\Api;

use App\Models\Category;
use App\Models\News;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_categories_endpoint_returns_categories(): void
    {
        Category::factory()->count(3)->create();

        $this->getJson('/api/categories')
            ->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'slug', 'description'],
                ],
            ]);
    }

    public function test_category_news_endpoint_returns_news_for_category(): void
    {
        $category = Category::factory()->create(['slug' => 'technology']);
        News::factory()->count(2)->for($category)->create();
        News::factory()->count(2)->create();

        $this->getJson('/api/categories/technology/news')
            ->assertOk()
            ->assertJsonCount(2, 'data');
    }
}
