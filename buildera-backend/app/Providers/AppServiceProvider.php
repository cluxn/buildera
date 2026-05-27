<?php

namespace App\Providers;

use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Guide;
use App\Models\Lead;
use App\Models\NewsletterSubscriber;
use App\Models\Testimonial;
use App\Observers\AuditLogObserver;
use App\Observers\ContentObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $required = ['APP_KEY', 'DB_HOST', 'DB_DATABASE', 'DB_USERNAME', 'RESEND_API_KEY', 'APP_API_KEY'];
        foreach ($required as $var) {
            if (empty(env($var))) {
                throw new \RuntimeException("Required environment variable [{$var}] is not set.");
            }
        }

        // Register audit log observers — every create/update on these models is logged
        Lead::observe(AuditLogObserver::class);
        NewsletterSubscriber::observe(AuditLogObserver::class);

        // Register content observers — fires RevalidationJob on save/delete for ISR cache purge
        BlogPost::observe(ContentObserver::class);
        CaseStudy::observe(ContentObserver::class);
        Guide::observe(ContentObserver::class);
        Testimonial::observe(ContentObserver::class);
    }
}
