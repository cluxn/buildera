import Image from 'next/image'
import type { BlogPostDetail } from '@/lib/api'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function BlogDetailHero({ post }: { post: BlogPostDetail }) {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="inline-block text-xs bg-[var(--brand-primary)] text-white px-2 py-0.5 rounded-full font-semibold mb-4 capitalize">
          {post.category?.replace(/-/g, ' ')}
        </span>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap mb-8">
          {post.author && (
            <>
              {post.author.avatar && (
                <Image src={post.author.avatar} alt={post.author.name} width={24} height={24} sizes="24px" className="rounded-full" />
              )}
              <span className="font-medium text-foreground">{post.author.name}</span>
              <span>·</span>
            </>
          )}
          {post.published_at && <span>{formatDate(post.published_at)}</span>}
          <span>·</span>
          <span>{post.reading_time} min read</span>
          <span>·</span>
          <span className="capitalize">{post.category?.replace(/-/g, ' ')}</span>
        </div>
        <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mt-4">
          {post.image_path ? (
            <Image
              src={post.image_path}
              alt={post.image_alt ?? post.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </div>
    </section>
  )
}
