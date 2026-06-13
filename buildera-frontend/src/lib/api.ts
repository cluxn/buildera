import 'server-only'
import { getAllSettings } from '@/db/admin/settings'
import { query } from '@/db/pool'
import { getSeoMeta } from '@/db/admin/seo'
import { listPublicTestimonials } from '@/db/admin/testimonials'
import {
  listPublicCaseStudies,
  getCaseStudyBySlug,
  toContentCaseStudy,
  toContentCaseStudyDetail,
} from '@/db/admin/case-studies'
import {
  listPublicBlogPosts,
  getBlogPostBySlug as dbGetBlogPostBySlug,
} from '@/db/admin/blog'
import { listCategories } from '@/db/admin/categories'
import {
  listPublicLeadMagnets,
  getLeadMagnetBySlug,
  toGuide,
  toGuideDetail,
} from '@/db/admin/lead-magnets'
import type { CaseStudyData } from '@/types/service-page'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// fetchFromApi kept for client-side use (search widget) — requires an absolute base URL
export async function fetchFromApi<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL ?? ''
  const res = await fetch(`${base}${path}`, options);
  if (!res.ok) {
    throw new ApiError(res.status, `API request failed: ${path}`);
  }
  try {
    return await res.json() as T;
  } catch {
    throw new ApiError(res.status, `Invalid JSON from: ${path}`);
  }
}

export interface NavItem {
  id: number
  label: string
  url: string
  group: 'solutions' | 'work' | 'resources'
  display_order: number
}

export interface FooterLink {
  id: number
  label: string
  url: string
  column: 'services' | 'solutions' | 'company' | 'resources'
  display_order: number
}

export type { Settings } from '@/lib/settings-fallback'
export { SETTINGS_FALLBACK } from '@/lib/settings-fallback'
import type { Settings } from '@/lib/settings-fallback'
import { SETTINGS_FALLBACK } from '@/lib/settings-fallback'

export interface SeoMeta {
  page_type: string
  page_slug: string | null
  title: string | null
  description: string | null
  og_image: string | null
  canonical_url: string | null
  robots: string | null
  schema_json: Record<string, unknown> | null
}

function seoPath(type: string, slug: string): string {
  switch (type) {
    case 'homepage': return '/'
    case 'industry': return `/industries/${slug}`
    case 'service': return `/services/${slug}`
    case 'solution': return `/solutions/${slug}`
    case 'blog_post': return `/blog/${slug}`
    case 'guide': return `/guides/${slug}`
    case 'case_study': return `/case-studies/${slug}`
    default: return `/${slug}`
  }
}

export async function fetchSeoMeta(type: string, slug: string): Promise<SeoMeta | null> {
  const row = await getSeoMeta(seoPath(type, slug)).catch(() => null)
  if (!row) return null
  return {
    page_type: type,
    page_slug: slug,
    title: row.meta_title,
    description: row.meta_description,
    og_image: row.og_image,
    canonical_url: row.canonical_url,
    robots: row.noindex ? 'noindex,nofollow' : 'index,follow',
    schema_json: null,
  }
}

export async function fetchNavItems(): Promise<NavItem[]> {
  return query<NavItem>(
    'SELECT id, label, url, `group`, display_order FROM nav_items WHERE is_active = 1 ORDER BY display_order ASC'
  ).catch(() => [])
}

export async function fetchFooterLinks(): Promise<FooterLink[]> {
  return query<FooterLink>(
    'SELECT id, label, url, `column`, display_order FROM footer_links WHERE is_active = 1 ORDER BY display_order ASC'
  ).catch(() => [])
}

