<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Facades\Http;

class SitemapManagementPage extends Page
{
    protected string $view = 'filament.pages.sitemap-management';

    protected static string|\UnitEnum|null $navigationGroup = 'SEO & Analytics';

    protected static ?string $navigationLabel = 'Sitemap';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-map';

    protected static ?int $navigationSort = 5;

    public string $lastGeneratedAt = 'Never';

    public string $sitemapUrl = '';

    public function mount(): void
    {
        $this->lastGeneratedAt = Setting::get('sitemap_last_generated', 'Never');
        $this->sitemapUrl = config('app.url') . '/sitemap.xml';
    }

    public function regenerate(): void
    {
        try {
            $revalidateUrl = env('NEXTJS_REVALIDATE_URL');
            $secret = env('NEXTJS_REVALIDATE_SECRET');

            if ($revalidateUrl && $secret) {
                $hmac = hash_hmac('sha256', 'sitemap', $secret);
                Http::withHeaders(['X-Revalidate-Secret' => $hmac])
                    ->post($revalidateUrl, ['tag' => 'sitemap']);
            }

            $timestamp = now()->toDateTimeString();
            Setting::set('sitemap_last_generated', $timestamp);
            $this->lastGeneratedAt = $timestamp;

            Notification::make()->title('Sitemap revalidation triggered')->success()->send();
        } catch (\Throwable $e) {
            Notification::make()->title('Revalidation failed: ' . $e->getMessage())->danger()->send();
        }
    }
}
