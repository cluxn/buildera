import Link from 'next/link'

interface Props { headline: string; industryName: string }

export function IndustryCta({ headline, industryName }: Props) {
  return (
    <section
      className="py-20"
      style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
    >
      <div className="container mx-auto px-8 max-w-7xl text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">
          {industryName} · Free Consultation
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{headline}</h2>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          Book a free 30-minute call. We&apos;ll map your exact bottleneck and recommend the right solution — no sales pressure, no obligation.
        </p>
        <Link
          href="/book-a-call"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-[var(--brand-primary)] font-semibold hover:opacity-90 transition-opacity"
        >
          Book a Free Call
        </Link>
      </div>
    </section>
  )
}
