import type { Metadata } from 'next'
import { fetchSettings } from '@/lib/api'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CalendlyEmbed } from '@/components/sections/contact/CalendlyEmbed'

export const metadata: Metadata = {
  title: 'Book a Free Discovery Call | Buildera',
  description: 'Schedule a 30-minute call with the Buildera team. No obligation, no sales pitch.',
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
      <section className="py-12 bg-background text-center">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-surface)] border border-[var(--brand-primary)]/20 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
              FREE CONSULTATION
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
            Book a 30-Minute Discovery Call
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            No sales pitch. Just an honest conversation about what you&apos;re building and whether we&apos;re the right fit.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>150+ Projects</span>
            <span aria-hidden="true">•</span>
            <span>Free Consultation</span>
            <span aria-hidden="true">•</span>
            <span>Responds in 4 Hours</span>
          </div>
        </div>
      </section>

      {/* Calendly embed */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-8 max-w-4xl">
          <CalendlyEmbed calendlyUrl={settings.calendly_url} />
        </div>
      </section>

      {/* What to expect */}
      <section className="py-12 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-8 max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">What to Expect</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
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
