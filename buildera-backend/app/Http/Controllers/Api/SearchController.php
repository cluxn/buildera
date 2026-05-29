<?php

namespace App\Http\Controllers\Api;

use App\Models\BlogPost;
use App\Models\CaseStudy;
use App\Models\Guide;
use Illuminate\Http\JsonResponse;

class SearchController
{
    public function index(): JsonResponse
    {
        $q = request('q', '');

        if (strlen($q) < 2) {
            return response()->json([]);
        }

        $qLower = strtolower($q);

        $posts = BlogPost::published()
            ->where(fn ($query) => $query
                ->whereRaw('LOWER(title) LIKE ?', ["%{$qLower}%"])
                ->orWhereRaw('LOWER(excerpt) LIKE ?', ["%{$qLower}%"])
            )
            ->limit(5)
            ->get(['id', 'title', 'slug', 'excerpt'])
            ->map(fn ($item) => array_merge($item->toArray(), ['type' => 'blog_post']));

        $caseStudies = CaseStudy::published()
            ->where(fn ($query) => $query
                ->whereRaw('LOWER(title) LIKE ?', ["%{$qLower}%"])
                ->orWhereRaw('LOWER(challenge) LIKE ?', ["%{$qLower}%"])
            )
            ->limit(5)
            ->get(['id', 'title', 'slug', 'client_name'])
            ->map(fn ($item) => array_merge($item->toArray(), ['type' => 'case_study', 'excerpt' => $item->client_name]));

        $guides = Guide::published()
            ->where(fn ($query) => $query
                ->whereRaw('LOWER(title) LIKE ?', ["%{$qLower}%"])
                ->orWhereRaw('LOWER(excerpt) LIKE ?', ["%{$qLower}%"])
            )
            ->limit(5)
            ->get(['id', 'title', 'slug', 'excerpt'])
            ->map(fn ($item) => array_merge($item->toArray(), ['type' => 'guide']));

        $servicePages = collect([
            ['title' => 'Website Development',        'slug' => 'website-development',    'excerpt' => 'Fast, mobile-first websites and web apps that convert visitors into clients.',                    'type' => 'service_page', 'url' => '/services/website-development'],
            ['title' => 'Custom Websites',            'slug' => 'custom-websites',         'excerpt' => 'Bespoke website design and development tailored to your brand and business goals.',              'type' => 'service_page', 'url' => '/services/website-development/custom-websites'],
            ['title' => 'E-Commerce Websites',        'slug' => 'ecommerce-websites',      'excerpt' => 'Scalable online stores with payment integration, inventory management, and fast checkout.',      'type' => 'service_page', 'url' => '/services/website-development/ecommerce-websites'],
            ['title' => 'App Development',            'slug' => 'app-development',         'excerpt' => 'Web and mobile application development for startups and growing businesses.',                    'type' => 'service_page', 'url' => '/services/website-development/app-development'],
            ['title' => 'Progressive Web Apps',       'slug' => 'progressive-web-apps',    'excerpt' => 'PWAs that deliver app-like performance on any device without the App Store.',                   'type' => 'service_page', 'url' => '/services/website-development/progressive-web-apps'],
            ['title' => 'Salesforce Development',     'slug' => 'salesforce-development',  'excerpt' => 'End-to-end Salesforce implementation, customisation, and integration for SMBs.',               'type' => 'service_page', 'url' => '/services/salesforce-development'],
            ['title' => 'Salesforce CRM',             'slug' => 'crm',                     'excerpt' => 'Custom Salesforce Sales Cloud configuration to match your exact sales process.',                'type' => 'service_page', 'url' => '/services/salesforce-development/crm'],
            ['title' => 'Salesforce Marketing Cloud', 'slug' => 'marketing-cloud',         'excerpt' => 'Automated marketing journeys, email campaigns, and lead scoring in Salesforce.',               'type' => 'service_page', 'url' => '/services/salesforce-development/marketing-cloud'],
            ['title' => 'Salesforce Service Cloud',   'slug' => 'service-cloud',           'excerpt' => 'Customer support ticketing, case management, and SLA automation in Salesforce.',               'type' => 'service_page', 'url' => '/services/salesforce-development/service-cloud'],
            ['title' => 'Salesforce Commerce Cloud',  'slug' => 'commerce-cloud',          'excerpt' => 'B2B and B2C e-commerce built on the Salesforce Commerce platform.',                            'type' => 'service_page', 'url' => '/services/salesforce-development/commerce-cloud'],
            ['title' => 'Salesforce Experience Cloud','slug' => 'experience-cloud',        'excerpt' => 'Customer and partner portals built on Salesforce Experience Cloud.',                           'type' => 'service_page', 'url' => '/services/salesforce-development/experience-cloud'],
            ['title' => 'DevOps Development',         'slug' => 'devops-development',      'excerpt' => 'Cloud infrastructure, CI/CD pipelines, and server monitoring for reliable deployments.',        'type' => 'service_page', 'url' => '/services/devops-development'],
            ['title' => 'Cloud Infrastructure',       'slug' => 'cloud-infrastructure',    'excerpt' => 'AWS, GCP, and DigitalOcean infrastructure design, setup, and cost optimisation.',             'type' => 'service_page', 'url' => '/services/devops-development/cloud-infrastructure'],
            ['title' => 'CI/CD Pipeline',             'slug' => 'ci-cd-pipeline',          'excerpt' => 'Automated build, test, and deployment pipelines to ship faster with confidence.',              'type' => 'service_page', 'url' => '/services/devops-development/ci-cd-pipeline'],
            ['title' => 'Cloud Management',           'slug' => 'cloud-management',        'excerpt' => 'Ongoing cloud infrastructure management, scaling, and cost control.',                          'type' => 'service_page', 'url' => '/services/devops-development/cloud-management'],
            ['title' => 'Server Monitoring',          'slug' => 'server-monitoring',       'excerpt' => 'Uptime monitoring, alerting, and performance dashboards for your production systems.',          'type' => 'service_page', 'url' => '/services/devops-development/server-monitoring'],
            ['title' => 'AI Agent Development',       'slug' => 'ai-agent-development',    'excerpt' => 'Custom AI agents, chatbots, and automation workflows that eliminate repetitive work.',          'type' => 'service_page', 'url' => '/services/ai-agent-development'],
            ['title' => 'AI Agent Integration',       'slug' => 'ai-agent-integration',   'excerpt' => 'Integrate AI agents into your existing tools, CRM, and business workflows.',                   'type' => 'service_page', 'url' => '/services/ai-agent-development/ai-agent-integration'],
            ['title' => 'Custom API Integration',     'slug' => 'custom-api-integration',  'excerpt' => 'Connect your systems with custom API integrations that automate data flows.',                  'type' => 'service_page', 'url' => '/services/ai-agent-development/custom-api-integration'],
            ['title' => 'Business Optimization',      'slug' => 'business-optimization',   'excerpt' => 'Process automation and AI-powered tools that reduce operational overhead.',                    'type' => 'service_page', 'url' => '/services/ai-agent-development/business-optimization'],
            ['title' => 'AI Chatbots',                'slug' => 'ai-chatbots',             'excerpt' => 'Conversational AI chatbots for customer support, lead qualification, and internal helpdesks.',  'type' => 'service_page', 'url' => '/services/ai-agent-development/ai-chatbots'],
            ['title' => 'Software Development',       'slug' => 'software-development',    'excerpt' => 'ERP, CRM, SaaS, and MVP software engineered to your exact business requirements.',             'type' => 'service_page', 'url' => '/services/software-development'],
            ['title' => 'ERP Development',            'slug' => 'erp-development',         'excerpt' => 'Custom ERP systems that replace spreadsheets and legacy software with a unified platform.',    'type' => 'service_page', 'url' => '/services/software-development/erp-development'],
            ['title' => 'CRM Development',            'slug' => 'crm-development',         'excerpt' => 'Custom-built CRM systems tailored to your unique sales process and data requirements.',        'type' => 'service_page', 'url' => '/services/software-development/crm-development'],
            ['title' => 'SaaS Development',           'slug' => 'saas-development',        'excerpt' => 'Multi-tenant SaaS product development from architecture through to launch.',                   'type' => 'service_page', 'url' => '/services/software-development/saas-development'],
            ['title' => 'MVP Development',            'slug' => 'mvp-development',         'excerpt' => 'Lean MVP development for startups and product teams to validate ideas quickly.',               'type' => 'service_page', 'url' => '/services/software-development/mvp-development'],
            ['title' => 'Hire a Developer',           'slug' => 'hire-a-developer',        'excerpt' => 'Dedicated developers and teams on flexible terms, integrated with your workflow.',             'type' => 'service_page', 'url' => '/services/hire-a-developer'],
            ['title' => 'Dedicated Teams',            'slug' => 'dedicated-teams',         'excerpt' => 'Full-stack development teams embedded in your business on a retainer basis.',                  'type' => 'service_page', 'url' => '/services/hire-a-developer/dedicated-teams'],
            ['title' => 'Flexible Engagement',        'slug' => 'flexible-engagement',     'excerpt' => 'Project-based or hourly developer engagement — no long-term commitment required.',            'type' => 'service_page', 'url' => '/services/hire-a-developer/flexible-engagement'],
            ['title' => 'End-to-End Support',         'slug' => 'end-to-end-support',      'excerpt' => 'Full-cycle development support from scoping through to maintenance and iteration.',            'type' => 'service_page', 'url' => '/services/hire-a-developer/end-to-end-support'],
        ])->filter(fn ($page) =>
            str_contains(strtolower($page['title']), $qLower) ||
            str_contains(strtolower($page['excerpt']), $qLower)
        )->values();

        $results = $posts->concat($caseStudies)->concat($guides)->concat($servicePages)->values()->all();

        return response()->json($results);
    }
}
