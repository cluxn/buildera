'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { IconChevronDown } from '@tabler/icons-react'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'popular', label: 'Most Popular' },
]

export function SortDropdown() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value
    const params = new URLSearchParams(searchParams.toString())
    if (sort && sort !== 'newest') params.set('sort', sort)
    else params.delete('sort')
    params.delete('page')
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <div className="relative">
      <select
        value={searchParams.get('sort') ?? 'newest'}
        onChange={handleChange}
        aria-label="Sort by"
        className="appearance-none pl-4 pr-9 py-2.5 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40 focus:border-[var(--brand-primary)] transition-colors cursor-pointer"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <IconChevronDown
        className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
