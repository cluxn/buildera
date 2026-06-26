'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { parseUserAccess } from '@/lib/admin-permissions'

interface Tab { label: string; href: string; permission?: string }

const SECTION_TABS: { match: (p: string) => boolean; tabs: Tab[] }[] = [
  {
    match: (p) => p.startsWith('/admin/blog') || p.startsWith('/admin/case-studies') ||
      p.startsWith('/admin/lead-magnets') || p.startsWith('/admin/testimonials') ||
      p.startsWith('/admin/media') || p.startsWith('/admin/client-logos') ||
      p.startsWith('/admin/authors') || p.startsWith('/admin/categories'),
    tabs: [
      { label: 'Blog',          href: '/admin/blog',          permission: 'blog' },
      { label: 'Case Studies',  href: '/admin/case-studies',  permission: 'case_studies' },
      { label: 'Guides',        href: '/admin/lead-magnets',  permission: 'lead_magnets' },
      { label: 'Testimonials',  href: '/admin/testimonials',  permission: 'testimonials' },
      { label: 'Media Library', href: '/admin/media',         permission: 'media' },
      { label: 'Client Logos',  href: '/admin/client-logos',  permission: 'client_logos' },
      { label: 'Authors',       href: '/admin/authors',       permission: 'authors' },
      { label: 'Categories',    href: '/admin/categories',    permission: 'categories' },
    ],
  },
  {
    match: (p) => p.startsWith('/admin/leads'),
    tabs: [
      { label: 'All Leads',   href: '/admin/leads' },
      { label: 'Newsletter',  href: '/admin/leads/subscribers' },
    ],
  },
  {
    match: (p) => p.startsWith('/admin/marketing'),
    tabs: [
      { label: 'Popups',            href: '/admin/marketing/popup' },
      { label: 'Announcement Bar',  href: '/admin/marketing/announcement-bar' },
      { label: 'Nudge',             href: '/admin/marketing/nudge' },
      { label: 'Banners',           href: '/admin/marketing/banner-ad' },
      { label: 'Mini CTAs',         href: '/admin/marketing/mini-cta' },
      { label: 'Lead Forms',        href: '/admin/marketing/mini-lead-capture-form' },
    ],
  },
  {
    match: (p) => p.startsWith('/admin/seo'),
    tabs: [
      { label: 'Meta & OG',  href: '/admin/seo/meta' },
      { label: 'Sitemap',    href: '/admin/seo/sitemap' },
      { label: 'Robots.txt', href: '/admin/seo/robots' },
      { label: 'Scripts',    href: '/admin/seo/scripts' },
      { label: 'Redirects',  href: '/admin/seo/redirects' },
      { label: '404 Log',    href: '/admin/seo/404-log' },
    ],
  },
  {
    match: (p) => p.startsWith('/admin/settings'),
    tabs: [
      { label: 'Site Settings', href: '/admin/settings' },
      { label: 'Users',         href: '/admin/settings/users' },
    ],
  },
]

interface Props { userRole: string }

export function AdminSectionTabs({ userRole }: Props) {
  const pathname = usePathname()
  const { isAdmin, permissions } = parseUserAccess(userRole)
  const section = SECTION_TABS.find(s => s.match(pathname))
  if (!section) return null

  const visibleTabs = section.tabs.filter(tab => {
    if (!tab.permission) return true
    if (isAdmin) return true
    return permissions.includes(tab.permission)
  })

  if (visibleTabs.length === 0) return null

  return (
    <div className="flex gap-0 border-b border-gray-200 bg-white px-6 overflow-x-auto">
      {visibleTabs.map(tab => {
        const moreSpecificMatch = visibleTabs.some(
          t => t.href !== tab.href && pathname.startsWith(t.href) && t.href.length > tab.href.length
        )
        const active = pathname === tab.href || (!moreSpecificMatch && pathname.startsWith(tab.href))
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors',
              active
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300',
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
