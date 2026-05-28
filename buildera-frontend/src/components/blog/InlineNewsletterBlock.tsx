import { NewsletterForm } from '@/components/sections/NewsletterForm'

export function InlineNewsletterBlock() {
  return (
    <div className="rounded-2xl p-8 my-12" style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}>
      <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">NEWSLETTER</p>
      <h2 className="text-2xl font-bold text-white mb-2">Get SMB Tech Insights Weekly</h2>
      <p className="text-white/80 mb-6">Case studies, guides, and practical software advice — straight to your inbox. No spam.</p>
      <NewsletterForm />
    </div>
  )
}
