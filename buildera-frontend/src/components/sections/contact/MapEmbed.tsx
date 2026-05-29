'use client'

import { IconMapPin } from '@tabler/icons-react'

interface Props {
  address?: string
}

export function MapEmbed({ address }: Props) {
  const query = address
    ? encodeURIComponent(address)
    : encodeURIComponent('Mumbai, Maharashtra, India')

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-[var(--brand-surface)]">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border">
        <IconMapPin className="w-4 h-4 text-[var(--brand-primary)] shrink-0" />
        <p className="text-sm font-medium text-foreground truncate">
          {address || 'Mumbai, Maharashtra, India'}
        </p>
      </div>
      <iframe
        src={`https://maps.google.com/maps?q=${query}&output=embed&z=14`}
        width="100%"
        height="320"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Buildera office location"
        className="block border-0"
        aria-label="Map showing Buildera office location"
      />
    </div>
  )
}
