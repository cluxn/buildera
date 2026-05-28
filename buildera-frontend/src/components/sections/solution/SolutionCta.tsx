import Link from 'next/link'

interface Props { headline: string }

export function SolutionCta({ headline }: Props) {
  return (
    <section className="py-20" style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}>
      <div className="container mx-auto px-8 max-w-7xl text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-white/70 mb-4">Ready to Start?</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">{headline}</h2>
        <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-[var(--brand-primary)] font-semibold hover:opacity-90 transition-opacity">
          Book a Free Call
        </Link>
      </div>
    </section>
  )
}
