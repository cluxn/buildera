<?php

namespace Database\Seeders;

use App\Models\PartnerBadge;
use Illuminate\Database\Seeder;

class PartnerBadgeSeeder extends Seeder
{
    public function run(): void
    {
        $badges = [
            ['name' => 'Salesforce Partner', 'category' => 'platform', 'link' => 'https://www.salesforce.com', 'display_order' => 1],
            ['name' => 'Google Cloud Partner', 'category' => 'platform', 'link' => 'https://cloud.google.com', 'display_order' => 2],
            ['name' => 'Microsoft Solution Partner', 'category' => 'certification', 'link' => 'https://microsoft.com', 'display_order' => 3],
            ['name' => 'AWS Partner', 'category' => 'platform', 'link' => 'https://aws.amazon.com', 'display_order' => 4],
            ['name' => 'Shopify Partner', 'category' => 'marketplace', 'link' => 'https://www.shopify.com', 'display_order' => 5],
            ['name' => 'Meta Business Partner', 'category' => 'platform', 'link' => 'https://business.facebook.com', 'display_order' => 6],
        ];

        foreach ($badges as $badge) {
            PartnerBadge::firstOrCreate(
                ['name' => $badge['name']],
                array_merge($badge, ['is_visible' => true, 'logo' => null])
            );
        }
    }
}
