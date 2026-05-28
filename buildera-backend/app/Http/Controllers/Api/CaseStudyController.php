<?php

namespace App\Http\Controllers\Api;

use App\Models\CaseStudy;
use Illuminate\Http\JsonResponse;

class CaseStudyController
{
    public function index(): JsonResponse
    {
        $query = CaseStudy::published()->latest('published_at');

        if (request()->has('industry')) {
            $query->where('industry', request('industry'));
        }

        if (request()->has('service')) {
            $query->whereJsonContains('service_tags', request('service'));
        }

        if (request()->has('solution')) {
            $query->where('solution_slug', request('solution'));
        }

        return response()->json($query->get());
    }

    public function show(string $slug): JsonResponse
    {
        $caseStudy = CaseStudy::published()->where('slug', $slug)->firstOrFail();

        return response()->json($caseStudy);
    }
}
