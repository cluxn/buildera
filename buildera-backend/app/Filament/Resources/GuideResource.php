<?php

namespace App\Filament\Resources;

use App\Filament\Resources\GuideResource\Pages;
use App\Models\Guide;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
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

class GuideResource extends Resource
{
    protected static ?string $model = Guide::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-book-open';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Tabs')->tabs([
                Tabs\Tab::make('Content')->schema([
                    TextInput::make('title')
                        ->required()
                        ->live()
                        ->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state))),
                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true),
                    Select::make('category')
                        ->options([
                            'Software Development'  => 'Software Dev',
                            'Salesforce'            => 'Salesforce',
                            'DevOps'                => 'DevOps',
                            'AI & Automation'       => 'AI & Automation',
                            'Business Operations'   => 'Business Operations',
                            'Hiring Tech Teams'     => 'Hiring Tech Teams',
                        ])
                        ->required(),
                    Select::make('resource_type')
                        ->options([
                            'article'   => 'Article',
                            'template'  => 'Template',
                            'checklist' => 'Checklist',
                            'video'     => 'Video',
                        ])
                        ->required(),
                    Textarea::make('description')
                        ->required()
                        ->maxLength(300)
                        ->rows(3),
                    RichEditor::make('body')
                        ->required()
                        ->columnSpanFull(),
                ]),
                Tabs\Tab::make('Media')->schema([
                    FileUpload::make('featured_image')
                        ->image()
                        ->acceptedFileTypes(['image/*'])
                        ->disk('public')
                        ->directory('guides')
                        ->label('Cover Image'),
                    TextInput::make('featured_image_alt')
                        ->maxLength(200)
                        ->label('Image Alt Text'),
                    TextInput::make('external_link')
                        ->url()
                        ->nullable()
                        ->label('External Link (optional)'),
                ]),
                Tabs\Tab::make('Publishing')->schema([
                    Toggle::make('is_published'),
                    DateTimePicker::make('published_at')->nullable(),
                ]),
                Tabs\Tab::make('SEO')->schema([
                    TextInput::make('seo_title')->maxLength(70),
                    Textarea::make('seo_description')->maxLength(160)->rows(3),
                ]),
            ])->columnSpanFull(),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable()->sortable()->limit(50),
                TextColumn::make('category')->sortable(),
                TextColumn::make('resource_type')->sortable(),
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
            'index'  => Pages\ListGuides::route('/'),
            'create' => Pages\CreateGuide::route('/create'),
            'edit'   => Pages\EditGuide::route('/{record}/edit'),
        ];
    }
}