export async function fetchSettings(): Promise<Settings> {
  const raw = await getAllSettings().catch(() => ({} as Record<string, string>))
  const bool = (key: string) => raw[key] === '1' || raw[key] === 'true'
  return {
    company_name: raw.company_name || SETTINGS_FALLBACK.company_name,
    company_email: raw.company_email || '',
    company_phone: raw.company_phone || '',
    company_address: raw.company_address || '',
    calendly_url: raw.calendly_url || '',
    whatsapp_number: raw.whatsapp_number || '',
    whatsapp_enabled: bool('whatsapp_enabled'),
    linkedin_url: raw.linkedin_url || '',
    instagram_url: raw.instagram_url || '',
    twitter_url: raw.twitter_url || '',
    footer_tagline: raw.footer_tagline || SETTINGS_FALLBACK.footer_tagline,
    stat_projects: raw.stat_projects || SETTINGS_FALLBACK.stat_projects,
    stat_clients: raw.stat_clients || SETTINGS_FALLBACK.stat_clients,
    stat_years: raw.stat_years || SETTINGS_FALLBACK.stat_years,
    stat_satisfaction: raw.stat_satisfaction || SETTINGS_FALLBACK.stat_satisfaction,
    default_seo_title: raw.default_seo_title || SETTINGS_FALLBACK.default_seo_title,
    default_seo_description: raw.default_seo_description || SETTINGS_FALLBACK.default_seo_description,
    og_image: raw.og_image || '',
    popup_exit_enabled: bool('popup_exit_enabled'),
    popup_exit_headline: raw.popup_exit_headline || '',
    popup_exit_subtext: raw.popup_exit_subtext || '',
    popup_exit_cta: raw.popup_exit_cta || '',
    popup_idle_enabled: bool('popup_idle_enabled'),
    popup_idle_headline: raw.popup_idle_headline || '',
    popup_idle_subtext: raw.popup_idle_subtext || '',
    nudge_banner_enabled: bool('nudge_banner_enabled'),
    nudge_banner_text: raw.nudge_banner_text || '',
    nudge_banner_link: raw.nudge_banner_link || '',
    nudge_banner_expires_at: raw.nudge_banner_expires_at || '',
    ga4_measurement_id: raw.ga4_measurement_id || '',
    clarity_project_id: raw.clarity_project_id || '',
    facebook_pixel_id: raw.facebook_pixel_id || '',
    linkedin_insight_id: raw.linkedin_insight_id || '',
    google_ads_conversion_id: raw.google_ads_conversion_id || '',
    gsc_verification_tag: raw.gsc_verification_tag || '',
    custom_head_scripts: raw.custom_head_scripts || '',
    custom_body_scripts: raw.custom_body_scripts || '',
  }
}

export type Testimonial = {
  id: number; quote: string; person_name: string; person_title: string | null;
  company: string | null; logo_url: string | null;
  rating: number; service_category: string | null; industry: string | null; featured: number;
}

export async function fetchTestimonials(
  filters: { service?: string; solution?: string; industry?: string } = {}
): Promise<Testimonial[]> {
  return listPublicTestimonials(filters.service, filters.industry).catch(() => [])
}

export async function fetchCaseStudies(
  filters: { service?: string; solution?: string; industry?: string } = {}
): Promise<CaseStudyData[]> {
  const { rows } = await listPublicCaseStudies(1, 50, filters.industry).catch(() => ({ rows: [], total: 0 }))
  return rows.map(c => ({
    id: c.id,
    title: c.title,
    slug: c.slug,
    client_name: c.client_name ?? '',
    industry: c.industry ?? '',
    challenge: c.challenge ?? '',
    solution: c.solution ?? '',
    results: c.outcome ?? '',
  }))
}

// ─── Blog Types ───────────────────────────────────────────────────────────────

export type BlogPost = {
  id: number; title: string; slug: string; excerpt: string;
  category: string; tags: string[]; image_path: string | null; image_alt: string | null;
  reading_time: number; published_at: string;
  author: { name: string; avatar: string | null } | null;
}
export type BlogPostDetail = BlogPost & {
  body: string; seo_title: string | null; seo_description: string | null;
  author: { name: string; bio: string | null; role: string | null; linkedin_url: string | null; avatar: string | null } | null;
}
export type BlogListResponse = {
  data: BlogPost[]; current_page: number; last_page: number; per_page: number; total: number;
}
export type BlogCategory = { id: number; name: string; slug: string }

function mapBlogPost(p: Record<string, unknown>): BlogPost {
  return {
    id: p.id as number,
    title: p.title as string,
    slug: p.slug as string,
    excerpt: (p.excerpt as string) ?? '',
    category: (p.category as string) ?? '',
    tags: [],
    image_path: (p.cover_image as string | null) ?? null,
    image_alt: (p.cover_image_alt as string | null) ?? null,
    reading_time: 5,
    published_at: (p.published_at as string) ?? '',
    author: p.author_name ? { name: p.author_name as string, avatar: null } : null,
  }
}

