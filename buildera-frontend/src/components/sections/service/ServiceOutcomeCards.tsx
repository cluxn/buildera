import { StaggeredRevealGrid } from '@/components/ui/StaggeredRevealGrid'
import type { OutcomeCard } from '@/types/service-page'

interface Props { cards: OutcomeCard[] }

export function ServiceOutcomeCards({ cards }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">What You Get</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            The Outcomes <span className="text-[var(--brand-primary)]">We Deliver</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every engagement is measured against real business outcomes — not just task completion.
          </p>
        </div>
        <StaggeredRevealGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="rounded-xl p-6" style={{ background: 'var(--brand-glass)', backdropFilter: 'blur(12px)', border: '1px solid hsl(217 91% 60% / 15%)' }}>
              <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
              {card.metric && (
                <span className="text-sm font-medium bg-[hsl(217_91%_60%/10%)] text-[var(--brand-primary)] px-2 py-1 rounded-full">{card.metric}</span>
              )}
            </div>
          ))}
        </StaggeredRevealGrid>
      </div>
    </section>
  )
}
