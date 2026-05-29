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
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 leading-tight">
                Built out of frustration with how IT projects get delivered.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Buildera was founded in 2014 by engineers who had worked at large IT consultancies and
                watched the same pattern repeat: bloated proposals, missed timelines, and clients who
                didn&apos;t understand what they were paying for until the invoice arrived.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We set out to build an IT services company that operated differently — with transparent
                pricing, honest timelines, and software that clients could actually own and maintain.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Ten years on, we&apos;ve shipped 800+ projects across 6 service lines and expanded from
                Mumbai to serve clients globally. The principles haven&apos;t changed.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              {DIFFERENTIATORS.map((item) => (
                <div key={item.number} className="flex gap-5 p-5 rounded-xl border border-border bg-[var(--brand-surface)]">
                  <span className="text-2xl font-bold text-[var(--brand-primary)]/30 shrink-0 leading-none mt-0.5">
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

      {/* ── Timeline ── */}
      <section className="py-20 bg-[var(--brand-surface)]">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
              Milestones
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              A Decade of Shipping
            </h2>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-0">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex gap-6 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 border-2 border-[var(--brand-primary)]/30 flex items-center justify-center">
                    <IconCheck className="w-4 h-4 text-[var(--brand-primary)]" />
                  </div>
                  {i < MILESTONES.length - 1 && (
                    <div className="w-px h-12 bg-border" />
                  )}
                </div>
                <div className="pb-12 last:pb-0">
                  <span className="text-xs font-bold text-[var(--brand-primary)] uppercase tracking-widest">
                    {m.year}
                  </span>
                  <p className="text-foreground mt-1 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
