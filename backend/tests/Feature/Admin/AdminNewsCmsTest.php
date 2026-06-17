<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\News;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminNewsCmsTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_user_cannot_access_admin_routes(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)
            ->get('/admin/news')
            ->assertForbidden();
    }

    public function test_admin_user_can_access_admin_news_list(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)
            ->get('/admin/news')
            ->assertOk();
    }

    public function test_admin_user_can_create_news_draft_with_tags(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create();
        $tags = Tag::factory()->count(2)->create();

        $this->actingAs($admin)
            ->post('/admin/news', $this->payload([
                'category_id' => $category->id,
                'tag_ids' => $tags->pluck('id')->all(),
            ]))
            ->assertRedirect();

        $news = News::query()->where('slug', 'legal-draft')->firstOrFail();

        $this->assertSame('draft', $news->status);
        $this->assertCount(2, $news->tags);
    }

    public function test_admin_user_can_publish_news(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $news = News::factory()->draft()->create(['slug' => 'publish-me']);

        $this->actingAs($admin)
            ->post("/admin/news/{$news->slug}/publish")
            ->assertRedirect();

        $news->refresh();

        $this->assertSame('published', $news->status);
        $this->assertNotNull($news->published_at);
    }

    public function test_public_api_only_returns_published_news(): void
    {
        News::factory()->create(['title' => 'Visible News', 'status' => 'published']);
        News::factory()->draft()->create(['title' => 'Hidden Draft']);

        $this->getJson('/api/news')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Visible News');
    }

    public function test_draft_news_is_hidden_from_public_detail(): void
    {
        $news = News::factory()->draft()->create(['slug' => 'hidden-draft']);

        $this->getJson("/api/news/{$news->slug}")
            ->assertNotFound();
    }

    public function test_ai_generated_news_remains_draft_by_default(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        $category = Category::factory()->create();

        $this->actingAs($admin)
            ->post('/admin/news', $this->payload([
                'slug' => 'ai-generated-draft',
                'category_id' => $category->id,
                'status' => 'published',
                'ai_generated' => true,
                'ai_summary' => 'Resumen generado por IA.',
                'ai_key_points' => ['Punto uno', 'Punto dos'],
                'original_pdf_url' => 'https://example.com/legal.pdf',
                'extracted_text' => 'Texto extraido del documento oficial.',
            ]))
            ->assertRedirect();

        $news = News::query()->where('slug', 'ai-generated-draft')->firstOrFail();

        $this->assertTrue($news->ai_generated);
        $this->assertSame('draft', $news->status);
    }

    /**
     * @param array<string, mixed> $overrides
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return [
            'title' => 'Legal Draft',
            'slug' => 'legal-draft',
            'summary' => 'Resumen legal para administracion.',
            'body' => 'Contenido completo de la noticia legal.',
            'image_url' => 'https://example.com/image.jpg',
            'category_id' => Category::factory()->create()->id,
            'source_url' => 'https://example.com/source',
            'publication_date' => '2026-06-16',
            'status' => 'draft',
            'legal_document_type' => 'decreto',
            'decree_number' => '123-2026',
            'institution' => 'Congreso',
            'affected_law' => 'Ley de prueba',
            'effective_date' => '2026-07-01',
            'ai_generated' => false,
            'ai_summary' => null,
            'ai_key_points' => [],
            'original_pdf_url' => null,
            'extracted_text' => null,
            'tag_ids' => [],
            ...$overrides,
        ];
    }
}
