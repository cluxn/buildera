'use client'

import { FilterDropdown } from '@/components/ui/FilterDropdown'

const SERVICE_CATEGORIES = [
  'Website Development',
  'Salesforce Development',
  'DevOps Development',
  'AI Agent Development',
  'Software Development',
  'Hire a Developer',
]

export function ServiceCategoryFilterTabs({ activeCategory }: { activeCategory: string }) {
  return (
    <FilterDropdown
      ariaLabel="Filter by service category"
      paramName="service_category"
      activeValue={activeCategory || 'all'}
      items={[{ label: 'All Services', value: 'all' }, ...SERVICE_CATEGORIES.map((s) => ({ label: s, value: s }))]}
    />
  )
}
