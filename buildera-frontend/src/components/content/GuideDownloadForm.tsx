'use client'

import { useState, FormEvent } from 'react'
import Image from 'next/image'
import { IconLoader2, IconCircleCheck, IconDownload } from '@tabler/icons-react'

interface Props {
  guideTitle: string
  coverImage?: string | null
  sourceForm?: string
}

export function GuideDownloadForm({ guideTitle, coverImage, sourceForm = 'guide-download' }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [website, setWebsite] = useState('') // honeypot
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] transition'

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
          company: company || undefined,
          source_form: sourceForm,
          website,
        }),
      })

      if (res.status === 201) {
        setSuccess(true)
        return
      }
      if (res.status === 422) {
        setError("We already have your details — check your inbox!")
        return
      }
      if (res.status === 429) {
        setError('Too many requests. Please try again later.')
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
    <section className="py-16 bg-[var(--brand-surface)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — form */}
          <div className="bg-background rounded-2xl border border-border p-8 shadow-sm">
            {success ? (
              <div className="text-center py-8">
                <IconCircleCheck className="w-14 h-14 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">You&apos;re all set!</h3>
                <p className="text-muted-foreground text-sm">
                  Check your inbox — we&apos;ve sent the guide along with more practical resources for your business.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2 leading-tight">
                  Get Your Free Copy
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Fill in your details to download <span className="font-medium text-foreground">{guideTitle}</span>.
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Honeypot */}
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
                    <p role="alert" className="text-xs text-red-500">
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
                    placeholder="Full Name *"
                    className={inputClass}
                  />

                  <input
                    type="email"
                    aria-label="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    placeholder="Email Address *"
                    className={inputClass}
                  />

                  <input
                    type="text"
                    aria-label="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    disabled={isLoading}
                    placeholder="Company (optional)"
                    className={inputClass}
                  />

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-border accent-[var(--brand-primary)]"
                    />
                    <span className="text-sm text-muted-foreground">
                      I want to receive news and updates once in a while
                    </span>
                  </label>

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
                      <>
                        <IconDownload size={16} />
                        Download Now
                      </>
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="/privacy" className="underline hover:text-foreground transition-colors">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </>
            )}
          </div>

          {/* Right — guide cover image */}
          <div className="flex items-center justify-center">
            {coverImage ? (
              <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={coverImage}
                  alt={`${guideTitle} cover`}
                  fill
                  sizes="(max-width: 768px) 80vw, 400px"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full max-w-sm aspect-[3/4] rounded-2xl bg-gradient-to-br from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)] flex flex-col items-center justify-center p-10 text-white shadow-2xl">
                <IconDownload size={48} className="mb-4 opacity-80" />
                <p className="text-center font-semibold text-lg leading-snug">{guideTitle}</p>
                <p className="text-white/60 text-sm mt-2">Free Download</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
