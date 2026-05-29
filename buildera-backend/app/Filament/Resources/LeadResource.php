<?php

namespace App\Filament\Resources;

use App\Filament\Resources\LeadResource\Pages;
use App\Models\Lead;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class LeadResource extends Resource
{
    protected static ?string $model = Lead::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Leads & CRM';

    protected static ?string $navigationLabel = 'Lead Inbox';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-inbox';

    protected static ?int $navigationSort = 1;

    /**
     * Form schema — read-only view (leads are created via API, not admin).
     * Only status and notes are editable to allow CRM-style follow-up tracking.
     */
    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')->disabled(),
            TextInput::make('email')->disabled(),
            TextInput::make('phone')->disabled(),
            TextInput::make('company')->disabled(),
            TextInput::make('service_interest')->disabled(),
            Textarea::make('message')->disabled(),
            TextInput::make('source_form')->disabled(),
            TextInput::make('source_page')->disabled(),
            Select::make('status')->options([
                'new'        => 'New',
                'contacted'  => 'Contacted',
                'qualified'  => 'Qualified',
                'lost'       => 'Lost',
            ]),
            Textarea::make('notes')->rows(3),
            Toggle::make('is_duplicate')->disabled(),
        ]);
    }

    /**
     * Table definition — lead inbox sorted by most recent submission.
     */
    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('email')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('source_form')
                    ->badge()
                    ->sortable(),
                TextColumn::make('service_interest')
                    ->sortable(),
                BadgeColumn::make('status')
                    ->colors([
                        'success' => 'new',
                        'warning' => 'contacted',
                        'primary' => 'qualified',
                        'danger'  => 'lost',
                    ]),
                TextColumn::make('is_duplicate')
                    ->badge()
                    ->formatStateUsing(fn (bool $state): string => $state ? 'Duplicate' : 'Unique')
                    ->color(fn (bool $state): string => $state ? 'danger' : 'success')
                    ->label('Duplicate?'),
                TextColumn::make('submitted_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('submitted_at', 'desc')
            ->filters([
                SelectFilter::make('source_form')
                    ->options([
                        'contact-form' => 'Contact Form',
                        'mini-cta'     => 'Mini CTA',
                        'mini-popup'   => 'Mini Popup',
                        'floating-cta' => 'Floating CTA',
                        'exit-popup'   => 'Exit Popup',
                        'inline-blog'  => 'Inline Blog',
                        'service-cta'  => 'Service CTA',
                        'homepage-cta' => 'Homepage CTA',
                    ]),
                SelectFilter::make('status')->options([
                    'new'        => 'New',
                    'contacted'  => 'Contacted',
                    'qualified'  => 'Qualified',
                    'lost'       => 'Lost',
                ]),
                TernaryFilter::make('is_duplicate'),
                Filter::make('submitted_at')
                    ->form([
                        DatePicker::make('from')->label('From'),
                        DatePicker::make('until')->label('Until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['from'], fn ($q, $d) => $q->whereDate('submitted_at', '>=', $d))
                            ->when($data['until'], fn ($q, $d) => $q->whereDate('submitted_at', '<=', $d));
                    })
                    ->label('Date Range'),
            ]);
    }

    /**
     * Pages — no Create page since leads are submitted via the API only.
     *
     * @return array<string, \Filament\Resources\Pages\PageRegistration>
     */
    public static function getPages(): array
    {
        return [
            'index' => Pages\ListLeads::route('/'),
            'view'  => Pages\ViewLead::route('/{record}'),
        ];
    }
}
