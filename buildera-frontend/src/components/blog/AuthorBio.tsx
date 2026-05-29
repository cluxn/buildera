import Image from 'next/image'
import { IconUser, IconExternalLink } from '@tabler/icons-react'
import type { BlogPostDetail } from '@/lib/api'

type Author = BlogPostDetail['author']

export function AuthorBio({ author }: { author: Author }) {
  if (!author) return null

  return (
    <div className="bg-[var(--brand-surface)] rounded-2xl p-6 flex gap-4 items-start">
      {author.avatar ? (
        <Image src={author.avatar} alt={author.name} width={64} height={64} sizes="64px" className="rounded-full flex-shrink-0 object-cover" />
      ) : (
        <div className="w-16 h-16 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center flex-shrink-0">
          <IconUser size={32} className="text-[var(--brand-primary)]" />
        </div>
      )}
      <div>
        <p className="font-semibold">{author.name}</p>
        {author.role && <p className="text-sm text-[var(--brand-primary)]">{author.role}</p>}
        {author.bio && <p className="text-sm text-muted-foreground mt-2">{author.bio}</p>}
        {author.linkedin_url && (
          <a
            href={author.linkedin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--brand-primary)] hover:underline mt-2 inline-flex items-center gap-1"
          >
            View on LinkedIn <IconExternalLink size={12} />
          </a>
        )}
      </div>
    </div>
  )
}
