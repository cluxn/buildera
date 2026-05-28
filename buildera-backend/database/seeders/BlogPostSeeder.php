<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\BlogPost;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $rahul = Author::where('name', 'Rahul Sharma')->first()?->id;
        $priya = Author::where('name', 'Priya Mehta')->first()?->id;

        $posts = [
            [
                'slug'         => 'how-ai-automation-saved-mumbai-manufacturer-20-hours',
                'title'        => 'How AI Automation Saved a Mumbai Manufacturer 20 Hours a Week',
                'excerpt'      => 'A precision parts manufacturer was manually reconciling production data across 4 spreadsheets every day. Here\'s how we automated the entire workflow with a custom AI agent.',
                'category'     => 'ai-automation',
                'author_id'    => $rahul,
                'tags'         => ['AI', 'Manufacturing', 'Automation'],
                'is_published' => true,
                'is_featured'  => true,
                'published_at' => now()->subDays(14),
                'body'         => '<h2>The Problem</h2><p>A precision parts manufacturer in Mumbai had 3 production line supervisors spending 4 hours every morning reconciling data across 4 spreadsheets. Production output from Machine A, scrap rates from Machine B, delivery schedules from the ERP, and quality check logs from a standalone form — none of them talked to each other.</p><p>Every morning, one of the supervisors would copy-paste data between files, calculate daily yields by hand, and flag anomalies by memory. By the time the daily production report reached the MD, it was already 3 hours out of date. Errors were common, and when they happened, tracing them back was a half-day exercise.</p><h2>The Solution</h2><p>We built a custom Python-based AI agent that runs on a ₹3,000/month cloud server and handles the entire workflow automatically.</p><ul><li>Every 30 minutes, it pulls data from machine APIs and the ERP</li><li>An ML layer reconciles the data and flags any anomalies (missing batches, yield drops above 5%, unusual scrap rates)</li><li>A daily report is generated at 6:00am and pushed to WhatsApp and email before the MD arrives</li><li>Anomalies trigger an immediate WhatsApp alert to the plant manager</li></ul><h2>The Results</h2><p>The first week after go-live, the supervisors were skeptical. By week three, they had stopped their manual reconciliation entirely.</p><ul><li>Daily report time: 4 hours → 8 minutes (automated)</li><li>Reconciliation errors in 3 months post-launch: 0</li><li>2 supervisors now focused on process improvement instead of data entry</li><li>ROI reached in month 4</li></ul><h2>What This Means for Other Manufacturers</h2><p>If your team is spending more than 1 hour a day reconciling data from multiple systems, you almost certainly have an automation opportunity. The technology is not complex — what it requires is a developer who understands both the software layer and the operational context.</p><p>That\'s exactly what we do at Buildera. If you\'re in manufacturing and dealing with manual data workflows, book a free 15-minute call and we\'ll tell you what\'s automatable.</p>',
            ],
            [
                'slug'         => 'salesforce-crm-vs-custom-crm-which-is-right',
                'title'        => 'Salesforce CRM vs Custom CRM — Which Is Right for Your Business?',
                'excerpt'      => 'The honest answer most agencies won\'t give you: it depends on 3 specific factors. Here\'s the decision framework we use with every new client.',
                'category'     => 'salesforce',
                'author_id'    => $rahul,
                'tags'         => ['Salesforce', 'CRM', 'Decision Guide'],
                'is_published' => true,
                'is_featured'  => false,
                'published_at' => now()->subDays(28),
                'body'         => '<h2>The Question We Get Every Week</h2><p>"Should we go with Salesforce or build our own CRM?" We get this question constantly — and the honest answer is: it depends on three specific factors that most agencies won\'t walk you through because they have a financial incentive to sell you one or the other.</p><p>We\'ve implemented both, and we\'ve made the wrong recommendation once (Salesforce for a 5-person team with a ₹2L/year budget — we regret it). Here\'s the framework we\'ve developed since then.</p><h2>When Salesforce Wins</h2><ul><li><strong>Complex sales process with multiple stages</strong> — if you have 7+ deal stages, automated task assignments, and approval workflows, Salesforce\'s native automation is genuinely powerful</li><li><strong>10+ sales reps</strong> — below this, the overhead of admin and training rarely pays off</li><li><strong>Budget above ₹8L/year</strong> — Salesforce Sales Cloud starts at ~₹3,600/user/month; add implementation, training, and admin overhead and the real cost is often 3x the licence fee</li><li><strong>Your salespeople already know Salesforce</strong> — adoption friction is the #1 reason CRM implementations fail; if the team has used it before, you skip a major barrier</li></ul><h2>When Custom CRM Wins</h2><ul><li><strong>Unique workflow that doesn\'t map to standard objects</strong> — insurance renewal pipelines, hotel booking workflows, export inquiry management — these all behave differently from a typical B2B sales pipeline</li><li><strong>Tight budget</strong> — a custom CRM built on Laravel/Next.js costs ₹4–8L to build and ₹0 in recurring licence fees</li><li><strong>Simple pipeline with deep integrations</strong> — if you need CRM data to flow into your ERP, your dispatch system, and your WhatsApp bot, custom is almost always faster and cheaper to integrate</li></ul><h2>The 3-Question Decision Framework</h2><p>We ask every new client three questions before making a recommendation:</p><ol><li><strong>How many stages does a deal go through from first contact to closed?</strong> (Under 5: custom. Over 8: Salesforce)</li><li><strong>What does your CRM need to integrate with?</strong> (Standard integrations: Salesforce. Proprietary or legacy systems: custom)</li><li><strong>What\'s your 3-year budget for CRM including admin and training?</strong> (Under ₹15L: custom. Over ₹25L: Salesforce worth serious consideration)</li></ol><p>If you\'re unsure about any of these, book a free call. We\'ll give you a straight answer without trying to sell you either option.</p>',
            ],
            [
                'slug'         => '5-signs-supply-chain-needs-software-upgrade',
                'title'        => '5 Signs Your Supply Chain Needs a Software Upgrade',
                'excerpt'      => 'Still tracking purchase orders in Excel? Here are 5 operational pain points that signal your supply chain has outgrown manual processes.',
                'category'     => 'business-operations',
                'author_id'    => $priya,
                'tags'         => ['Supply Chain', 'Logistics', 'Operations'],
                'is_published' => true,
                'is_featured'  => false,
                'published_at' => now()->subDays(7),
                'body'         => '<h2>When Excel Becomes the Enemy</h2><p>Most supply chain software conversations start with a crisis — a major stockout, a compliance failure, or an operations manager who quits because they can\'t take the spreadsheet maintenance anymore. We\'ve seen all three. Here are the five warning signs that appear before the crisis.</p><h2>Sign 1: Excel Reconciliation Takes More Than 2 Hours a Day</h2><p>If someone on your team is spending significant time reconciling purchase orders, delivery receipts, and inventory counts across multiple spreadsheets, you\'ve already paid for a software upgrade ten times over in lost productivity. This is the most common sign and the easiest to ignore — it feels like "just the way things work."</p><h2>Sign 2: Stockouts Happen More Than Twice a Month</h2><p>Stockouts are expensive in two ways: you lose the sale, and you damage the customer relationship. If they\'re happening regularly, it means you don\'t have reliable real-time visibility into stock levels — which is a data problem, not a buying problem.</p><h2>Sign 3: You Have No Real-Time Inventory Visibility</h2><p>If the answer to "how much stock do we have of SKU 447?" is "let me check the register" or "I\'ll have to ask the warehouse team," you don\'t have inventory visibility. You have inventory records. These are very different things.</p><h2>Sign 4: Supplier Communication Is Done Over WhatsApp and Email</h2><p>WhatsApp and email are excellent communication tools. They are terrible for supply chain management because there\'s no audit trail, no way to link a message to a PO, and no way to see at a glance which orders are confirmed, in transit, or delayed.</p><h2>Sign 5: There\'s No Audit Trail for Stock Movements</h2><p>When a discrepancy appears between what you ordered and what you received, can you trace it back? If the answer is "it would take hours to figure out," your supply chain has outgrown its current tooling.</p><p>If 3 or more of these signs apply to your operation, you\'re ready to talk. Book a free call and we\'ll walk through what a supply chain software upgrade would look like for your specific situation.</p>',
            ],
            [
                'slug'         => 'what-to-look-for-hiring-dedicated-development-team',
                'title'        => 'What to Look For When Hiring a Dedicated Development Team',
                'excerpt'      => 'Most SMBs make the same 3 mistakes when hiring a dev team. Here\'s the evaluation checklist we built after 6 years of doing this ourselves.',
                'category'     => 'hiring-tech-teams',
                'author_id'    => $priya,
                'tags'         => ['Hiring', 'Development Teams', 'SMB'],
                'is_published' => true,
                'is_featured'  => false,
                'published_at' => now()->subDays(3),
                'body'         => '<h2>The 3 Mistakes We See Every Time</h2><p>After 6 years of running a software development team and placing developers with clients, we\'ve watched the same three mistakes play out repeatedly.</p><ol><li><strong>Choosing on price alone</strong> — the cheapest option almost always costs the most in rework, delays, and lost opportunity cost</li><li><strong>Skipping the discovery process</strong> — any agency that gives you a quote before spending at least 2 hours understanding your business is guessing</li><li><strong>No post-launch support plan</strong> — software doesn\'t stop needing maintenance when it launches</li></ol><h2>3 Red Flags to Walk Away From</h2><ul><li><strong>No discovery process</strong> — if they\'re quoting before they understand your business, they\'re building for their convenience, not yours</li><li><strong>Vague timeline estimates</strong> — "4 to 12 weeks depending on requirements" is not a timeline; it\'s an excuse prepared in advance</li><li><strong>No references from similar projects</strong> — any agency worth hiring has done something similar to what you need. If they can\'t show you, ask why.</li></ul><h2>5 Green Flags That Signal a Good Partner</h2><ul><li>They offer a fixed-price option after a thorough discovery phase</li><li>There\'s a dedicated project manager (not a developer who also PMs)</li><li>Weekly demos are standard, not optional</li><li>Code ownership is contractually yours from day one</li><li>Post-launch support is a defined service, not a vague promise</li></ul><h2>How to Run a Mini-Test Project</h2><p>Before committing to a full engagement, ask your shortlisted agencies to complete a paid mini-project: a 1–2 week task that\'s representative of the real work. This tells you more about their process, communication, and code quality than any proposal ever will.</p><p>At Buildera, we always welcome this. If an agency refuses or makes excuses, that\'s your answer.</p>',
            ],
        ];

        foreach ($posts as $data) {
            BlogPost::updateOrCreate(['slug' => $data['slug']], $data);
        }
    }
}