export async function getBlogPosts(page = 1, category?: string, q?: string, sort?: string): Promise<BlogListResponse> {
  const result = await listPublicBlogPosts(page, 12, category, q, sort)
    .catch(() => ({ data: [], current_page: 1, last_page: 1, per_page: 12, total: 0 }))
  return {
    ...result,
    data: result.data.map(p => mapBlogPost(p as unknown as Record<string, unknown>)),
  }
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  const post = await dbGetBlogPostBySlug(slug).catch(() => null)
  if (!post) return null
  const p = post as unknown as Record<string, unknown>
  const bodyText = (p.content as string) ?? ''
  const wordCount = bodyText.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length
  return {
    ...mapBlogPost(p),
    reading_time: Math.max(1, Math.ceil(wordCount / 200)),
    body: bodyText,
    seo_title: (p.meta_title as string | null) ?? null,
    seo_description: (p.meta_description as string | null) ?? null,
    author: p.author_name
      ? { name: p.author_name as string, bio: null, role: null, linkedin_url: null, avatar: null }
      : null,
  }
}

export async function getBlogCategories(): Promise<BlogCategory[]> {
  return listCategories().catch(() => [])
}

// ─── Content Types ────────────────────────────────────────────────────────────

export type ContentCaseStudy = {
  id: number; title: string; slug: string; client_name: string | null;
  industry: string; hero_image: string | null; hero_image_alt: string | null;
  key_metrics: { label: string; value: string }[]; published_at: string;
}
export type ContentCaseStudyDetail = ContentCaseStudy & {
  problem: string; solution: string; results: string;
  testimonial_quote: string | null; testimonial_author: string | null;
  seo_title: string | null; seo_description: string | null;
  client_about: string | null;
  tech_stack: string | null;
  timeline: string | null;
  country: string | null;
}
export type ContentCaseStudyListResponse = { data: ContentCaseStudy[]; current_page: number; last_page: number; per_page: number; total: number }

export type Guide = {
  id: number; title: string; slug: string; category: string;
  description: string; resource_type: string;
  cover_image: string | null; cover_image_alt: string | null; published_at: string;
}
export type GuideDetail = Guide & { body: string; external_link: string | null; seo_title: string | null; seo_description: string | null }
export type GuideListResponse = { data: Guide[]; current_page: number; last_page: number; per_page: number; total: number }

export async function getContentCaseStudies(page = 1, industry?: string, q?: string, sort?: string): Promise<ContentCaseStudyListResponse> {
  const perPage = 12
  const { rows, total } = await listPublicCaseStudies(page, perPage, industry, q, sort)
    .catch(() => ({ rows: [], total: 0 }))
  return {
    data: rows.map(toContentCaseStudy),
    current_page: page,
    last_page: Math.max(1, Math.ceil(total / perPage)),
    per_page: perPage,
    total,
  }
}

export async function getContentCaseStudy(slug: string): Promise<ContentCaseStudyDetail | null> {
  const study = await getCaseStudyBySlug(slug).catch(() => null)
  if (!study) return null
  const base = toContentCaseStudyDetail(study)
  return {
    ...base,
    client_about: null,
    tech_stack: null,
    timeline: null,
    country: null,
  }
}

export async function getGuides(page = 1, category?: string, resourceType?: string, q?: string, sort?: string): Promise<GuideListResponse> {
  const perPage = 12
  const { rows, total } = await listPublicLeadMagnets(page, perPage, category, resourceType, q, sort)
    .catch(() => ({ rows: [], total: 0 }))
  return {
    data: rows.map(toGuide),
    current_page: page,
    last_page: Math.max(1, Math.ceil(total / perPage)),
    per_page: perPage,
    total,
  }
}

export async function getGuide(slug: string): Promise<GuideDetail | null> {
  const guide = await getLeadMagnetBySlug(slug).catch(() => null)
  if (!guide) return null
  return toGuideDetail(guide)
}

export interface SearchResult {
  id?: number
  title: string
  slug: string
  excerpt?: string
  url?: string
  type: 'blog_post' | 'case_study' | 'guide' | 'service_page'
}

// fetchSearchResults is client-side only (search widget) — keeps HTTP path
export async function fetchSearchResults(searchQuery: string): Promise<SearchResult[]> {
  if (searchQuery.length < 2) return []
  return fetchFromApi<SearchResult[]>(`/api/search?q=${encodeURIComponent(searchQuery)}`)
    .catch(() => [])
}

export async function getTestimonialsPage(serviceCategory?: string): Promise<Testimonial[]> {
  return listPublicTestimonials(serviceCategory, undefined).catch(() => [])
}
