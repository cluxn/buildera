"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { IconCheck, IconLoader2, IconMail, IconPhone, IconMapPin } from "@tabler/icons-react"

type FormState = "idle" | "submitting" | "success" | "error"

const SERVICES = [
  "Website Development",
  "Salesforce Development",
  "DevOps Development",
  "AI Agent Development",
  "Software Development",
  "Hire a Developer",
  "Other",
]

export function ContactFormSection() {
  const [state, setState] = useState<FormState>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState("submitting")
    setErrorMsg("")

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      source_form: "homepage_contact",
      honeypot: (form.elements.namedItem("website") as HTMLInputElement).value,
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_API_KEY ?? "",
        },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Submission failed")
      setState("success")
    } catch {
      setState("error")
      setErrorMsg("Something went wrong. Please try again or email us directly.")
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-[var(--brand-surface)]" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Let&apos;s Build Something Together
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Tell us about your project and we&apos;ll get back to you within 24 hours with a clear plan.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-start">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {state === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 px-8 bg-white rounded-2xl border border-border text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <IconCheck className="size-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Message Received!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setState("idle")}
                  className="text-sm text-[var(--brand-primary)] hover:underline mt-2"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-border p-8 flex flex-col gap-5"
                noValidate
              >
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} aria-hidden="true" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-name" className="text-sm font-medium text-foreground">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Rajesh Kumar"
                      className="rounded-lg border border-border px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent min-h-[48px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-email" className="text-sm font-medium text-foreground">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      required
                      placeholder="rajesh@company.com"
                      className="rounded-lg border border-border px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent min-h-[48px]"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-phone" className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <input
                      id="cf-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="rounded-lg border border-border px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent min-h-[48px]"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="cf-company" className="text-sm font-medium text-foreground">
                      Company Name
                    </label>
                    <input
                      id="cf-company"
                      name="company"
                      type="text"
                      placeholder="Your Company"
                      className="rounded-lg border border-border px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent min-h-[48px]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-service" className="text-sm font-medium text-foreground">
                    Service You&apos;re Interested In
                  </label>
                  <select
                    id="cf-service"
                    name="service"
                    className="rounded-lg border border-border px-4 py-2.5 text-sm text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent min-h-[48px] appearance-none"
                  >
                    <option value="">Select a service...</option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="cf-message" className="text-sm font-medium text-foreground">
                    Tell us about your project <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Briefly describe what you need to build and your timeline..."
                    className="rounded-lg border border-border px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground bg-background focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent resize-none"
                  />
                </div>

                {state === "error" && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {state === "submitting" ? (
                    <span className="flex items-center gap-2">
                      <IconLoader2 className="size-4 animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          >
            <div className="bg-white rounded-2xl border border-border p-6 flex flex-col gap-5">
              <h3 className="font-bold text-foreground text-lg">Contact Information</h3>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--brand-surface)] flex items-center justify-center flex-shrink-0">
                  <IconMail className="size-4 text-[var(--brand-primary)]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Email</span>
                  <a href="mailto:hello@buildera.co" className="text-sm text-foreground hover:text-[var(--brand-primary)] transition-colors font-medium">
                    hello@buildera.co
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--brand-surface)] flex items-center justify-center flex-shrink-0">
                  <IconPhone className="size-4 text-[var(--brand-primary)]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Phone</span>
                  <a href="tel:+919876543210" className="text-sm text-foreground hover:text-[var(--brand-primary)] transition-colors font-medium">
                    +91 98765 43210
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[var(--brand-surface)] flex items-center justify-center flex-shrink-0">
                  <IconMapPin className="size-4 text-[var(--brand-primary)]" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Location</span>
                  <span className="text-sm text-foreground font-medium">Kanpur, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-border p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-2">Response Time</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We typically respond within <span className="text-foreground font-semibold">24 hours</span>. For urgent projects, call us directly or{" "}
                <a href="/book-a-call" className="text-[var(--brand-primary)] hover:underline font-medium">book a call</a>.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
