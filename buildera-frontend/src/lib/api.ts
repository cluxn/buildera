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
