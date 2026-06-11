import { StaggeredRevealGrid } from '@/components/ui/StaggeredRevealGrid'
import type { OutcomeCard } from '@/types/service-page'

interface Props { title: string; cards: OutcomeCard[] }

export function SolutionFeatures({ title, cards }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">The Solution</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How {title} Transforms Your Business</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Purpose-built features that address your exact workflow — not generic software retrofitted to your needs.</p>
        </div>
        <StaggeredRevealGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <div key={i} className="h-full flex flex-col bg-background border border-border rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-2">{card.title}</h4>
              <p className="text-sm text-muted-foreground mb-3">{card.description}</p>
              {card.metric && <span className="mt-auto inline-block self-start text-sm font-medium bg-[hsl(217_91%_60%/10%)] text-[var(--brand-primary)] px-2 py-1 rounded-full">{card.metric}</span>}
            </div>
          ))}
        </StaggeredRevealGrid>
      </div>
    </section>
  )
}
