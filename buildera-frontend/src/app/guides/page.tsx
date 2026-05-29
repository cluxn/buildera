import type { Metadata } from 'next'
import { getGuides } from '@/lib/api'
import { generateSeoMetadata } from '@/lib/seo'
import { GuideCard } from '@/components/content/GuideCard'
import { ResourceTypeFilterTabs } from '@/components/content/ResourceTypeFilterTabs'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SearchInput } from '@/components/ui/SearchInput'
import { Suspense } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'guides', {
    title: 'Guides & Resources — Buildera',
    description: 'Practical guides, checklists, and templates for SMB software decisions.',
    path: '/guides',
  })
}

type Props = { searchParams: Promise<{ category?: string; resource_type?: string; page?: string; q?: string }> }

export default async function GuidesPage({ searchParams }: Props) {
  const { category, resource_type, page, q } = await searchParams
  const currentPage = parseInt(page ?? '1', 10) || 1

  const guidesData = await getGuides(currentPage, category, resource_type, q)

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides & Resources' }]} />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">GUIDES & RESOURCES</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Tools to Help You Make Better Tech Decisions</h1>
            <p className="text-lg text-muted-foreground">Free guides, checklists, and templates from the Buildera team — no fluff.</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <ResourceTypeFilterTabs activeType={resource_type ?? ''} />
            <div className="sm:ml-auto">
              <Suspense>
                <SearchInput placeholder="Search guides..." />
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
