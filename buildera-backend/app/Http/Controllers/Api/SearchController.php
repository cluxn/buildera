<?php

namespace App\Http\Controllers\Api;

use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Guide;
use Illuminate\Http\JsonResponse;

class SearchController
{
    public function index(): JsonResponse
    {
        $q = request('q', '');

        if (strlen($q) < 2) {
            return response()->json([]);
        }

        $qLower = strtolower($q);

        $posts = BlogPost::published()
            ->where(fn ($query) => $query
                ->whereRaw('LOWER(title) LIKE ?', ["%{$qLower}%"])
                ->orWhereRaw('LOWER(excerpt) LIKE ?', ["%{$qLower}%"])
            )
            ->limit(5)
            ->get(['id', 'title', 'slug', 'excerpt'])
            ->map(fn ($item) => array_merge($item->toArray(), ['type' => 'blog_post']));

        $caseStudies = CaseStudy::published()
            ->where(fn ($query) => $query
                ->whereRaw('LOWER(title) LIKE ?', ["%{$qLower}%"])
                ->orWhereRaw('LOWER(challenge) LIKE ?', ["%{$qLower}%"])
            )
            ->limit(5)
            ->get(['id', 'title', 'slug', 'client_name'])
            ->map(fn ($item) => array_merge($item->toArray(), ['type' => 'case_study', 'excerpt' => $item->client_name]));

        $guides = Guide::published()
            ->where(fn ($query) => $query
                ->whereRaw('LOWER(title) LIKE ?', ["%{$qLower}%"])
                ->orWhereRaw('LOWER(excerpt) LIKE ?', ["%{$qLower}%"])
            )
            ->limit(5)
            ->get(['id', 'title', 'slug', 'excerpt'])
            ->map(fn ($item) => array_merge($item->toArray(), ['type' => 'guide']));

        $results = $posts->concat($caseStudies)->concat($guides)->values()->all();

        return response()->json($results);
    }
}
