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

        $publishedAt = fake()->dateTimeBetween('-30 days', 'now');

        return [
            'category_id' => Category::factory(),
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->numberBetween(1000, 9999),
            'summary' => fake()->paragraph(),
            'content' => fake()->paragraphs(4, true),
            'body' => fake()->paragraphs(4, true),
            'image_url' => fake()->imageUrl(1280, 720, 'news', true),
            'source' => 'NewsHub',
            'source_url' => fake()->url(),
            'published_at' => $publishedAt,
            'publication_date' => $publishedAt,
            'status' => 'published',
            'legal_document_type' => fake()->randomElement(['ley', 'decreto', 'reforma', 'reglamento']),
            'decree_number' => fake()->optional()->numerify('###-2026'),
            'institution' => fake()->randomElement(['Congreso', 'Ministerio de Finanzas', 'Municipalidad', 'Tribunal Supremo Electoral']),
            'affected_law' => fake()->optional()->sentence(3),
            'effective_date' => fake()->optional()->dateTimeBetween('now', '+60 days'),
            'ai_generated' => false,
            'ai_summary' => null,
            'ai_key_points' => null,
            'original_pdf_url' => null,
            'extracted_text' => null,
        ];
    }

    public function draft(): static
    {
        return $this->state(fn (): array => [
            'status' => 'draft',
            'published_at' => null,
        ]);
    }

    public function aiGenerated(): static
    {
        return $this->state(fn (): array => [
            'status' => 'draft',
            'published_at' => null,
            'ai_generated' => true,
            'ai_summary' => fake()->paragraph(),
            'ai_key_points' => ['Punto clave generado', 'Revision legal pendiente'],
            'original_pdf_url' => fake()->url(),
            'extracted_text' => fake()->paragraphs(3, true),
        ]);
    }
}
