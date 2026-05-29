<?php

namespace App\Filament\Resources\PartnerBadgeResource\Pages;

use App\Filament\Resources\PartnerBadgeResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPartnerBadges extends ListRecords
{
    protected static string $resource = PartnerBadgeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
