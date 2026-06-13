import type { Metadata } from 'next'
import { fetchSettings } from '@/lib/api'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CalendlyEmbed } from '@/components/sections/contact/CalendlyEmbed'

import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'book-a-call', {
    title: 'Book a Free Discovery Call — Buildera',
    description: 'Schedule your free 30-minute discovery call with Buildera. No obligation, just a conversation about your project.',
    path: '/book-a-call',
  })
}

const WHAT_TO_EXPECT = [
  {
    title: 'We listen first',
    body: 'Tell us the problem you\'re solving. We\'ll ask the right questions.',
  },
  {
    title: 'Honest assessment',
    body: 'We\'ll tell you if we\'re the right fit — or point you in the right direction if we\'re not.',
  },
  {
    title: 'Clear next step',
    body: 'Leave the call knowing exactly what happens next: proposal, requirements workshop, or nothing at all.',
  },
]

export default async function BookACallPage() {
  const settings = await fetchSettings()

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Book a Call' }]} />

      {/* Hero */}
      <section className="py-20 bg-background text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-6">
            Free Consultation
          </p>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
            Book a 30-Minute Discovery Call
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            No sales pitch. Just an honest conversation about what you&apos;re building and whether we&apos;re the right fit.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>800+ Projects Delivered</span>
            <span aria-hidden="true">•</span>
            <span>Free Consultation</span>
            <span aria-hidden="true">•</span>
            <span>Responds in 4 Hours</span>
          </div>
        </div>
      </section>

      {/* Calendly embed */}
      <section className="py-8 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CalendlyEmbed calendlyUrl={settings.calendly_url} />
        </div>
      </section>

      {/* What to expect */}
      <section className="py-20 bg-[var(--brand-surface)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
              The Call
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-foreground">What to Expect</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A focused 30-minute conversation — no demos, no pitch decks, no pressure.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHAT_TO_EXPECT.map((item, i) => (
              <div
                key={i}
                className="bg-background rounded-xl p-6 border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--brand-primary)] text-white flex items-center justify-center text-sm font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
