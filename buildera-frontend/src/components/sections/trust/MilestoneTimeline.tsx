"use client"

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

const MILESTONES = [
  {
    year: '2014',
    label: 'Founded',
    event: 'Founded in Mumbai — first project: inventory management for a textile exporter.',
  },
  {
    year: '2016',
    label: 'Salesforce',
    event: 'First Salesforce implementation; expanded operations to Delhi and Bengaluru.',
  },
  {
    year: '2019',
    label: '100 Clients',
    event: 'Crossed 100 clients and launched our AI agent development practice.',
  },
  {
    year: '2022',
    label: 'Global',
    event: 'Expanded globally — active clients in UAE, UK, and Southeast Asia.',
  },
  {
    year: '2024',
    label: '800+ Projects',
    event: '800+ projects delivered; team of 60+ engineers across 4 cities.',
  },
]

function MilestoneItem({
  year,
  label,
  event,
  index,
}: {
  year: string
  label: string
  event: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isLeft = index % 2 === 0

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] items-start gap-0 mb-16 last:mb-0">

      {/* Left slot */}
      {isLeft ? (
        <motion.div
          className="pr-8 text-right"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Card year={year} label={label} event={event} align="right" />
        </motion.div>
      ) : (
        <div />
      )}

      {/* Center dot */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: 'backOut', delay: 0.1 }}
      >
        <div
          className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg ring-4 ring-[var(--brand-surface)]"
          style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
        >
          {year.slice(2)}
        </div>
      </motion.div>

      {/* Right slot */}
      {!isLeft ? (
        <motion.div
          className="pl-8"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <Card year={year} label={label} event={event} align="left" />
        </motion.div>
      ) : (
        <div />
      )}
    </div>
  )
}

function Card({
  year,
  label,
  event,
  align,
}: {
  year: string
  label: string
  event: string
  align: 'left' | 'right'
}) {
  return (
    <div
      className={`group relative bg-background rounded-2xl border border-border p-5 shadow-sm hover:border-[var(--brand-primary)]/40 hover:shadow-md transition-all duration-200 ${align === 'right' ? 'text-right' : 'text-left'}`}
    >
      {/* Arrow connector */}
      <div
        className={`absolute top-4 ${align === 'right' ? '-right-3' : '-left-3'} w-3 h-3 rotate-45 bg-background border-t border-r ${align === 'right' ? 'border-border' : 'border-transparent border-b border-l border-border'}`}
        aria-hidden="true"
      />
      <div className="flex items-center gap-2 mb-2" style={{ justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        <span
          className="text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full"
          style={{ background: 'hsl(217 91% 60% / 10%)', color: 'var(--brand-primary)' }}
        >
          {label}
        </span>
        <span className="text-lg font-bold text-[var(--brand-primary)]">{year}</span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{event}</p>
    </div>
  )
}

export function MilestoneTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Milestones
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            A Decade of Shipping
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From a one-project start in Mumbai to 800+ deliveries across four cities — here&apos;s how we got here.
          </p>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">

          {/* Track line — static */}
          <div
            className="absolute left-1/2 top-6 bottom-6 w-px -translate-x-1/2 hidden md:block"
            style={{ background: 'hsl(217 91% 60% / 15%)' }}
            aria-hidden="true"
          />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-1/2 top-6 bottom-6 w-0.5 -translate-x-1/2 origin-top hidden md:block"
            style={{
              scaleY,
              background: 'linear-gradient(to bottom, var(--brand-gradient-from), var(--brand-gradient-to))',
            }}
            aria-hidden="true"
          />

          {/* Mobile: single left line */}
          <div
            className="absolute left-6 top-6 bottom-6 w-px md:hidden"
            style={{ background: 'hsl(217 91% 60% / 20%)' }}
            aria-hidden="true"
          />

          {/* Desktop: alternating cards */}
          <div className="hidden md:block">
            {MILESTONES.map((m, i) => (
              <MilestoneItem key={m.year} {...m} index={i} />
            ))}
          </div>

          {/* Mobile: single column */}
          <div className="md:hidden space-y-8 pl-16">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="relative">
                {/* Dot */}
                <motion.div
                  className="absolute -left-[52px] top-3 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md ring-4 ring-[var(--brand-surface)]"
                  style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.35, ease: 'backOut' }}
                >
                  {m.year.slice(2)}
                </motion.div>

                <motion.div
                  className="bg-background rounded-xl border border-border p-4 shadow-sm"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] opacity-70">{m.label}</span>
                    <span className="font-bold text-[var(--brand-primary)]">{m.year}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.event}</p>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
