<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FireNewsletterWebhookJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @param  array<string, mixed>  $payload
     */
    public function __construct(public readonly array $payload) {}

    /**
     * Execute the job.
     *
     * Fires the n8n newsletter webhook with the subscriber payload.
     * No-op if N8N_NEWSLETTER_WEBHOOK_URL is not configured.
     */
    public function handle(): void
    {
        $url = config('services.n8n.newsletter_webhook_url', env('N8N_NEWSLETTER_WEBHOOK_URL'));

        if (empty($url)) {
            return;
        }

        $response = Http::timeout(10)->post($url, $this->payload);

        if (! $response->successful()) {
            Log::warning('n8n newsletter webhook failed', [
                'status' => $response->status(),
                'url'    => $url,
                'body'   => $response->body(),
            ]);
        }
    }
}
