'use client'

import { useRouter } from 'next/navigation'
import { LogOut, User } from 'lucide-react'

interface Props {
  email: string
  role: string
}

const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  CONTENT_EDITOR: 'Content Editor',
  MARKETING_MANAGER: 'Marketing',
  SEO_MANAGER: 'SEO Manager',
}

export function AdminHeader({ email, role }: Props) {
  const router = useRouter()

  async function handleLogout() {
    const res = await fetch('/api/admin/logout', { method: 'POST' })
    if (!res.ok) return
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="flex items-center justify-end gap-4 px-6 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <User size={16} className="text-gray-400" />
        <span>{email}</span>
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#EEF1FF] text-[#002BFF]">
          {ROLE_LABELS[role] ?? role}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors"
      >
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </header>
  )
}
