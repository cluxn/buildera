import Link from 'next/link'

export function BlogCtaBanner() {
  return (
    <div
      className="rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 my-12"
      style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
    >
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
          Ready to build software that actually works for your business?
        </h2>
        <p className="text-white/70 text-sm">Free discovery call · 15 minutes · No obligation</p>
      </div>
      <Link
        href="/contact"
        className="flex-shrink-0 inline-flex items-center px-6 py-3 bg-white text-[var(--brand-primary)] font-semibold rounded-xl hover:bg-white/90 transition-colors text-sm"
      >
        Book a Free Call
      </Link>
    </div>
  )
}
