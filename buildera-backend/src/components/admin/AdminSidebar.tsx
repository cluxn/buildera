'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard, FileText, Users, Megaphone, Search,
  Settings, ChevronRight, ChevronLeft,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'admin_sidebar_collapsed'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  roles: string[]
  matchPaths: string[]
  badge?: boolean
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard size={18} />,
    roles: ['SUPER_ADMIN','ADMIN','CONTENT_EDITOR','MARKETING_MANAGER','SEO_MANAGER'],
    matchPaths: ['/admin'],
  },
  {
    label: 'Content',
    href: '/admin/blog',
    icon: <FileText size={18} />,
    roles: ['SUPER_ADMIN','ADMIN','CONTENT_EDITOR','MARKETING_MANAGER','SEO_MANAGER'],
    matchPaths: ['/admin/blog','/admin/case-studies','/admin/lead-magnets','/admin/testimonials','/admin/media','/admin/client-logos','/admin/authors','/admin/categories'],
  },
  {
    label: 'Leads',
    href: '/admin/leads',
    icon: <Users size={18} />,
    roles: ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER'],
    matchPaths: ['/admin/leads','/admin/meetings'],
    badge: true,
  },
  {
    label: 'Marketing',
    href: '/admin/marketing/popup',
    icon: <Megaphone size={18} />,
    roles: ['SUPER_ADMIN','ADMIN','MARKETING_MANAGER'],
    matchPaths: ['/admin/marketing'],
  },
  {
    label: 'SEO',
    href: '/admin/seo/meta',
    icon: <Search size={18} />,
    roles: ['SUPER_ADMIN','ADMIN','SEO_MANAGER'],
    matchPaths: ['/admin/seo'],
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: <Settings size={18} />,
    roles: ['SUPER_ADMIN','ADMIN'],
    matchPaths: ['/admin/settings'],
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

  function isActive(item: NavItem): boolean {
    if (item.href === '/admin') return pathname === '/admin'
    return item.matchPaths.some(p => pathname.startsWith(p))
  }

  const visibleItems = navItems.filter(item => item.roles.includes(role))

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
        {visibleItems.map(item => {
          const active = isActive(item)
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
              {item.badge && unreadLeads > 0 && (
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
      </nav>
    </aside>
  )
}
