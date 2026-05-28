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
      <div className="container mx-auto px-8 max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">Built With These Services</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">The Services Behind This Solution</h2>
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
