<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    /** @var list<string> */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'service_interest',
        'message',
        'source_page',
        'source_form',
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_content',
        'utm_term',
        'utm_first_source',
        'utm_first_medium',
        'utm_first_campaign',
        'ip_hash',
        'timezone',
        'is_duplicate',
        'status',
        'notes',
        'submitted_at',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'is_duplicate' => 'boolean',
        'submitted_at' => 'datetime',
    ];

    /**
     * Check if a lead with the same email was submitted within the last 24 hours.
     */
    public static function isDuplicate(string $email): bool
    {
        return static::where('email', $email)
            ->where('created_at', '>=', now()->subHours(24))
            ->exists();
    }
}
