'use client'

import { FilterDropdown } from '@/components/ui/FilterDropdown'
import type { BlogCategory } from '@/lib/api'

export function CategoryFilterTabs({ categories, activeCategory }: { categories: BlogCategory[]; activeCategory: string }) {
  return (
    <FilterDropdown
      ariaLabel="Filter by category"
      paramName="category"
      activeValue={activeCategory || 'all'}
      items={[{ label: 'All Posts', value: 'all' }, ...categories.map((cat) => ({ label: cat.name, value: cat.slug }))]}
    />
  )
}
