<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PartnerBadgeResource\Pages;
use App\Models\PartnerBadge;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PartnerBadgeResource extends Resource
{
    protected static ?string $model = PartnerBadge::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Website';

    protected static ?string $navigationLabel = 'Partner Badges';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-shield-check';

    protected static ?int $navigationSort = 5;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('name')
                ->required()
                ->maxLength(255),
            TextInput::make('logo')
                ->placeholder('/storage/badges/salesforce-partner.svg')
                ->nullable()
                ->maxLength(500),
            TextInput::make('link')
                ->url()
                ->nullable()
                ->maxLength(500),
            Select::make('category')
                ->options([
                    'platform'      => 'Platform Partner',
                    'certification' => 'Certification',
                    'marketplace'   => 'Marketplace',
                ])
                ->default('platform'),
            TextInput::make('display_order')
                ->numeric()
                ->default(0),
            Toggle::make('is_visible')
                ->default(true),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('category')
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
            'index'  => Pages\ListPartnerBadges::route('/'),
            'create' => Pages\CreatePartnerBadge::route('/create'),
            'edit'   => Pages\EditPartnerBadge::route('/{record}/edit'),
        ];
    }
}

