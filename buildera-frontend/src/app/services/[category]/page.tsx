import { redirect } from 'next/navigation'
import { CATEGORY_SLUGS } from '@/data/services/index'

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }))
}

interface Props {
  params: Promise<{ category: string }>
}

export default async function ServiceCategoryPage({ params }: Props) {
  await params
  redirect('/services')
}
