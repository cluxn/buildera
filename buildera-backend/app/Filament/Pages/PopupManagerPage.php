<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Actions\Action;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\EmbeddedSchema;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

/**
 * @property-read Schema $form
 */
class PopupManagerPage extends Page
{
    protected static string|\UnitEnum|null $navigationGroup = 'Website';

    protected static ?string $navigationLabel = 'Popup Manager';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-bell-alert';

    protected static ?int $navigationSort = 7;

    protected string $view = 'filament.pages.popup-manager';

    /** @var array<string, mixed>|null */
    public ?array $data = [];

    public function mount(): void
    {
        $this->form->fill([
            'popup_exit_enabled'  => (bool) Setting::get('popup_exit_enabled', false),
            'popup_exit_headline' => Setting::get('popup_exit_headline', ''),
            'popup_exit_subtext'  => Setting::get('popup_exit_subtext', ''),
            'popup_exit_cta'      => Setting::get('popup_exit_cta', ''),
            'popup_idle_enabled'  => (bool) Setting::get('popup_idle_enabled', false),
            'popup_idle_headline' => Setting::get('popup_idle_headline', ''),
            'popup_idle_subtext'  => Setting::get('popup_idle_subtext', ''),
        ]);
    }

    public function defaultForm(Schema $schema): Schema
    {
        return $schema->statePath('data');
    }

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Exit-Intent Popup')->schema([
                Toggle::make('popup_exit_enabled')->label('Enabled'),
                TextInput::make('popup_exit_headline')->label('Headline'),
                Textarea::make('popup_exit_subtext')->label('Body text')->rows(2),
                TextInput::make('popup_exit_cta')->label('CTA button text'),
            ]),
            Section::make('Idle Popup')->schema([
                Toggle::make('popup_idle_enabled')->label('Enabled'),
                TextInput::make('popup_idle_headline')->label('Headline'),
                Textarea::make('popup_idle_subtext')->label('Body text')->rows(2),
            ]),
        ]);
    }

    public function content(Schema $schema): Schema
    {
        return $schema->components([
            Form::make([EmbeddedSchema::make('form')])
                ->id('popup-manager-form')
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
            ->title('Popup settings saved successfully.')
            ->success()
            ->send();
    }
}
