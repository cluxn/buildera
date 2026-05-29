import Link from "next/link"
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
} from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import { fetchFooterLinks, fetchSettings } from "@/lib/api"
import type { FooterLink } from "@/lib/api"
import { NewsletterForm } from "@/components/sections/NewsletterForm"

// ─── Services sub-columns (grouped sub-service links) ────────────────────────

type FooterServiceGroup = { group: string; services: { label: string; url: string }[] }

const FOOTER_SERVICES_LEFT: FooterServiceGroup[] = [
  {
    group: 'Website Development',
    services: [
      { label: 'Custom Websites', url: '/services/website-development/custom-websites' },
      { label: 'E-Commerce Websites', url: '/services/website-development/ecommerce-websites' },
      { label: 'App Development', url: '/services/website-development/app-development' },
      { label: 'Progressive Web Apps', url: '/services/website-development/progressive-web-apps' },
    ],
  },
  {
    group: 'DevOps & Cloud',
    services: [
      { label: 'Cloud Infrastructure', url: '/services/devops-development/cloud-infrastructure' },
      { label: 'CI/CD Pipeline', url: '/services/devops-development/ci-cd-pipeline' },
      { label: 'Cloud Management', url: '/services/devops-development/cloud-management' },
      { label: 'Server Monitoring', url: '/services/devops-development/server-monitoring' },
    ],
  },
  {
    group: 'Hire a Developer',
    services: [
      { label: 'Dedicated Teams', url: '/services/hire-a-developer/dedicated-teams' },
      { label: 'Flexible Engagement', url: '/services/hire-a-developer/flexible-engagement' },
      { label: 'End-to-End Support', url: '/services/hire-a-developer/end-to-end-support' },
    ],
  },
]

const FOOTER_SERVICES_RIGHT: FooterServiceGroup[] = [
  {
    group: 'Salesforce',
    services: [
      { label: 'Salesforce CRM', url: '/services/salesforce-development/crm' },
      { label: 'Marketing Cloud', url: '/services/salesforce-development/marketing-cloud' },
      { label: 'Service Cloud', url: '/services/salesforce-development/service-cloud' },
      { label: 'Commerce Cloud', url: '/services/salesforce-development/commerce-cloud' },
      { label: 'Experience Cloud', url: '/services/salesforce-development/experience-cloud' },
    ],
  },
  {
    group: 'AI Agent Dev',
    services: [
      { label: 'AI Agent Integration', url: '/services/ai-agent-development/ai-agent-integration' },
      { label: 'Custom API Integration', url: '/services/ai-agent-development/custom-api-integration' },
      { label: 'Business Optimization', url: '/services/ai-agent-development/business-optimization' },
      { label: 'AI Chatbots', url: '/services/ai-agent-development/ai-chatbots' },
    ],
  },
  {
    group: 'Software Dev',
    services: [
      { label: 'ERP Development', url: '/services/software-development/erp-development' },
      { label: 'CRM Development', url: '/services/software-development/crm-development' },
      { label: 'SaaS Development', url: '/services/software-development/saas-development' },
      { label: 'MVP Development', url: '/services/software-development/mvp-development' },
    ],
  },
]

// ─── Industries column (static) ──────────────────────────────────────────────

const FOOTER_INDUSTRIES = [
  { label: "Manufacturing", url: "/industries/manufacturing" },
  { label: "Retail & eCommerce", url: "/industries/retail" },
  { label: "Healthcare & Pharma", url: "/industries/healthcare" },
  { label: "Finance & BFSI", url: "/industries/finance" },
  { label: "Logistics & Supply Chain", url: "/industries/logistics" },
  { label: "Hospitality & Tourism", url: "/industries/hospitality" },
  { label: "Education & EdTech", url: "/industries/education" },
  { label: "Real Estate", url: "/industries/real-estate" },
]

// ─── Hardcoded fallback links (used when API returns empty) ──────────────────

const HARDCODED_FOOTER_LINKS: Record<FooterLink["column"], { label: string; url: string }[]> = {
  services: [],
  solutions: [
    { label: "CRM Solution", url: "/solutions/crm" },
    { label: "ERP Solution", url: "/solutions/erp" },
    { label: "Lead Management", url: "/solutions/lead-management" },
    { label: "Operations Management", url: "/solutions/operations-management" },
    { label: "HR Management", url: "/solutions/hr-management" },
    { label: "Warehouse Management", url: "/solutions/warehouse-management" },
    { label: "Inventory Management", url: "/solutions/inventory-management" },
    { label: "Liquor Shop Management", url: "/solutions/liquor-shop-management" },
  ],
  company: [
    { label: "About Us", url: "/about" },
    { label: "How We Work", url: "/how-we-work" },
    { label: "Case Studies", url: "/case-studies" },
    { label: "Testimonials", url: "/testimonials" },
  ],
  resources: [
    { label: "Blog", url: "/blog" },
    { label: "Guides", url: "/guides" },
    { label: "Contact Us", url: "/contact" },
  ],
}

