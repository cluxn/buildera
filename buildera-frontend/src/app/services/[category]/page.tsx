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
import { PILLAR_CONTENT } from '@/data/services/pillar-content'
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
  const pillar = PILLAR_CONTENT[category]

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

      {/* Intro */}
      {pillar && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-8 max-w-4xl">
            <div className="prose prose-lg prose-neutral max-w-none text-muted-foreground leading-relaxed space-y-4">
              {pillar.intro.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sub-service cards */}
      <section className="py-20 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-8 max-w-7xl">
          <h2 className="text-2xl font-bold mb-10 text-center">{label} Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const name = SERVICE_NAMES[service.slug] ?? service.slug
              return (
                <Link
                  key={service.slug}
                  href={`/services/${category}/${service.slug}`}
                  className="group flex flex-col gap-4 bg-white rounded-2xl border border-border p-8 hover:border-[var(--brand-primary)] hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="text-xl font-bold text-foreground group-hover:text-[var(--brand-primary)] transition-colors">
                    {name}
                  </h3>
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
        </div>
      </section>

      {/* Benefits */}
      {pillar && pillar.benefits.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-8 max-w-7xl">
            <h2 className="text-3xl font-bold text-center mb-4">Why Invest in {label}?</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
              The business case for getting this right — and the cost of getting it wrong.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillar.benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex flex-col gap-3 bg-[var(--brand-surface)] rounded-2xl border border-border p-6"
                >
                  <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Buildera */}
      {pillar && (
        <section className="py-20 bg-[var(--brand-primary)] text-white">
          <div className="container mx-auto px-8 max-w-4xl">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Buildera for {label}?</h2>
            <p className="text-lg text-blue-100 leading-relaxed text-center">{pillar.whyBuildera}</p>
            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Book a Free Discovery Call
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {pillar && pillar.faq.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-8 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="divide-y divide-border">
              {pillar.faq.map((item) => (
                <details key={item.question} className="group py-6">
                  <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                    <span className="font-semibold text-foreground">{item.question}</span>
                    <span className="shrink-0 w-5 h-5 text-muted-foreground transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-20 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Book a free 30-minute discovery call. We'll map your requirements and tell you exactly what's possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[var(--brand-primary)] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors"
            >
              Book a Discovery Call
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 bg-white border border-border text-foreground font-semibold px-8 py-4 rounded-xl hover:border-[var(--brand-primary)] transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
