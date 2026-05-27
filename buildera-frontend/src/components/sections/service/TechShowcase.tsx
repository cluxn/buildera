import { TechStaggerGrid } from '@/components/ui/TechStaggerGrid'
import type { Technology } from '@/types/service-page'

const CATEGORY_LABELS: Record<Technology['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  'cloud-devops': 'Cloud & DevOps',
  tools: 'Tools & Integrations',
}

interface Props {
  technologies: Technology[]
}

export function TechShowcase({ technologies }: Props) {
  const categories: Technology['category'][] = ['frontend', 'backend', 'cloud-devops', 'tools']
  const grouped = categories
    .map((cat, idx) => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      techs: technologies.filter((t) => t.category === cat),
      idx,
    }))
    .filter((g) => g.techs.length > 0)

  if (!technologies.length) return null

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
          Our Technology Stack
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Technologies We Use
        </h2>
        <div className="space-y-6">
          {grouped.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
                {group.label}
              </h3>
              <TechStaggerGrid
                technologies={group.techs}
                categoryStartDelay={group.idx * 0.1 + 0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
