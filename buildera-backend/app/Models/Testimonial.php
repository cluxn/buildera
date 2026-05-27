<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'client_name',
        'client_title',
        'client_company',
        'client_photo',
        'content',
        'rating',
        'service_tags',
        'industry_tags',
        'is_featured',
        'is_published',
        'sort_order',
    ];

    protected $casts = [
        'service_tags'  => 'array',
        'industry_tags' => 'array',
        'is_featured'   => 'boolean',
        'is_published'  => 'boolean',
        'rating'        => 'integer',
        'sort_order'    => 'integer',
    ];

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true);
    }
}
