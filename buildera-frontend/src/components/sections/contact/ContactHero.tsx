export function ContactHero() {
  return (
    <section className="relative overflow-hidden py-16 bg-background">
      <div className="hero-orb-1" aria-hidden="true" />
      <div className="hero-orb-2" aria-hidden="true" />

      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--brand-surface)] border border-[var(--brand-primary)]/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-[var(--brand-primary)]" aria-hidden="true" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
            CONTACT US
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] mb-6 text-foreground">
          Start Your Project Today
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mb-8 leading-relaxed">
          Tell us what you&apos;re building. We&apos;ll respond within 4 business hours with a clear next step — no generic proposal, no sales pitch.
        </p>

        <div className="flex flex-wrap gap-6 mt-6 text-sm text-muted-foreground">
          <span>📞 Response within 4 hours</span>
          <span>🔒 NDA available on request</span>
          <span>✅ Free initial consultation</span>
        </div>
      </div>
    </section>
  )
}
