<?php

namespace App\Http\Controllers\Api;

use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;

class TestimonialController
{
    public function index(): JsonResponse
    {
        $query = Testimonial::published()->orderByDesc('sort_order');

        if (request()->has('service')) {
            $service = request('service');
            $query->whereJsonContains('service_tags', $service);
        }

        if (request()->has('industry')) {
            $industry = request('industry');
            $query->whereJsonContains('industry_tags', $industry);
        }

        if (request()->has('solution')) {
            $query->where('solution_slug', request('solution'));
        }

        return response()->json($query->get());
    }
}
