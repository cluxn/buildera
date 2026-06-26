// Single source of truth for admin permissions.
// Role column stores: 'SUPER_ADMIN' | 'ADMIN' | comma-separated permission keys
// e.g. "blog,case_studies,seo"

export const ADMIN_ONLY_ROLES = ['SUPER_ADMIN', 'ADMIN'] as const

export const PERMISSION_GROUPS: { label: string; keys: { key: string; label: string }[] }[] = [
  {
    label: 'Content',
    keys: [
      { key: 'blog',         label: 'Blog Posts' },
      { key: 'case_studies', label: 'Case Studies' },
      { key: 'lead_magnets', label: 'Guides / Lead Magnets' },
      { key: 'testimonials', label: 'Testimonials' },
      { key: 'media',        label: 'Media Library' },
      { key: 'client_logos', label: 'Client Logos' },
      { key: 'authors',      label: 'Authors' },
      { key: 'categories',   label: 'Categories' },
    ],
  },
  {
    label: 'Sections',
    keys: [
      { key: 'leads',     label: 'Leads & Subscribers' },
      { key: 'marketing', label: 'Marketing Tools' },
      { key: 'seo',       label: 'SEO Tools' },
      { key: 'settings',  label: 'Settings' },
    ],
  },
]

export const ALL_PERMISSION_KEYS = PERMISSION_GROUPS.flatMap(g => g.keys.map(k => k.key))

// All valid values that can be stored in the role column
export const ALLOWED_ROLE_VALUES = [...ADMIN_ONLY_ROLES, ...ALL_PERMISSION_KEYS]

export interface UserAccess {
  isSuperAdmin: boolean
  isAdmin: boolean
  permissions: string[]
}

export function parseUserAccess(role: string): UserAccess {
  const parts = role.split(',').map(r => r.trim()).filter(Boolean)
  const isSuperAdmin = parts.includes('SUPER_ADMIN')
  const isAdmin = isSuperAdmin || parts.includes('ADMIN')
  const permissions = parts.filter(p => ALL_PERMISSION_KEYS.includes(p))
  return { isSuperAdmin, isAdmin, permissions }
}

export function hasAccess(role: string, permission: string): boolean {
  const { isAdmin, permissions } = parseUserAccess(role)
  return isAdmin || permissions.includes(permission)
}
