export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function fetchFromApi<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, options);
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

export interface Settings {
  company_name: string
  email: string
  phone: string
  address: string
  calendly_url: string
  whatsapp_number: string
  whatsapp_enabled: boolean
  linkedin_url: string
  instagram_url: string
  twitter_url: string
  footer_tagline: string
  stat_projects: string
  stat_clients: string
  stat_years: string
  stat_satisfaction: string
  // Popup settings
  popup_exit_enabled: boolean
  popup_exit_headline: string
  popup_exit_subtext: string
  popup_exit_cta: string
  popup_idle_enabled: boolean
  popup_idle_headline: string
  popup_idle_subtext: string
  // Nudge banner settings
  nudge_banner_enabled: boolean
  nudge_banner_text: string
  nudge_banner_link: string
  nudge_banner_expires_at: string
}

export const SETTINGS_FALLBACK: Settings = {
  company_name: 'Buildera',
  email: '',
  phone: '',
  address: '',
  calendly_url: '',
  whatsapp_number: '',
  whatsapp_enabled: false,
  linkedin_url: '',
  instagram_url: '',
  twitter_url: '',
  footer_tagline: 'Building technology that grows businesses.',
  stat_projects: '150',
  stat_clients: '50',
  stat_years: '6',
  stat_satisfaction: '98',
  popup_exit_enabled: false,
  popup_exit_headline: '',
  popup_exit_subtext: '',
  popup_exit_cta: '',
  popup_idle_enabled: false,
  popup_idle_headline: '',
  popup_idle_subtext: '',
  nudge_banner_enabled: false,
  nudge_banner_text: '',
  nudge_banner_link: '',
  nudge_banner_expires_at: '',
}

export async function fetchNavItems(): Promise<NavItem[]> {
  return fetchFromApi<NavItem[]>('/api/nav-items', {
    next: { tags: ['nav-items'] },
  } as RequestInit).catch(() => [])
}

export async function fetchFooterLinks(): Promise<FooterLink[]> {
  return fetchFromApi<FooterLink[]>('/api/footer-links', {
    next: { tags: ['footer-links'] },
  } as RequestInit).catch(() => [])
}

export async function fetchSettings(): Promise<Settings> {
  return fetchFromApi<Settings>('/api/settings', {
    next: { tags: ['settings'] },
  } as RequestInit).catch(() => SETTINGS_FALLBACK)
}

import type { TestimonialData, CaseStudyData } from '@/types/service-page'

export async function fetchTestimonials(
  filters: { service?: string; solution?: string; industry?: string } = {}
): Promise<TestimonialData[]> {
  const params = new URLSearchParams()
  if (filters.service) params.set('service', filters.service)
  if (filters.solution) params.set('solution', filters.solution)
  if (filters.industry) params.set('industry', filters.industry)
  const query = params.toString() ? `?${params.toString()}` : ''
  return fetchFromApi<TestimonialData[]>(`/api/testimonials${query}`, {
    next: { tags: ['testimonials'], revalidate: 3600 },
  } as RequestInit).catch(() => [])
}

export async function fetchCaseStudies(
  filters: { service?: string; solution?: string; industry?: string } = {}
): Promise<CaseStudyData[]> {
  const params = new URLSearchParams()
  if (filters.service) params.set('service', filters.service)
  if (filters.solution) params.set('solution', filters.solution)
  if (filters.industry) params.set('industry', filters.industry)
  const query = params.toString() ? `?${params.toString()}` : ''
  return fetchFromApi<CaseStudyData[]>(`/api/case-studies${query}`, {
    next: { tags: ['case-studies'], revalidate: 3600 },
  } as RequestInit).catch(() => [])
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

export async function getBlogPosts(page = 1, category?: string): Promise<BlogListResponse> {
  const params = new URLSearchParams({ page: String(page) })
  if (category) params.set('category', category)
  return fetchFromApi<BlogListResponse>(`/api/blog-posts?${params}`, { next: { tags: ['blog_posts'], revalidate: 3600 } } as RequestInit)
    .catch(() => ({ data: [], current_page: 1, last_page: 1, per_page: 12, total: 0 }))
}
export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  return fetchFromApi<BlogPostDetail>(`/api/blog-posts/${slug}`, { next: { tags: ['blog_posts'], revalidate: 3600 } } as RequestInit)
    .catch(() => null)
}
export async function getBlogCategories(): Promise<BlogCategory[]> {
  return fetchFromApi<BlogCategory[]>('/api/blog-categories', { next: { tags: ['blog_posts'], revalidate: 86400 } } as RequestInit)
    .catch(() => [])
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
}
export type ContentCaseStudyListResponse = { data: ContentCaseStudy[]; current_page: number; last_page: number; per_page: number; total: number }

export type Guide = {
  id: number; title: string; slug: string; category: string;
  description: string; resource_type: string;
  cover_image: string | null; cover_image_alt: string | null; published_at: string;
}
export type GuideDetail = Guide & { body: string; external_link: string | null; seo_title: string | null; seo_description: string | null }
export type GuideListResponse = { data: Guide[]; current_page: number; last_page: number; per_page: number; total: number }

export type Testimonial = {
  id: number; quote: string; client_name: string; job_title: string | null;
  company: string | null; company_logo: string | null;
  star_rating: number; service_category: string | null; industry: string | null; is_featured: boolean;
}

export async function getContentCaseStudies(page = 1, industry?: string): Promise<ContentCaseStudyListResponse> {
  const params = new URLSearchParams({ page: String(page) })
  if (industry) params.set('industry', industry)
  return fetchFromApi<ContentCaseStudyListResponse>(`/api/case-studies?${params}`, { next: { tags: ['case_studies'], revalidate: 3600 } } as RequestInit)
    .catch(() => ({ data: [], current_page: 1, last_page: 1, per_page: 12, total: 0 }))
}
export async function getContentCaseStudy(slug: string): Promise<ContentCaseStudyDetail | null> {
  return fetchFromApi<ContentCaseStudyDetail>(`/api/case-studies/${slug}`, { next: { tags: ['case_studies'], revalidate: 3600 } } as RequestInit)
    .catch(() => null)
}
export async function getGuides(page = 1, category?: string, resourceType?: string): Promise<GuideListResponse> {
  const params = new URLSearchParams({ page: String(page) })
  if (category) params.set('category', category)
  if (resourceType) params.set('resource_type', resourceType)
  return fetchFromApi<GuideListResponse>(`/api/guides?${params}`, { next: { tags: ['guides'], revalidate: 3600 } } as RequestInit)
    .catch(() => ({ data: [], current_page: 1, last_page: 1, per_page: 12, total: 0 }))
}
export async function getGuide(slug: string): Promise<GuideDetail | null> {
  return fetchFromApi<GuideDetail>(`/api/guides/${slug}`, { next: { tags: ['guides'], revalidate: 3600 } } as RequestInit)
    .catch(() => null)
}
export async function getTestimonialsPage(serviceCategory?: string): Promise<Testimonial[]> {
  const params = serviceCategory ? `?service_category=${encodeURIComponent(serviceCategory)}` : ''
  return fetchFromApi<Testimonial[]>(`/api/testimonials${params}`, { next: { tags: ['testimonials'], revalidate: 3600 } } as RequestInit)
    .catch(() => [])
}
