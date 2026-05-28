<?php

namespace App\Observers;

use App\Jobs\RevalidationJob;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class ContentObserver
{
    /**
     * Map model class names to their ISR cache revalidation tags.
     */
    private function getTag(Model $model): ?string
    {
        $map = [
            \App\Models\BlogPost::class    => 'blog_posts',
            \App\Models\Author::class      => 'blog_posts',
            \App\Models\Category::class    => 'blog_posts',
            \App\Models\CaseStudy::class   => 'case_studies',
            \App\Models\Guide::class       => 'guides',
            \App\Models\Testimonial::class => 'testimonials',
        ];

        return $map[get_class($model)] ?? null;
    }

    /**
     * Handle the model "saved" event.
     * Dispatches a RevalidationJob so Next.js purges the cached page.
     * Wrapped in try/catch — observer must never crash the admin save.
     */
    public function saved(Model $model): void
    {
        try {
            $tag = $this->getTag($model);
            if ($tag === null) {
                return;
            }

            RevalidationJob::dispatch($tag);
        } catch (\Throwable $e) {
            Log::error('ContentObserver@saved failed: ' . $e->getMessage(), [
                'model' => get_class($model),
                'id'    => $model->getKey(),
            ]);
        }
    }

    /**
     * Handle the model "deleted" event.
     * Dispatches a RevalidationJob so Next.js purges the cached page.
     * Wrapped in try/catch — observer must never crash the admin save.
     */
    public function deleted(Model $model): void
    {
        try {
            $tag = $this->getTag($model);
            if ($tag !== null) {
                RevalidationJob::dispatch($tag);
            }
        } catch (\Throwable $e) {
            Log::error('ContentObserver@deleted failed: ' . $e->getMessage(), [
                'model' => get_class($model),
                'id'    => $model->getKey(),
            ]);
        }
    }
}
