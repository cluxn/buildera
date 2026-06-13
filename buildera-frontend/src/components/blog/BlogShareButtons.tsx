'use client'

import { IconBrandFacebook, IconBrandX, IconBrandLinkedin, IconBrandPinterest, IconShare3 } from '@tabler/icons-react'

interface Props {
  title: string
  url: string
}

export function BlogShareButtons({ title, url }: Props) {
  const enc = encodeURIComponent
  const links = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      icon: IconBrandFacebook,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
      icon: IconBrandX,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      icon: IconBrandLinkedin,
    },
    {
      label: 'Pinterest',
      href: `https://pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(title)}`,
      icon: IconBrandPinterest,
    },
  ]

  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center gap-2 mb-3">
        <IconShare3 size={14} className="text-muted-foreground" />
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Share</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {links.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${label}`}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-[var(--brand-primary)] hover:border-[var(--brand-primary)]/40 transition-colors"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>
    </div>
  )
}
