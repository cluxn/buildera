import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'
import { fetchSettings } from '@/lib/api'
import { JsonLd } from '@/components/ui/JsonLd'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { ContactHero } from '@/components/sections/contact/ContactHero'
import { ContactForm } from '@/components/sections/contact/ContactForm'
import { ContactInfo } from '@/components/sections/contact/ContactInfo'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'contact', {
    title: 'Contact Buildera — Book a Free Discovery Call',
    description: 'Get in touch with Buildera. Book a free discovery call or send a message — we reply within 4 business hours.',
    path: '/contact',
  })
}

export default async function ContactPage() {
  const settings = await fetchSettings()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.company_name || 'Buildera',
    url: siteUrl,
    telephone: settings.company_phone || '',
    email: settings.company_email || '',
    address: { '@type': 'PostalAddress', streetAddress: settings.company_address || '' },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    image: `${siteUrl}/og-image.png`,
  }

  return (
    <main>
      <JsonLd data={localBusinessSchema} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]} />
      <ContactHero />

      <section id="contact-form" className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ContactForm />
            </div>

            {/* Info panel */}
            <div className="lg:col-span-2 flex flex-col justify-between gap-6">
              <ContactInfo whatsappNumber={settings.whatsapp_number} email={settings.company_email} phone={settings.company_phone} />

              {/* Response guarantee card */}
              <div className="bg-background rounded-xl p-6 border border-border">
                <h3 className="font-semibold mb-2 text-foreground">Our Response Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  We respond to every enquiry within 4 business hours. If we don&apos;t, your first
                  consultation call is on us.
                </p>
              </div>

              {/* Extra trust signals */}
              <div className="space-y-3">
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
