import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { IndustryLayout } from '@/components/layouts/IndustryLayout'
import { getIndustryBySlug, INDUSTRY_SLUGS } from '@/data/industries/industries'
import { generateSeoMetadata } from '@/lib/seo'

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }))
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = getIndustryBySlug(slug)
  const name = data?.name ?? slug.replace(/-/g, ' ')
  return generateSeoMetadata('industry', slug, {
    title: `IT Solutions for ${name} — Buildera`,
    description: `Buildera delivers custom software and IT solutions for the ${name} industry. Explore our services, case studies, and solutions.`,
    path: `/industries/${slug}`,
  })
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const data = getIndustryBySlug(slug)

  if (!data) notFound()

  return (
    <>
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: data.name },
        ]}
      />
      <IndustryLayout data={data} />
    </>
  )
}
