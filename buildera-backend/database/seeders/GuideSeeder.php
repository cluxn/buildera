<?php

namespace Database\Seeders;

use App\Models\Guide;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GuideSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $guides = [
            [
                'slug'          => 'smb-owners-guide-choosing-business-software',
                'title'         => 'The SMB Owner\'s Guide to Choosing Business Software',
                'category'      => 'business-operations',
                'resource_type' => 'article',
                'description'   => 'A no-nonsense framework for evaluating software options without getting sold to.',
                'is_published'  => true,
                'published_at'  => now()->subDays(10),
                'body'          => '<h2>The Decision Most SMBs Get Wrong</h2><p>Every year, thousands of Indian SMBs buy software they don\'t need, at prices they can\'t justify, because they made the decision based on a vendor demo rather than their own requirements. This guide is the antidote.</p><h2>Build vs Buy vs SaaS — The Decision Matrix</h2><p>Every software decision sits in one of three categories:</p><ul><li><strong>Buy off-the-shelf</strong> (Tally, Zoho, QuickBooks) — right when your needs are standard and the category is mature</li><li><strong>SaaS subscription</strong> (Salesforce, HubSpot, Shopify) — right when you need enterprise-grade features without enterprise-grade build costs, and your needs fit the standard workflow</li><li><strong>Custom build</strong> — right when you have genuinely unique workflows, need deep integrations, or the recurring SaaS cost exceeds the build cost within 3 years</li></ul><h2>5 Questions to Ask Every Vendor</h2><ol><li>Can I talk to 3 customers in my industry who have been using this for at least 12 months?</li><li>What does the data export process look like if I want to leave?</li><li>How much does implementation and training typically cost on top of the licence?</li><li>What does the product roadmap look like for the next 12 months?</li><li>What happens to my data if you get acquired or shut down?</li></ol><h2>Red Flags in Demos</h2><ul><li>The demo doesn\'t use your actual use cases — it uses theirs</li><li>The salesperson can\'t answer technical questions directly</li><li>Pricing is unclear until after the demo</li><li>The "just sign up and see" pressure — legitimate software survives a structured evaluation</li></ul><h2>Total Cost of Ownership Calculation</h2><p>When evaluating software cost, always calculate the 3-year TCO:</p><ul><li>Licence/subscription fees × 36 months</li><li>Implementation and setup (usually 50–200% of first-year licence)</li><li>Training (1–3 days × team size × daily opportunity cost)</li><li>Ongoing admin (hours/month × staff cost)</li><li>Integration costs (connecting to your existing systems)</li></ul><p>Compare this to the cost of the alternative (custom build, or staying with current process). The answer is often surprising.</p>',
            ],
            [
                'slug'          => 'salesforce-onboarding-checklist-small-teams',
                'title'         => 'Salesforce Onboarding Checklist for Small Teams',
                'category'      => 'salesforce',
                'resource_type' => 'checklist',
                'description'   => 'The exact 40-point checklist we use when rolling out Salesforce for teams under 20 users.',
                'is_published'  => true,
                'published_at'  => now()->subDays(5),
                'body'          => '<h2>Pre-Implementation (10 items)</h2><ul><li>Define the 3–5 core sales stages that reflect how you actually sell</li><li>Map all existing contact and lead data sources (spreadsheets, emails, cards)</li><li>Identify which fields are mandatory at each stage</li><li>Decide on the lead assignment rules</li><li>Define what a "qualified lead" means for your team</li><li>Set up your email domain authentication (SPF, DKIM)</li><li>Decide on currency, fiscal year, and business hours settings</li><li>Create the org chart with roles and territories</li><li>Document the current sales process in a flowchart</li><li>Get buy-in from the 3 most skeptical team members before starting</li></ul><h2>Data Migration (8 items)</h2><ul><li>Export all contacts/leads from existing sources in CSV</li><li>Deduplicate using a tool (Google Sheets or a dedup app)</li><li>Map old field names to Salesforce field API names</li><li>Import leads first (not contacts — avoids orphan records)</li><li>Verify a sample of 50 records post-import</li><li>Import accounts and contacts, link to leads</li><li>Import historical activities (calls, meetings) via CSV or a migration tool</li><li>Verify all record links and relationships</li></ul><h2>User Setup (8 items)</h2><ul><li>Create all user accounts with correct roles and profiles</li><li>Set record type visibility per role</li><li>Configure page layouts to show only relevant fields</li><li>Set up list views for each team\'s daily workflow</li><li>Enable Chatter (or disable if team won\'t use it)</li><li>Set up dashboard for the MD/sales manager</li><li>Configure email-to-Salesforce</li><li>Set up mobile app for field reps</li></ul><h2>Training (7 items)</h2><ul><li>Run a 2-hour "day in the life" session, not a features walkthrough</li><li>Record training sessions for future onboarding</li><li>Create a one-page quick reference card per role</li><li>Identify the internal Salesforce champion (not the admin — the enthusiastic user)</li><li>Set up a Slack/WhatsApp group for day-1 questions</li><li>Schedule a 2-week follow-up training for common errors</li><li>Define what "good Salesforce hygiene" looks like and share metrics</li></ul><h2>Go-Live (7 items)</h2><ul><li>Do a final data verification pass 48 hours before go-live</li><li>Communicate the go-live date and what changes at least 1 week in advance</li><li>Have a rollback plan (keep the old spreadsheets accessible for 30 days)</li><li>Block 2 hours for day-1 support</li><li>Monitor login activity for the first 5 days</li><li>Set up basic reports for the first weekly review</li><li>Schedule a 30-day retrospective</li></ul>',
            ],
            [
                'slug'          => 'devops-readiness-checklist-growing-companies',
                'title'         => 'DevOps Readiness Checklist for Growing Companies',
                'category'      => 'devops',
                'resource_type' => 'checklist',
                'description'   => 'Is your team ready for CI/CD and cloud infrastructure? 30 questions to find out.',
                'is_published'  => true,
                'published_at'  => now()->subDays(18),
                'body'          => '<h2>Code Repository & Version Control</h2><ul><li>All code is in a version control system (Git)</li><li>Every team member uses branches (not committing directly to main)</li><li>Pull requests require at least one review before merge</li><li>Commit messages are descriptive and reference ticket numbers</li><li>The main branch is always deployable</li></ul><h2>Deployment Frequency</h2><ul><li>You can deploy to production without a manual process taking more than 30 minutes</li><li>Deployments happen at least weekly (daily is the target)</li><li>Rollback takes less than 15 minutes</li><li>Deployments don\'t require downtime</li><li>You have staging and production environments that are functionally identical</li></ul><h2>Monitoring & Observability</h2><ul><li>Application errors are logged centrally (not just in local files)</li><li>You have uptime monitoring with alerts (not just user complaints)</li><li>You know your application\'s average response time</li><li>Database slow queries are logged</li><li>You have a dashboard showing system health visible to the team</li></ul><h2>On-Call & Incident Process</h2><ul><li>There\'s a defined on-call rotation</li><li>Incidents have a documented response process</li><li>Post-mortems are conducted for significant incidents</li><li>An incident severity classification exists (P1/P2/P3)</li><li>Customer communication during incidents is handled by a non-engineer</li></ul><h2>Team Size Thresholds</h2><ul><li>1–3 engineers: focus on version control and basic CI first</li><li>4–8 engineers: add automated testing and staging environments</li><li>8+ engineers: full CI/CD pipeline and infrastructure-as-code are essential</li><li>Any size: monitoring and alerting should exist from day one</li></ul>',
            ],
            [
                'slug'          => 'how-to-brief-software-development-agency',
                'title'         => 'How to Brief a Software Development Agency (Without Wasting 3 Months)',
                'category'      => 'hiring-tech-teams',
                'resource_type' => 'article',
                'description'   => 'Most failed software projects begin with a bad brief. Here\'s the briefing template we wish every client used.',
                'is_published'  => true,
                'published_at'  => now()->subDays(8),
                'body'          => '<h2>Why Most Software Projects Fail in the Brief</h2><p>In our 6 years of building software for Indian SMBs, we\'ve traced the majority of failed or overrun projects back to one root cause: the brief didn\'t capture what the business actually needed. Instead, it described features someone thought they needed, or described a solution when the problem was never properly defined.</p><p>This guide gives you the exact briefing structure we wish every prospective client used.</p><h2>What Agencies Actually Need (Not Want)</h2><p>Agencies will happily accept a brief that says "we need a CRM with lead tracking, pipeline management, and email integration." They\'ll build you exactly that — and it will be wrong, because that brief doesn\'t tell them anything about your business.</p><p>What agencies actually need to build the right thing:</p><ul><li><strong>The business problem</strong> — what is the operational pain that software will solve?</li><li><strong>Who uses it</strong> — roles, technical comfort level, usage frequency</li><li><strong>What success looks like in 6 months</strong> — specific, measurable outcomes</li><li><strong>What you have today</strong> — existing systems, data, processes</li><li><strong>Constraints</strong> — budget, timeline, technical environment</li></ul><h2>The 1-Page Scope Template</h2><p>Fill in these sections before approaching any agency:</p><ol><li><strong>Business problem</strong> (2–3 sentences): What operational problem are you solving?</li><li><strong>Current process</strong> (1 paragraph): How does this work today, including tools used?</li><li><strong>Desired outcome</strong> (bullet list): What should be true in 6 months that isn\'t true today?</li><li><strong>Users</strong> (list): Who will use this software, and how often?</li><li><strong>Integrations</strong> (list): What existing systems must this connect to?</li><li><strong>Budget range</strong>: Being vague here wastes everyone\'s time, including yours</li><li><strong>Timeline</strong>: When do you need this live, and is there a hard deadline?</li></ol><h2>Red Flags in Agency Proposals</h2><ul><li>They didn\'t ask about your current process</li><li>The timeline is given before the scope is defined</li><li>No mention of testing or UAT</li><li>The payment schedule is front-loaded (>40% upfront)</li><li>No clause about code ownership</li></ul><h2>How to Structure the Discovery Phase</h2><p>The best agencies charge for discovery (typically ₹50K–₹1.5L depending on complexity). This is a green flag, not a red one. A paid discovery phase means:</p><ul><li>The agency takes it seriously</li><li>You get a detailed specification you can take elsewhere if needed</li><li>The resulting quote is based on understood requirements, not guesswork</li></ul><p>If an agency gives you a fixed-price quote without a discovery phase, they\'re building what they assume, not what you need.</p>',
            ],
        ];

        foreach ($guides as $data) {
            Guide::updateOrCreate(['slug' => $data['slug']], $data);
        }
    }
}
