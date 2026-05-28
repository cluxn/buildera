<?php

namespace App\Http\Controllers\Api;

use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController
{
    public function index(Request $request): JsonResponse
    {
        $query = Testimonial::published()->orderBy('sort_order');

        if ($request->filled('service_category')) {
            $query->where('service_category', $request->service_category);
        }

        if ($request->filled('industry')) {
            $query->where('industry', $request->industry);
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', true);
        }

        $testimonials = $query->get()->map(fn ($t) => [
            'id'               => $t->id,
            'quote'            => $t->content,
            'client_name'      => $t->client_name,
            'job_title'        => $t->client_title,
            'company'          => $t->client_company,
            'company_logo'     => $t->client_photo ? Storage::url($t->client_photo) : null,
            'star_rating'      => $t->rating,
            'service_category' => $t->service_category,
            'industry'         => $t->industry,
            'is_featured'      => $t->is_featured,
        ]);

        return response()->json($testimonials);
    }
}
