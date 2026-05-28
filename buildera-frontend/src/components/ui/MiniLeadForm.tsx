"use client"

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { IconLoader2, IconCircleCheck } from '@tabler/icons-react'

interface MiniLeadFormProps {
  sourceForm: string           // e.g. 'blog-post-inline', 'service-page-mid'
  headline?: string            // default: "Get a Free Consultation"
  subtext?: string             // default: "Tell us what you need — we'll respond within 4 hours."
  ctaLabel?: string            // default: "Send Message"
  className?: string
}

export function MiniLeadForm({
  sourceForm,
  headline = 'Get a Free Consultation',
  subtext = "Tell us what you need — we'll respond within 4 hours.",
  ctaLabel = 'Send Message',
  className = '',
}: MiniLeadFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const inputClass =
    'w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition mb-3'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.NEXT_PUBLIC_API_KEY ?? '',
        },
        body: JSON.stringify({
          name,
          email,
          phone: phone || undefined,
          source_form: sourceForm,
          website, // honeypot — backend drops if non-empty
        }),
      })

      if (res.status === 201) {
        setSuccess(true)
        return
      }

      if (res.status === 422) {
        setError("We already have your enquiry — we'll be in touch soon!")
        return
      }

      if (res.status === 429) {
        setError('Too many requests. Please try again in an hour.')
        return
      }

      setError('Something went wrong. Please email us at info@buildera.co')
    } catch {
      setError('Something went wrong. Please email us at info@buildera.co')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className={`bg-green-50 border border-green-200 rounded-xl p-6 text-center ${className}`}>
        <IconCircleCheck className="w-10 h-10 text-green-500 mx-auto mb-3" />
        <p className="text-sm font-semibold text-green-800 mb-1">
          {"We'll be in touch within 4 hours!"}
        </p>
        <p className="text-xs text-green-600 mb-4">
          Our team will review your enquiry and reach out shortly.
        </p>
        <Link
          href="/book-a-call"
          className="text-xs text-[var(--brand-primary)] underline underline-offset-2 hover:opacity-80 transition"
        >
          Want a faster response? Book a call directly →
        </Link>
      </div>
    )
  }

  return (
    <div className={`bg-[var(--brand-surface)] border border-border rounded-xl p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-1 text-foreground">{headline}</h3>
      <p className="text-sm text-muted-foreground mb-4">{subtext}</p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — visually hidden from real users */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          className="hidden"
          autoComplete="off"
        />

        {error && (
          <p role="alert" className="text-xs text-red-500 mb-3">
            {error}
          </p>
        )}

        <input
          type="text"
          aria-label="Full Name"
          required
          maxLength={100}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          placeholder="Your Name"
          className={inputClass}
        />

        <input
          type="email"
          aria-label="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder="your@email.com"
          className={inputClass}
        />

        <input
          type="tel"
          aria-label="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
          placeholder="+91 98765 43210"
          className={inputClass}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <IconLoader2 className="animate-spin w-4 h-4" />
              Sending...
            </>
          ) : (
            ctaLabel
          )}
        </button>
      </form>
    </div>
  )
}
