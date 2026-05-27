import { IconCheck } from "@tabler/icons-react"

export function StatsBadgeStrip() {
  return (
    <div className="flex flex-wrap gap-3 items-center text-sm text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <IconCheck className="size-3.5 text-[var(--brand-primary)]" />
        <span>150+ Projects Delivered</span>
      </span>
      <span className="mx-1 text-border" aria-hidden="true">·</span>
      <span className="flex items-center gap-1.5">
        <IconCheck className="size-3.5 text-[var(--brand-primary)]" />
        <span>50+ Happy Clients</span>
      </span>
      <span className="mx-1 text-border" aria-hidden="true">·</span>
      <span className="flex items-center gap-1.5">
        <IconCheck className="size-3.5 text-[var(--brand-primary)]" />
        <span>98% Client Satisfaction</span>
      </span>
    </div>
  )
}
