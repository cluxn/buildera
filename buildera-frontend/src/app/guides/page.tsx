import type { Metadata } from 'next'
import { getGuides } from '@/lib/api'
import { generateSeoMetadata } from '@/lib/seo'
import { GuideCard } from '@/components/content/GuideCard'
import { ResourceTypeFilterTabs } from '@/components/content/ResourceTypeFilterTabs'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'guides', {
    title: 'Guides & Resources — Buildera',
    description: 'Practical guides, checklists, and templates for SMB software decisions.',
    path: '/guides',
  })
}

type Props = { searchParams: Promise<{ category?: string; resource_type?: string; page?: string }> }

export default async function GuidesPage({ searchParams }: Props) {
  const { category, resource_type, page } = await searchParams
  const currentPage = parseInt(page ?? '1', 10) || 1

  const guidesData = await getGuides(currentPage, category, resource_type)

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Guides & Resources' }]} />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">GUIDES & RESOURCES</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Tools to Help You Make Better Tech Decisions</h1>
            <p className="text-lg text-muted-foreground">Free guides, checklists, and templates from the Buildera team — no fluff.</p>
          </div>

          <ResourceTypeFilterTabs activeType={resource_type ?? ''} />

          {guidesData.data.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">No resources found for this type yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {guidesData.data.map((guide) => <GuideCard key={guide.id} guide={guide} />)}
            </div>
          )}

          <BlogPagination
            currentPage={guidesData.current_page}
            lastPage={guidesData.last_page}
            baseUrl="/guides"
          />
        </div>
      </section>
    </main>
  )
}
