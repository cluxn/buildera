'use client'

import { useState } from 'react'
import { TechStaggerGrid } from '@/components/ui/TechStaggerGrid'
import type { Technology } from '@/types/service-page'

const CATEGORY_LABELS: Record<Technology['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  'cloud-devops': 'Cloud & DevOps',
  tools: 'Tools & Integrations',
}

const CATEGORIES: Technology['category'][] = ['frontend', 'backend', 'cloud-devops', 'tools']

export function TechTabSwitcher({ technologies }: { technologies: Technology[] }) {
  const grouped = CATEGORIES
    .map((cat, idx) => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      techs: technologies.filter((t) => t.category === cat),
      idx,
    }))
    .filter((g) => g.techs.length > 0)

  const [active, setActive] = useState(grouped[0]?.category ?? '')

  const activeGroup = grouped.find((g) => g.category === active)

  return (
    <>
      {/* Horizontal tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-border pb-4">
        {grouped.map((g) => (
          <button
            key={g.category}
            onClick={() => setActive(g.category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              active === g.category
                ? 'bg-[var(--brand-primary)] text-white'
                : 'border border-border text-foreground hover:border-[var(--brand-primary)]/50 hover:text-[var(--brand-primary)]'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Tech grid for active tab */}
      {activeGroup && (
        <div className="flex flex-wrap gap-3 justify-center min-h-[60px]">
          <TechStaggerGrid
            key={active}
            technologies={activeGroup.techs}
            categoryStartDelay={0.05}
          />
        </div>
      )}
    </>
  )
}
