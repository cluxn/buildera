<?php

namespace App\Http\Controllers\Api;

use App\Models\Guide;
use Illuminate\Http\JsonResponse;

class GuideController
{
    public function index(): JsonResponse
    {
        $query = Guide::published()->latest('published_at');

        if (request()->has('category')) {
            $query->where('category', request('category'));
        }

        return response()->json($query->get());
    }

    public function show(string $slug): JsonResponse
    {
        $guide = Guide::published()->where('slug', $slug)->firstOrFail();

        return response()->json($guide);
    }
}
