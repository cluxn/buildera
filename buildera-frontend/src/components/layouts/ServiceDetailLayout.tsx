import { VideoEmbed } from '@/components/ui/VideoEmbed'
import { ServiceHero } from '@/components/sections/service/ServiceHero'
import { ServicePainPoints } from '@/components/sections/service/ServicePainPoints'
import { ServiceOutcomeCards } from '@/components/sections/service/ServiceOutcomeCards'
import { ServiceProcess } from '@/components/sections/service/ServiceProcess'
import { ServiceIndustries } from '@/components/sections/service/ServiceIndustries'
import { ServiceRelatedSolutions } from '@/components/sections/service/ServiceRelatedSolutions'
import { ServiceCaseStudy } from '@/components/sections/service/ServiceCaseStudy'
import { ServiceTestimonials } from '@/components/sections/service/ServiceTestimonials'
import { ServiceFaq } from '@/components/sections/service/ServiceFaq'
import { TechShowcase } from '@/components/sections/service/TechShowcase'
import { ServiceCta } from '@/components/sections/service/ServiceCta'
import { CATEGORY_LABELS } from '@/data/services/index'
import type { ServicePageData, TestimonialData, CaseStudyData } from '@/types/service-page'

interface Props {
  data: ServicePageData
  testimonials: TestimonialData[]
  caseStudy: CaseStudyData | null
}

export function ServiceDetailLayout({ data, testimonials, caseStudy }: Props) {
  const categoryLabel = CATEGORY_LABELS[data.categorySlug] ?? data.categorySlug

  return (
    <main>
      <ServiceHero data={data} />
      <ServicePainPoints points={data.painPoints} />
      <ServiceOutcomeCards cards={data.outcomeCards} />
      <ServiceProcess steps={data.processSteps} />
      {data.videoUrl && <VideoEmbed url={data.videoUrl} />}
      <ServiceIndustries />
      <ServiceRelatedSolutions solutions={data.relatedSolutions} />
      {caseStudy && <ServiceCaseStudy caseStudy={caseStudy} />}
      {testimonials.length > 0 && <ServiceTestimonials testimonials={testimonials} />}
      <ServiceFaq items={data.faqItems} />
      <TechShowcase technologies={data.technologies} />
      <ServiceCta headline={data.ctaHeadline} subtext={data.ctaSubtext} />
    </main>
  )
}
