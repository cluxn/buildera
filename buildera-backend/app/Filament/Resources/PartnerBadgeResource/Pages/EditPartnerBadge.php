<?php

namespace App\Filament\Resources\PartnerBadgeResource\Pages;

use App\Filament\Resources\PartnerBadgeResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditPartnerBadge extends EditRecord
{
    protected static string $resource = PartnerBadgeResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
