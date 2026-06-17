<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\News;
use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::query()->updateOrCreate(
            ['email' => 'demo@newshub.test'],
            [
                'name' => 'Demo User',
                'password' => Hash::make('password'),
                'is_admin' => false,
            ],
        );

        User::query()->updateOrCreate(
            ['email' => 'admin@newshub.test'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ],
        );

        $tags = collect([
            'ley',
            'reforma',
            'decreto',
            'acuerdo',
            'reglamento',
            'congreso',
            'municipalidad',
            'tribunal',
            'ministerio',
        ])->map(fn (string $tag): Tag => Tag::query()->updateOrCreate(
            ['slug' => Str::slug($tag)],
            ['name' => $tag],
        ));

        $categories = collect([
            ['name' => 'Leyes', 'description' => 'Nuevas leyes y publicaciones oficiales.'],
            ['name' => 'Reformas', 'description' => 'Cambios normativos y reformas vigentes.'],
            ['name' => 'Decretos', 'description' => 'Decretos, acuerdos y resoluciones relevantes.'],
        ])->map(fn (array $category): Category => Category::query()->updateOrCreate(
            ['slug' => Str::slug($category['name'])],
            [
                'name' => $category['name'],
                'description' => $category['description'],
            ],
        ));

        $categories->each(function (Category $category, int $index): void {
            $news = News::factory()
                ->count($index === 0 ? 4 : 2)
                ->for($category)
                ->create();

            $news->each(fn (News $item) => $item->tags()->sync(Tag::query()->inRandomOrder()->limit(2)->pluck('id')));
        });

        $aiDraft = News::query()->updateOrCreate(
            ['slug' => 'borrador-generado-por-ia-revision-legal'],
            [
                'category_id' => $categories->first()->id,
                'title' => 'Borrador generado por IA para revision legal',
                'summary' => 'Borrador legal generado por IA pendiente de revision editorial.',
                'content' => 'Contenido preliminar generado por IA.',
                'body' => 'Contenido preliminar generado por IA.',
                'source' => 'NewsHub',
                'status' => 'draft',
                'ai_generated' => true,
                'ai_summary' => 'Resumen generado por IA pendiente de validacion.',
                'ai_key_points' => ['Validar fuente oficial', 'Revisar vigencia', 'Confirmar institucion emisora'],
                'original_pdf_url' => 'https://example.com/legal.pdf',
                'extracted_text' => 'Texto extraido de ejemplo para revision.',
            ],
        );

        $aiDraft->tags()->sync($tags->take(3)->pluck('id'));
    }
}
