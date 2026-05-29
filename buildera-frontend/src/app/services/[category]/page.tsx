import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getServicesByCategory,
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  CATEGORY_DESCRIPTIONS,
  SERVICE_NAMES,
} from '@/data/services/index'
import { generateSeoMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }))
}

interface Props {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const label = CATEGORY_LABELS[category] ?? category
  return generateSeoMetadata('service', category, {
    title: `${label} Services — Buildera`,
    description: `Buildera provides professional ${label} services for SMBs. Explore our sub-services and see how we deliver results.`,
    path: `/services/${category}`,
  })
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params
  const label = CATEGORY_LABELS[category]
  if (!label) notFound()

  const services = getServicesByCategory(category)
  const description = CATEGORY_DESCRIPTIONS[category] ?? ''

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Services', href: '/services' },
          { label: label },
        ]}
      />

      {/* Hero */}
      <section className="py-16 bg-background border-b border-border">
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{label}</h1>
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>
      </section>

      {/* Sub-service cards */}
      <section className="py-20 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const name = SERVICE_NAMES[service.slug] ?? service.slug
              return (
                <Link
                  key={service.slug}
                  href={`/services/${category}/${service.slug}`}
                  className="group flex flex-col gap-4 bg-white rounded-2xl border border-border p-8 hover:border-[var(--brand-primary)] hover:shadow-lg transition-all duration-200"
                >
                  <h2 className="text-xl font-bold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                    {name}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {service.heroSubheadline}
                  </p>
                  <span className="mt-auto text-sm font-medium text-[var(--brand-primary)] group-hover:underline">
                    Learn more →
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors"
            >
              Book a Free Discovery Call
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
