import type { BlogPost } from '@/lib/api'
import { BlogPostCard } from '@/components/blog/BlogPostCard'

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">More From Our Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => <BlogPostCard key={post.id} post={post} />)}
      </div>
    </div>
  )
}
