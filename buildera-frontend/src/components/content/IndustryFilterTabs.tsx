'use client'

import { useRouter, usePathname } from 'next/navigation'

const INDUSTRIES = [
  'Manufacturing',
  'Retail / E-Commerce',
  'Hospitality',
  'Logistics',
  'Finance',
  'Healthcare',
  'Real Estate',
  'Professional Services',
]

export function IndustryFilterTabs({ activeIndustry }: { activeIndustry: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (industry: string) => {
    if (industry === 'all') {
      router.push(pathname)
    } else {
      router.push(`${pathname}?industry=${encodeURIComponent(industry)}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {[{ label: 'All Industries', value: 'all' }, ...INDUSTRIES.map((i) => ({ label: i, value: i }))].map((item) => (
        <button
          key={item.value}
          onClick={() => handleSelect(item.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            (item.value === 'all' && !activeIndustry) || item.value === activeIndustry
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
