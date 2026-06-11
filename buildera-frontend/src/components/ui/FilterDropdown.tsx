'use client'

import { useRouter, usePathname } from 'next/navigation'
import { IconChevronDown } from '@tabler/icons-react'

export type FilterDropdownItem = { label: string; value: string }

export function FilterDropdown({
  items,
  activeValue,
  paramName,
  ariaLabel,
}: {
  items: FilterDropdownItem[]
  activeValue: string
  paramName: string
  ariaLabel: string
}) {
  const router = useRouter()
  const pathname = usePathname()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    if (value === 'all') router.push(pathname)
    else router.push(`${pathname}?${paramName}=${encodeURIComponent(value)}`)
  }

  return (
    <div className="relative inline-block">
      <select
        value={activeValue || 'all'}
        onChange={handleChange}
        aria-label={ariaLabel}
        className="appearance-none pl-4 pr-10 py-2.5 text-sm font-medium rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40 focus:border-[var(--brand-primary)] transition-colors cursor-pointer"
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
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
