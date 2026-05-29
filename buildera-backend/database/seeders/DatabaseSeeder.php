<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );

        $this->call(SettingsSeeder::class);
        $this->call(AuthorSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(BlogPostSeeder::class);
        $this->call(CaseStudySeeder::class);
        $this->call(GuideSeeder::class);
        $this->call(TestimonialSeeder::class);
        $this->call(PartnerBadgeSeeder::class);
    }
}
