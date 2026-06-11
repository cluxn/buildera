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
    <section className="py-16 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Our Technology Stack
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Technologies We Use
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The tools and frameworks we use to build reliable, scalable solutions — chosen for performance, maintainability, and fit.
          </p>
        </div>
        <div className="space-y-8">
          {grouped.map((group) => (
            <div key={group.category} className="text-center">
              <h3 className="text-sm font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <TechStaggerGrid
                  technologies={group.techs}
                  categoryStartDelay={group.idx * 0.1 + 0.1}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
