<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiKeyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * Validates the X-API-Key header using hash_equals() to prevent timing attacks.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $apiKey = $request->header('X-API-Key');
        $validKey = config('app.api_key', env('APP_API_KEY'));

        if (empty($apiKey) || empty($validKey) || ! hash_equals((string) $validKey, (string) $apiKey)) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
