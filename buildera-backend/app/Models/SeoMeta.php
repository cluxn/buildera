<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class SeoMeta extends Model
{
    protected $fillable = [
        'page_type',
        'page_slug',
        'title',
        'description',
        'og_image',
        'canonical_url',
        'robots',
        'schema_json',
    ];

    protected $casts = [
        'schema_json' => 'array',
    ];

    public static function scopeForPage(Builder $query, string $type, string $slug): Builder
    {
        return $query->where('page_type', $type)->where('page_slug', $slug);
    }
}
