import type { Metadata } from 'next'
import { getGuides } from '@/lib/api'
import { generateSeoMetadata } from '@/lib/seo'
import { GuideCard } from '@/components/content/GuideCard'
import { ResourceTypeFilterTabs } from '@/components/content/ResourceTypeFilterTabs'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { SortDropdown } from '@/components/blog/SortDropdown'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SearchInput } from '@/components/ui/SearchInput'
import { PageHero } from '@/components/sections/PageHero'
import { Suspense } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'guides', {
    title: 'Guides & Resources — Buildera',
    description: 'Practical guides, checklists, and templates for SMB software decisions.',
    path: '/guides',
  })
}

type Props = { searchParams: Promise<{ category?: string; resource_type?: string; page?: string; q?: string; sort?: string }> }

export default async function GuidesPage({ searchParams }: Props) {
  const { category, resource_type, page, q, sort } = await searchParams
  const currentPage = parseInt(page ?? '1', 10) || 1

  const guidesData = await getGuides(currentPage, category, resource_type, q, sort)

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides & Resources' }]} />

      <PageHero
        eyebrow="Guides & Resources"
        heading="Tools to Help You Make Better Tech Decisions"
        description="Free guides, checklists, and templates from the Buildera team — no fluff."
      />

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <ResourceTypeFilterTabs activeType={resource_type ?? ''} />
            <div className="sm:ml-auto flex items-center gap-3">
              <Suspense>
                <SearchInput placeholder="Search guides..." />
              </Suspense>
              <Suspense>
                <SortDropdown />
              </Suspense>
            </div>
          </div>

          {q && (
            <p className="text-sm text-muted-foreground mb-6">
              {guidesData.total} result{guidesData.total !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
            </p>
          )}

          {guidesData.data.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">
              {q ? `No guides found for "${q}".` : 'No resources found for this type yet.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {guidesData.data.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
            </div>
          )}

          <Suspense>
            <BlogPagination
              currentPage={guidesData.current_page}
              lastPage={guidesData.last_page}
              baseUrl="/guides"
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
