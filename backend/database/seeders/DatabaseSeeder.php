<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Demo User',
            'email' => 'demo@newshub.test',
        ]);

        $categories = collect([
            ['name' => 'Technology', 'description' => 'Technology news and analysis.'],
            ['name' => 'Business', 'description' => 'Business and markets coverage.'],
            ['name' => 'Science', 'description' => 'Science and innovation updates.'],
        ])->map(fn (array $category): Category => Category::query()->create([
            'name' => $category['name'],
            'slug' => Str::slug($category['name']),
            'description' => $category['description'],
        ]));

        $categories->each(function (Category $category, int $index): void {
            News::factory()
                ->count($index === 0 ? 4 : 2)
                ->for($category)
                ->create();
        });
    }
}
