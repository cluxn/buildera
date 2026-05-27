<?php

namespace App\Http\Controllers\Api;

use App\Models\SeoMeta;
use Illuminate\Http\JsonResponse;

class SeoMetaController
{
    public function show(string $type, string $slug): JsonResponse
    {
        $meta = SeoMeta::where('page_type', $type)->where('page_slug', $slug)->first();

        return response()->json($meta);
    }
}
