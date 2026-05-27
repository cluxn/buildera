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
