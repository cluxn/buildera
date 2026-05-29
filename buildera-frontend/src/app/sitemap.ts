import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

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
  '/privacy',
  '/terms',
  '/blog',
  '/case-studies',
  '/guides',
  '/search',
  ...SERVICE_PATHS,
  ...SOLUTION_PATHS,
  ...INDUSTRY_PATHS,
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : (path.startsWith('/services/') && path.split('/').length === 4 ? 'monthly' : 'monthly') as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority: path === '/' ? 1.0 : path.startsWith('/services/') && path.split('/').length === 4 ? 0.9 : 0.8,
  }))

  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${API_URL}/api/blog-posts?per_page=200`, {
      next: { tags: ['blog_posts'], revalidate: 3600 },
    })
    const data = await res.json() as { data?: Array<{ slug: string; updated_at?: string }> }
    blogEntries = (data.data ?? []).map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch { /* fail gracefully */ }

  let caseStudyEntries: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${API_URL}/api/case-studies?per_page=200`, {
      next: { tags: ['case_studies'], revalidate: 3600 },
    })
    const data = await res.json() as { data?: Array<{ slug: string; updated_at?: string }> }
    caseStudyEntries = (data.data ?? []).map((cs) => ({
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      lastModified: cs.updated_at ? new Date(cs.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {}

  let guideEntries: MetadataRoute.Sitemap = []
  try {
    const res = await fetch(`${API_URL}/api/guides?per_page=200`, {
      next: { tags: ['guides'], revalidate: 3600 },
    })
    const data = await res.json() as { data?: Array<{ slug: string; updated_at?: string }> }
    guideEntries = (data.data ?? []).map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      lastModified: g.updated_at ? new Date(g.updated_at) : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  } catch {}

  return [...staticEntries, ...blogEntries, ...caseStudyEntries, ...guideEntries]
}
