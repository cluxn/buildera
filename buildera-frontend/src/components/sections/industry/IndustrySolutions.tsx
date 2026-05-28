import Link from 'next/link'
import type { IndustrySolutionRef } from '@/types/service-page'

interface Props { solutions: IndustrySolutionRef[] }

export function IndustrySolutions({ solutions }: Props) {
  if (!solutions.length) return null
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Our Solutions
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Purpose-Built Solutions for Your Industry
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pre-scoped software modules designed around the exact workflows and data your industry runs on.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group flex flex-col p-5 rounded-xl border border-border bg-[var(--brand-surface)] hover:border-[var(--brand-primary)] transition-colors"
            >
              <h3 className="text-sm font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                {s.label}
              </h3>
              <span className="text-xs font-medium text-[var(--brand-primary)] mt-3">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
