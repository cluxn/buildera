'use client'

import { useState, useEffect } from 'react'

export interface CookieConsent {
  essential: true
  analytics: boolean
  marketing: boolean
}

const STORAGE_KEY = 'cookie-consent'

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  const saveConsent = (consent: Omit<CookieConsent, 'essential'>) => {
    const full: CookieConsent = { essential: true, ...consent }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(full))
    window.dispatchEvent(new CustomEvent('cookie-consent-update', { detail: full }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 bg-white border-t border-border shadow-2xl md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground mb-1">We use cookies</p>
            <p className="text-sm text-muted-foreground">
              We use cookies to improve your experience, analyse site usage, and personalise content.
              {' '}
              <button
                className="underline text-[var(--brand-primary)] hover:no-underline"
                onClick={() => setShowDetails(!showDetails)}
              >
                Manage preferences
              </button>
            </p>

            {showDetails && (
              <div className="mt-3 flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-not-allowed">
                  <input type="checkbox" checked readOnly className="accent-[var(--brand-primary)]" />
                  <span><strong>Essential</strong> — Required for the site to function</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="accent-[var(--brand-primary)]"
                  />
                  <span><strong>Analytics</strong> — Google Analytics, Microsoft Clarity (site usage)</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="accent-[var(--brand-primary)]"
                  />
                  <span><strong>Marketing</strong> — Retargeting pixels (Facebook, LinkedIn, Google Ads)</span>
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => saveConsent({ analytics: false, marketing: false })}
              className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
            >
              Essential only
            </button>
            <button
              onClick={() => saveConsent({ analytics, marketing })}
              className="px-4 py-2 text-sm bg-[var(--brand-primary)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              {showDetails ? 'Save preferences' : 'Accept all'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
