import { IconCalendar, IconShieldCheck, IconCode } from '@tabler/icons-react'

const GUARANTEES = [
  {
    icon: IconCalendar,
    title: 'Honest timelines',
    body: 'Every project gets a realistic schedule agreed upfront. If scope changes, you hear it immediately — not at deadline.',
  },
  {
    icon: IconShieldCheck,
    title: 'Full ownership',
    body: 'You receive all source code, documentation, and deployment assets at handoff. No vendor lock-in, ever.',
  },
  {
    icon: IconCode,
    title: 'Weekly working demos',
    body: 'You see live, working software every week. Not slides. Not screenshots. Actual product you can click through.',
  },
]

export function EngagementGuarantees() {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            OUR COMMITMENTS
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Three Promises We Make to Every Client
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            No fine print, no surprises. This is what working with Buildera looks like — every project, every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GUARANTEES.map((g) => {
            const Icon = g.icon
            return (
              <div key={g.title} className="flex flex-col gap-4 p-6 rounded-xl bg-background border border-border">
                <div className="w-12 h-12 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[var(--brand-primary)]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{g.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.body}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
