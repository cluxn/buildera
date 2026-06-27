import type { MetadataRoute } from 'next'
import { listPublicBlogPosts } from '@/db/admin/blog'
import { listPublicCaseStudies } from '@/db/admin/case-studies'
import { listPublicLeadMagnets } from '@/db/admin/lead-magnets'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'

const SERVICE_PATHS: string[] = [
  '/services/website-development/custom-websites',
  '/services/website-development/ecommerce-websites',
  '/services/website-development/app-development',
  '/services/website-development/progressive-web-apps',
  '/services/salesforce-development/crm',
  '/services/salesforce-development/marketing-cloud',
  '/services/salesforce-development/service-cloud',
  '/services/salesforce-development/commerce-cloud',
  '/services/salesforce-development/experience-cloud',
  '/services/devops-development/cloud-infrastructure',
  '/services/devops-development/ci-cd-pipeline',
  '/services/devops-development/cloud-management',
  '/services/devops-development/server-monitoring',
  '/services/ai-agent-development/ai-agent-integration',
  '/services/ai-agent-development/custom-api-integration',
  '/services/ai-agent-development/business-optimization',
  '/services/ai-agent-development/ai-chatbots',
  '/services/software-development/erp-development',
  '/services/software-development/crm-development',
  '/services/software-development/saas-development',
  '/services/software-development/mvp-development',
  '/services/hire-a-developer/dedicated-teams',
  '/services/hire-a-developer/flexible-engagement',
  '/services/hire-a-developer/end-to-end-support',
]

const SOLUTION_PATHS: string[] = [
  '/solutions/operations-management',
  '/solutions/vendor-management',
  '/solutions/ota-channel-partner',
  '/solutions/supply-chain',
  '/solutions/project-management',
  '/solutions/accounting-management',
  '/solutions/warehouse-management',
  '/solutions/hotels-and-resorts',
  '/solutions/financial-management',
  '/solutions/fleet-management',
  '/solutions/airbnb-vacation-rental',
  '/solutions/hr-management',
  '/solutions/lead-management',
  '/solutions/sales-management',
  '/solutions/crm',
  '/solutions/india-mart-automation',
  '/solutions/erp',
  '/solutions/manufacturing-production',
  '/solutions/inventory-management',
  '/solutions/liquor-shop-management',
]

const INDUSTRY_PATHS: string[] = [
  '/industries/manufacturing',
  '/industries/retail',
  '/industries/travel-hospitality',
  '/industries/fintech',
  '/industries/healthcare',
  '/industries/hr-tech',
  '/industries/ed-tech',
  '/industries/legal-tech',
  '/industries/cleantech',
  '/industries/insur-tech',
  '/industries/software-hi-tech',
]

const STATIC_PATHS: string[] = [
  '/',
  '/services',
  '/services/website-development',
  '/services/salesforce-development',
  '/services/devops-development',
  '/services/ai-agent-development',
  '/services/software-development',
  '/services/hire-a-developer',
  '/solutions',
  '/industries',
  '/about',
  '/contact',
  '/how-we-work',
  '/book-a-call',
  '/testimonials',
  '/blog',
  '/case-studies',
  '/guides',
  '/privacy',
  '/terms',
  ...SERVICE_PATHS,
  ...SOLUTION_PATHS,
  ...INDUSTRY_PATHS,
]

function getStaticPriority(path: string): number {
  if (path === '/') return 1.0
  if (path === '/book-a-call' || path === '/contact') return 0.9
  if (path.startsWith('/services/') && path.split('/').length === 4) return 0.9
  if (path.startsWith('/services/') && path.split('/').length === 3) return 0.85
  if (path === '/services') return 0.85
  if (path.startsWith('/solutions/') && path.split('/').length === 3) return 0.8
  if (path.startsWith('/industries/') && path.split('/').length === 3) return 0.75
  if (path === '/solutions' || path === '/industries') return 0.8
  if (path === '/about' || path === '/how-we-work') return 0.7
  if (path === '/blog' || path === '/case-studies' || path === '/guides') return 0.65
  if (path === '/faq' || path === '/testimonials') return 0.6
  if (path === '/privacy' || path === '/terms') return 0.3
  return 0.7
}

function getChangeFrequency(path: string): MetadataRoute.Sitemap[number]['changeFrequency'] {
  if (path === '/') return 'weekly'
  if (path === '/blog' || path === '/case-studies' || path === '/guides') return 'weekly'
  if (path.startsWith('/services/') || path.startsWith('/solutions/') || path.startsWith('/industries/')) return 'monthly'
  return 'monthly'
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(path),
    priority: getStaticPriority(path),
  }))

  const [blogResult, csResult, guidesResult] = await Promise.all([
    listPublicBlogPosts(1, 200).catch(() => ({ data: [] as Array<{ slug: string; updated_at?: string }> })),
    listPublicCaseStudies(1, 200).catch(() => ({ rows: [] as Array<{ slug: string; updated_at?: string }> })),
    listPublicLeadMagnets(1, 200).catch(() => ({ rows: [] as Array<{ slug: string; updated_at?: string }> })),
  ])

  const blogEntries: MetadataRoute.Sitemap = (blogResult.data ?? []).map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const caseStudyEntries: MetadataRoute.Sitemap = (csResult.rows ?? []).map((c) => ({
    url: `${SITE_URL}/case-studies/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const guideEntries: MetadataRoute.Sitemap = (guidesResult.rows ?? []).map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: g.updated_at ? new Date(g.updated_at) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...blogEntries, ...caseStudyEntries, ...guideEntries]
}
