<?php

namespace App\Providers;

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
    }
}
