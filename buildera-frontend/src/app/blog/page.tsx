import type { Metadata } from 'next'
import { getBlogPosts, getBlogCategories } from '@/lib/api'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import { CategoryFilterTabs } from '@/components/blog/CategoryFilterTabs'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const metadata: Metadata = {
  title: 'Blog | Buildera',
  description: 'Insights on software development, Salesforce, DevOps, and AI automation for Indian SMBs.',
}

type Props = { searchParams: Promise<{ category?: string; page?: string }> }

export default async function BlogPage({ searchParams }: Props) {
  const { category, page } = await searchParams
  const currentPage = parseInt(page ?? '1', 10) || 1

  const [postsData, categories] = await Promise.all([
    getBlogPosts(currentPage, category),
    getBlogCategories(),
  ])

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">BLOG</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Insights for Indian SMBs</h1>
            <p className="text-lg text-muted-foreground">Practical guides, case study breakdowns, and industry analysis — written by the team building the software.</p>
          </div>

          <CategoryFilterTabs categories={categories} activeCategory={category ?? ''} />

          {postsData.data.length === 0 ? (
            <p className="text-muted-foreground text-center py-16">No posts found in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {postsData.data.map((post) => <BlogPostCard key={post.id} post={post} />)}
            </div>
          )}

          <BlogPagination
            currentPage={postsData.current_page}
            lastPage={postsData.last_page}
            baseUrl="/blog"
            category={category}
          />
        </div>
      </section>
    </main>
  )
}
