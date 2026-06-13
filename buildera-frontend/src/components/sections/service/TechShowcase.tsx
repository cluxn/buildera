import { TechTabSwitcher } from '@/components/sections/service/TechTabSwitcher'
import type { Technology } from '@/types/service-page'

interface Props {
  technologies: Technology[]
}

export function TechShowcase({ technologies }: Props) {
  if (!technologies.length) return null

  return (
    <section className="py-16 bg-background border-t border-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Technology
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Technologies We Use
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The tools and frameworks we use to build reliable, scalable solutions — chosen for performance and fit.
          </p>
        </div>
        <TechTabSwitcher technologies={technologies} />
      </div>
    </section>
  )
}
