import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetailLayout } from '@/components/layouts/ServiceDetailLayout'
import { allServices, SERVICE_NAMES, CATEGORY_LABELS } from '@/data/services/index'
import { fetchTestimonials, fetchCaseStudies } from '@/lib/api'
import { generateSeoMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/ui/JsonLd'

export function generateStaticParams() {
  return allServices.map((s) => ({ category: s.categorySlug, slug: s.slug }))
}

interface Props {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const name = SERVICE_NAMES[slug] ?? slug
  return generateSeoMetadata('service', slug, {
    title: `${name} — Buildera`,
    description: `Expert ${name} services for SMBs. Buildera delivers results-focused implementations on time and on budget.`,
    path: `/services/${category}/${slug}`,
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { category, slug } = await params

  const service = allServices.find(
    (s) => s.categorySlug === category && s.slug === slug
  )

  if (!service) {
    notFound()
  }

  const [testimonials, caseStudies] = await Promise.all([
    fetchTestimonials({ service: category }),
    fetchCaseStudies({ service: category }),
  ])

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'
  const serviceName = SERVICE_NAMES[slug] ?? slug.replace(/-/g, ' ')
  const categoryLabel = CATEGORY_LABELS[category] ?? category.replace(/-/g, ' ')

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: `Expert ${serviceName} services for SMBs.`,
    provider: { '@type': 'Organization', name: 'Buildera', url: siteUrl },
    url: `${siteUrl}/services/${category}/${slug}`,
    serviceType: categoryLabel,
    areaServed: 'Worldwide',
  }

  return (
    <>
      <JsonLd data={serviceSchema} />
      <ServiceDetailLayout
        data={service}
        testimonials={testimonials.slice(0, 2)}
        caseStudy={caseStudies[0] ?? null}
      />
    </>
  )
}
