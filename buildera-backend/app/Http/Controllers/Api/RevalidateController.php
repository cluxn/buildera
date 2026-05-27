<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RevalidateController
{
    /**
     * Handle a revalidation trigger request.
     *
     * Verifies the HMAC-SHA256 signature in X-Revalidate-Signature header.
     * Returns 401 if signature is invalid, 422 if 'tag' field is missing.
     * This endpoint can be called by external tools to manually trigger ISR revalidation.
     * The primary flow is: Admin saves content → ContentObserver → RevalidationJob → POSTs to Next.js.
     */
    public function handle(Request $request): JsonResponse
    {
        $secret = env('NEXTJS_REVALIDATE_SECRET');
        $signature = $request->header('X-Revalidate-Signature');
        $payload = $request->getContent();
        $expected = hash_hmac('sha256', $payload, $secret);

        if (! hash_equals($expected, (string) $signature)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $tag = $request->input('tag');
        if (empty($tag)) {
            return response()->json(['message' => 'tag is required'], 422);
        }

        return response()->json(['message' => 'Revalidation acknowledged', 'tag' => $tag], 200);
    }
}
