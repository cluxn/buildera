import { cn } from "@/lib/utils"
import { IconStar } from "@tabler/icons-react"

interface Props {
  quote: string
  name: string
  title: string
  company: string
  rating: number
  className?: string
}

export function TestimonialCard({ quote, name, title, company, rating, className }: Props) {
  return (
    <div className={cn("bg-white border border-border rounded-xl p-6 flex flex-col gap-4 shadow-sm h-full", className)}>
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStar
            key={i}
            className={cn(
              "size-4",
              i < rating
                ? "text-[var(--brand-primary)] fill-current"
                : "text-border"
            )}
          />
        ))}
      </div>
      <blockquote className="text-foreground text-sm leading-relaxed line-clamp-6 flex-1 overflow-hidden">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-auto">
        <p className="font-semibold text-sm text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground">{title}, {company}</p>
      </div>
    </div>
  )
}
