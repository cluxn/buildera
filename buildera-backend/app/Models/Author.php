<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Author extends Model
{
    use HasSlug;

    protected $fillable = [
        'name',
        'slug',
        'bio',
        'avatar',
        'twitter_url',
        'linkedin_url',
    ];

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function blogPosts(): HasMany
    {
        return $this->hasMany(BlogPost::class);
    }
}
