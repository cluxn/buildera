"use client"

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { IconX } from '@tabler/icons-react'
import { MiniLeadForm } from '@/components/ui/MiniLeadForm'

interface IdlePopupProps {
  headline: string
  subtext: string
  ctaLabel: string
  ctaHref: string
  idleMs?: number
}

export function IdlePopup({ headline, subtext, idleMs = 45000 }: IdlePopupProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check sessionStorage BEFORE setting up idle detection — prevents re-fire
    if (sessionStorage.getItem('idle-popup-shown')) return

    let timer: ReturnType<typeof setTimeout>

    const resetTimer = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        setIsOpen(true)
        sessionStorage.setItem('idle-popup-shown', '1')
      }, idleMs)
    }

    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'] as const
    events.forEach(e => document.addEventListener(e, resetTimer))
    resetTimer()

    return () => {
      clearTimeout(timer)
      events.forEach(e => document.removeEventListener(e, resetTimer))
    }
  }, [idleMs])

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
              Still Thinking?
            </p>
            <h2 className="text-2xl font-bold mb-2">{headline}</h2>
            <p className="text-sm text-muted-foreground mb-6">{subtext}</p>
            <MiniLeadForm sourceForm="idle-popup" headline="" subtext="" ctaLabel="Send My Details" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
