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

  const dismiss = () => {
    setIsOpen(false)
    localStorage.setItem('idle-popup-dismissed', '1')
  }

  useEffect(() => {
    // Once the user has dismissed the popup (any session), never show it again
    if (localStorage.getItem('idle-popup-dismissed')) return

    let timer: ReturnType<typeof setTimeout>

    const resetTimer = () => {
      if (localStorage.getItem('idle-popup-dismissed')) return
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (localStorage.getItem('idle-popup-dismissed')) return
        localStorage.setItem('idle-popup-dismissed', '1')
        setIsOpen(true)
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
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') dismiss() }
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
            onClick={dismiss}
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
              onClick={dismiss}
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
