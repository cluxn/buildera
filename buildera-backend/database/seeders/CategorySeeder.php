<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $categories = [
            ['slug' => 'ai-automation',      'name' => 'AI & Automation',      'description' => 'Guides and insights on AI agents, automation workflows, and ML integration for SMBs'],
            ['slug' => 'salesforce',          'name' => 'Salesforce',           'description' => 'Salesforce CRM setup, customisation, and integration guides'],
            ['slug' => 'software-development','name' => 'Software Development', 'description' => 'Custom software development approaches, tech stacks, and architecture decisions'],
            ['slug' => 'devops',              'name' => 'DevOps',               'description' => 'Cloud infrastructure, CI/CD, and DevOps practices for growing teams'],
            ['slug' => 'business-operations', 'name' => 'Business Operations',  'description' => 'Software-driven process improvement and operational efficiency'],
            ['slug' => 'hiring-tech-teams',   'name' => 'Hiring Tech Teams',    'description' => 'How to evaluate, hire, and manage software development teams'],
        ];

        foreach ($categories as $data) {
            Category::updateOrCreate(['slug' => $data['slug']], $data);
        }
    }
}
