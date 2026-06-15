import { IconPhoto } from '@tabler/icons-react'

export function ImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[var(--brand-surface)] text-muted-foreground ${className}`}>
      <IconPhoto size={32} className="opacity-40" />
      <span className="text-xs font-medium opacity-60">Image</span>
    </div>
  )
}
