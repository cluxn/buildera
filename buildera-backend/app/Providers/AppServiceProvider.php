<?php

namespace App\Providers;

use App\Models\Lead;
use App\Models\NewsletterSubscriber;
use App\Observers\AuditLogObserver;
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
    }
}
