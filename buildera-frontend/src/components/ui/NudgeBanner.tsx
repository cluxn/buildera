"use client"

import { useState } from 'react'
import Link from 'next/link'
import { IconX } from '@tabler/icons-react'

interface Props {
  enabled: boolean
  text: string
  link: string
  expiresAt: string
}

export function NudgeBanner({ enabled, text, link, expiresAt }: Props) {
  const [dismissed, setDismissed] = useState(
    typeof window !== 'undefined' && !!sessionStorage.getItem('nudge-banner-dismissed')
  )

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('nudge-banner-dismissed', '1')
  }

  const isExpired = expiresAt ? new Date() > new Date(expiresAt) : false

  if (dismissed || !enabled || isExpired || !text) {
    return null
  }

  return (
    <div className="relative z-50 bg-[var(--brand-primary)] text-white text-sm py-2.5 px-4 text-center">
      <div className="container mx-auto max-w-7xl flex items-center justify-center gap-4">
        {link ? (
          <Link href={link} className="hover:underline font-medium">
            {text}
          </Link>
        ) : (
          <span className="font-medium">{text}</span>
        )}
        <button
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition"
        >
          <IconX className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
