import { fetchSettings } from "@/lib/api"
import { HeroSection } from "@/components/sections/HeroSection"
import { StatsBarSection } from "@/components/sections/StatsBarSection"
import { ServicesTabSection } from "@/components/sections/ServicesTabSection"
import { SolutionsGridSection } from "@/components/sections/SolutionsGridSection"
import { ClientLogosMarquee } from "@/components/sections/ClientLogosMarquee"
import { WhyBuilderaSection } from "@/components/sections/WhyBuilderaSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
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
      <CaseStudiesPreview />
      <ContactFormSection />
      <CTASection />
    </>
  )
}
