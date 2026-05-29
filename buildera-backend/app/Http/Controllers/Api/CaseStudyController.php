<?php

namespace App\Http\Controllers\Api;

use App\Models\CaseStudy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CaseStudyController
{
    public function index(Request $request): JsonResponse
    {
        $query = CaseStudy::published()->latest('published_at');

        if ($request->filled('industry')) {
            $query->where('industry', $request->industry);
        }

        if ($request->filled('service')) {
            $query->whereJsonContains('service_tags', $request->service);
        }

        $studies = $query->paginate(12)->through(fn ($s) => [
            'id'              => $s->id,
            'title'           => $s->title,
            'slug'            => $s->slug,
            'client_name'     => $s->client_name,
            'industry'        => $s->industry,
            'hero_image'      => $s->featured_image ? Storage::url($s->featured_image) : null,
            'hero_image_alt'  => $s->featured_image_alt,
            'key_metrics'     => $s->key_metrics ?? [],
            'published_at'    => $s->published_at?->toISOString(),
        ]);

        return response()->json($studies);
    }

    public function show(string $slug): JsonResponse
    {
        $s = CaseStudy::published()->where('slug', $slug)->firstOrFail();

        return response()->json([
            'id'                 => $s->id,
            'title'              => $s->title,
            'slug'               => $s->slug,
            'client_name'        => $s->client_name,
            'industry'           => $s->industry,
            'hero_image'         => $s->featured_image ? Storage::url($s->featured_image) : null,
            'hero_image_alt'     => $s->featured_image_alt,
            'problem'            => $s->challenge,
            'solution'           => $s->solution,
            'results'            => $s->results,
            'key_metrics'        => $s->key_metrics ?? [],
            'testimonial_quote'  => $s->testimonial_quote,
            'testimonial_author' => $s->testimonial_author,
            'seo_title'          => $s->seo_title,
            'seo_description'    => $s->seo_description,
            'related_content'    => $s->related_content ?? [],
            'published_at'       => $s->published_at?->toISOString(),
        ]);
    }
}
