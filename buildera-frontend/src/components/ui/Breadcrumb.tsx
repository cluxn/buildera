import { JsonLd } from './JsonLd'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
  baseUrl?: string
}

export function Breadcrumb({ items, baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co' }: Props) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
      })),
    ],
  }

  return <JsonLd data={breadcrumbSchema} />
}
