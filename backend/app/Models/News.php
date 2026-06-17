<?php

namespace App\Models;

use Database\Factories\NewsFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable([
    'category_id',
    'title',
    'slug',
    'summary',
    'content',
    'body',
    'image_url',
    'source',
    'source_url',
    'published_at',
    'publication_date',
    'status',
    'legal_document_type',
    'decree_number',
    'institution',
    'affected_law',
    'effective_date',
    'ai_generated',
    'ai_summary',
    'ai_key_points',
    'original_pdf_url',
    'extracted_text',
])]
class News extends Model
{
    /** @use HasFactory<NewsFactory> */
    use HasFactory;

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * @return BelongsTo<Category, $this>
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @return BelongsToMany<Tag, $this>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    /**
     * @param Builder<News> $query
     * @return Builder<News>
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'publication_date' => 'datetime',
            'effective_date' => 'date',
            'ai_generated' => 'boolean',
            'ai_key_points' => 'array',
        ];
    }
}
