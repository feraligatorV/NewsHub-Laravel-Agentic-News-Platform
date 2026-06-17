<?php

namespace App\Http\Requests\Admin\News;

use App\Models\News;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNewsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        /** @var News $news */
        $news = $this->route('news');

        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'alpha_dash', Rule::unique('news', 'slug')->ignore($news)],
            'summary' => ['required', 'string', 'max:2000'],
            'body' => ['required', 'string'],
            'image_url' => ['nullable', 'url', 'max:2048'],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'source_url' => ['nullable', 'url', 'max:2048'],
            'publication_date' => ['nullable', 'date'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'legal_document_type' => ['nullable', 'string', 'max:120'],
            'decree_number' => ['nullable', 'string', 'max:120'],
            'institution' => ['nullable', 'string', 'max:255'],
            'affected_law' => ['nullable', 'string', 'max:255'],
            'effective_date' => ['nullable', 'date'],
            'ai_generated' => ['boolean'],
            'ai_summary' => ['nullable', 'string'],
            'ai_key_points' => ['nullable', 'array'],
            'ai_key_points.*' => ['string', 'max:500'],
            'original_pdf_url' => ['nullable', 'url', 'max:2048'],
            'extracted_text' => ['nullable', 'string'],
            'tag_ids' => ['array'],
            'tag_ids.*' => ['integer', 'exists:tags,id'],
        ];
    }
}
