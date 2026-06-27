import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'

interface Props {
  email?: string
  phone?: string
  address?: string
}

export function ContactInfo({ email, phone, address }: Props) {
  return (
    <div className="space-y-4">
        {/* Email */}
        <div className="bg-background rounded-xl p-5 border border-border flex items-start gap-4">
          {/* A11Y: decorative icon badge — aria-hidden, not a tap target */}
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0" aria-hidden="true">
            <IconMail className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Email Us</p>
            {/* A11Y-01: use brand-primary-dark (hsl 221 83% 40%) for small link text on white — passes WCAG AA 4.5:1 */}
            <a
              href={`mailto:${email ?? 'info@buildera.co'}`}
              className="text-sm text-[var(--brand-primary-dark)] hover:underline"
            >
              {email ?? 'info@buildera.co'}
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="bg-background rounded-xl p-5 border border-border flex items-start gap-4">
          {/* A11Y: decorative icon badge — aria-hidden, not a tap target */}
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0" aria-hidden="true">
            <IconMapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Office</p>
            <p className="text-sm text-muted-foreground">
              {address || 'India — serving clients remotely and on-site'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">IST (UTC+5:30) · Mon–Fri 9am–6pm</p>
          </div>
        </div>

      {/* Phone */}
      {phone && (
        <div className="bg-background rounded-xl p-5 border border-border flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0" aria-hidden="true">
            <IconPhone className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Call Us</p>
            <a
              href={`tel:${phone}`}
              className="text-sm text-[var(--brand-primary-dark)] hover:underline min-h-[48px] inline-flex items-center"
            >
              {phone}
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
