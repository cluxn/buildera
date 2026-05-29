<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TestimonialResource\Pages;
use App\Models\Testimonial;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?int $navigationSort = 6;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Textarea::make('content')
                ->required()
                ->maxLength(500)
                ->rows(4)
                ->columnSpanFull()
                ->label('Quote'),
            TextInput::make('client_name')->required()->maxLength(100),
            TextInput::make('client_title')->nullable()->maxLength(100)->label('Job Title'),
            TextInput::make('client_company')->nullable()->maxLength(100)->label('Company'),
            FileUpload::make('client_photo')
                ->image()
                ->disk('public')
                ->directory('testimonials')
                ->nullable()
                ->label('Company Logo'),
            Select::make('rating')
                ->options([5 => '5 Stars', 4 => '4 Stars', 3 => '3 Stars'])
                ->default(5)
                ->required()
                ->label('Star Rating'),
            Select::make('service_category')
                ->options([
                    'Website Development'  => 'Website Dev',
                    'Salesforce Development' => 'Salesforce Dev',
                    'DevOps Development'   => 'DevOps',
                    'AI Agent Development' => 'AI Agents',
                    'Software Development' => 'Software Dev',
                    'Hire a Developer'     => 'Hire a Dev',
                ])
                ->nullable(),
            Select::make('industry')
                ->options([
                    'Manufacturing'        => 'Manufacturing',
                    'Retail / E-Commerce'  => 'Retail',
                    'Hospitality'          => 'Hospitality',
                    'Logistics'            => 'Logistics',
                    'Finance'              => 'Finance',
                    'Healthcare'           => 'Healthcare',
                    'Real Estate'          => 'Real Estate',
                    'Professional Services' => 'Professional Services',
                ])
                ->nullable(),
            TextInput::make('sort_order')->numeric()->default(0)->label('Display Order'),
            Toggle::make('is_featured'),
            Toggle::make('is_published'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('content')->limit(60)->searchable()->label('Quote'),
                TextColumn::make('client_name')->sortable(),
                TextColumn::make('service_category')->sortable(),
                TextColumn::make('industry')->sortable(),
                TextColumn::make('rating')->sortable()->label('Stars'),
                IconColumn::make('is_featured')->boolean()->label('Featured'),
                IconColumn::make('is_published')->boolean()->label('Published'),
                TextColumn::make('sort_order')->sortable()->label('Order'),
            ])
            ->defaultSort('sort_order')
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListTestimonials::route('/'),
            'create' => Pages\CreateTestimonial::route('/create'),
            'edit'   => Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}

