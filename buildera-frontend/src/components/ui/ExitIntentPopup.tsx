"use client"

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconX } from '@tabler/icons-react'
import Link from 'next/link'
import { MiniLeadForm } from '@/components/ui/MiniLeadForm'

interface ExitIntentPopupProps {
  headline: string
  subtext: string
  ctaLabel: string
  ctaHref: string
  showForm?: boolean
}

export function ExitIntentPopup({ headline, subtext, ctaLabel, ctaHref, showForm = false }: ExitIntentPopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check sessionStorage BEFORE registering listener — prevents re-fire in same session
    if (sessionStorage.getItem('exit-popup-shown')) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true)
        sessionStorage.setItem('exit-popup-shown', '1')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="relative bg-background border border-border rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              aria-label="Close"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
            >
              <IconX className="w-5 h-5" />
            </button>
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
              Wait — Before You Go
            </p>
            <h2 className="text-2xl font-bold mb-2">{headline}</h2>
            <p className="text-sm text-muted-foreground mb-6">{subtext}</p>
            {showForm ? (
              <MiniLeadForm sourceForm="exit-intent-popup" headline="" subtext="" ctaLabel="Book Now" />
            ) : (
              <Link
                href={ctaHref}
                className="inline-flex w-full items-center justify-center px-6 py-3 rounded-lg bg-[var(--brand-primary)] text-white font-semibold hover:opacity-90 transition"
                onClick={() => setIsOpen(false)}
              >
                {ctaLabel}
              </Link>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
