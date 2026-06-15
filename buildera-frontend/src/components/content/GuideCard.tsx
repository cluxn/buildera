import Image from 'next/image'
import Link from 'next/link'
import type { Guide } from '@/lib/api'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

const TYPE_COLORS: Record<string, string> = {
  article: 'bg-blue-100 text-blue-700',
  template: 'bg-green-100 text-green-700',
  checklist: 'bg-yellow-100 text-yellow-700',
  video: 'bg-red-100 text-red-700',
}

export function GuideCard({ guide }: { guide: Guide }) {
  const typeColor = TYPE_COLORS[guide.resource_type?.toLowerCase()] ?? 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'

  return (
    <Link href={`/guides/${guide.slug}`} className="group relative bg-background border border-border rounded-xl overflow-hidden hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-all duration-200 flex flex-col">
      <div className="relative h-48 bg-[var(--brand-surface)]">
        {guide.cover_image ? (
          <Image
            src={guide.cover_image}
            alt={guide.cover_image_alt ?? guide.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
        <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${typeColor}`}>
          {guide.resource_type}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-muted-foreground mb-1 capitalize">{guide.category?.replace(/-/g, ' ')}</p>
        <h3 className="text-lg font-semibold leading-snug mb-2 group-hover:text-[var(--brand-primary)] transition-colors">
          {guide.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{guide.description}</p>
      </div>
    </Link>
  )
}
