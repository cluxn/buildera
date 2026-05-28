import Link from 'next/link'

export function ProcessCta() {
  return (
    <section className="py-16 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Ready to Start the Process?
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
          The Discovery Call is free. Book 30 minutes with our team.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--brand-primary)] text-white font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Book a Free Call
          </Link>
          <Link
            href="/case-studies"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border border-border text-foreground font-semibold text-base hover:bg-background transition-colors"
          >
            See Our Work
          </Link>
        </div>

        <p className="text-sm text-muted-foreground">
          No obligation &bull; Free consultation &bull; Response within 4 hours
        </p>
      </div>
    </section>
  )
}
