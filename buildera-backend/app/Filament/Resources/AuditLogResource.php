<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AuditLogResource\Pages;
use App\Models\AuditLog;
use Illuminate\Database\Eloquent\Model;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class AuditLogResource extends Resource
{
    protected static ?string $model = AuditLog::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Settings';

    protected static ?string $navigationLabel = 'Audit Log';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-clock';

    protected static ?int $navigationSort = 10;

    public static function canCreate(): bool
    {
        return false;
    }

    public static function canEdit(Model $record): bool
    {
        return false;
    }

    public static function canDelete(Model $record): bool
    {
        return false;
    }

    public static function canViewAny(): bool
    {
        return auth()->user()?->hasRole('Owner') ?? false;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('user_id')
                    ->label('User')
                    ->formatStateUsing(fn ($state): string => $state ? "User #{$state}" : 'System')
                    ->sortable(),
                TextColumn::make('event')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'created' => 'success',
                        'updated' => 'warning',
                        'deleted' => 'danger',
                        default   => 'gray',
                    }),
                TextColumn::make('auditable_type')
                    ->formatStateUsing(fn ($state): string => class_basename($state ?? ''))
                    ->sortable()
                    ->label('Model'),
                TextColumn::make('auditable_id')
                    ->sortable()
                    ->label('Record ID'),
                TextColumn::make('new_values')
                    ->label('Changes')
                    ->formatStateUsing(function ($state): string {
                        if (! $state) {
                            return '—';
                        }
                        $encoded = is_array($state) ? json_encode($state) : (string) $state;
                        return mb_substr($encoded, 0, 80) . (mb_strlen($encoded) > 80 ? '…' : '');
                    })
                    ->wrap(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->label('When'),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('event')
                    ->options([
                        'created' => 'Created',
                        'updated' => 'Updated',
                        'deleted' => 'Deleted',
                    ]),
                SelectFilter::make('auditable_type')
                    ->options([
                        'App\\Models\\BlogPost'   => 'Blog Post',
                        'App\\Models\\CaseStudy'  => 'Case Study',
                        'App\\Models\\Guide'      => 'Guide',
                        'App\\Models\\Lead'       => 'Lead',
                        'App\\Models\\Setting'    => 'Setting',
                    ])
                    ->label('Model'),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListAuditLogs::route('/'),
        ];
    }
}
