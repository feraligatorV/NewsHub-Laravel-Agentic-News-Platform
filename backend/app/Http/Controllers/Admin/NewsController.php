<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\News\StoreNewsRequest;
use App\Http\Requests\Admin\News\UpdateNewsRequest;
use App\Models\Category;
use App\Models\News;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/News/Index', [
            'news' => News::query()
                ->with(['category', 'tags'])
                ->latest('updated_at')
                ->paginate(15)
                ->through(fn (News $news): array => $this->serializeNews($news)),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/News/Create', $this->formOptions());
    }

    public function store(StoreNewsRequest $request): RedirectResponse
    {
        $data = $this->normalizePayload($request->validated());
        $tagIds = $data['tag_ids'] ?? [];
        unset($data['tag_ids']);

        $news = News::query()->create($data);
        $news->tags()->sync($tagIds);

        return redirect()->route('admin.news.edit', $news)->with('status', 'News created.');
    }

    public function edit(News $news): Response
    {
        return Inertia::render('Admin/News/Edit', [
            ...$this->formOptions(),
            'news' => $this->serializeNews($news->load(['category', 'tags']), includeBody: true),
        ]);
    }

    public function update(UpdateNewsRequest $request, News $news): RedirectResponse
    {
        $data = $this->normalizePayload($request->validated(), forceAiDraft: false);
        $tagIds = $data['tag_ids'] ?? [];
        unset($data['tag_ids']);

        $news->update($data);
        $news->tags()->sync($tagIds);

        return back()->with('status', 'News updated.');
    }

    public function destroy(News $news): RedirectResponse
    {
        $news->delete();

        return redirect()->route('admin.news.index')->with('status', 'News deleted.');
    }

    public function publish(News $news): RedirectResponse
    {
        $news->update([
            'status' => 'published',
            'published_at' => $news->published_at ?? now(),
            'publication_date' => $news->publication_date ?? now(),
        ]);

        return back()->with('status', 'News published.');
    }

    public function unpublish(News $news): RedirectResponse
    {
        $news->update([
            'status' => 'draft',
            'published_at' => null,
        ]);

        return back()->with('status', 'News unpublished.');
    }

    /**
     * @return array<string, mixed>
     */
    private function formOptions(): array
    {
        return [
            'categories' => Category::query()->orderBy('name')->get(['id', 'name', 'slug']),
            'tags' => Tag::query()->orderBy('name')->get(['id', 'name', 'slug']),
            'statuses' => ['draft', 'published', 'archived'],
            'documentTypes' => ['ley', 'reforma', 'decreto', 'acuerdo', 'reglamento'],
        ];
    }

    /**
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    private function normalizePayload(array $data, bool $forceAiDraft = true): array
    {
        $data['slug'] = Str::slug((string) $data['slug']);
        $data['content'] = $data['body'];
        $data['ai_generated'] = (bool) ($data['ai_generated'] ?? false);

        if ($forceAiDraft && $data['ai_generated']) {
            $data['status'] = 'draft';
        }

        if ($data['status'] === 'published') {
            $publicationDate = $data['publication_date'] ?? now();
            $data['published_at'] = Carbon::parse($publicationDate);
        } else {
            $data['published_at'] = null;
        }

        return $data;
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeNews(News $news, bool $includeBody = false): array
    {
        return [
            'id' => $news->id,
            'title' => $news->title,
            'slug' => $news->slug,
            'summary' => $news->summary,
            'body' => $includeBody ? $news->body : null,
            'image_url' => $news->image_url,
            'category_id' => $news->category_id,
            'category' => $news->category?->only(['id', 'name', 'slug']),
            'source_url' => $news->source_url,
            'publication_date' => $news->publication_date?->toDateString(),
            'status' => $news->status,
            'legal_document_type' => $news->legal_document_type,
            'decree_number' => $news->decree_number,
            'institution' => $news->institution,
            'affected_law' => $news->affected_law,
            'effective_date' => $news->effective_date?->toDateString(),
            'ai_generated' => $news->ai_generated,
            'ai_summary' => $includeBody ? $news->ai_summary : null,
            'ai_key_points' => $includeBody ? ($news->ai_key_points ?? []) : [],
            'original_pdf_url' => $includeBody ? $news->original_pdf_url : null,
            'extracted_text' => $includeBody ? $news->extracted_text : null,
            'tags' => $news->tags->map->only(['id', 'name', 'slug'])->values(),
            'tag_ids' => $news->tags->pluck('id')->values(),
            'updated_at' => $news->updated_at?->toISOString(),
        ];
    }
}
