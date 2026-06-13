import { IconCheck } from '@tabler/icons-react'

const DIFFERENTIATORS = [
  {
    number: '01',
    title: 'Fixed-Price Projects',
    body: 'No billing-by-the-hour surprises. Every project comes with a fixed price and a timeline. Scope changes are handled via written change orders, not surprise invoices.',
  },
  {
    number: '02',
    title: 'You Own 100% of the Code',
    body: "When we're done, you get the source code, the documentation, and the deployment scripts. No vendor lock-in, no ongoing license fees, no black box.",
  },
  {
    number: '03',
    title: 'Weekly Demos, Not Monthly Updates',
    body: "You see working software every week — not a PowerPoint presentation. If we're off-track, you find out in week two, not week ten.",
  },
  {
    number: '04',
    title: 'No Junior-Only Teams',
    body: 'Every project has a senior engineer as the technical lead. Juniors work under supervision on well-defined tasks — they don\'t own architecture decisions.',
  },
]

const MILESTONES = [
  { year: '2014', event: 'Founded in Mumbai — first project: inventory management for a textile exporter' },
  { year: '2016', event: 'First Salesforce implementation; expanded to Delhi and Bengaluru' },
  { year: '2019', event: 'Crossed 100 clients; launched AI agent development practice' },
  { year: '2022', event: 'Expanded globally — clients in UAE, UK, and Southeast Asia' },
  { year: '2024', event: '800+ projects delivered; team of 60+ engineers across 4 cities' },
]

export function AboutStory() {
  return (
    <>
      {/* ── Story + Differentiators ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">

            <div className="flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
                Built out of frustration with how IT projects get delivered.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Buildera was founded in 2014 by engineers who&apos;d seen the same pattern repeat at
                large IT consultancies — bloated proposals, missed timelines, and invoices clients
                didn&apos;t understand. We set out to do it differently: transparent pricing, honest
                timelines, and software clients could actually own and maintain.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ten years on, we&apos;ve shipped 800+ projects across 6 service lines and grown from
                Mumbai to serve clients globally. The principles haven&apos;t changed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DIFFERENTIATORS.map((item) => (
                <div key={item.number} className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-[var(--brand-surface)] hover:border-[var(--brand-primary)]/30 transition-colors duration-200">
                  <span className="text-2xl font-bold text-[var(--brand-primary)]/30 leading-none">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-1 text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Milestones ── */}
      <section className="py-20 bg-[var(--brand-surface)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
              Milestones
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              A Decade of Shipping
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a one-project start in Mumbai to 800+ deliveries across four cities — here&apos;s how we got here.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-[var(--brand-primary)]/20 hidden sm:block" aria-hidden="true" />

            <div className="space-y-0">
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="relative flex gap-6 sm:gap-8 pb-10 last:pb-0">
                  {/* Year + dot */}
                  <div className="flex flex-col items-center sm:items-end sm:w-[72px] flex-shrink-0 pt-1">
                    <div className="relative z-10 w-9 h-9 rounded-full bg-[var(--brand-primary)] flex items-center justify-center ring-4 ring-[var(--brand-surface)]">
                      <IconCheck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 bg-background rounded-xl border border-border px-5 py-4 hover:border-[var(--brand-primary)]/40 transition-colors duration-200">
                    <span className="text-lg font-bold text-[var(--brand-primary)] leading-none block mb-2">
                      {m.year}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
