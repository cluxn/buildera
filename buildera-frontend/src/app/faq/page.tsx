import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FaqAccordion, FAQ_ITEMS } from '@/components/sections/trust/FaqAccordion'
import { AboutCta } from '@/components/sections/trust/AboutCta'

export const metadata = {
  title: 'FAQ | Buildera',
  description:
    'Answers to the most common questions about working with Buildera — timelines, pricing, ownership, and more.',
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
