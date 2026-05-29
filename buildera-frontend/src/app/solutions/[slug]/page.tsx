import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SolutionDetailLayout } from '@/components/layouts/SolutionDetailLayout'
import { solutions } from '@/data/solutions/solutions'
import { fetchTestimonials, fetchCaseStudies } from '@/lib/api'
import { generateSeoMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const solution = solutions.find((s) => s.slug === slug)
  const name = solution?.title ?? slug.replace(/-/g, ' ')
  return generateSeoMetadata('solution', slug, {
    title: `${name} Solution — Buildera`,
    description: `Buildera's ${name} solution for growing businesses. Ready to deploy, customisable to your workflow.`,
    path: `/solutions/${slug}`,
  })
}

export default async function SolutionDetailPage({ params }: Props) {
  const { slug } = await params
  const solution = solutions.find((s) => s.slug === slug)
  if (!solution) notFound()

  const [testimonials, caseStudies] = await Promise.all([
    fetchTestimonials({ solution: slug }),
    fetchCaseStudies({ solution: slug }),
  ])

  return (
    <SolutionDetailLayout
      data={solution}
      testimonials={testimonials.slice(0, 2)}
      caseStudy={caseStudies[0] ?? null}
    />
  )
}
