import { IconUsers, IconCalendar, IconShield, IconCode } from '@tabler/icons-react'

const VALUES = [
  {
    icon: IconUsers,
    title: 'Client First',
    body: "We don't start building until we understand your real problem. Requirements change; we adapt.",
  },
  {
    icon: IconCalendar,
    title: 'No Bullshit Timelines',
    body: 'We give you honest estimates. If a scope change affects delivery, you hear it in the same call.',
  },
  {
    icon: IconShield,
    title: 'Built to Last',
    body: "We architect for the next 5 years, not the next demo. No shortcuts that become your problem 6 months later.",
  },
  {
    icon: IconCode,
    title: 'You Own Everything',
    body: 'Full source code, no vendor lock-in, no black-box. Your IP is yours from day one.',
  },
]

export function ValuesSection() {
  return (
    <section className="py-16 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            HOW WE OPERATE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            The Principles Behind Every Project
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((value) => {
            const Icon = value.icon
            return (
              <div
                key={value.title}
                className="bg-background border border-border rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
