'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, FileText, Briefcase, BookOpen, MessageSquare, Image,
  Building, Users, Tag, Inbox, Mail, CalendarCheck, Megaphone, Search,
  Settings, ChevronRight, ChevronLeft, BarChart2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'admin_sidebar_collapsed'

interface NavSection {
  label: string
  roles: string[]
  items: { label: string; href: string; icon: React.ReactNode; matchPaths?: string[] }[]
}

const sections: NavSection[] = [
  {
    label: 'Dashboard',
    roles: ['SUPER_ADMIN','ADMIN','CONTENT_EDITOR','MARKETING_MANAGER','SEO_MANAGER'],
    items: [{ label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={18} /> }],
  },
  {
    label: 'Content',
    roles: ['SUPER_ADMIN','ADMIN','CONTENT_EDITOR','MARKETING_MANAGER','SEO_MANAGER'],
    items: [
      { label: 'Blog', href: '/admin/blog', icon: <FileText size={18} />, matchPaths: ['/admin/blog'] },
      { label: 'Case Studies', href: '/admin/case-studies', icon: <Briefcase size={18} /> },
      { label: 'Guides', href: '/admin/lead-magnets', icon: <BookOpen size={18} /> },
      { label: 'Testimonials', href: '/admin/testimonials', icon: <MessageSquare size={18} /> },
      { label: 'Media', href: '/admin/media', icon: <Image size={18} /> },
      { label: 'Client Logos', href: '/admin/client-logos', icon: <Building size={18} /> },
      { label: 'Authors', href: '/admin/authors', icon: <Users size={18} /> },
      { label: 'Categories', href: '/admin/categories', icon: <Tag size={18} /> },
    ],
  },
  {
    label: 'Leads',
    roles: ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER'],
    items: [
      { label: 'All Leads', href: '/admin/leads', icon: <Inbox size={18} /> },
      { label: 'Meetings', href: '/admin/meetings', icon: <CalendarCheck size={18} /> },
      { label: 'Newsletter', href: '/admin/leads/subscribers', icon: <Mail size={18} /> },
    ],
  },
  {
    label: 'Marketing',
    roles: ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER'],
    items: [
      { label: 'Popups', href: '/admin/marketing/popup', icon: <Megaphone size={18} /> },
      { label: 'Announcement Bar', href: '/admin/marketing/announcement-bar', icon: <Megaphone size={18} /> },
      { label: 'Nudge', href: '/admin/marketing/nudge', icon: <Megaphone size={18} /> },
      { label: 'Banners', href: '/admin/marketing/banner-ad', icon: <BarChart2 size={18} /> },
      { label: 'Mini CTAs', href: '/admin/marketing/mini-cta', icon: <Megaphone size={18} /> },
      { label: 'Lead Forms', href: '/admin/marketing/mini-lead-capture-form', icon: <Mail size={18} /> },
    ],
  },
  {
    label: 'SEO',
    roles: ['SUPER_ADMIN','ADMIN','SEO_MANAGER'],
    items: [
      { label: 'Meta & OG', href: '/admin/seo/meta', icon: <Search size={18} /> },
      { label: 'Sitemap', href: '/admin/seo/sitemap', icon: <FileText size={18} /> },
      { label: 'Robots.txt', href: '/admin/seo/robots', icon: <FileText size={18} /> },
      { label: 'Scripts', href: '/admin/seo/scripts', icon: <FileText size={18} /> },
      { label: 'Redirects', href: '/admin/seo/redirects', icon: <FileText size={18} /> },
      { label: '404 Log', href: '/admin/seo/404-log', icon: <FileText size={18} /> },
    ],
  },
  {
    label: 'Settings',
    roles: ['SUPER_ADMIN','ADMIN'],
    items: [
      { label: 'Site Settings', href: '/admin/settings', icon: <Settings size={18} /> },
      { label: 'Users', href: '/admin/settings/users', icon: <Users size={18} /> },
    ],
  },
]

interface Props {
  role: string
  unreadLeads: number
}

export function AdminSidebar({ role, unreadLeads }: Props) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') setCollapsed(true)
  }, [])

  function toggle() {
    setCollapsed(c => {
      localStorage.setItem(STORAGE_KEY, String(!c))
      return !c
    })
  }

  function isActive(href: string, matchPaths?: string[]): boolean {
    if (href === '/admin') return pathname === '/admin'
    const paths = matchPaths ? [href, ...matchPaths] : [href]
    return paths.some(p => pathname.startsWith(p))
  }

  const visibleSections = sections.filter(s => s.roles.includes(role))

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-white border-r border-gray-200 h-screen transition-all duration-200',
        collapsed ? 'w-14' : 'w-64',
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 py-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded bg-primary flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">B</span>
        </div>
        {!collapsed && <span className="font-semibold text-gray-900">Buildera Admin</span>}
      </div>

      {/* Toggle */}
      <button
        onClick={toggle}
        className="absolute -right-3 top-[52px] z-10 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
        {visibleSections.map(section => (
          <div key={section.label}>
            {!collapsed && (
              <p className="px-2 pb-1 pt-3 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                {section.label}
              </p>
            )}
            {section.items.map(item => {
              const active = isActive(item.href, item.matchPaths)
              const isLeads = item.label === 'All Leads'
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors relative',
                    active
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {isLeads && unreadLeads > 0 && (
                    <span className={cn(
                      'flex-shrink-0 text-xs font-semibold text-white bg-red-500 rounded-full px-1.5 py-0.5 leading-none',
                      collapsed ? 'absolute -top-1 -right-1' : 'ml-auto',
                    )}>
                      {unreadLeads > 99 ? '99+' : unreadLeads}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>
    </aside>
  )
}
