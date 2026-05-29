<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FooterLinkResource\Pages;
use App\Models\FooterLink;
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

class FooterLinkResource extends Resource
{
    protected static ?string $model = FooterLink::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Website';

    protected static ?string $navigationLabel = 'Footer Links';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-link';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('label')
                ->required()
                ->maxLength(255),
            TextInput::make('url')
                ->required()
                ->maxLength(500),
            Select::make('column_group')
                ->options([
                    'Services'  => 'Services',
                    'Solutions' => 'Solutions',
                    'Company'   => 'Company',
                    'Resources' => 'Resources',
                ])
                ->required(),
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
                TextColumn::make('label')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('url')
                    ->limit(40)
                    ->searchable(),
                TextColumn::make('column_group')
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
            'index'  => Pages\ListFooterLinks::route('/'),
            'create' => Pages\CreateFooterLink::route('/create'),
            'edit'   => Pages\EditFooterLink::route('/{record}/edit'),
        ];
    }
}
