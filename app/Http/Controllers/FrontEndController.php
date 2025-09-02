<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

final class FrontEndController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('welcome', [
            'posts' => Post::latest()->get()->map(fn ($post): array => [
                'uuid' => $post->uuid,
                'title' => $post->title,
                'body' => $post->body,
                'created_at' => $post->created_at->format('M j, Y'),
            ]),
        ]);
    }
}
