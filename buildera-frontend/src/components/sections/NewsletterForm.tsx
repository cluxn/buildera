"use client"

import { useState, FormEvent } from 'react'
import { cn } from '@/lib/utils'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subscribers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })

      if (res.status === 201 || res.status === 200) {
        setStatus('success')
        setMessage("You're subscribed! Expect practical IT insights, not spam.")
      } else if (res.status === 422) {
        setStatus('success')
        setMessage("You're already subscribed — thank you!")
      } else if (res.status === 429) {
        setStatus('error')
        setMessage('Too many requests. Please try again later.')
      } else {
        throw new Error('Unexpected response')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return <p className="text-sm text-green-400">{message}</p>
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          aria-label="Email address for newsletter"
          disabled={status === 'loading'}
          className={cn(
            "bg-slate-800 border border-slate-700 text-white placeholder-slate-500",
            "rounded-lg px-4 py-2.5 text-sm min-h-[48px]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent",
            "w-full sm:w-64 disabled:opacity-60"
          )}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary whitespace-nowrap !px-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p role="alert" className="text-xs text-red-400">{message}</p>
      )}
    </div>
  )
}
