import Link from 'next/link'

export function AboutCta() {
  return (
    <section
      className="py-24"
      style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
    >
      <div className="container mx-auto px-8 max-w-7xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-4">
          READY TO BUILD?
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Let&apos;s Talk About Your Project
        </h2>
        <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
          15-minute intro call. No sales pitch. Just a conversation about what you&apos;re trying to
          build and whether we&apos;re the right fit.
        </p>

        {/* Clutch-style trust signal */}
        <p className="text-sm text-white/70 mb-10">
          ⭐ 4.9/5 on Clutch &bull; 150+ Projects Delivered &bull; 98% Retention Rate
        </p>

        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-[var(--brand-primary)] font-semibold text-base hover:opacity-90 transition-opacity"
        >
          Book a Free Call
        </Link>
      </div>
    </section>
  )
}
