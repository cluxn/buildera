<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class NavItem extends Model
{
    protected $fillable = [
        'label',
        'url',
        'parent_group',
        'display_order',
        'is_visible',
        'opens_new_tab',
    ];

    protected $casts = [
        'is_visible'    => 'boolean',
        'opens_new_tab' => 'boolean',
        'display_order' => 'integer',
    ];

    public function scopeVisible(Builder $query): void
    {
        $query->where('is_visible', true)->orderBy('display_order');
    }
}
