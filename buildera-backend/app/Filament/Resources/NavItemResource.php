<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NavItemResource\Pages;
use App\Models\NavItem;
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

class NavItemResource extends Resource
{
    protected static ?string $model = NavItem::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Website';

    protected static ?string $navigationLabel = 'Navigation Items';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-bars-3';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('label')
                ->required()
                ->maxLength(255),
            TextInput::make('url')
                ->required()
                ->maxLength(500)
                ->placeholder('/services or https://...'),
            Select::make('parent_group')
                ->options([
                    'Services'   => 'Services',
                    'Solutions'  => 'Solutions',
                    'Work'       => 'Work',
                    'Resources'  => 'Resources',
                    'standalone' => 'Standalone (no group)',
                ])
                ->nullable(),
            TextInput::make('display_order')
                ->numeric()
                ->default(0),
            Toggle::make('is_visible')
                ->default(true),
            Toggle::make('opens_new_tab')
                ->default(false),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('label')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('url')
                    ->limit(40)
                    ->searchable(),
                TextColumn::make('parent_group')
                    ->badge()
                    ->sortable(),
                TextColumn::make('display_order')
                    ->sortable()
                    ->label('Order'),
                IconColumn::make('is_visible')
                    ->boolean(),
            ])
            ->defaultSort('display_order')
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
            'index'  => Pages\ListNavItems::route('/'),
            'create' => Pages\CreateNavItem::route('/create'),
            'edit'   => Pages\EditNavItem::route('/{record}/edit'),
        ];
    }
}
