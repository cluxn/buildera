import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { HowWeWorkHero } from '@/components/sections/trust/HowWeWorkHero'
import { ProcessTimeline } from '@/components/sections/trust/ProcessTimeline'
import { ProcessCta } from '@/components/sections/trust/ProcessCta'

import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'how-we-work', {
    title: "How We Work — Buildera's Process",
    description: 'Our 6-step process from discovery to delivery. See how Buildera delivers IT projects on time and on budget.',
    path: '/how-we-work',
  })
}

export default function HowWeWorkPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'How We Work' }]} />
      <HowWeWorkHero />
      <ProcessTimeline />
      <ProcessCta />
    </main>
  )
}
