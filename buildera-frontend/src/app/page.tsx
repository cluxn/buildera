import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'
import { fetchSettings } from "@/lib/api"

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('homepage', 'homepage', {
    title: 'Buildera — IT Services & Custom Software',
    description: 'We build custom software, Salesforce solutions, DevOps pipelines, and AI agents for SMBs.',
    path: '/',
  })
}
import { JsonLd } from '@/components/ui/JsonLd'
import { HeroSection } from "@/components/sections/HeroSection"
import { StatsBarSection } from "@/components/sections/StatsBarSection"
import { ServicesTabSection } from "@/components/sections/ServicesTabSection"
import { SolutionsGridSection } from "@/components/sections/SolutionsGridSection"
import { ClientLogosMarquee } from "@/components/sections/ClientLogosMarquee"
import { WhyBuilderaSection } from "@/components/sections/WhyBuilderaSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { TechStackSection } from "@/components/sections/TechStackSection"
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview"
import { ContactFormSection } from "@/components/sections/ContactFormSection"
import { CTASection } from "@/components/sections/CTASection"

export default async function HomePage() {
  const settings = await fetchSettings()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.company_name || 'Buildera',
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: settings.company_phone || '',
      contactType: 'customer service',
      email: settings.company_email || '',
    },
    sameAs: [settings.linkedin_url, settings.twitter_url, settings.instagram_url].filter(Boolean),
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: settings.company_name || 'Buildera',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/search?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.company_name || 'Buildera',
    url: siteUrl,
    telephone: settings.company_phone || '',
    email: settings.company_email || '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.company_address || '',
    },
    priceRange: '$$',
    openingHours: 'Mo-Fr 09:00-18:00',
    image: `${siteUrl}/og-image.png`,
  }

  return (
    <>
      <JsonLd data={[organizationSchema, websiteSchema, localBusinessSchema]} />
      <HeroSection />
      <StatsBarSection settings={settings} />
      <ServicesTabSection />
      <SolutionsGridSection />
      <ClientLogosMarquee />
      <WhyBuilderaSection />
      <TestimonialsSection />
      <TechStackSection />
      <CaseStudiesPreview />
      <ContactFormSection />
      <CTASection />
    </>
  )
}