const COLUMN_LABELS: Record<FooterLink["column"], string> = {
  services: "Services",
  solutions: "Solutions",
  company: "Company",
  resources: "Resources",
}

const NON_SERVICE_COLUMNS: FooterLink["column"][] = ["solutions", "company", "resources"]

// ─── SiteFooter ──────────────────────────────────────────────────────────────

export async function SiteFooter() {
  const [footerLinks, settings] = await Promise.all([
    fetchFooterLinks(),
    fetchSettings(),
  ])

  // Group API links by column, fall back to hardcoded if API returns empty
  const linksByColumn: Record<FooterLink["column"], { label: string; url: string }[]> =
    footerLinks.length > 0
      ? {
          services: footerLinks
            .filter((l) => l.column === "services")
            .sort((a, b) => a.display_order - b.display_order)
            .map(({ label, url }) => ({ label, url })),
          solutions: footerLinks
            .filter((l) => l.column === "solutions")
            .sort((a, b) => a.display_order - b.display_order)
            .map(({ label, url }) => ({ label, url })),
          company: footerLinks
            .filter((l) => l.column === "company")
            .sort((a, b) => a.display_order - b.display_order)
            .map(({ label, url }) => ({ label, url })),
          resources: footerLinks
            .filter((l) => l.column === "resources")
            .sort((a, b) => a.display_order - b.display_order)
            .map(({ label, url }) => ({ label, url })),
        }
      : HARDCODED_FOOTER_LINKS

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Top section: logo+info + 6 link columns (services spans 2) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-10 py-16">

          {/* Column 1: Brand + contact + social */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <Link href="/" className="w-fit">
              <span
                className="font-bold text-[1.2rem] tracking-tight select-none"
                style={{
                  backgroundImage: "linear-gradient(135deg, hsl(217,91%,68%) 0%, hsl(242,75%,58%) 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                Buildera
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              {settings.footer_tagline || "We build custom software, Salesforce solutions, AI agents, and dedicated dev teams for Indian SMBs that demand accountability and results."}
            </p>

            <div className="flex gap-3 mt-1">
              <a
                href={settings.linkedin_url || "https://linkedin.com/company/buildera"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Buildera on LinkedIn"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <IconBrandLinkedin className="size-5" />
              </a>
              <a
                href={settings.twitter_url || "https://twitter.com/buildera"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Buildera on Twitter"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <IconBrandTwitter className="size-5" />
              </a>
              <a
                href={settings.instagram_url || "https://instagram.com/buildera"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Buildera on Instagram"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <IconBrandInstagram className="size-5" />
              </a>
            </div>
          </div>

          {/* Columns 2–3: Services — spans 2 cols with 2 internal sub-columns */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:pr-8">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Services</h3>
            <div className="grid grid-cols-2 gap-x-8">
              {/* Left sub-column */}
              <div className="flex flex-col gap-5">
                {FOOTER_SERVICES_LEFT.map((group) => (
                  <div key={group.group}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
                      {group.group}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {group.services.map((link) => (
                        <li key={link.url}>
                          <Link href={link.url} className="text-xs text-slate-400 hover:text-white transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Right sub-column */}
              <div className="flex flex-col gap-5">
                {FOOTER_SERVICES_RIGHT.map((group) => (
                  <div key={group.group}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 mb-1.5">
                      {group.group}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {group.services.map((link) => (
                        <li key={link.url}>
                          <Link href={link.url} className="text-xs text-slate-400 hover:text-white transition-colors">
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Industries */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Industries</h3>
            <ul className="flex flex-col gap-2.5">
              {FOOTER_INDUSTRIES.map((link) => (
                <li key={link.url}>
                  <Link href={link.url} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columns 5–7: Products · Company · Resources */}
          {NON_SERVICE_COLUMNS.map((column) => (
            <div key={column} className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
                {COLUMN_LABELS[column]}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {linksByColumn[column].map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-slate-700" />

        {/* ── Newsletter strip ── */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 py-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-white">
              Stay updated with Buildera
            </p>
            <p className="text-sm text-slate-400">
              Get the latest insights on technology trends and business growth.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <Separator className="bg-slate-700" />

        {/* ── Bottom bar: attribution · copyright · legal links ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-3 py-6 text-xs text-slate-500">
          {/* Left */}
          <p className="lg:text-left text-center">
            Developed and managed by{" "}
            <a href="https://buildera.co" className="hover:text-white transition-colors">
              Buildera Technologies LLP
            </a>
          </p>
          {/* Center */}
          <p className="text-center">
            &copy; {currentYear} Buildera. All rights reserved.
          </p>
          {/* Right */}
          <div className="flex items-center justify-center lg:justify-end gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">|</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
