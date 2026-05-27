<?php

namespace App\Http\Controllers\Api;

use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;

class BlogPostController
{
    public function index(): JsonResponse
    {
        $posts = BlogPost::with('author')->published()->latest('published_at')->get();

        return response()->json($posts);
    }

    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::with('author')->published()->where('slug', $slug)->firstOrFail();

        return response()->json($post);
    }
}
