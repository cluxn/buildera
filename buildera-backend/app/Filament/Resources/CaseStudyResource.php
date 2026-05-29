<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CaseStudyResource\Pages;
use App\Models\CaseStudy;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Tabs;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class CaseStudyResource extends Resource
{
    protected static ?string $model = CaseStudy::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-briefcase';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Tabs')->tabs([
                Tabs\Tab::make('Details')->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(200)
                        ->live()
                        ->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state))),
                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true),
                    TextInput::make('client_name')
                        ->nullable()
                        ->maxLength(150)
                        ->placeholder('Anonymous Client (optional)'),
                    Select::make('industry')
                        ->options([
                            'Manufacturing'        => 'Manufacturing',
                            'Retail / E-Commerce'  => 'Retail / E-Commerce',
                            'Hospitality'          => 'Hospitality',
                            'Logistics'            => 'Logistics',
                            'Finance'              => 'Finance',
                            'Healthcare'           => 'Healthcare',
                            'Real Estate'          => 'Real Estate',
                            'Professional Services' => 'Professional Services',
                        ])
                        ->required(),
                    FileUpload::make('featured_image')
                        ->image()
                        ->acceptedFileTypes(['image/*'])
                        ->disk('public')
                        ->directory('case-studies')
                        ->label('Hero Image'),
                    TextInput::make('featured_image_alt')
                        ->maxLength(200)
                        ->label('Image Alt Text'),
                ]),
                Tabs\Tab::make('Content')->schema([
                    RichEditor::make('challenge')
                        ->required()
                        ->label('Problem Statement')
                        ->columnSpanFull(),
                    RichEditor::make('solution')
                        ->required()
                        ->label('Our Solution')
                        ->columnSpanFull(),
                    RichEditor::make('results')
                        ->required()
                        ->label('Results & Outcomes')
                        ->columnSpanFull(),
                    Repeater::make('key_metrics')
                        ->schema([
                            TextInput::make('label')->required()->maxLength(60),
                            TextInput::make('value')->required()->maxLength(60),
                        ])
                        ->label('Key Result Metrics (e.g. "40% faster processing")')
                        ->addActionLabel('Add Metric')
                        ->columnSpanFull(),
                    TextInput::make('testimonial_quote')
                        ->nullable()
                        ->maxLength(500)
                        ->label('Client Quote (optional)'),
                    TextInput::make('testimonial_author')
                        ->nullable()
                        ->maxLength(100)
                        ->label('Quote Attribution'),
                ]),
                Tabs\Tab::make('Publishing')->schema([
                    Toggle::make('is_published'),
                    Toggle::make('is_featured'),
                    DateTimePicker::make('published_at')->nullable(),
                ]),
                Tabs\Tab::make('SEO')->schema([
                    TextInput::make('seo_title')->maxLength(70),
                    Textarea::make('seo_description')->maxLength(160)->rows(3),
                ]),
                Tabs\Tab::make('Related Content')->schema([
                    Select::make('related_content')
                        ->label('Related Items')
                        ->multiple()
                        ->options(function () {
                            $posts = \App\Models\BlogPost::published()
                                ->pluck('title', 'slug')
                                ->mapWithKeys(fn ($title, $slug) => ["blog:{$slug}" => "[Blog] {$title}"]);
                            $cases = \App\Models\CaseStudy::published()
                                ->pluck('title', 'slug')
                                ->mapWithKeys(fn ($title, $slug) => ["case:{$slug}" => "[Case Study] {$title}"]);
                            $guides = \App\Models\Guide::published()
                                ->pluck('title', 'slug')
                                ->mapWithKeys(fn ($title, $slug) => ["guide:{$slug}" => "[Guide] {$title}"]);
                            return $posts->merge($cases)->merge($guides)->all();
                        })
                        ->searchable()
                        ->helperText('Format: type:slug — e.g. blog:my-post, case:client-x, guide:checklist-y')
                        ->columnSpanFull(),
                ]),
            ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable()->sortable()->limit(50),
                TextColumn::make('industry')->sortable(),
                IconColumn::make('is_featured')->boolean()->label('Featured'),
                IconColumn::make('is_published')->boolean()->label('Published'),
                TextColumn::make('published_at')->dateTime()->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListCaseStudies::route('/'),
            'create' => Pages\CreateCaseStudy::route('/create'),
            'edit'   => Pages\EditCaseStudy::route('/{record}/edit'),
        ];
    }
}
