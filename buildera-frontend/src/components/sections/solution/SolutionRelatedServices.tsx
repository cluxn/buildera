import Link from 'next/link'
import { allServices, CATEGORY_LABELS, CATEGORY_DESCRIPTIONS } from '@/data/services/index'
import { IconArrowRight } from '@tabler/icons-react'

interface Props { services: string[] }

function getServiceUrl(categorySlug: string): string {
  return `/services/${categorySlug}`
}

export function SolutionRelatedServices({ services }: Props) {
  if (!services.length) return null
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">Built With These Services</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Services Behind This Solution</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">The capabilities we bring together to deliver this solution end-to-end.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((slug) => (
            <Link
              key={slug}
              href={getServiceUrl(slug)}
              className="group flex flex-col gap-3 bg-background border border-border rounded-xl p-6 hover:border-[var(--brand-primary)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <h3 className="font-semibold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                {CATEGORY_LABELS[slug] ?? slug}
              </h3>
              {CATEGORY_DESCRIPTIONS[slug] && (
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {CATEGORY_DESCRIPTIONS[slug]}
                </p>
              )}
              <span className="flex items-center gap-1.5 text-sm font-medium text-[var(--brand-primary)] mt-auto">
                Explore service <IconArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
