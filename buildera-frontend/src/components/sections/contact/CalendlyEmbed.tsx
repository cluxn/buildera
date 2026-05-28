"use client"

interface Props {
  calendlyUrl: string
}

export function CalendlyEmbed({ calendlyUrl }: Props) {
  if (!calendlyUrl) {
    return (
      <div className="flex items-center justify-center h-64 bg-[var(--brand-surface)] rounded-xl border border-border">
        <p className="text-muted-foreground text-sm text-center px-6">
          Booking calendar coming soon. Please email{' '}
          <a href="mailto:info@buildera.co" className="text-[var(--brand-primary)] hover:underline">
            info@buildera.co
          </a>{' '}
          to schedule a call.
        </p>
      </div>
    )
  }

  const embedUrl = calendlyUrl.includes('?')
    ? `${calendlyUrl}&embed_type=Inline&hide_event_type_details=1`
    : `${calendlyUrl}?embed_type=Inline&hide_event_type_details=1`

  return (
    <div className="rounded-xl overflow-hidden border border-border" style={{ minHeight: 700 }}>
      <iframe
        src={embedUrl}
        width="100%"
        height="700"
        frameBorder={0}
        title="Schedule a call with Buildera"
        loading="lazy"
      />
    </div>
  )
}
