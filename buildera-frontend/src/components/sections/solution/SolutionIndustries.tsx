import Link from 'next/link'
import {
  IconCoin, IconUsers, IconSchool, IconShoppingCart, IconScale,
  IconBuildingFactory2, IconHeartbeat, IconLeaf, IconShieldCheck,
  IconPlane, IconCode, IconArrowRight,
} from '@tabler/icons-react'

const INDUSTRIES = [
  { slug: 'fintech',           label: 'FinTech',               desc: 'Secure, AI-driven financial solutions',         Icon: IconCoin },
  { slug: 'hr-tech',           label: 'HRTech',                desc: 'Next-gen HR automation & analytics',            Icon: IconUsers },
  { slug: 'ed-tech',           label: 'EdTech',                desc: 'Scalable, data-smart learning platforms',       Icon: IconSchool },
  { slug: 'retail',            label: 'Retail & eCommerce',    desc: 'Seamless, insight-led commerce solutions',      Icon: IconShoppingCart },
  { slug: 'legal-tech',        label: 'LegalTech',             desc: 'Tech-driven, intelligent process automation',   Icon: IconScale },
  { slug: 'manufacturing',     label: 'Manufacturing',          desc: 'Smart, data-powered manufacturing & automation',Icon: IconBuildingFactory2 },
  { slug: 'healthcare',        label: 'Healthcare',             desc: 'Compliance-driven, AI-enabled healthcare',      Icon: IconHeartbeat },
  { slug: 'cleantech',         label: 'Cleantech',              desc: 'Data-driven sustainability & greentech',        Icon: IconLeaf },
  { slug: 'insur-tech',        label: 'InsurTech',              desc: 'Smart, ML-based insurance innovation',          Icon: IconShieldCheck },
  { slug: 'travel-hospitality',label: 'Travel & Hospitality',  desc: 'Digital, AI-assisted guest experiences',        Icon: IconPlane },
  { slug: 'software-hi-tech',  label: 'Software & Hi-Tech',    desc: 'Future-ready, AI-powered software innovation',  Icon: IconCode },
]

export function SolutionIndustries() {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Who This Is For
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built for Every Industry
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Deep domain expertise across sectors — so you work with a team that already understands your business context.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map(({ slug, label, desc, Icon }) => (
            <Link
              key={slug}
              href={`/industries/${slug}`}
              className="flex items-start gap-4 p-5 rounded-xl border border-border bg-background hover:border-[var(--brand-primary)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <span className="w-11 h-11 rounded-lg bg-[hsl(217_91%_60%/10%)] text-[var(--brand-primary)] flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--brand-primary)] group-hover:text-white transition-colors duration-200">
                <Icon size={22} />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
              </div>
            </Link>
          ))}

          {/* 12th tile — keeps the grid a clean 4x3 and links to the full industries list */}
          <Link
            href="/industries"
            className="flex items-center justify-between gap-4 p-5 rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg group"
            style={{ background: 'linear-gradient(135deg, var(--brand-gradient-from), var(--brand-gradient-to))' }}
          >
            <div>
              <p className="text-sm font-semibold">Explore All Industries</p>
              <p className="text-xs text-white/75 mt-1 leading-relaxed">See every sector we build for</p>
            </div>
            <span className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:bg-white/25 transition-colors duration-200">
              <IconArrowRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
