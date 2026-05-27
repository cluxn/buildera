<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UnsubscribeController extends Controller
{
    /**
     * Unsubscribe a newsletter subscriber via their signed token.
     *
     * - Missing/empty token → 422
     * - Token not found      → 404
     * - Already unsubscribed → 200 (idempotent)
     * - Valid token          → marks subscriber as unsubscribed, 200
     */
    public function handle(Request $request): JsonResponse
    {
        $token = $request->query('token');

        if (empty($token)) {
            return response()->json(['message' => 'Invalid token.'], 422);
        }

        $subscriber = NewsletterSubscriber::where('unsubscribe_token', $token)->first();

        if (! $subscriber) {
            return response()->json(['message' => 'Token not found.'], 404);
        }

        if ($subscriber->status === 'unsubscribed') {
            return response()->json(['message' => 'Already unsubscribed.'], 200);
        }

        $subscriber->unsubscribe();

        return response()->json(['message' => 'Unsubscribed successfully.'], 200);
    }
}
