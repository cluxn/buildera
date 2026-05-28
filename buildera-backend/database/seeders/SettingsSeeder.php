<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Seed the application's settings table with default values.
     */
    public function run(): void
    {
        $settings = [
            // Company settings
            ['key' => 'company_name',    'value' => 'Buildera',                                   'group' => 'company'],
            ['key' => 'company_tagline', 'value' => 'We Build What Grows Your Business',           'group' => 'company'],
            ['key' => 'company_phone',   'value' => '+91 82994 06767',                             'group' => 'company'],
            ['key' => 'company_email',   'value' => 'info@buildera.co',                            'group' => 'company'],
            ['key' => 'company_address', 'value' => '',                                            'group' => 'company'],

            // Social media
            ['key' => 'social_linkedin', 'value' => '', 'group' => 'social'],
            ['key' => 'social_twitter',  'value' => '', 'group' => 'social'],
            ['key' => 'social_facebook', 'value' => '', 'group' => 'social'],
            ['key' => 'social_github',   'value' => '', 'group' => 'social'],
            ['key' => 'social_youtube',  'value' => '', 'group' => 'social'],

            // Contact & booking
            ['key' => 'whatsapp_number',  'value' => '',                                                    'group' => 'contact'],
            ['key' => 'whatsapp_message', 'value' => 'Hi Buildera! I\'d like to discuss a project.',        'group' => 'contact'],
            ['key' => 'calendly_url',     'value' => '',                                                    'group' => 'contact'],

            // SEO defaults
            ['key' => 'default_seo_title',       'value' => 'Buildera — IT Services & Custom Software Development',                                              'group' => 'seo'],
            ['key' => 'default_seo_description', 'value' => 'Buildera builds custom software, Salesforce solutions, DevOps pipelines, and AI agents for growing businesses.', 'group' => 'seo'],
            ['key' => 'og_image',                'value' => '',                                                                                                   'group' => 'seo'],

            // Footer
            ['key' => 'footer_copyright', 'value' => '© 2025 Buildera. All rights reserved.', 'group' => 'footer'],
        ];

        foreach ($settings as $setting) {
            Setting::updateOrCreate(
                ['key' => $setting['key']],
                ['value' => $setting['value'], 'group' => $setting['group']]
            );
        }
    }
}
