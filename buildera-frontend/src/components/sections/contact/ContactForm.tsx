"use client"

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { IconLoader2 } from '@tabler/icons-react'

const SERVICE_OPTIONS = [
  'Website Development',
  'Salesforce Development',
  'DevOps & Cloud',
  'AI Agent Development',
  'Software Development',
  'Hire a Developer',
  'Other',
]

export function ContactForm() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [serviceInterest, setServiceInterest] = useState('')
  const [message, setMessage] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // UTM params — stored in refs to avoid re-render flicker
  const utmSource = useRef('')
  const utmMedium = useRef('')
  const utmCampaign = useRef('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    utmSource.current = params.get('utm_source') ?? ''
    utmMedium.current = params.get('utm_medium') ?? ''
    utmCampaign.current = params.get('utm_campaign') ?? ''
  }, [])

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent transition disabled:opacity-60 disabled:cursor-not-allowed'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          company: company || undefined,
          message,
          source_form: 'contact-page',
          service_interest: serviceInterest || undefined,
          utm_source: utmSource.current || undefined,
          utm_medium: utmMedium.current || undefined,
          utm_campaign: utmCampaign.current || undefined,
          website, // honeypot — backend drops if non-empty
        }),
      })

      if (res.status === 201) {
        router.push('/thank-you')
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

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight mb-2 text-foreground">Send Us a Message</h2>
      <p className="text-muted-foreground text-sm mb-8">
        Fill in the form and we&apos;ll get back to you within 4 business hours.
      </p>

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
          <div role="alert" className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              aria-label="Full Name"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              placeholder="Jane Smith"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              aria-label="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              placeholder="jane@company.com"
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-1.5">
              Phone Number
            </label>
            <input
              id="contact-phone"
              type="tel"
              aria-label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={isLoading}
              placeholder="+91 82994 06767"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="contact-company" className="block text-sm font-medium text-foreground mb-1.5">
              Company Name
            </label>
            <input
              id="contact-company"
              type="text"
              aria-label="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              disabled={isLoading}
              placeholder="Acme Corp"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="contact-service" className="block text-sm font-medium text-foreground mb-1.5">
            Service Interest
          </label>
          <select
            id="contact-service"
            aria-label="Service Interest"
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
            disabled={isLoading}
            className={inputClass}
          >
            <option value="">Select a service (optional)</option>
            {SERVICE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="contact-message"
            aria-label="Message"
            required
            rows={5}
            maxLength={2000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
            placeholder="Tell us about your project, what you're trying to build, and any timeline or budget considerations..."
            className={inputClass}
          />
        </div>

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
            'Send Message →'
          )}
        </button>
      </form>
    </div>
  )
}
