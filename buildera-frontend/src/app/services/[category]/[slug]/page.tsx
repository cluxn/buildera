import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceDetailLayout } from '@/components/layouts/ServiceDetailLayout'
import { allServices, SERVICE_NAMES, CATEGORY_LABELS } from '@/data/services/index'
import { fetchTestimonials, fetchCaseStudies } from '@/lib/api'
import { generateSeoMetadata } from '@/lib/seo'

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

  return (
    <ServiceDetailLayout
      data={service}
      testimonials={testimonials.slice(0, 2)}
      caseStudy={caseStudies[0] ?? null}
    />
  )
}
