"use client"

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { IconBrandWhatsapp } from '@tabler/icons-react'

export function WhatsAppWidget() {
  const [number, setNumber] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    fetch('/api/whatsapp', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => { if (d.number && d.enabled) setNumber(d.number) })
      .catch(() => {})

    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || !number) return null

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <a
        href={`https://wa.me/${number}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative group block"
      >
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-foreground text-background text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
          Chat on WhatsApp
        </span>
        <div className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110">
          <IconBrandWhatsapp className="w-7 h-7 text-white" />
        </div>
      </a>
    </motion.div>
  )
}
