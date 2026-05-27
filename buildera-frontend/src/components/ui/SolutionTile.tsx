import Link from "next/link"
import { cn } from "@/lib/utils"

interface Props {
  name: string
  slug: string
  icon: React.ReactNode
  className?: string
}

export function SolutionTile({ name, slug, icon, className }: Props) {
  return (
    <Link
      href={`/solutions/${slug}`}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border border-border bg-card",
        "hover:shadow-[0_0_0_2px_var(--brand-primary)] hover:-translate-y-1",
        "transition-all duration-200",
        className
      )}
    >
      <div className="flex-shrink-0 text-[var(--brand-primary)] size-5">{icon}</div>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </Link>
  )
}
