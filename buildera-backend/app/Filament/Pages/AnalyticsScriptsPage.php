<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\EmbeddedSchema;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

/**
 * @property-read Schema $form
 */
class AnalyticsScriptsPage extends Page
{
    protected static string|\UnitEnum|null $navigationGroup = 'SEO & Analytics';

    protected static ?string $navigationLabel = 'Analytics & Scripts';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?int $navigationSort = 3;

    protected string $view = 'filament.pages.analytics-scripts';

    /** @var array<string, mixed>|null */
    public ?array $data = [];

    public function mount(): void
    {
        $allKeys = [
            'ga4_measurement_id',
            'clarity_project_id',
            'facebook_pixel_id',
            'linkedin_insight_id',
            'google_ads_conversion_id',
            'gsc_verification_tag',
            'custom_head_scripts',
            'custom_body_scripts',
        ];

        $formData = [];
        foreach ($allKeys as $key) {
            $formData[$key] = Setting::get($key, '');
        }

        $this->form->fill($formData);
    }

    public function defaultForm(Schema $schema): Schema
    {
        return $schema->statePath('data');
    }

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Analytics')->tabs([
                Tab::make('Tracking IDs')->schema([
                    TextInput::make('ga4_measurement_id')
                        ->label('GA4 Measurement ID')
                        ->helperText('e.g. G-XXXXXXXXXX'),
                    TextInput::make('clarity_project_id')
                        ->label('Microsoft Clarity Project ID'),
                    TextInput::make('facebook_pixel_id')
                        ->label('Facebook Pixel ID'),
                    TextInput::make('linkedin_insight_id')
                        ->label('LinkedIn Insight Tag ID'),
                    TextInput::make('google_ads_conversion_id')
                        ->label('Google Ads Conversion ID'),
                ]),
                Tab::make('Verification & Custom Scripts')->schema([
                    TextInput::make('gsc_verification_tag')
                        ->label('Google Search Console Verification Tag')
                        ->helperText('Content value only, e.g. abc123xyz'),
                    Textarea::make('custom_head_scripts')
                        ->label('Custom <head> Scripts')
                        ->rows(6)
                        ->helperText('Raw HTML/JS injected before </head>'),
                    Textarea::make('custom_body_scripts')
                        ->label('Custom <body> Scripts')
                        ->rows(6)
                        ->helperText('Raw HTML/JS injected before </body>'),
                ]),
            ]),
        ]);
    }

    public function content(Schema $schema): Schema
    {
        return $schema->components([
            Form::make([EmbeddedSchema::make('form')])
                ->id('analytics-form')
                ->livewireSubmitHandler('save')
                ->footer([
                    \Filament\Schemas\Components\Actions::make([
                        $this->getSaveFormAction(),
                    ]),
                ]),
        ]);
    }

    protected function getSaveFormAction(): Action
    {
        return Action::make('save')
            ->label('Save Settings')
            ->submit('save');
    }

    public function save(): void
    {
        $data = $this->form->getState();

        foreach ($data as $key => $value) {
            Setting::set($key, $value ?? '');
        }

        Notification::make()
            ->title('Analytics settings saved successfully.')
            ->success()
            ->send();
    }
}
