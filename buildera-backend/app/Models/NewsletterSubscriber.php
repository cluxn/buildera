<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NewsletterSubscriber extends Model
{
    /** @var list<string> */
    protected $fillable = [
        'email',
        'name',
        'status',
        'unsubscribe_token',
        'subscribed_at',
        'unsubscribed_at',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'subscribed_at'   => 'datetime',
        'unsubscribed_at' => 'datetime',
    ];

    /**
     * Generate a cryptographically random unsubscribe token.
     */
    public static function generateToken(): string
    {
        return Str::random(64);
    }

    /**
     * Mark this subscriber as unsubscribed.
     */
    public function unsubscribe(): void
    {
        $this->update([
            'status'          => 'unsubscribed',
            'unsubscribed_at' => now(),
        ]);
    }
}
