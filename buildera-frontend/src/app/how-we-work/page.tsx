import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { HowWeWorkHero } from '@/components/sections/trust/HowWeWorkHero'
import { EngagementGuarantees } from '@/components/sections/trust/EngagementGuarantees'
import { ProcessTimeline } from '@/components/sections/trust/ProcessTimeline'
import { ComparisonSection } from '@/components/sections/trust/ComparisonSection'
import { ClientTestimonials } from '@/components/sections/ClientTestimonials'
import { FaqAccordion, FAQ_ITEMS } from '@/components/sections/trust/FaqAccordion'
import { ProcessCta } from '@/components/sections/trust/ProcessCta'

import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'
import { fetchTestimonials } from '@/lib/api'

// A focused subset of FAQ_ITEMS — process/engagement questions only,
// since pricing/tech/comparison questions are already covered by other
// sections on this page (Engagement Guarantees, Comparison, etc.)
const PROCESS_FAQS = FAQ_ITEMS.filter((item) =>
  [
    'How long does a typical project take?',
    'Do you work with fixed-price or time-and-material contracts?',
    'What happens if requirements change mid-project?',
    'Do I own the source code?',
    'How do I know the project is on track?',
    "What's included in post-launch support?",
  ].includes(item.question)
)

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'how-we-work', {
    title: "How We Work — Buildera's Process",
    description: 'Our 6-step process from discovery to delivery. See how Buildera delivers IT projects on time and on budget.',
    path: '/how-we-work',
  })
}

export default async function HowWeWorkPage() {
  const testimonials = await fetchTestimonials().catch(() => [])

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How We Work' }]} />
      <HowWeWorkHero />
      <EngagementGuarantees />
      <ProcessTimeline />
      <ComparisonSection />
      <ClientTestimonials testimonials={testimonials.slice(0, 3)} />
      <FaqAccordion items={PROCESS_FAQS} singleColumn />
      <ProcessCta />
    </main>
  )
}
