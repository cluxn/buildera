import Link from 'next/link'
import { IconCalendar, IconMessageCircle, IconShieldCheck } from '@tabler/icons-react'

interface Props { headline: string; industryName: string }

const TRUST_SIGNALS = [
  { icon: IconCalendar, label: '30-Min Free Call' },
  { icon: IconMessageCircle, label: 'Talk to a Specialist' },
  { icon: IconShieldCheck, label: 'No Obligation' },
]

export function IndustryCta({ headline, industryName }: Props) {
  return (
    <section className="py-24" style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-8 mb-14">
          {TRUST_SIGNALS.map(({ icon: Icon, label }, i) => (
            <div key={i} className="flex items-center gap-2 text-white/80">
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-4">
            {industryName} · Free Consultation
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {headline}
          </h2>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">
            Book a free 30-minute call. We&apos;ll map your exact bottleneck and recommend the right solution — no sales pressure, no obligation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-[var(--brand-primary)] font-bold text-base hover:opacity-90 transition-opacity"
          >
            <IconCalendar className="w-5 h-5" />
            Book a Free Call
          </Link>
        </div>

      </div>
    </section>
  )
}
