import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { AboutHero } from '@/components/sections/trust/AboutHero'
import { AboutStory } from '@/components/sections/trust/AboutStory'
import { ValuesSection } from '@/components/sections/trust/ValuesSection'
import { AboutCta } from '@/components/sections/trust/AboutCta'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'about', {
    title: 'About Buildera — Our Story & Team',
    description: 'Meet the team behind Buildera — IT services company delivering Salesforce, DevOps, and custom software solutions.',
    path: '/about',
  })
}

export default function AboutPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      <AboutHero />
      <AboutStory />
      <ValuesSection />
      <AboutCta />
    </main>
  )
}
