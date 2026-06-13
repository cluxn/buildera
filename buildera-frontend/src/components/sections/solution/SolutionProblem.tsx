import type { SolutionChallenge } from '@/types/service-page'

interface Props { points: SolutionChallenge[] }

export function SolutionProblem({ points }: Props) {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">The Challenge</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Does This Sound Like Your Business?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">These are the problems we solve every week for SMBs across India.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, i) => (
            <div key={i} className="bg-background rounded-xl p-6 border border-border hover:border-[var(--brand-primary)]/30 transition-colors duration-200">
              <span className="text-xs font-bold text-[var(--brand-primary)]/40 tracking-widest mb-3 block">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-semibold text-foreground mb-2">{point.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
