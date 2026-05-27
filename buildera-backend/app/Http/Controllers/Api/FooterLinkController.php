<?php

namespace App\Http\Controllers\Api;

use App\Models\FooterLink;
use Illuminate\Http\JsonResponse;

class FooterLinkController
{
    public function index(): JsonResponse
    {
        $links = FooterLink::visible()->get();

        return response()->json($links);
    }
}
