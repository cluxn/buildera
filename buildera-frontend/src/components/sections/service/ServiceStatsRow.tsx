import type { HeroStat } from '@/types/service-page'

interface Props {
  heroStat: HeroStat
}

const STATIC_STATS = [
  { value: '50+', label: 'Satisfied Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years of Experience' },
]

export function ServiceStatsRow({ heroStat }: Props) {
  const stats = [
    { value: `${heroStat.value}${heroStat.suffix}`, label: heroStat.label },
    ...STATIC_STATS,
  ]

  return (
    <section className="py-10 bg-[var(--brand-surface)] border-y border-border">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center ${i > 0 ? 'md:border-l md:border-border md:pl-6' : ''}`}
            >
              <span className="text-3xl md:text-4xl font-bold text-[var(--brand-primary)]">{stat.value}</span>
              <span className="text-sm text-muted-foreground mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
