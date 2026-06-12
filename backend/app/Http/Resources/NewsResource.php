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
            'content' => $this->when($request->routeIs('api.news.show'), $this->content),
            'image_url' => $this->image_url,
            'source' => $this->source,
            'published_at' => $this->published_at?->toISOString(),
            'category' => new CategoryResource($this->whenLoaded('category')),
        ];
    }
}
