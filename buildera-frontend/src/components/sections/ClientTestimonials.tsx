"use client"

import { motion } from "motion/react"
import { IconStar, IconQuote } from "@tabler/icons-react"
import type { Testimonial } from '@/lib/api'

interface Props {
  testimonials: Testimonial[]
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar
          key={i}
          className={`size-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  )
}

export function ClientTestimonials({ testimonials }: Props) {
  if (!testimonials.length) return null

  const featured = testimonials[0]
  const rest = testimonials.slice(1, 4)

  return (
    <section
      className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: "#F3F6FC" }}
    >
      <div
        className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 7%), transparent 70%)", filter: "blur(80px)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Client Results
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Trusted by Businesses Like Yours
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-5">
            Real outcomes from real clients — see what working with Buildera looks like in practice.
          </p>
          <div className="inline-flex items-center gap-2 border border-[var(--brand-primary)]/20 bg-white rounded-full px-4 py-2 shadow-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <IconStar key={i} className="size-3.5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground/70">4.9 / 5.0 on Clutch</span>
          </div>
        </motion.div>

        {/* Featured testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative rounded-2xl p-8 lg:p-10 mb-6 overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(217 91% 60% / 8%), hsl(242 75% 40% / 5%))",
            border: "1px solid hsl(217 91% 60% / 20%)",
          }}
        >
          <IconQuote className="absolute top-6 right-8 size-20 text-[var(--brand-primary)]/8" aria-hidden="true" />

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              {featured.service_category && (
                <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-3 py-1 rounded-full mb-5">
                  {featured.service_category}
                </span>
              )}
              <StarRow rating={featured.rating} />
              <blockquote className="mt-4 text-lg lg:text-xl text-foreground leading-relaxed font-medium">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
            </div>
            <div className="lg:w-56 flex-shrink-0 lg:pt-12">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                <div>
                  <p className="font-semibold text-foreground">{featured.person_name}</p>
                  {featured.person_title && (
                    <p className="text-xs text-muted-foreground mt-0.5">{featured.person_title}</p>
                  )}
                  {featured.company && (
                    <p className="text-xs text-[var(--brand-primary)] font-medium mt-0.5">{featured.company}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Supporting cards */}
        {rest.length > 0 && (
          <div className={`grid gap-5 ${rest.length === 1 ? 'md:grid-cols-1 max-w-md' : rest.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
            {rest.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-4 rounded-xl p-6 bg-white"
                style={{
                  border: "1px solid hsl(220 13% 91%)",
                  boxShadow: "0 1px 4px hsl(220 13% 80% / 30%)",
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <StarRow rating={t.rating} />
                  {t.service_category && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-2 py-0.5 rounded-full flex-shrink-0">
                      {t.service_category}
                    </span>
                  )}
                </div>

                <blockquote className="text-sm text-foreground/75 leading-relaxed flex-1 line-clamp-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-2 border-t border-border">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.person_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {[t.person_title, t.company].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <a href="/testimonials" className="btn-primary">
            Read All Client Stories →
          </a>
        </motion.div>

      </div>
    </section>
  )
}
