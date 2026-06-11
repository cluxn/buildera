'use client'

import { FilterDropdown } from '@/components/ui/FilterDropdown'

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
  return (
    <FilterDropdown
      ariaLabel="Filter by industry"
      paramName="industry"
      activeValue={activeIndustry || 'all'}
      items={[{ label: 'All Industries', value: 'all' }, ...INDUSTRIES.map((i) => ({ label: i, value: i }))]}
    />
  )
}
