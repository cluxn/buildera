interface CTASectionProps {
  heading?: string
  description?: string
}

export function CTASection({
  heading = "Ready to build something that grows your business?",
  description = "Book a free 30-minute discovery call. No pressure, no pitch deck — just a conversation about what you need.",
}: CTASectionProps) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-white/60 uppercase tracking-widest font-medium mb-4">
          Ready to Start?
        </p>
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">
          {heading}
        </h2>
        <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
          {description}
        </p>
        <a
          href="/contact"
          className="relative inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] font-semibold px-8 py-4 rounded-lg transition-all duration-200 overflow-hidden min-h-[48px] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_hsl(221_83%_53%/40%)]"
        >
          Book a Free Discovery Call
        </a>
      </div>
    </section>
  )
}
