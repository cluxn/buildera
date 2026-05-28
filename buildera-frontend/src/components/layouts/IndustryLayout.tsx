import { IndustryHero } from '@/components/sections/industry/IndustryHero'
import { IndustryChallenges } from '@/components/sections/industry/IndustryChallenges'
import { IndustryOverview } from '@/components/sections/industry/IndustryOverview'
import { IndustrySolutions } from '@/components/sections/industry/IndustrySolutions'
import { IndustryServices } from '@/components/sections/industry/IndustryServices'
import { IndustryProcess } from '@/components/sections/industry/IndustryProcess'
import { IndustryCta } from '@/components/sections/industry/IndustryCta'
import type { IndustryPageData } from '@/types/service-page'

interface Props { data: IndustryPageData }

export function IndustryLayout({ data }: Props) {
  return (
    <main>
      {/* 1 — Hero + stats strip */}
      <IndustryHero data={data} />

      {/* 2 — Challenges with icons */}
      <IndustryChallenges challenges={data.challenges} industryName={data.name} />

      {/* 3 — Why Buildera + delivery process card */}
      <IndustryOverview data={data} />

      {/* 4 — Industry-built solutions grid */}
      <IndustrySolutions solutions={data.solutions} />

      {/* 5 — Services with icons */}
      <IndustryServices services={data.services} />

      {/* 6 — How we work (4-step process) */}
      <IndustryProcess />

      {/* 7 — CTA with trust signals */}
      <IndustryCta headline={data.ctaHeadline} industryName={data.name} />
    </main>
  )
}
