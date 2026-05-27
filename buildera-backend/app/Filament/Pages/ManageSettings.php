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
class ManageSettings extends Page
{
    protected static string|\UnitEnum|null $navigationGroup = 'Settings';

    protected static ?string $navigationLabel = 'General Settings';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?int $navigationSort = 1;

    protected string $view = 'filament.pages.manage-settings';

    /** @var array<string, mixed>|null */
    public ?array $data = [];

    public function mount(): void
    {
        $allKeys = [
            'company_name',
            'company_tagline',
            'company_phone',
            'company_email',
            'company_address',
            'social_linkedin',
            'social_twitter',
            'social_facebook',
            'social_github',
            'social_youtube',
            'whatsapp_number',
            'whatsapp_message',
            'calendly_url',
            'default_seo_title',
            'default_seo_description',
            'og_image',
            'footer_copyright',
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
            Tabs::make('Settings')->tabs([
                Tab::make('Company')->schema([
                    TextInput::make('company_name')
                        ->label('Company Name')
                        ->required(),
                    TextInput::make('company_tagline')
                        ->label('Tagline'),
                    TextInput::make('company_phone')
                        ->label('Phone'),
                    TextInput::make('company_email')
                        ->label('Email')
                        ->email(),
                    Textarea::make('company_address')
                        ->label('Address')
                        ->rows(2),
                ]),
                Tab::make('Social Media')->schema([
                    TextInput::make('social_linkedin')
                        ->label('LinkedIn URL')
                        ->url(),
                    TextInput::make('social_twitter')
                        ->label('Twitter/X URL')
                        ->url(),
                    TextInput::make('social_facebook')
                        ->label('Facebook URL')
                        ->url(),
                    TextInput::make('social_github')
                        ->label('GitHub URL')
                        ->url(),
                    TextInput::make('social_youtube')
                        ->label('YouTube URL')
                        ->url(),
                ]),
                Tab::make('Contact & Booking')->schema([
                    TextInput::make('whatsapp_number')
                        ->label('WhatsApp Number')
                        ->helperText('Include country code, e.g. +1234567890'),
                    Textarea::make('whatsapp_message')
                        ->label('WhatsApp Default Message')
                        ->rows(2),
                    TextInput::make('calendly_url')
                        ->label('Calendly URL')
                        ->url(),
                ]),
                Tab::make('SEO Defaults')->schema([
                    TextInput::make('default_seo_title')
                        ->label('Default SEO Title')
                        ->maxLength(70),
                    Textarea::make('default_seo_description')
                        ->label('Default Meta Description')
                        ->rows(3)
                        ->maxLength(160),
                    TextInput::make('og_image')
                        ->label('Default OG Image URL')
                        ->url(),
                    TextInput::make('footer_copyright')
                        ->label('Footer Copyright Text'),
                ]),
            ]),
        ]);
    }

    public function content(Schema $schema): Schema
    {
        return $schema->components([
            Form::make([EmbeddedSchema::make('form')])
                ->id('settings-form')
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
            ->title('Settings saved successfully.')
            ->success()
            ->send();
    }
}
