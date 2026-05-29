<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class PartnerBadge extends Model
{
    protected $fillable = ['name', 'logo', 'link', 'category', 'display_order', 'is_visible'];

    protected $casts = [
        'is_visible'    => 'boolean',
        'display_order' => 'integer',
    ];

    public function scopeVisible(Builder $query): void
    {
        $query->where('is_visible', true)->orderBy('display_order');
    }
}
