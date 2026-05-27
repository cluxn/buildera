<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Jobs\FireNewsletterWebhookJob;
use App\Jobs\SendNewsletterWelcomeJob;
use App\Models\NewsletterSubscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SubscriberController extends Controller
{
    /**
     * Subscribe an email address to the newsletter.
     *
     * - New email           → 201 Created, queues welcome email + n8n webhook
     * - Existing active     → 200 Already subscribed (no jobs dispatched)
     * - Previously unsub'd  → re-subscribes with fresh token → 201, jobs dispatched
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'name'  => ['nullable', 'string', 'max:255'],
        ]);

        $existing = NewsletterSubscriber::where('email', $validated['email'])->first();

        if ($existing) {
            if ($existing->status === 'unsubscribed') {
                // Re-subscribe: update status and generate a new token
                $existing->update([
                    'status'            => 'subscribed',
                    'subscribed_at'     => now(),
                    'unsubscribed_at'   => null,
                    'unsubscribe_token' => NewsletterSubscriber::generateToken(),
                ]);
                $subscriber = $existing->fresh();
            } else {
                return response()->json(['message' => 'Already subscribed.'], 200);
            }
        } else {
            $subscriber = NewsletterSubscriber::create([
                'email'             => $validated['email'],
                'name'              => $validated['name'] ?? null,
                'status'            => 'subscribed',
                'subscribed_at'     => now(),
                'unsubscribe_token' => NewsletterSubscriber::generateToken(),
            ]);
        }

        SendNewsletterWelcomeJob::dispatch($subscriber);
        FireNewsletterWebhookJob::dispatch($subscriber->toArray());

        return response()->json(['message' => 'Subscribed successfully.'], 201);
    }
}
