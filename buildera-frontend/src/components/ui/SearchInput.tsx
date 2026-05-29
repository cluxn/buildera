'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { IconSearch, IconX } from '@tabler/icons-react'

interface Props {
  placeholder?: string
}

export function SearchInput({ placeholder = 'Search...' }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState(searchParams.get('q') ?? '')

  const updateSearch = useCallback(
    (q: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (q) {
        params.set('q', q)
        params.delete('page')
      } else {
        params.delete('q')
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`)
      })
    },
    [pathname, router, searchParams],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setValue(v)
    const timer = setTimeout(() => updateSearch(v), 400)
    return () => clearTimeout(timer)
  }

  const handleClear = () => {
    setValue('')
    updateSearch('')
  }

  return (
    <div className="relative w-full max-w-sm">
      <IconSearch
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full pl-9 pr-9 py-2.5 text-sm rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/40 focus:border-[var(--brand-primary)] transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <IconX className="w-4 h-4" />
        </button>
      )}
      {isPending && (
        <span className="absolute right-9 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[var(--brand-primary)] border-t-transparent animate-spin" aria-hidden="true" />
      )}
    </div>
  )
}
