'use client'

import { useRouter, usePathname } from 'next/navigation'

const TYPES = ['Article', 'Template', 'Checklist', 'Video']

export function ResourceTypeFilterTabs({ activeType }: { activeType: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (type: string) => {
    if (type === 'all') {
      router.push(pathname)
    } else {
      router.push(`${pathname}?resource_type=${encodeURIComponent(type.toLowerCase())}`)
    }
  }

  const normalizedActive = activeType?.toLowerCase()

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {[{ label: 'All Resources', value: 'all' }, ...TYPES.map((t) => ({ label: t, value: t.toLowerCase() }))].map((item) => (
        <button
          key={item.value}
          onClick={() => handleSelect(item.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            (item.value === 'all' && !normalizedActive) || item.value === normalizedActive
              ? 'bg-[var(--brand-primary)] text-white'
              : 'bg-[var(--brand-surface)] text-foreground hover:bg-[var(--brand-primary)]/10'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
