import type { HeroStat } from '@/types/service-page'

interface Props {
  heroStat: HeroStat
}

const STATIC_STATS = [
  { value: '500+', label: 'Satisfied Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '10+', label: 'Years of Experience' },
]

export function ServiceStatsRow({ heroStat }: Props) {
  const stats = [
    { value: `${heroStat.value}${heroStat.suffix}`, label: heroStat.label },
    ...STATIC_STATS,
  ]

  return (
    <section
      className="py-10"
      style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center ${i > 0 ? 'md:border-l md:border-white/20 md:pl-6' : ''}`}
            >
              <span className="text-3xl md:text-4xl font-bold text-white">{stat.value}</span>
              <span className="text-sm text-white/70 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
