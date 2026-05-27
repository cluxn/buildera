"use client"

import { motion } from "motion/react"
import { TestimonialCard } from "@/components/ui/TestimonialCard"
import { IconStar } from "@tabler/icons-react"

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Buildera completely transformed our warehouse operations. The ERP system they built replaced our outdated spreadsheet tracking and cut our order processing time by nearly half. Their team understood our logistics workflow from day one — no hand-holding required.",
    name: "Rajiv Mehta",
    title: "Operations Director",
    company: "Nexgen Logistics Pvt. Ltd.",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "We needed a high-performance e-commerce platform that could handle seasonal spikes. Buildera delivered exactly that — fast, reliable, and beautiful. Our online sales have grown 60% since launch. The post-launch support alone has been worth every rupee.",
    name: "Priya Sharma",
    title: "Founder & CEO",
    company: "Craftique Retail",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "The Salesforce CRM implementation Buildera delivered has completely changed how our sales team operates. Pipeline visibility went from zero to real-time. We closed 3x more deals in the first quarter after go-live. Highly professional, deeply technical team.",
    name: "Arjun Kapoor",
    title: "VP of Sales",
    company: "Sterling Trade & Finance",
    rating: 5,
  },
]

const Y_OFFSETS = [40, 24, 56]
const DELAYS = [0, 0.15, 0.3]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            What Our Clients Say
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-6">
            Don&apos;t Take Our Word For It
          </h2>
          <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 w-fit mx-auto">
            <IconStar className="size-4 text-[var(--brand-primary)] fill-current" />
            <span className="text-sm font-medium text-foreground">4.9/5.0 on Clutch</span>
          </div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: Y_OFFSETS[index] }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: DELAYS[index],
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                company={testimonial.company}
                rating={testimonial.rating}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
