"use client"

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { IconCalendar } from '@tabler/icons-react'

export function FloatingCTA() {
  const [isEnabled, setIsEnabled] = useState(true) // default to showing
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings`)
        const data = await r.json()
        if (typeof data?.floating_cta_enabled === 'boolean') {
          setIsEnabled(data.floating_cta_enabled)
        }
      } catch {
        // API unavailable — keep default (show)
      }
    }
    load()

    // Slightly after WhatsApp widget (3s) to stagger entrance
    const timer = setTimeout(() => setIsVisible(true), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || !isEnabled) {
    return null
  }

  return (
    <motion.div
      className="fixed bottom-20 right-6 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <Link
        href="/contact"
        className="relative flex items-center gap-2 px-5 py-3 rounded-full shadow-lg text-white text-sm font-semibold"
        style={{
          background: 'linear-gradient(135deg, var(--brand-primary) 0%, #4f46e5 100%)',
        }}
        aria-label="Book a discovery call with Buildera"
      >
        {/* Pulse ring for attention */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: 'var(--brand-primary)' }}
          aria-hidden="true"
        />
        <IconCalendar className="w-4 h-4 text-white relative z-10" />
        <span className="relative z-10">Book a Call</span>
      </Link>
    </motion.div>
  )
}
