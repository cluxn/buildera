<?php

namespace App\Jobs;

use App\Models\NewsletterSubscriber;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SendNewsletterWelcomeJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public readonly NewsletterSubscriber $subscriber) {}

    /**
     * Execute the job.
     *
     * Sends a welcome email with the unsubscribe link via Resend.
     * Wrapped in try/catch to prevent job failure from affecting subscription.
     */
    public function handle(): void
    {
        try {
            $unsubscribeUrl = config('app.url').'/api/unsubscribe?token='.$this->subscriber->unsubscribe_token;
            $subscriber     = $this->subscriber;

            $toAddress = config('mail.from.address', 'hello@example.com');

            $name = $subscriber->name ? ', '.$subscriber->name : '';

            $body = sprintf(
                '<h2>Welcome to Buildera%s!</h2>
<p>Thank you for subscribing to the Buildera newsletter. You\'ll receive updates on our latest services, case studies, and insights to help grow your business with technology.</p>
<p>If you ever wish to unsubscribe, simply click the link below:</p>
<p><a href="%s">Unsubscribe</a></p>
<p>— The Buildera Team</p>',
                e($name),
                e($unsubscribeUrl)
            );

            $resend = app('resend');
            $resend->emails->send([
                'from'    => config('mail.from.name', 'Buildera').' <'.$toAddress.'>',
                'to'      => [$subscriber->email],
                'subject' => 'Welcome to Buildera — you\'re subscribed!',
                'html'    => $body,
            ]);
        } catch (\Throwable $e) {
            Log::error('Newsletter welcome email failed: '.$e->getMessage(), [
                'subscriber_id' => $this->subscriber->id,
                'error'         => $e->getMessage(),
            ]);
        }
    }
}
