import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'
import { fetchTestimonials } from '@/lib/api'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { AboutHero } from '@/components/sections/trust/AboutHero'
import { AboutStory } from '@/components/sections/trust/AboutStory'
import { MilestoneTimeline } from '@/components/sections/trust/MilestoneTimeline'
import { ValuesSection } from '@/components/sections/trust/ValuesSection'
import { ClientTestimonials } from '@/components/sections/ClientTestimonials'
import { AboutCta } from '@/components/sections/trust/AboutCta'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'about', {
    title: 'About Buildera — Our Story & Team',
    description: 'Meet the team behind Buildera — IT services company delivering Salesforce, DevOps, and custom software solutions.',
    path: '/about',
  })
}

export default async function AboutPage() {
  const testimonials = await fetchTestimonials().catch(() => [])

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]} />
      <AboutHero />
      <AboutStory />
      <MilestoneTimeline />
      <ValuesSection />
      <ClientTestimonials testimonials={testimonials.slice(0, 3)} />
      <AboutCta />
    </main>
  )
}
