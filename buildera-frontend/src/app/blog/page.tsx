import type { Metadata } from 'next'
import { getBlogPosts, getBlogCategories } from '@/lib/api'
import { generateSeoMetadata } from '@/lib/seo'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { CategoryFilterTabs } from '@/components/blog/CategoryFilterTabs'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { SearchInput } from '@/components/ui/SearchInput'
import { Suspense } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'blog', {
    title: 'Blog — IT Insights from Buildera',
    description: "Read Buildera's blog for practical guides, case studies, and IT insights for SMB decision-makers.",
    path: '/blog',
  })
}

type Props = { searchParams: Promise<{ category?: string; page?: string; q?: string }> }

export default async function BlogPage({ searchParams }: Props) {
  const { category, page, q } = await searchParams
  const currentPage = parseInt(page ?? '1', 10) || 1

  const [postsData, categories] = await Promise.all([
    getBlogPosts(currentPage, category, q),
    getBlogCategories(),
  ])

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="max-w-2xl mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">BLOG</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Insights for Indian SMBs</h1>
            <p className="text-lg text-muted-foreground">Practical guides, case study breakdowns, and industry analysis — written by the team building the software.</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <CategoryFilterTabs categories={categories} activeCategory={category ?? ''} />
            <div className="sm:ml-auto">
              <Suspense>
                <SearchInput placeholder="Search articles..." />
              </Suspense>
            </div>
          </div>

          {q && (
            <p className="text-sm text-muted-foreground mb-6">
              {postsData.total} result{postsData.total !== 1 ? 's' : ''} for &ldquo;{q}&rdquo;
            </p>
          )}

          {postsData.data.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">
              {q ? `No articles found for "${q}".` : 'No posts found in this category yet.'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {postsData.data.map((post) => <BlogPostCard key={post.id} post={post} />)}
            </div>
          )}

          <Suspense>
            <BlogPagination
              currentPage={postsData.current_page}
              lastPage={postsData.last_page}
              baseUrl="/blog"
              category={category}
            />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
