import type { Metadata } from 'next'
import { getContentCaseStudies } from '@/lib/api'
import { CaseStudyCard } from '@/components/content/CaseStudyCard'
import { IndustryFilterTabs } from '@/components/content/IndustryFilterTabs'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Case Studies | Buildera',
  description: 'Real-world outcomes from Buildera projects across manufacturing, retail, finance, and more.',
}

type Props = { searchParams: Promise<{ industry?: string; page?: string }> }

export default async function CaseStudiesPage({ searchParams }: Props) {
  const { industry, page } = await searchParams
  const currentPage = parseInt(page ?? '1', 10) || 1

  const studiesData = await getContentCaseStudies(currentPage, industry)

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case Studies' }]} />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">CASE STUDIES</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Results We&apos;ve Delivered</h1>
            <p className="text-lg text-muted-foreground">Real projects, real outcomes — from warehouses in Delhi to trading floors in Mumbai.</p>
          </div>

          <IndustryFilterTabs activeIndustry={industry ?? ''} />

          {studiesData.data.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">No case studies found for this industry yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {studiesData.data.map((study) => <CaseStudyCard key={study.id} study={study} />)}
            </div>
          )}

          <BlogPagination
            currentPage={studiesData.current_page}
            lastPage={studiesData.last_page}
            baseUrl="/case-studies"
            category={industry}
          />
        </div>
      </section>
    </main>
  )
}
