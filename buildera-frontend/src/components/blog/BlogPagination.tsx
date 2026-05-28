'use client'

import { useRouter } from 'next/navigation'

interface Props {
  currentPage: number
  lastPage: number
  baseUrl: string
  category?: string
}

export function BlogPagination({ currentPage, lastPage, baseUrl, category }: Props) {
  const router = useRouter()

  if (lastPage <= 1) return null

  const go = (page: number) => {
    const params = new URLSearchParams()
    if (page > 1) params.set('page', String(page))
    if (category) params.set('category', category)
    const qs = params.toString()
    router.push(qs ? `${baseUrl}?${qs}` : baseUrl)
  }

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 rounded-full flex items-center justify-center border border-border hover:bg-[var(--brand-surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
      >
        ‹
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
            p === currentPage
              ? 'bg-[var(--brand-primary)] text-white'
              : 'border border-border hover:bg-[var(--brand-surface)]'
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="w-8 h-8 rounded-full flex items-center justify-center border border-border hover:bg-[var(--brand-surface)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
      >
        ›
      </button>
    </div>
  )
}
