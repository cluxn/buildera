"use client"

import { useEffect, useState } from 'react'
import { ExitIntentPopup } from './ExitIntentPopup'
import { IdlePopup } from './IdlePopup'
import { SETTINGS_FALLBACK } from '@/lib/api'
import type { Settings } from '@/lib/api'

export function PopupManager() {
  const [settings, setSettings] = useState<Settings>(SETTINGS_FALLBACK)

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
        const data = await r.json()
        setSettings({ ...SETTINGS_FALLBACK, ...data })
      } catch {
        // API unavailable — use fallback silently
      }
    }
    load()
  }, [])

  return (
    <>
      {settings.popup_exit_enabled && (
        <ExitIntentPopup
          headline={settings.popup_exit_headline || 'Wait — Before You Go'}
          subtext={settings.popup_exit_subtext || 'Book a free 15-minute discovery call. No commitment, no sales pitch.'}
          ctaLabel={settings.popup_exit_cta || 'Book a Free Call'}
          ctaHref="/contact"
          showForm={true}
        />
      )}
      {settings.popup_idle_enabled && (
        <IdlePopup
          headline={settings.popup_idle_headline || 'Still Thinking It Over?'}
          subtext={settings.popup_idle_subtext || "Let us make it easier. Drop your details and we'll reach out with answers."}
          ctaLabel="Send My Details"
          ctaHref="/contact"
          idleMs={45000}
        />
      )}
    </>
  )
}
