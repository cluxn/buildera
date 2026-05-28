import Link from 'next/link'

export function ServiceMidCta() {
  return (
    <section
      className="py-16"
      style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
    >
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
              Free Consultation
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Not Sure Where to Start?
            </h2>
            <p className="text-white/80 mt-2 max-w-lg text-base">
              Book a free 30-minute call. We&apos;ll map your biggest bottleneck and recommend the right solution — no sales pressure, no obligation.
            </p>
          </div>
          <Link
            href="/book-a-call"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-[var(--brand-primary)] font-semibold hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
          >
            Book a Free Call
          </Link>
        </div>
      </div>
    </section>
  )
}
