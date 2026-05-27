import { notFound } from 'next/navigation'
import { ServiceDetailLayout } from '@/components/layouts/ServiceDetailLayout'
import { allServices } from '@/data/services/index'
import { fetchTestimonials, fetchCaseStudies } from '@/lib/api'

export function generateStaticParams() {
  return allServices.map((s) => ({ category: s.categorySlug, slug: s.slug }))
}

interface Props {
  params: Promise<{ category: string; slug: string }>
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
