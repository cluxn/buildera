"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { IconStar, IconQuote } from "@tabler/icons-react"

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Buildera completely transformed our warehouse operations. The ERP system they built replaced our outdated spreadsheet tracking and cut our order processing time by nearly half. Their team understood our logistics workflow from day one — no hand-holding required.",
    name: "Rajiv Mehta",
    title: "Operations Director",
    company: "Nexgen Logistics Pvt. Ltd.",
    tag: "ERP & Operations",
    rating: 5,
    featured: true,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    quote:
      "We needed a high-performance e-commerce platform that could handle seasonal spikes. Buildera delivered exactly that — fast, reliable, and beautiful. Our online sales have grown 60% since launch. The post-launch support alone has been worth every rupee.",
    name: "Priya Sharma",
    title: "Founder & CEO",
    company: "Craftique Retail",
    tag: "E-Commerce",
    rating: 5,
    featured: false,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    quote:
      "The Salesforce CRM implementation Buildera delivered has completely changed how our sales team operates. Pipeline visibility went from zero to real-time. We closed 3× more deals in the first quarter after go-live.",
    name: "Arjun Kapoor",
    title: "VP of Sales",
    company: "Sterling Trade & Finance",
    tag: "Salesforce CRM",
    rating: 5,
    featured: false,
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    id: 4,
    quote:
      "Their AI chatbot integration saved our support team 20+ hours a week. Setup was seamless, training the bot on our data took days not months. Genuinely impressed by how quickly they understood our business context.",
    name: "Meera Nair",
    title: "Head of Customer Success",
    company: "Orbit SaaS Technologies",
    tag: "AI Agent Dev",
    rating: 5,
    featured: false,
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
]

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar
          key={i}
          className={`size-3.5 ${i < rating ? "text-amber-400 fill-amber-400" : "text-slate-600"}`}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const featured = TESTIMONIALS.find((t) => t.featured)!
  const rest = TESTIMONIALS.filter((t) => !t.featured)

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden"
      style={{ background: "#F3F6FC" }}
    >
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(217 91% 60% / 7%), transparent 70%)", filter: "blur(80px)" }}
        aria-hidden="true" />

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
            Client Stories
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Don&apos;t Take Our Word For It
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-5">
            Real feedback from business owners who trusted Buildera with their most critical systems.
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
          {/* Big decorative quote */}
          <IconQuote className="absolute top-6 right-8 size-20 text-[var(--brand-primary)]/8" aria-hidden="true" />

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-widest text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-3 py-1 rounded-full mb-5">
                {featured.tag}
              </span>
              <StarRow rating={featured.rating} />
              <blockquote className="mt-4 text-lg lg:text-xl text-foreground leading-relaxed font-medium">
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
            </div>
            <div className="lg:w-56 flex-shrink-0 lg:pt-12">
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-2">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--brand-primary)]/20">
                  <Image src={featured.avatar} alt={featured.name} width={48} height={48} sizes="48px" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{featured.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{featured.title}</p>
                  <p className="text-xs text-[var(--brand-primary)] font-medium mt-0.5">{featured.company}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 supporting cards */}
        <div className="grid md:grid-cols-3 gap-5">
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
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--brand-primary)] bg-[var(--brand-primary)]/10 px-2 py-0.5 rounded-full flex-shrink-0">
                  {t.tag}
                </span>
              </div>

              <blockquote className="text-sm text-foreground/75 leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--brand-primary)]/15">
                  <Image src={t.avatar} alt={t.name} width={36} height={36} sizes="36px" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title} · {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

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
