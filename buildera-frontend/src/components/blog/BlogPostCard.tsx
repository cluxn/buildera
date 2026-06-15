import Image from 'next/image'
import Link from 'next/link'
import type { BlogPost } from '@/lib/api'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group relative bg-background border border-border rounded-xl overflow-hidden hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-all duration-200 flex flex-col">
      <div className="relative h-48 bg-[var(--brand-surface)]">
        {post.image_path ? (
          <Image
            src={post.image_path}
            alt={post.image_alt ?? post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[var(--brand-primary)] text-white text-xs font-semibold capitalize">
          {post.category?.replace(/-/g, ' ')}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap mt-auto">
          {post.author && (
            <>
              {post.author.avatar && (
                <Image src={post.author.avatar} alt={post.author.name} width={20} height={20} sizes="20px" className="rounded-full" />
              )}
              <span className="font-medium text-foreground">{post.author.name}</span>
              <span>·</span>
            </>
          )}
          {post.published_at && <span>{formatDate(post.published_at)}</span>}
          <span>·</span>
          <span>{post.reading_time} min read</span>
        </div>
      </div>
    </Link>
  )
}
