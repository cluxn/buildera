import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getBlogPost, getBlogPosts } from '@/lib/api'
import { BlogDetailHero } from '@/components/blog/BlogDetailHero'
import { InlineNewsletterBlock } from '@/components/blog/InlineNewsletterBlock'
import { BlogCtaBanner } from '@/components/sections/BlogCtaBanner'
import { AuthorBio } from '@/components/blog/AuthorBio'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { MiniLeadForm } from '@/components/ui/MiniLeadForm'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import Link from 'next/link'

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

  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Blog', href: '/blog' }, { label: post.title }]} />
      <BlogDetailHero post={post} />

      <article className="container mx-auto px-8 max-w-3xl py-12">
        <div className="my-10">
          <MiniLeadForm
            sourceForm="mini-cta"
            headline="Get a Free Software Consultation"
          />
        </div>

        <div
          className="prose prose-slate prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        <InlineNewsletterBlock />
        <BlogCtaBanner />
      </article>

      {post.author && (
        <div className="container mx-auto px-8 max-w-3xl pb-12">
          <AuthorBio author={post.author} />
        </div>
      )}

      {relatedPosts.length > 0 && (
        <section className="bg-[var(--brand-surface)] py-16">
          <div className="container mx-auto px-8">
            <RelatedPosts posts={relatedPosts} />
          </div>
        </section>
      )}

      <section className="py-20 bg-background text-center">
        <div className="container mx-auto px-8 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Something?</h2>
          <p className="text-muted-foreground mb-8">Book a free discovery call and let&apos;s talk about your project.</p>
          <Link
            href="/book-a-call"
            className="inline-flex items-center px-8 py-4 bg-[var(--brand-primary)] text-white font-semibold rounded-xl hover:bg-[var(--brand-primary-dark)] transition-colors"
          >
            Book a Free Call
          </Link>
        </div>
      </section>
    </main>
  )
}
