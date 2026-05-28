"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { IconX } from '@tabler/icons-react'
import { SETTINGS_FALLBACK } from '@/lib/api'
import type { Settings } from '@/lib/api'

export function NudgeBanner() {
  const [settings, setSettings] = useState<Settings>(SETTINGS_FALLBACK)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('nudge-banner-dismissed')) {
      setDismissed(true)
      return
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
      .then(r => r.json())
      .then(data => setSettings({ ...SETTINGS_FALLBACK, ...data }))
      .catch(() => {})
  }, [])

  const handleDismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('nudge-banner-dismissed', '1')
  }

  const isExpired = settings.nudge_banner_expires_at
    ? new Date() > new Date(settings.nudge_banner_expires_at)
    : false

  if (dismissed || !settings.nudge_banner_enabled || isExpired || !settings.nudge_banner_text) {
    return null
  }

  return (
    <div className="relative z-50 bg-[var(--brand-primary)] text-white text-sm py-2.5 px-4 text-center">
      <div className="container mx-auto max-w-7xl flex items-center justify-center gap-4">
        {settings.nudge_banner_link ? (
          <Link href={settings.nudge_banner_link} className="hover:underline font-medium">
            {settings.nudge_banner_text}
          </Link>
        ) : (
          <span className="font-medium">{settings.nudge_banner_text}</span>
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
