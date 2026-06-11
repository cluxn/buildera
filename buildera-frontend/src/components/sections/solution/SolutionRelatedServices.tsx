import Link from 'next/link'
import { allServices, CATEGORY_LABELS } from '@/data/services/index'

interface Props { services: string[] }

function getFirstServiceUrl(categorySlug: string): string {
  const first = allServices.find((s) => s.categorySlug === categorySlug)
  if (first) return `/services/${categorySlug}/${first.slug}`
  return '/services'
}

export function SolutionRelatedServices({ services }: Props) {
  if (!services.length) return null
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">Built With These Services</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Services Behind This Solution</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">The capabilities we bring together to deliver this solution end-to-end.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((slug) => (
            <Link key={slug} href={getFirstServiceUrl(slug)} className="bg-[var(--brand-surface)] border border-border rounded-xl p-5 hover:border-[var(--brand-primary)] transition-colors text-sm font-medium">
              {CATEGORY_LABELS[slug] ?? slug}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
