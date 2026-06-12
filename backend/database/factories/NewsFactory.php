<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<\App\Models\News>
 */
class NewsFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->unique()->sentence(5);

        return [
            'category_id' => Category::factory(),
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1000, 9999),
            'summary' => fake()->paragraph(),
            'content' => fake()->paragraphs(4, true),
            'image_url' => fake()->imageUrl(1280, 720, 'news', true),
            'source' => 'NewsHub',
            'published_at' => fake()->dateTimeBetween('-30 days', 'now'),
        ];
    }
}
