import type { Metadata } from 'next'
import Link from 'next/link'
import { IconCircleCheck } from '@tabler/icons-react'
import { fetchSettings } from '@/lib/api'

export const metadata: Metadata = {
  title: 'Thank You | Buildera',
  description: 'Your message has been received.',
  robots: { index: false, follow: false },
}

const NEXT_STEPS = [
  {
    label: 'Explore our services',
    href: '/services',
  },
  {
    label: 'Read case studies',
    href: '/case-studies',
  },
  {
    label: 'View how we work',
    href: '/how-we-work',
  },
]

export default async function ThankYouPage() {
  const settings = await fetchSettings()

  return (
    <main>
      <section className="py-24 bg-background text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success icon */}
          <IconCircleCheck className="w-20 h-20 text-green-500 mx-auto mb-8" aria-hidden="true" />

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-6">
            We&apos;ve Got Your Message!
          </h1>

          {/* Sub */}
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Thanks for reaching out. We&apos;ll review your enquiry and respond within 4 business hours
            with a clear next step. Check your inbox — we may need to ask a quick follow-up question.
          </p>

          {/* Response guarantee badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium mt-6 mb-12">
            <IconCircleCheck className="w-4 h-4" aria-hidden="true" />
            Response within 4 hours guaranteed
          </div>

          {/* Divider */}
          <div className="border-t border-border mb-12" />

          {/* While you wait */}
          <h2 className="text-2xl font-semibold text-foreground mb-2">In the Meantime</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Here are a few ways to learn more about what we build.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {NEXT_STEPS.map((step) => (
              <Link
                key={step.href}
                href={step.href}
                className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-[var(--brand-surface)] transition-colors text-sm"
              >
                {step.label}
              </Link>
            ))}
          </div>

          {/* WhatsApp shortcut */}
          {settings.whatsapp_number && (
            <div className="mt-10">
              <a
                href={`https://wa.me/${settings.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Prefer WhatsApp? Chat with us directly →
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
