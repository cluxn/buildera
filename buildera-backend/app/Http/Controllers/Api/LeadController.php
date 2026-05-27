<?php

namespace App\Http\Controllers\Api;

use App\Jobs\FireLeadWebhookJob;
use App\Jobs\SendLeadNotificationJob;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController
{
    /**
     * Store a new lead submission.
     *
     * Validates the request, checks honeypot, detects duplicates within 24hrs,
     * creates the lead record, and dispatches email + webhook jobs for non-duplicates.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name'                => ['required', 'string', 'max:255'],
            'email'               => ['required', 'email', 'max:255'],
            'phone'               => ['nullable', 'string', 'max:50'],
            'company'             => ['nullable', 'string', 'max:255'],
            'service_interest'    => ['nullable', 'string', 'max:255'],
            'message'             => ['nullable', 'string', 'max:5000'],
            'source_form'         => ['required', 'string', 'max:100'],
            'source_page'         => ['nullable', 'string', 'max:500'],
            'website'             => ['nullable', 'string'],  // honeypot — must be empty
            'utm_source'          => ['nullable', 'string', 'max:255'],
            'utm_medium'          => ['nullable', 'string', 'max:255'],
            'utm_campaign'        => ['nullable', 'string', 'max:255'],
            'utm_content'         => ['nullable', 'string', 'max:255'],
            'utm_term'            => ['nullable', 'string', 'max:255'],
            'utm_first_source'    => ['nullable', 'string', 'max:255'],
            'utm_first_medium'    => ['nullable', 'string', 'max:255'],
            'utm_first_campaign'  => ['nullable', 'string', 'max:255'],
            'timezone'            => ['nullable', 'string', 'max:100'],
        ]);

        // Honeypot check — bots fill hidden fields, humans don't
        if (! empty($request->input('website'))) {
            return response()->json(['message' => 'Invalid submission.'], 422);
        }

        // Duplicate detection — same email within 24 hours
        $isDuplicate = Lead::isDuplicate($validated['email']);

        // Build lead data — exclude honeypot 'website' field
        $leadData = array_diff_key($validated, ['website' => true]);

        $lead = Lead::create(array_merge($leadData, [
            'ip_hash'      => hash('sha256', (string) $request->ip()),
            'is_duplicate' => $isDuplicate,
            'submitted_at' => now(),
            'status'       => 'new',
        ]));

        // Only dispatch jobs for non-duplicate leads to avoid email/webhook spam
        if (! $isDuplicate) {
            SendLeadNotificationJob::dispatch($lead);
            FireLeadWebhookJob::dispatch($lead->toArray());
        }

        return response()->json([
            'message'      => 'Lead received.',
            'is_duplicate' => $isDuplicate,
        ], 201);
    }
}
