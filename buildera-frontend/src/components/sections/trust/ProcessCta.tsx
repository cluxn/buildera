import Link from 'next/link'

export function ProcessCta() {
  return (
    <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
          Ready to Start the Process?
        </h2>
        <p className="text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
          The Discovery Call is free. Book 30 minutes with our team.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-[var(--brand-primary)] font-semibold text-base hover:opacity-90 transition-opacity"
          >
            Book a Free Call
          </Link>
        </div>

        <p className="text-sm text-white/70">
          No obligation &bull; Free consultation &bull; Response within 4 hours
        </p>
      </div>
    </section>
  )
}
