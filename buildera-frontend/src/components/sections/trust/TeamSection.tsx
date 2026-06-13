import { IconUser } from '@tabler/icons-react'

const TEAM = [
  {
    name: 'Founder / Lead Architect',
    role: 'Founder',
    bio: '12 years building enterprise software. Obsessed with clean architecture and honest client communication.',
  },
  {
    name: 'Head of Delivery',
    role: 'Delivery',
    bio: "Ex-consultant who joined to build, not to deck. Owns project timelines and client happiness.",
  },
  {
    name: 'Technical Lead',
    role: 'Engineering',
    bio: "Full-stack engineer who's shipped systems processing ₹500Cr+ in transactions. Prefers boring, reliable tech.",
  },
]

export function TeamSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            THE TEAM
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            People Who Ship, Not Just Plan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Engineers, designers, and strategists who&apos;ve shipped software across manufacturing,
            retail, and healthcare — with a dedicated PM, lead dev, and QA on every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="bg-[var(--brand-surface)] rounded-xl p-6 text-center"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 rounded-full bg-[var(--brand-primary)]/10 mx-auto mb-4 flex items-center justify-center">
                <IconUser className="w-12 h-12 text-[var(--brand-primary)]" />
              </div>
              <p className="font-semibold mb-1">{member.name}</p>
              <p className="text-sm text-[var(--brand-primary)] mb-2">{member.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
