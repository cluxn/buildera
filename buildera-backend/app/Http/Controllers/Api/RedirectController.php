<?php

namespace App\Http\Controllers\Api;

use App\Models\Redirect;
use Illuminate\Http\JsonResponse;

class RedirectController
{
    public function index(): JsonResponse
    {
        $redirects = Redirect::active()->get(['source_path', 'destination_path', 'status_code']);

        return response()->json($redirects);
    }
}
