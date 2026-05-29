<?php

namespace App\Filament\Pages;

use App\Models\Setting;
use Filament\Actions\Action;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\EmbeddedSchema;
use Filament\Schemas\Components\Form;
use Filament\Schemas\Schema;

/**
 * @property-read Schema $form
 */
class NudgeBannerPage extends Page
{
    protected static string|\UnitEnum|null $navigationGroup = 'Website';

    protected static ?string $navigationLabel = 'Announcement Banner';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-megaphone';

    protected static ?int $navigationSort = 1;

    protected string $view = 'filament.pages.nudge-banner';

    /** @var array<string, mixed>|null */
    public ?array $data = [];

    public function mount(): void
    {
        $allKeys = [
            'nudge_banner_enabled',
            'nudge_banner_text',
            'nudge_banner_link',
            'nudge_banner_expires_at',
            'nudge_banner_bg_color',
        ];

        $formData = [];
        foreach ($allKeys as $key) {
            $value = Setting::get($key, '');
            if ($key === 'nudge_banner_enabled') {
                $formData[$key] = (bool) $value;
            } else {
                $formData[$key] = $value;
            }
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
            Toggle::make('nudge_banner_enabled')
                ->label('Enable Announcement Banner'),
            TextInput::make('nudge_banner_text')
                ->label('Banner Text')
                ->maxLength(200),
            TextInput::make('nudge_banner_link')
                ->label('Banner Link URL')
                ->url()
                ->nullable(),
            DateTimePicker::make('nudge_banner_expires_at')
                ->label('Expires At')
                ->nullable()
                ->helperText('Banner auto-hides after this date'),
            TextInput::make('nudge_banner_bg_color')
                ->label('Background Color (CSS)')
                ->placeholder('#1a56db')
                ->maxLength(20),
        ]);
    }

    public function content(Schema $schema): Schema
    {
        return $schema->components([
            Form::make([EmbeddedSchema::make('form')])
                ->id('nudge-banner-form')
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
            if ($key === 'nudge_banner_enabled') {
                Setting::set($key, $value ? '1' : '0');
            } else {
                Setting::set($key, $value ?? '');
            }
        }

        Notification::make()
            ->title('Banner settings saved successfully.')
            ->success()
            ->send();
    }
}
