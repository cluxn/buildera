'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface Tab { label: string; href: string }

const SECTION_TABS: { match: (p: string) => boolean; tabs: Tab[] }[] = [
  {
    match: (p) => p.startsWith('/admin/blog') || p.startsWith('/admin/case-studies') ||
      p.startsWith('/admin/lead-magnets') || p.startsWith('/admin/testimonials') ||
      p.startsWith('/admin/media') || p.startsWith('/admin/client-logos') ||
      p.startsWith('/admin/authors') || p.startsWith('/admin/categories'),
    tabs: [
      { label: 'Blog', href: '/admin/blog' },
      { label: 'Case Studies', href: '/admin/case-studies' },
      { label: 'Guides', href: '/admin/lead-magnets' },
      { label: 'Testimonials', href: '/admin/testimonials' },
      { label: 'Media Library', href: '/admin/media' },
      { label: 'Client Logos', href: '/admin/client-logos' },
      { label: 'Authors', href: '/admin/authors' },
      { label: 'Categories', href: '/admin/categories' },
    ],
  },
  {
    match: (p) => p.startsWith('/admin/leads') || p.startsWith('/admin/meetings'),
    tabs: [
      { label: 'All Leads', href: '/admin/leads' },
      { label: 'Meetings', href: '/admin/meetings' },
      { label: 'Newsletter', href: '/admin/leads/subscribers' },
    ],
  },
  {
    match: (p) => p.startsWith('/admin/marketing'),
    tabs: [
      { label: 'Popups', href: '/admin/marketing/popup' },
      { label: 'Announcement Bar', href: '/admin/marketing/announcement-bar' },
      { label: 'Nudge', href: '/admin/marketing/nudge' },
      { label: 'Banners', href: '/admin/marketing/banner-ad' },
      { label: 'Mini CTAs', href: '/admin/marketing/mini-cta' },
      { label: 'Lead Forms', href: '/admin/marketing/mini-lead-capture-form' },
    ],
  },
  {
    match: (p) => p.startsWith('/admin/seo'),
    tabs: [
      { label: 'Meta & OG', href: '/admin/seo/meta' },
      { label: 'Sitemap', href: '/admin/seo/sitemap' },
      { label: 'Robots.txt', href: '/admin/seo/robots' },
      { label: 'Scripts', href: '/admin/seo/scripts' },
      { label: 'Redirects', href: '/admin/seo/redirects' },
      { label: '404 Log', href: '/admin/seo/404-log' },
    ],
  },
  {
    match: (p) => p.startsWith('/admin/settings'),
    tabs: [
      { label: 'Site Settings', href: '/admin/settings' },
      { label: 'Users', href: '/admin/settings/users' },
    ],
  },
]

export function AdminSectionTabs() {
  const pathname = usePathname()
  const section = SECTION_TABS.find(s => s.match(pathname))
  if (!section) return null

  return (
    <div className="flex gap-0 border-b border-gray-200 bg-white px-6 overflow-x-auto">
      {section.tabs.map(tab => {
        const active = pathname === tab.href || (tab.href !== '/admin/leads' && pathname.startsWith(tab.href))
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
