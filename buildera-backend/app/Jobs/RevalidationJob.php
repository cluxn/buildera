<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class RevalidationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public readonly string $tag) {}

    /**
     * Execute the job.
     *
     * POSTs to Next.js /api/revalidate with HMAC-signed payload.
     * No-op if NEXTJS_REVALIDATE_URL or NEXTJS_REVALIDATE_SECRET are not configured.
     * Re-throws exceptions so the queue worker can retry.
     */
    public function handle(): void
    {
        $url = env('NEXTJS_REVALIDATE_URL');
        $secret = env('NEXTJS_REVALIDATE_SECRET');

        if (empty($url) || empty($secret)) {
            Log::warning('RevalidationJob: NEXTJS_REVALIDATE_URL or NEXTJS_REVALIDATE_SECRET not configured');
            return;
        }

        $payload = json_encode(['tag' => $this->tag]);
        $signature = hash_hmac('sha256', $payload, $secret);

        try {
            $response = Http::timeout(10)
                ->withHeaders(['X-Revalidate-Signature' => $signature])
                ->post($url, ['tag' => $this->tag]);

            if (! $response->successful()) {
                Log::warning('RevalidationJob: Next.js revalidate returned ' . $response->status(), ['tag' => $this->tag]);
            }
        } catch (\Exception $e) {
            Log::error('RevalidationJob failed: ' . $e->getMessage(), ['tag' => $this->tag]);
            throw $e; // re-throw so queue worker retries
        }
    }
}
