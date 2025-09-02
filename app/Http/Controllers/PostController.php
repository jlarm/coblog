<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

final class PostController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('posts/create');
    }

    public function store(PostRequest $request): RedirectResponse
    {
        Post::create([
            ...$request->validated(),
            'uuid' => Str::uuid(),
        ]);

        return redirect()->route('dashboard')
            ->with('success', 'Post created successfully.');
    }

    public function show(Post $post): PostResource
    {
        return new PostResource($post);
    }

    public function update(PostRequest $request, Post $post): PostResource
    {
        $post->update($request->validated());

        return new PostResource($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json();
    }
}
