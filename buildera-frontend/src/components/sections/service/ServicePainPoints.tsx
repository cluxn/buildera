interface Props { points: string[] }

export function ServicePainPoints({ points }: Props) {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">Common Challenges</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Does This Sound Familiar?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            These are the problems we hear from businesses every week. If any of these resonate, we can help.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point, i) => (
            <div key={i} className="bg-background rounded-xl p-6 border border-border">
              <span className="text-2xl font-bold text-[var(--brand-primary)] mb-3 block">0{i + 1}</span>
              <p className="text-base text-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
