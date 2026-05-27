<?php

namespace App\Http\Controllers\Api;

use App\Models\NavItem;
use Illuminate\Http\JsonResponse;

class NavItemController
{
    public function index(): JsonResponse
    {
        $items = NavItem::visible()->get();

        return response()->json($items);
    }
}
