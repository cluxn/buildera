import { IconMail, IconBrandWhatsapp, IconMapPin } from '@tabler/icons-react'

interface Props {
  whatsappNumber: string
  email?: string
}

export function ContactInfo({ whatsappNumber, email }: Props) {
  return (
    <div className="bg-[var(--brand-surface)] py-8 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Email */}
        <div className="bg-background rounded-xl p-5 border border-border flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
            <IconMail className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Email Us</p>
            <a
              href={`mailto:${email ?? 'info@buildera.co'}`}
              className="text-sm text-[var(--brand-primary)] hover:underline"
            >
              {email ?? 'info@buildera.co'}
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="bg-background rounded-xl p-5 border border-border flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
            <IconBrandWhatsapp className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">WhatsApp</p>
            {whatsappNumber ? (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--brand-primary)] hover:underline"
              >
                Chat on WhatsApp
              </a>
            ) : (
              <p className="text-sm text-muted-foreground">Available on request</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="bg-background rounded-xl p-5 border border-border flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] flex items-center justify-center shrink-0">
            <IconMapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-foreground text-sm mb-1">Office</p>
            <p className="text-sm text-muted-foreground">
              India — serving clients remotely and on-site
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
