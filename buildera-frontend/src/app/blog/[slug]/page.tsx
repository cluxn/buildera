import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getBlogPost, getBlogPosts } from '@/lib/api'
import { extractTocAndInjectIds } from '@/lib/toc'
import { BlogDetailHero } from '@/components/blog/BlogDetailHero'
import { BlogCtaBanner } from '@/components/sections/BlogCtaBanner'
import { CTASection } from '@/components/sections/CTASection'
import { AuthorBio } from '@/components/blog/AuthorBio'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { ExploreServicesSection } from '@/components/blog/ExploreServicesSection'
import { BlogShareButtons } from '@/components/blog/BlogShareButtons'
import { MiniLeadForm } from '@/components/ui/MiniLeadForm'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { JsonLd } from '@/components/ui/JsonLd'
import { TableOfContents } from '@/components/blog/TableOfContents'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getBlogPosts(1)
  return posts.data.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: 'Post Not Found | Buildera' }
  return {
    title: post.seo_title ?? `${post.title} | Buildera Blog`,
    description: post.seo_description ?? post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image_path ? [post.image_path] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const [post, relatedData] = await Promise.all([
    getBlogPost(slug),
    getBlogPosts(1),
  ])

  if (!post) notFound()

  const relatedPosts = relatedData.data
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3)

  const { items: tocItems, html: bodyWithIds } = extractTocAndInjectIds(post.body ?? '')

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://buildera.co'
  const postUrl = `${siteUrl}/blog/${post.slug}`

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    image: post.image_path || `${siteUrl}/og-image.png`,
    author: { '@type': 'Person', name: post.author?.name || 'Buildera Team' },
    publisher: { '@type': 'Organization', name: 'Buildera', logo: { '@type': 'ImageObject', url: `${siteUrl}/icon.svg` } },
    datePublished: post.published_at || new Date().toISOString(),
    dateModified: post.published_at || new Date().toISOString(),
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
  }

  return (
    <main>
      <JsonLd data={blogSchema} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
      <BlogDetailHero post={post} />

      <Suspense fallback={<div className="animate-pulse h-96 bg-muted rounded mx-auto max-w-3xl my-12" />}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

          {/* Mobile: TOC before content */}
          {tocItems.length > 0 && (
            <div className="lg:hidden mb-8">
              <TableOfContents items={tocItems} />
            </div>
          )}

          {/* 3-column grid on desktop */}
          <div className="lg:grid lg:grid-cols-[240px_1fr_240px] lg:gap-8">

            {/* Left sidebar — TOC + share + lead form (sticky) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-5">
                {tocItems.length > 0 && <TableOfContents items={tocItems} />}
                <BlogShareButtons title={post.title} url={postUrl} />
                <MiniLeadForm
                  sourceForm="blog-sidebar"
                  headline="Get a Free Consultation"
                  subtext="Tell us what you need — we'll respond within 4 hours."
                  ctaLabel="Talk to an Expert"
                />
              </div>
            </aside>

            {/* Center — blog content */}
            <article className="min-w-0">
              <div
                className="prose prose-slate prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: bodyWithIds }}
              />
              <BlogCtaBanner />
            </article>

            {/* Right — empty spacer to maintain 3-col symmetry */}
            <div className="hidden lg:block" />
          </div>
        </div>

        {post.author && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <AuthorBio author={post.author} />
          </div>
        )}

        {relatedPosts.length > 0 && (
          <section className="bg-[var(--brand-surface)] py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RelatedPosts posts={relatedPosts} />
            </div>
          </section>
        )}

        <ExploreServicesSection />

        <CTASection
          heading="Ready to Build Something?"
          description="Book a free discovery call and let's talk about your project."
        />
      </Suspense>
    </main>
  )
}
