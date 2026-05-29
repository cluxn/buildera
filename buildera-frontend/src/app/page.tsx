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

  return (
    <>
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
