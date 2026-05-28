<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\Author;
use App\Models\BlogPost;
use App\Models\Category;
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
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;

    protected static string|\UnitEnum|null $navigationGroup = 'Content';

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-document-text';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Tabs')->tabs([
                Tabs\Tab::make('Content')->schema([
                    TextInput::make('title')
                        ->required()
                        ->maxLength(200)
                        ->live()
                        ->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state))),
                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true),
                    Select::make('author_id')
                        ->relationship('author', 'name')
                        ->searchable()
                        ->required(),
                    Select::make('category')
                        ->options(fn () => Category::pluck('name', 'name'))
                        ->searchable()
                        ->required(),
                    TextInput::make('tags')
                        ->placeholder('comma,separated,tags')
                        ->helperText('Stored as JSON array')
                        ->dehydrateStateUsing(fn ($state) => array_filter(array_map('trim', explode(',', $state ?? ''))))
                        ->formatStateUsing(fn ($state) => is_array($state) ? implode(', ', $state) : $state),
                    Textarea::make('excerpt')
                        ->required()
                        ->maxLength(300)
                        ->rows(3),
                    RichEditor::make('body')
                        ->required()
                        ->fileAttachmentsDisk('public')
                        ->fileAttachmentsDirectory('blog-images')
                        ->columnSpanFull(),
                ]),
                Tabs\Tab::make('Media')->schema([
                    FileUpload::make('featured_image')
                        ->image()
                        ->acceptedFileTypes(['image/*'])
                        ->disk('public')
                        ->directory('blog-featured')
                        ->label('Featured Image'),
                    TextInput::make('featured_image_alt')
                        ->maxLength(200)
                        ->label('Image Alt Text'),
                ]),
                Tabs\Tab::make('Publishing')->schema([
                    Toggle::make('is_published')->label('Published'),
                    Toggle::make('is_featured')->label('Featured on homepage'),
                    DateTimePicker::make('published_at')->nullable(),
                ]),
                Tabs\Tab::make('SEO')->schema([
                    TextInput::make('seo_title')->maxLength(70)->label('SEO Title'),
                    Textarea::make('seo_description')->maxLength(160)->rows(3)->label('Meta Description'),
                    FileUpload::make('seo_og_image')
                        ->image()
                        ->disk('public')
                        ->directory('seo-og')
                        ->label('OG Image')
                        ->nullable(),
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
                TextColumn::make('author.name')->sortable()->label('Author'),
                IconColumn::make('is_published')->boolean()->label('Published'),
                IconColumn::make('is_featured')->boolean()->label('Featured'),
                TextColumn::make('published_at')->dateTime()->sortable(),
                TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('category')->options(fn () => Category::pluck('name', 'name')),
                TernaryFilter::make('is_published'),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
                ViewAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit'   => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
