<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AiDrafts\ProcessAiDraftRequest;
use App\Http\Requests\Admin\AiDrafts\SaveAiDraftRequest;
use App\Models\Category;
use App\Models\News;
use App\Models\Tag;
use App\Services\LegalAi\LegalAiClient;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use RuntimeException;

class AiDraftController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/AiDrafts/Index', [
            'draftPreview' => session('aiDraftPreview'),
            'savedDraft' => session('savedDraft'),
        ]);
    }

    public function processUrl(ProcessAiDraftRequest $request, LegalAiClient $client): RedirectResponse
    {
        try {
            $draft = $client->processUrl($request->validated('pdf_url'));
        } catch (RuntimeException $exception) {
            return back()->withErrors([
                'pdf_url' => $exception->getMessage(),
            ])->withInput();
        }

        return back()->with([
            'aiDraftPreview' => $draft,
            'status' => 'AI draft generated. Review before saving.',
        ]);
    }

    public function save(SaveAiDraftRequest $request): RedirectResponse
    {
        $suggestedNews = $request->validated('suggested_news');
        $category = $this->resolveCategory($suggestedNews['suggested_category'] ?? null);
        $tagIds = $this->resolveTagIds($suggestedNews['tags'] ?? []);
        $slug = $this->uniqueSlug($suggestedNews['slug'] ?? $suggestedNews['title']);

        $news = News::query()->create([
            'category_id' => $category->id,
            'title' => $suggestedNews['title'],
            'slug' => $slug,
            'summary' => $suggestedNews['summary'],
            'content' => $suggestedNews['body'],
            'body' => $suggestedNews['body'],
            'source' => 'Legal DCA',
            'source_url' => $suggestedNews['source_url'] ?? $suggestedNews['original_pdf_url'] ?? null,
            'publication_date' => $suggestedNews['publication_date'] ?? null,
            'status' => 'draft',
            'published_at' => null,
            'legal_document_type' => $suggestedNews['legal_document_type'] ?? null,
            'decree_number' => $suggestedNews['decree_number'] ?? null,
            'institution' => $suggestedNews['institution'] ?? null,
            'affected_law' => $suggestedNews['affected_law'] ?? null,
            'effective_date' => $suggestedNews['effective_date'] ?? null,
            'ai_generated' => true,
            'ai_summary' => $suggestedNews['ai_summary'] ?? $suggestedNews['summary'],
            'ai_key_points' => $suggestedNews['ai_key_points'] ?? [],
            'original_pdf_url' => $suggestedNews['original_pdf_url'] ?? null,
            'extracted_text' => $suggestedNews['extracted_text'] ?? null,
        ]);

        $news->tags()->sync($tagIds);

        return redirect()->route('admin.ai-drafts.index')->with([
            'savedDraft' => [
                'title' => $news->title,
                'edit_url' => route('admin.news.edit', $news),
            ],
            'status' => 'AI draft saved for editorial review.',
        ]);
    }

    private function resolveCategory(?string $suggestedCategory): Category
    {
        if ($suggestedCategory) {
            $category = Category::query()
                ->where('slug', Str::slug($suggestedCategory))
                ->orWhere('name', $suggestedCategory)
                ->first();

            if ($category) {
                return $category;
            }
        }

        return Category::query()->firstOrCreate(
            ['slug' => 'leyes'],
            ['name' => 'Leyes', 'description' => 'Nuevas leyes y publicaciones oficiales.'],
        );
    }

    /**
     * @param array<int, string> $tags
     * @return array<int, int>
     */
    private function resolveTagIds(array $tags): array
    {
        return collect($tags)
            ->filter(fn (string $tag): bool => filled($tag))
            ->map(fn (string $tag): int => Tag::query()->firstOrCreate(
                ['slug' => Str::slug($tag)],
                ['name' => Str::limit($tag, 120, '')],
            )->id)
            ->values()
            ->all();
    }

    private function uniqueSlug(string $value): string
    {
        $baseSlug = Str::slug($value) ?: 'ai-legal-draft';
        $slug = $baseSlug;
        $suffix = 2;

        while (News::query()->where('slug', $slug)->exists()) {
            $slug = "{$baseSlug}-{$suffix}";
            $suffix++;
        }

        return $slug;
    }
}
