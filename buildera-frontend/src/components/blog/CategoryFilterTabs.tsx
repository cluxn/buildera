'use client'

import { useRouter, usePathname } from 'next/navigation'
import type { BlogCategory } from '@/lib/api'

export function CategoryFilterTabs({ categories, activeCategory }: { categories: BlogCategory[]; activeCategory: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const handleSelect = (slug: string) => {
    if (slug === 'all') {
      router.push(pathname)
    } else {
      router.push(`${pathname}?category=${encodeURIComponent(slug)}`)
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {[{ name: 'All Posts', slug: 'all' }, ...categories].map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleSelect(cat.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            (cat.slug === 'all' && !activeCategory) || cat.slug === activeCategory
              ? 'bg-[var(--brand-primary)] text-white'
              : 'bg-[var(--brand-surface)] text-foreground hover:bg-[var(--brand-primary)]/10'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}
