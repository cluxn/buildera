<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditLog extends Model
{
    /** @var list<string> */
    protected $fillable = [
        'user_id',
        'auditable_type',
        'auditable_id',
        'event',
        'old_values',
        'new_values',
        'url',
        'ip_address',
        'user_agent',
    ];

    /** @var array<string, string> */
    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
    ];
}
