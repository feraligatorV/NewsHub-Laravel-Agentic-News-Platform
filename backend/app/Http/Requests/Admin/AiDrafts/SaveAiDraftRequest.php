<?php

namespace App\Http\Requests\Admin\AiDrafts;

use Illuminate\Foundation\Http\FormRequest;

class SaveAiDraftRequest extends FormRequest
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
        return [
            'suggested_news' => ['required', 'array'],
            'suggested_news.title' => ['required', 'string', 'max:255'],
            'suggested_news.slug' => ['nullable', 'string', 'max:255'],
            'suggested_news.summary' => ['required', 'string', 'max:2000'],
            'suggested_news.body' => ['required', 'string'],
            'suggested_news.tags' => ['array'],
            'suggested_news.tags.*' => ['string', 'max:120'],
            'suggested_news.ai_summary' => ['nullable', 'string'],
            'suggested_news.ai_key_points' => ['array'],
            'suggested_news.ai_key_points.*' => ['string', 'max:500'],
            'suggested_news.original_pdf_url' => ['nullable', 'url', 'max:2048'],
            'suggested_news.extracted_text' => ['nullable', 'string'],
            'suggested_news.source_url' => ['nullable', 'url', 'max:2048'],
            'suggested_news.publication_date' => ['nullable', 'date'],
            'suggested_news.legal_document_type' => ['nullable', 'string', 'max:120'],
            'suggested_news.decree_number' => ['nullable', 'string', 'max:120'],
            'suggested_news.institution' => ['nullable', 'string', 'max:255'],
            'suggested_news.affected_law' => ['nullable', 'string', 'max:255'],
            'suggested_news.effective_date' => ['nullable', 'date'],
            'suggested_news.suggested_category' => ['nullable', 'string', 'max:120'],
        ];
    }
}
