<?php

namespace Database\Seeders;

use App\Models\Author;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuthorSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        Author::updateOrCreate(
            ['slug' => 'rahul-sharma'],
            [
                'name'         => 'Rahul Sharma',
                'slug'         => 'rahul-sharma',
                'role'         => 'Founder & Lead Architect',
                'bio'          => '12 years building enterprise software for Indian SMBs. Obsessed with clean architecture and systems that don\'t break at scale.',
                'linkedin_url' => null,
                'avatar'       => null,
            ]
        );

        Author::updateOrCreate(
            ['slug' => 'priya-mehta'],
            [
                'name'         => 'Priya Mehta',
                'slug'         => 'priya-mehta',
                'role'         => 'Head of Delivery',
                'bio'          => 'Ex-consultant turned builder. Manages client relationships and project timelines across all active Buildera engagements.',
                'linkedin_url' => null,
                'avatar'       => null,
            ]
        );
    }
}
