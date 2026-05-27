<?php

namespace App\Jobs;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendLeadNotificationJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public readonly Lead $lead) {}

    /**
     * Execute the job.
     *
     * Sends an email notification for a new lead via Resend.
     * Wrapped in try/catch to prevent job failure from affecting lead creation.
     */
    public function handle(): void
    {
        try {
            $toAddress = config('mail.from.address', 'hello@example.com');
            $lead = $this->lead;

            $body = sprintf(
                '<h2>New Lead Received</h2>
<p><strong>Name:</strong> %s</p>
<p><strong>Email:</strong> %s</p>
<p><strong>Phone:</strong> %s</p>
<p><strong>Company:</strong> %s</p>
<p><strong>Service Interest:</strong> %s</p>
<p><strong>Message:</strong> %s</p>
<p><strong>Source Form:</strong> %s</p>
<p><strong>Source Page:</strong> %s</p>
<p><strong>Submitted At:</strong> %s</p>',
                e($lead->name),
                e($lead->email),
                e($lead->phone ?? 'N/A'),
                e($lead->company ?? 'N/A'),
                e($lead->service_interest ?? 'N/A'),
                e($lead->message ?? 'N/A'),
                e($lead->source_form),
                e($lead->source_page ?? 'N/A'),
                $lead->submitted_at?->toDateTimeString() ?? 'N/A'
            );

            $resend = app('resend');
            $resend->emails->send([
                'from'    => config('mail.from.name', 'Buildera').' <'.$toAddress.'>',
                'to'      => [$toAddress],
                'subject' => 'New Lead: '.$lead->name.' ('.$lead->source_form.')',
                'html'    => $body,
            ]);
        } catch (\Throwable $e) {
            Log::error('Lead email notification failed: '.$e->getMessage(), [
                'lead_id' => $this->lead->id,
                'error'   => $e->getMessage(),
            ]);
        }
    }
}
