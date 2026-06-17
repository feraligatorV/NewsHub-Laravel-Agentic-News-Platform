<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NewsResource extends JsonResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'content' => $this->when($request->routeIs('api.news.show'), $this->body ?? $this->content),
            'image_url' => $this->image_url,
            'source' => $this->source,
            'published_at' => $this->published_at?->toISOString(),
            'publication_date' => $this->publication_date?->toISOString(),
            'legal_document_type' => $this->legal_document_type,
            'decree_number' => $this->decree_number,
            'institution' => $this->institution,
            'affected_law' => $this->affected_law,
            'effective_date' => $this->effective_date?->toDateString(),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
        ];
    }
}
