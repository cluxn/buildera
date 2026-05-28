import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { IndustryLayout } from '@/components/layouts/IndustryLayout'
import { getIndustryBySlug, INDUSTRY_SLUGS } from '@/data/industries/industries'

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }))
}

interface Props {
  params: Promise<{ slug: string }>
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
