import Link from "next/link"
import { cn } from "@/lib/utils"

interface Props {
  name: string
  slug: string
  parentSlug: string
  description?: string
  icon?: React.ReactNode
  className?: string
}

export function ServiceCard({ name, slug, parentSlug, description, icon, className }: Props) {
  return (
    <Link
      href={`/services/${parentSlug}/${slug}`}
      className={cn(
        "group relative flex flex-col gap-4 p-5 rounded-xl bg-card overflow-hidden",
        "border border-border",
        "hover:border-[var(--brand-primary)] hover:-translate-y-1",
        "hover:shadow-[0_8px_30px_hsl(217_91%_60%/18%)]",
        "transition-all duration-250",
        className
      )}
    >
      {/* Top gradient accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--brand-gradient-from)] to-[var(--brand-gradient-to)] opacity-0 group-hover:opacity-100 transition-opacity duration-250" />

      {/* Subtle bg glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-surface)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none" />

      {/* Icon */}
      {icon && (
        <div className="relative w-10 h-10 rounded-lg bg-[var(--brand-surface)] flex items-center justify-center group-hover:bg-[var(--brand-primary)] transition-colors duration-250">
          <span className="[&_svg]:text-[var(--brand-primary)] group-hover:[&_svg]:text-white [&_svg]:transition-colors [&_svg]:duration-250">
            {icon}
          </span>
        </div>
      )}

      {/* Text */}
      <div className="relative flex flex-col gap-1.5 flex-1">
        <p className="font-semibold text-foreground text-sm leading-snug">{name}</p>
        {description && (
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{description}</p>
        )}
      </div>

      {/* Arrow CTA */}
      <div className="relative flex items-center gap-1 text-xs font-semibold text-[var(--brand-primary)]">
        <span>Learn More</span>
        <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
      </div>
    </Link>
  )
}
