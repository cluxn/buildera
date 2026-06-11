'use client'

import { FilterDropdown } from '@/components/ui/FilterDropdown'

const TYPES = ['Article', 'Template', 'Checklist', 'Video']

export function ResourceTypeFilterTabs({ activeType }: { activeType: string }) {
  const normalizedActive = activeType?.toLowerCase() || 'all'

  return (
    <FilterDropdown
      ariaLabel="Filter by resource type"
      paramName="resource_type"
      activeValue={normalizedActive}
      items={[{ label: 'All Resources', value: 'all' }, ...TYPES.map((t) => ({ label: t, value: t.toLowerCase() }))]}
    />
  )
}
