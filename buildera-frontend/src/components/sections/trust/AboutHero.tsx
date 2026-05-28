export function AboutHero() {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Hero orbs — matches homepage hero */}
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />

      <div className="relative container mx-auto px-8 max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-4">
            ABOUT BUILDERA
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
            We Build Software That Moves Indian Businesses Forward
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl">
            Buildera is an IT services company helping Indian SMBs replace manual processes and
            legacy systems with custom software that actually fits the way they work. We&apos;ve shipped
            150+ projects across 6 service lines since 2018.
          </p>

          {/* Trust badge strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">150+ Projects Delivered</span>
            <span aria-hidden="true" className="text-border">|</span>
            <span className="font-medium text-foreground">50+ Active Clients</span>
            <span aria-hidden="true" className="text-border">|</span>
            <span className="font-medium text-foreground">6 Service Lines</span>
          </div>
        </div>
      </div>
    </section>
  )
}
