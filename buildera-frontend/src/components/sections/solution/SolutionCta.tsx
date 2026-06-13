import Link from 'next/link'

interface Props { headline: string }

export function SolutionCta({ headline }: Props) {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">Ready to Start?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
        <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Book a free 30-minute discovery call. We&apos;ll map your exact requirements and tell you what&apos;s possible — no obligation.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/70 mb-10">
          <span>800+ Projects Delivered</span>
          <span aria-hidden="true">·</span>
          <span>Fixed-Price Engagements</span>
          <span aria-hidden="true">·</span>
          <span>You Own 100% of the Code</span>
        </div>
        <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-[var(--brand-primary)] font-semibold hover:opacity-90 transition-opacity">
          Book a Free Call
        </Link>
      </div>
    </section>
  )
}
