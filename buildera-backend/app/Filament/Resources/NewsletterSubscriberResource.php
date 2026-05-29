<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsletterSubscriberResource\Pages;
use App\Models\NewsletterSubscriber;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Actions\BulkAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Collection;

class NewsletterSubscriberResource extends Resource
{
    protected static ?string $model = NewsletterSubscriber::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Leads & CRM';

    protected static ?string $navigationLabel = 'Newsletter Subscribers';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-envelope';

    protected static ?int $navigationSort = 2;

    /**
     * Form schema — read-only view (subscribers are created via API, not admin).
     */
    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('email')->disabled(),
            TextInput::make('name')->disabled(),
            TextInput::make('status')->disabled(),
            TextInput::make('unsubscribe_token')->disabled(),
            TextInput::make('subscribed_at')->disabled(),
            TextInput::make('unsubscribed_at')->disabled(),
        ]);
    }

    /**
     * Table definition — newsletter subscriber list sorted by most recent subscription.
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->placeholder('—'),
                BadgeColumn::make('status')
                    ->colors([
                        'success' => 'subscribed',
                        'danger'  => 'unsubscribed',
                    ]),
                TextColumn::make('subscribed_at')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('unsubscribed_at')
                    ->dateTime()
                    ->sortable()
                    ->placeholder('—'),
            ])
            ->defaultSort('subscribed_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->options([
                        'subscribed'   => 'Subscribed',
                        'unsubscribed' => 'Unsubscribed',
                    ]),
            ])
            ->bulkActions([
                BulkAction::make('export_csv')
                    ->label('Export CSV')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->action(function (Collection $records) {
                        $csv = "email,name,status,subscribed_at\n";
                        foreach ($records as $record) {
                            $csv .= implode(',', [
                                '"' . str_replace('"', '""', $record->email) . '"',
                                '"' . str_replace('"', '""', ($record->name ?? '')) . '"',
                                '"' . $record->status . '"',
                                '"' . ($record->subscribed_at ?? '') . '"',
                            ]) . "\n";
                        }
                        return response()->streamDownload(
                            fn () => print($csv),
                            'subscribers-' . now()->format('Y-m-d') . '.csv',
                            ['Content-Type' => 'text/csv']
                        );
                    })
                    ->requiresConfirmation()
                    ->deselectRecordsAfterCompletion(),
            ]);
    }

    /**
     * Pages — no Create/Edit pages since subscribers come via API only.
     *
     * @return array<string, \Filament\Resources\Pages\PageRegistration>
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNewsletterSubscribers::route('/'),
            'view'  => Pages\ViewNewsletterSubscriber::route('/{record}'),
        ];
    }
}
