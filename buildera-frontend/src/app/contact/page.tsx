import type { Metadata } from 'next'
import { fetchSettings } from '@/lib/api'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { ContactInfo } from '@/components/sections/contact/ContactInfo'

export const metadata: Metadata = {
  title: 'Contact Us | Buildera',
  description: 'Get in touch with Buildera. Tell us what you\'re building and we\'ll respond within 4 business hours with a clear next step.',
}

export default async function ContactPage() {
  const settings = await fetchSettings()

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
      <ContactHero />

      <section className="py-16 bg-background">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Info panel */}
            <div className="lg:col-span-2">
              <ContactInfo whatsappNumber={settings.whatsapp_number} />

              {/* Response guarantee card */}
              <div className="mt-6 bg-[var(--brand-surface)] rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2 text-foreground">Our Response Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  We respond to every enquiry within 4 business hours. If we don&apos;t, your first
                  consultation call is on us.
                </p>
              </div>

              {/* Extra trust signals */}
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" aria-hidden="true" />
                  150+ projects delivered across 6 service lines
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" aria-hidden="true" />
                  98% client satisfaction rate
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" aria-hidden="true" />
                  NDA available before any technical discussion
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
