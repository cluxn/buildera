<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Guide extends Model
{
    use HasSlug;

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'body',
        'featured_image',
        'featured_image_alt',
        'category',
        'tags',
        'is_published',
        'published_at',
        'seo_title',
        'seo_description',
        'seo_og_image',
    ];

    protected $casts = [
        'tags'         => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)
            ->where(fn (Builder $q) => $q->whereNull('published_at')
                ->orWhere('published_at', '<=', now()));
    }
}
