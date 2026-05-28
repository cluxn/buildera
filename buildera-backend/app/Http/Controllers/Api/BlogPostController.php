<?php

namespace App\Http\Controllers\Api;

use App\Models\BlogPost;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class BlogPostController
{
    public function index(Request $request): JsonResponse
    {
        $query = BlogPost::with('author')->published()->latest('published_at');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', true);
        }

        $posts = $query->paginate(12)->through(fn ($post) => [
            'id'           => $post->id,
            'title'        => $post->title,
            'slug'         => $post->slug,
            'excerpt'      => $post->excerpt,
            'category'     => $post->category,
            'tags'         => $post->tags,
            'image_path'   => $post->featured_image ? Storage::url($post->featured_image) : null,
            'image_alt'    => $post->featured_image_alt,
            'reading_time' => $post->reading_time,
            'published_at' => $post->published_at?->toISOString(),
            'author'       => $post->author ? [
                'name'   => $post->author->name,
                'avatar' => $post->author->avatar ? Storage::url($post->author->avatar) : null,
            ] : null,
        ]);

        return response()->json($posts);
    }

    public function show(string $slug): JsonResponse
    {
        $post = BlogPost::with('author')->published()->where('slug', $slug)->firstOrFail();

        return response()->json([
            'id'              => $post->id,
            'title'           => $post->title,
            'slug'            => $post->slug,
            'excerpt'         => $post->excerpt,
            'body'            => $post->body,
            'category'        => $post->category,
            'tags'            => $post->tags,
            'image_path'      => $post->featured_image ? Storage::url($post->featured_image) : null,
            'image_alt'       => $post->featured_image_alt,
            'reading_time'    => $post->reading_time,
            'published_at'    => $post->published_at?->toISOString(),
            'seo_title'       => $post->seo_title,
            'seo_description' => $post->seo_description,
            'author'          => $post->author ? [
                'name'         => $post->author->name,
                'bio'          => $post->author->bio,
                'role'         => $post->author->role,
                'linkedin_url' => $post->author->linkedin_url,
                'avatar'       => $post->author->avatar ? Storage::url($post->author->avatar) : null,
            ] : null,
        ]);
    }

    public function categories(): JsonResponse
    {
        $categories = Category::orderBy('name')->get(['id', 'name', 'slug']);
        return response()->json($categories);
    }
}
