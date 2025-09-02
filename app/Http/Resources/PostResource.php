<?php

declare(strict_types=1);

namespace App\Http\Resources;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Override;

/** @mixin Post */
final class PostResource extends JsonResource
{
    #[Override]
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
