'use client'

import { useRouter, usePathname } from 'next/navigation'

const SERVICE_CATEGORIES = [
  'Website Development',
  'Salesforce Development',
  'DevOps Development',
  'AI Agent Development',
  'Software Development',
  'Hire a Developer',
]

export function ServiceCategoryFilterTabs({ activeCategory }: { activeCategory: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (cat: string) => {
    if (cat === 'all') {
      router.push(pathname)
    } else {
      router.push(`${pathname}?service_category=${encodeURIComponent(cat)}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {[{ label: 'All Services', value: 'all' }, ...SERVICE_CATEGORIES.map((s) => ({ label: s, value: s }))].map((item) => (
        <button
          key={item.value}
          onClick={() => handleSelect(item.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            (item.value === 'all' && !activeCategory) || item.value === activeCategory
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
