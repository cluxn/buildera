import { SolutionHero } from '@/components/sections/solution/SolutionHero'
import { SolutionProblem } from '@/components/sections/solution/SolutionProblem'
import { SolutionFeatures } from '@/components/sections/solution/SolutionFeatures'
import { SolutionPreviewSection } from '@/components/sections/solution/SolutionPreviewSection'
import { SolutionIndustries } from '@/components/sections/solution/SolutionIndustries'
import { SolutionRelatedServices } from '@/components/sections/solution/SolutionRelatedServices'
import { SolutionCaseStudy } from '@/components/sections/solution/SolutionCaseStudy'
import { ClientTestimonials } from '@/components/sections/ClientTestimonials'
import { ServiceCta } from '@/components/sections/service/ServiceCta'
import type { SolutionPageData, CaseStudyData } from '@/types/service-page'
import type { Testimonial } from '@/lib/api'

interface Props {
  data: SolutionPageData
  testimonials: Testimonial[]
  caseStudy: CaseStudyData | null
}

export function SolutionDetailLayout({ data, testimonials, caseStudy }: Props) {
  return (
    <main>
      <SolutionHero data={data} />
      <SolutionProblem points={data.problemPoints} />
      <SolutionFeatures title={data.title} cards={data.featureCards} />
      <SolutionPreviewSection
        title={data.title}
        tableTitle={data.previewTableTitle}
        tableRows={data.previewTableRows}
        stats={data.previewStats}
        bars={data.previewBars}
        eyebrow={data.previewEyebrow}
        heading={data.previewHeading}
        description={data.previewDescription}
      />
      <SolutionIndustries />
      <SolutionRelatedServices services={data.relatedServices} />
      {caseStudy && <SolutionCaseStudy caseStudy={caseStudy} />}
      {testimonials.length > 0 && <ClientTestimonials testimonials={testimonials} />}
      <ServiceCta headline={data.ctaHeadline} />
    </main>
  )
}
