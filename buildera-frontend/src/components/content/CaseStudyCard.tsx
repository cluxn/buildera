import Image from 'next/image'
import Link from 'next/link'
import type { ContentCaseStudy } from '@/lib/api'

export function CaseStudyCard({ study }: { study: ContentCaseStudy }) {
  return (
    <Link href={`/case-studies/${study.slug}`} className="group relative bg-background border border-border rounded-xl overflow-hidden hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-all duration-200 flex flex-col">
      <div className="relative h-48 bg-[var(--brand-surface)]">
        {study.hero_image && (
          <Image
            src={study.hero_image}
            alt={study.hero_image_alt ?? study.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        )}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-[var(--brand-primary)] text-white text-xs font-semibold capitalize">
          {study.industry}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        {study.client_name && (
          <p className="text-xs text-muted-foreground mb-1">{study.client_name}</p>
        )}
        <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-[var(--brand-primary)] transition-colors flex-1">
          {study.title}
        </h3>
        {study.key_metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {study.key_metrics.slice(0, 2).map((m, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-semibold">
                {m.value} {m.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
