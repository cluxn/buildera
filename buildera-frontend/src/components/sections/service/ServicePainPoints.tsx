interface Props {
  points: string[]
}

export function ServicePainPoints({ points }: Props) {
  return (
    <section className="py-16 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
          Common Challenges
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Sound Familiar?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {points.map((point, i) => (
            <div key={i} className="bg-background rounded-xl p-6 border border-border">
              <p className="text-base text-foreground">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
