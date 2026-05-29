<?php

namespace App\Http\Controllers\Api;

use App\Models\Guide;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GuideController
{
    public function index(Request $request): JsonResponse
    {
        $query = Guide::published()->latest('published_at');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('resource_type')) {
            $query->where('resource_type', $request->resource_type);
        }

        $guides = $query->paginate(12)->through(fn ($g) => [
            'id'              => $g->id,
            'title'           => $g->title,
            'slug'            => $g->slug,
            'category'        => $g->category,
            'description'     => $g->description ?? $g->excerpt,
            'resource_type'   => $g->resource_type,
            'cover_image'     => $g->featured_image ? Storage::url($g->featured_image) : null,
            'cover_image_alt' => $g->featured_image_alt,
            'published_at'    => $g->published_at?->toISOString(),
        ]);

        return response()->json($guides);
    }

    public function show(string $slug): JsonResponse
    {
        $g = Guide::published()->where('slug', $slug)->firstOrFail();

        return response()->json([
            'id'              => $g->id,
            'title'           => $g->title,
            'slug'            => $g->slug,
            'category'        => $g->category,
            'description'     => $g->description ?? $g->excerpt,
            'resource_type'   => $g->resource_type,
            'cover_image'     => $g->featured_image ? Storage::url($g->featured_image) : null,
            'cover_image_alt' => $g->featured_image_alt,
            'body'            => $g->body,
            'external_link'   => $g->external_link,
            'seo_title'       => $g->seo_title,
            'seo_description' => $g->seo_description,
            'related_content' => $g->related_content ?? [],
            'published_at'    => $g->published_at?->toISOString(),
        ]);
    }
}
