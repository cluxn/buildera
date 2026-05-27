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

        return response()->json($query->get());
    }

    public function show(string $slug): JsonResponse
    {
        $caseStudy = CaseStudy::published()->where('slug', $slug)->firstOrFail();

        return response()->json($caseStudy);
    }
}
