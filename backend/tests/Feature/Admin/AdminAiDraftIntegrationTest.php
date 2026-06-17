<?php

namespace Tests\Feature\Admin;

use App\Models\Category;
use App\Models\News;
use App\Models\User;
use App\Services\LegalAi\LegalAiClient;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;
use RuntimeException;
use Tests\TestCase;

class AdminAiDraftIntegrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_non_admin_user_cannot_access_ai_draft_page(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)
            ->get('/admin/ai-drafts')
            ->assertForbidden();
    }

    public function test_admin_user_can_access_ai_draft_page(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);

        $this->withoutVite();

        $this->actingAs($admin)
            ->get('/admin/ai-drafts')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Admin/AiDrafts/Index'));
    }

    public function test_legal_ai_client_handles_successful_response(): void
    {
        config()->set('legal_ai.agent_url', 'http://legal-ai-agent:8000');

        Http::fake([
            'http://legal-ai-agent:8000/api/legal/process-url' => Http::response($this->aiPayload(), 200),
        ]);

        $payload = app(LegalAiClient::class)->processUrl('https://example.com/test.pdf');

        Http::assertSent(fn ($request): bool => $request->url() === 'http://legal-ai-agent:8000/api/legal/process-url'
            && $request['pdf_url'] === 'https://example.com/test.pdf');

        $this->assertSame('AI Legal Draft', $payload['suggested_news']['title']);
        $this->assertSame('draft', $payload['suggested_news']['status']);
    }

    public function test_legal_ai_client_handles_service_unavailable(): void
    {
        config()->set('legal_ai.agent_url', 'http://legal-ai-agent:8000');

        Http::fake([
            'http://legal-ai-agent:8000/api/legal/process-url' => Http::response(['detail' => 'service unavailable'], 503),
        ]);

        $this->expectException(RuntimeException::class);
        $this->expectExceptionMessage('service unavailable');

        app(LegalAiClient::class)->processUrl('https://legal.dca.gob.gt/test.pdf');
    }

    public function test_admin_can_process_url_and_receive_preview(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        config()->set('legal_ai.agent_url', 'http://legal-ai-agent:8000');

        Http::fake([
            'http://legal-ai-agent:8000/api/legal/process-url' => Http::response($this->aiPayload(), 200),
        ]);

        $this->actingAs($admin)
            ->post('/admin/ai-drafts/process-url', [
                'pdf_url' => 'https://example.com/test.pdf',
            ])
            ->assertRedirect()
            ->assertSessionHas('aiDraftPreview');
    }

    public function test_admin_can_process_unicode_pdf_url(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        config()->set('legal_ai.agent_url', 'http://legal-ai-agent:8000');

        Http::fake([
            'http://legal-ai-agent:8000/api/legal/process-url' => Http::response($this->aiPayload(), 200),
        ]);

        $url = 'https://landing-sc-assets.s3.us-east-1.amazonaws.com/Presentación+Perfil+del+Lector+2026FINAL_compressed.pdf';

        $this->actingAs($admin)
            ->post('/admin/ai-drafts/process-url', [
                'pdf_url' => $url,
            ])
            ->assertRedirect()
            ->assertSessionHas('aiDraftPreview')
            ->assertSessionDoesntHaveErrors('pdf_url');

        Http::assertSent(fn ($request): bool => $request['pdf_url'] === $url);
    }

    public function test_admin_can_save_ai_generated_draft_as_news_draft(): void
    {
        $admin = User::factory()->create(['is_admin' => true]);
        Category::factory()->create(['name' => 'Leyes', 'slug' => 'leyes']);

        $this->actingAs($admin)
            ->post('/admin/ai-drafts/save', [
                'suggested_news' => $this->aiPayload()['suggested_news'],
            ])
            ->assertRedirect('/admin/ai-drafts');

        $news = News::query()->where('slug', 'ai-legal-draft')->firstOrFail();

        $this->assertSame('draft', $news->status);
        $this->assertTrue($news->ai_generated);
        $this->assertSame('Resumen generado por IA.', $news->ai_summary);
        $this->assertSame(['Punto uno', 'Punto dos'], $news->ai_key_points);
        $this->assertSame('https://legal.dca.gob.gt/test.pdf', $news->original_pdf_url);
        $this->assertCount(2, $news->tags);
    }

    public function test_ai_generated_draft_is_hidden_from_public_news_until_published(): void
    {
        News::factory()->aiGenerated()->create(['title' => 'Hidden AI Draft', 'slug' => 'hidden-ai-draft']);
        News::factory()->create(['title' => 'Visible Published News', 'status' => 'published']);

        $this->getJson('/api/news')
            ->assertOk()
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'Visible Published News');
    }

    /**
     * @return array<string, mixed>
     */
    private function aiPayload(): array
    {
        return [
            'source_url' => 'https://legal.dca.gob.gt/test.pdf',
            'document_title' => 'AI Legal Draft',
            'institution' => 'Congreso',
            'legal_document_type' => 'decreto',
            'decree_number' => '123-2026',
            'affected_law' => 'Ley de prueba',
            'effective_date' => '2026-07-01',
            'executive_summary' => 'Resumen generado por IA.',
            'key_points' => ['Punto uno', 'Punto dos'],
            'full_explanation' => 'Explicacion completa generada por IA.',
            'disclaimer' => 'Contenido generado por IA. Requiere revisión humana legal antes de publicación.',
            'suggested_news' => [
                'title' => 'AI Legal Draft',
                'slug' => 'ai-legal-draft',
                'summary' => 'Resumen generado por IA.',
                'body' => 'Explicacion completa generada por IA.',
                'tags' => ['decreto', 'congreso'],
                'status' => 'draft',
                'ai_generated' => true,
                'ai_summary' => 'Resumen generado por IA.',
                'ai_key_points' => ['Punto uno', 'Punto dos'],
                'original_pdf_url' => 'https://legal.dca.gob.gt/test.pdf',
                'source_url' => 'https://legal.dca.gob.gt/test.pdf',
                'extracted_text' => 'Texto extraido del PDF.',
                'legal_document_type' => 'decreto',
                'decree_number' => '123-2026',
                'institution' => 'Congreso',
                'affected_law' => 'Ley de prueba',
                'effective_date' => '2026-07-01',
                'suggested_category' => 'Leyes',
            ],
        ];
    }
}
