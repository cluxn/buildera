<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HealthCheckController
{
    public function check(): JsonResponse
    {
        $dbStatus = 'ok';

        try {
            DB::connection()->getPdo();
        } catch (\Exception $e) {
            $dbStatus = 'error';
        }

        return response()->json([
            'status'    => $dbStatus === 'ok' ? 'ok' : 'degraded',
            'db'        => $dbStatus,
            'timestamp' => now()->toIso8601String(),
        ], $dbStatus === 'ok' ? 200 : 503);
    }
}
