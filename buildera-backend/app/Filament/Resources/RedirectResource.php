<?php

namespace App\Filament\Resources;

use App\Filament\Resources\RedirectResource\Pages;
use App\Models\Redirect;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class RedirectResource extends Resource
{
    protected static ?string $model = Redirect::class;

    protected static string|\UnitEnum|null $navigationGroup = 'SEO & Analytics';

    protected static ?string $navigationLabel = 'Redirects';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-arrow-path';

    protected static ?int $navigationSort = 10;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('source_path')
                ->required()
                ->maxLength(500)
                ->placeholder('/old-url')
                ->unique(ignoreRecord: true),
            TextInput::make('destination_path')
                ->required()
                ->maxLength(500)
                ->placeholder('/new-url or https://...'),
            Select::make('status_code')
                ->options([301 => '301 — Permanent', 302 => '302 — Temporary'])
                ->default(301)
                ->required(),
            Toggle::make('is_active')
                ->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('source_path')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('destination_path')
                    ->searchable()
                    ->limit(50),
                TextColumn::make('status_code')
                    ->badge()
                    ->color(fn (int $state): string => $state === 301 ? 'success' : 'warning'),
                IconColumn::make('is_active')
                    ->boolean(),
                TextColumn::make('hit_count')
                    ->sortable()
                    ->label('Hits'),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Last Updated'),
            ])
            ->defaultSort('updated_at', 'desc')
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListRedirects::route('/'),
            'create' => Pages\CreateRedirect::route('/create'),
            'edit'   => Pages\EditRedirect::route('/{record}/edit'),
        ];
    }
}
