import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FaqAccordion, FAQ_ITEMS } from '@/components/sections/trust/FaqAccordion'
import { AboutCta } from '@/components/sections/trust/AboutCta'

import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'faq', {
    title: 'FAQ — Buildera IT Services',
    description: "Frequently asked questions about Buildera's services, engagement models, and how we work.",
    path: '/faq',
  })
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

export default function FaqPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqAccordion />
      <AboutCta />
    </main>
  )
}
