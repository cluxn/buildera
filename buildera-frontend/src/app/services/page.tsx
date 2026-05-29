import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'
import { ServicesTabSection } from '@/components/sections/ServicesTabSection'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'services', {
    title: 'IT Services — Buildera',
    description: "Explore Buildera's 6 service lines: Website Dev, Salesforce, DevOps, AI Agents, Software Dev, and Hire a Developer.",
    path: '/services',
  })
}

export default function ServicesPage() {
  return (
    <main>
      <section className="py-20 bg-background">
        <div className="container mx-auto px-8 max-w-7xl text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
            Services
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From custom websites to enterprise software — we build technology that grows your business.
          </p>
        </div>
      </section>
      <ServicesTabSection />
    </main>
  )
}
