<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SeoMetaResource\Pages;
use App\Models\SeoMeta;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class SeoMetaResource extends Resource
{
    protected static ?string $model = SeoMeta::class;

    protected static string|\UnitEnum|null $navigationGroup = 'SEO & Analytics';

    protected static ?string $navigationLabel = 'SEO Metadata';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-magnifying-glass';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Select::make('page_type')
                ->options([
                    'homepage'   => 'Homepage',
                    'service'    => 'Service Page',
                    'solution'   => 'Solution Page',
                    'industry'   => 'Industry Page',
                    'blog_post'  => 'Blog Post',
                    'case_study' => 'Case Study',
                    'guide'      => 'Guide',
                    'page'       => 'Static Page',
                ])
                ->required()
                ->searchable(),
            TextInput::make('page_slug')
                ->nullable()
                ->maxLength(255)
                ->helperText('e.g. "salesforce-crm-development" or "homepage" for the home page'),
            TextInput::make('title')
                ->maxLength(70)
                ->label('SEO Title Tag')
                ->helperText('70 chars max'),
            Textarea::make('description')
                ->maxLength(160)
                ->rows(3)
                ->label('Meta Description')
                ->helperText('160 chars max'),
            TextInput::make('canonical_url')
                ->url()
                ->nullable()
                ->maxLength(500)
                ->label('Canonical URL')
                ->helperText('Leave blank to auto-generate from NEXT_PUBLIC_SITE_URL'),
            TextInput::make('og_image')
                ->url()
                ->nullable()
                ->maxLength(500)
                ->label('OG Image URL')
                ->helperText('Leave blank to use default /og-image.png'),
            Select::make('robots')
                ->options([
                    'index,follow'           => 'index,follow (default)',
                    'noindex,follow'         => 'noindex,follow',
                    'noindex,nofollow'       => 'noindex,nofollow',
                ])
                ->default('index,follow'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('page_type')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('page_slug')
                    ->sortable()
                    ->searchable(),
                TextColumn::make('title')
                    ->limit(60)
                    ->sortable(),
                TextColumn::make('robots')
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('page_type')
                    ->options([
                        'homepage'   => 'Homepage',
                        'service'    => 'Service Page',
                        'solution'   => 'Solution Page',
                        'industry'   => 'Industry Page',
                        'blog_post'  => 'Blog Post',
                        'case_study' => 'Case Study',
                        'guide'      => 'Guide',
                        'page'       => 'Static Page',
                    ]),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListSeoMetas::route('/'),
            'create' => Pages\CreateSeoMeta::route('/create'),
            'edit'   => Pages\EditSeoMeta::route('/{record}/edit'),
        ];
    }
}
