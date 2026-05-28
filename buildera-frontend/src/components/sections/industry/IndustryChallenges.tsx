import type { IndustryChallenge } from '@/types/service-page'

interface Props { challenges: IndustryChallenge[] }

export function IndustryChallenges({ challenges }: Props) {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Industry Challenges
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Problems We Solve <span className="text-[var(--brand-primary)]">Every Day</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            These are the operational challenges we hear from businesses in your industry week after week. If any resonate, we can help.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((c, i) => (
            <div key={i} className="bg-background rounded-xl p-6 border border-border">
              <span className="text-2xl font-bold text-[var(--brand-primary)] mb-3 block">0{i + 1}</span>
              <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
