import Link from 'next/link'
import type { IndustryServiceRef } from '@/types/service-page'
import { allServices } from '@/data/services/index'

function getFirstServiceUrl(categorySlug: string): string {
  const first = allServices.find((s) => s.categorySlug === categorySlug)
  if (first) return `/services/${categorySlug}/${first.slug}`
  return '/services'
}

interface Props { services: IndustryServiceRef[] }

export function IndustryServices({ services }: Props) {
  if (!services.length) return null
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Our Services
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Services That Power This Industry
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The specific capabilities we bring to every engagement in your sector.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link
              key={s.categorySlug}
              href={getFirstServiceUrl(s.categorySlug)}
              className="group flex flex-col gap-3 p-6 rounded-xl border border-border bg-background hover:border-[var(--brand-primary)] transition-colors"
            >
              <h3 className="text-base font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                {s.label}
              </h3>
              <p className="text-sm text-muted-foreground flex-1">{s.description}</p>
              <span className="text-xs font-medium text-[var(--brand-primary)]">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
