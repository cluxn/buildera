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
        "flex flex-col gap-3 p-4 rounded-lg border border-border bg-card",
        "hover:shadow-[0_0_0_2px_var(--brand-primary)] hover:-translate-y-1",
        "transition-all duration-200",
        className
      )}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <p className="font-semibold text-foreground text-sm">{name}</p>
      {description && (
        <p className="text-muted-foreground text-xs line-clamp-1">{description}</p>
      )}
      <span className="text-xs font-medium text-[var(--brand-primary)] mt-auto">
        Learn More →
      </span>
    </Link>
  )
}
