'use client'

import { motion } from 'motion/react'

interface PreviewRow {
  label: string
  qty: number
  prev: number
  highlight?: boolean
}

interface StatTile {
  label: string
  value: string
  color: string
}

interface BarItem {
  label: string
  value: string
  pct: number
}

interface Props {
  title: string
  tableTitle?: string
  tableRows?: PreviewRow[]
  stats?: StatTile[]
  bars?: BarItem[]
  eyebrow?: string
  heading?: string
  description?: string
}

const DEFAULT_ROWS: PreviewRow[] = [
  { label: 'Pending Orders', qty: 36, prev: 24, highlight: true },
  { label: 'In Transit', qty: 18, prev: 21 },
  { label: 'Completed Today', qty: 89, prev: 72 },
  { label: 'Returned Items', qty: 12, prev: 15 },
]

const DEFAULT_STATS: StatTile[] = [
  { label: 'Total Revenue', value: '₹4.2L', color: 'text-[var(--brand-primary)]' },
  { label: 'Active Vendors', value: '28', color: 'text-emerald-600' },
  { label: 'Open POs', value: '14', color: 'text-amber-600' },
  { label: 'Overdue Tasks', value: '3', color: 'text-red-500' },
]

const DEFAULT_BARS: BarItem[] = [
  { label: 'Operations', value: '84 units', pct: 84 },
  { label: 'Logistics', value: '62 units', pct: 62 },
  { label: 'Finance', value: '91 units', pct: 91 },
  { label: 'HR Tasks', value: '47 units', pct: 47 },
]

export function SolutionPreviewSection({
  title,
  tableTitle,
  tableRows = DEFAULT_ROWS,
  stats = DEFAULT_STATS,
  bars = DEFAULT_BARS,
  eyebrow = 'What You Get',
  heading = 'See It Before You Build It',
  description = 'A look at how your business data flows through a Buildera-built system — clean, real-time, and built around your workflow.',
}: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            {eyebrow}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{heading}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{description}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-stretch">

          {/* Left — data table card */}
          <motion.div
            className="rounded-2xl border border-border bg-background overflow-hidden shadow-sm flex flex-col h-full"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Table header bar */}
            <div className="flex items-center gap-2 px-5 py-3 bg-foreground">
              <span className="w-3 h-3 rounded-full bg-red-400" />
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <span className="w-3 h-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-semibold text-white/70 tracking-wide">
                {tableTitle ?? `${title} — Live Dashboard`}
              </span>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-3 border-b border-border bg-[var(--brand-surface)] text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              <span>Item</span>
              <span className="text-center">Previous</span>
              <span className="text-center w-16">Today</span>
            </div>

            {/* Rows */}
            {tableRows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_auto_auto] gap-4 px-5 py-4 border-b border-border last:border-0 items-center"
              >
                <span className="text-sm text-foreground">{row.label}</span>
                <span className="text-sm text-muted-foreground text-center">
                  {row.prev}
                </span>
                <span className={`w-16 text-center text-sm font-bold rounded-lg py-1 ${row.highlight ? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]' : 'text-foreground'}`}>
                  {row.qty}
                </span>
              </div>
            ))}

            <div className="flex-1" />

            {/* Action bar */}
            <div className="flex items-center gap-3 px-5 py-4 bg-[var(--brand-surface)] border-t border-border">
              <button className="flex-1 py-2.5 rounded-lg bg-[var(--brand-primary)] text-white text-sm font-semibold">
                Save Entry
              </button>
              <button className="flex-1 py-2.5 rounded-lg border border-border bg-background text-sm font-medium text-foreground">
                Export CSV
              </button>
            </div>

            {/* Trust badge */}
            <div className="px-5 pb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                500+ businesses live on Buildera
              </span>
            </div>
          </motion.div>

          {/* Right — stats + bar chart stacked */}
          <div className="flex flex-col gap-6">

            {/* Stat tiles */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {stats.map((s, i) => (
                <div key={i} className="rounded-xl border border-border bg-background p-5">
                  <p className="text-xs text-muted-foreground mb-2 min-h-[2rem]">{s.label}</p>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Progress bar card */}
            <motion.div
              className="rounded-2xl border border-border bg-background p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-5 rounded-full bg-[var(--brand-primary)]" />
                <p className="text-sm font-semibold text-foreground">Daily Performance</p>
              </div>
              <div className="space-y-4">
                {bars.map((b, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-foreground">{b.label}</span>
                      <span className="text-sm font-semibold text-[var(--brand-primary)]">{b.value}</span>
                    </div>
                    <div className="h-2 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--brand-primary)]"
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                <span>✓</span>
                <span>Data synced and locked for today</span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
