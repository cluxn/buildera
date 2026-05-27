import Link from "next/link"
import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandInstagram,
} from "@tabler/icons-react"
import { Separator } from "@/components/ui/separator"
import { fetchFooterLinks, fetchSettings } from "@/lib/api"
import type { FooterLink } from "@/lib/api"
import { cn } from "@/lib/utils"

// ─── Hardcoded fallback links (used when API returns empty) ──────────────────

const HARDCODED_FOOTER_LINKS: Record<FooterLink["column"], { label: string; url: string }[]> = {
  services: [
    { label: "Website Development", url: "/services/website-development" },
    { label: "Salesforce Development", url: "/services/salesforce-development" },
    { label: "DevOps Development", url: "/services/devops-development" },
    { label: "AI Agent Development", url: "/services/ai-agent-development" },
    { label: "Software Development", url: "/services/software-development" },
    { label: "Hire a Developer", url: "/services/hire-a-developer" },
  ],
  solutions: [
    { label: "CRM Solutions", url: "/solutions/crm-solutions" },
    { label: "E-Commerce", url: "/solutions/ecommerce" },
    { label: "AI Automation", url: "/solutions/ai-automation" },
    { label: "Cloud Infrastructure", url: "/solutions/cloud-infrastructure" },
    { label: "ERP Systems", url: "/solutions/erp-systems" },
    { label: "SaaS Development", url: "/solutions/saas-development" },
    { label: "View All Solutions", url: "/solutions" },
  ],
  company: [
    { label: "About Us", url: "/about" },
    { label: "How We Work", url: "/how-we-work" },
    { label: "Case Studies", url: "/case-studies" },
    { label: "Testimonials", url: "/testimonials" },
    { label: "FAQ", url: "/faq" },
  ],
  resources: [
    { label: "Blog", url: "/blog" },
    { label: "Guides", url: "/guides" },
    { label: "Contact Us", url: "/contact" },
    { label: "Book a Call", url: "/book-a-call" },
    { label: "Privacy Policy", url: "/privacy-policy" },
    { label: "Terms", url: "/terms" },
  ],
}

const COLUMN_LABELS: Record<FooterLink["column"], string> = {
  services: "Services",
  solutions: "Solutions",
  company: "Company",
  resources: "Resources",
}

const COLUMNS: FooterLink["column"][] = ["services", "solutions", "company", "resources"]

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

        {/* ── Top section: logo+info + 4 link columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 py-16">

          {/* Column 1: Brand + contact + social */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {/* Logo — SVG icon + wordmark */}
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="flex-shrink-0">
                <rect width="32" height="32" rx="8" fill="url(#footer-logo-grad)" />
                <text x="8" y="24" fontFamily="Inter, Arial, sans-serif" fontSize="20" fontWeight="700" fill="white">B</text>
                <defs>
                  <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="hsl(221,83%,63%)" />
                    <stop offset="100%" stopColor="hsl(243,72%,50%)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-white font-bold text-xl tracking-tight group-hover:text-white/90 transition-colors">
                buildera
              </span>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed">
              {settings.footer_tagline || "We build custom software, Salesforce solutions, AI agents, and dedicated dev teams for Indian SMBs that demand accountability and results."}
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              {(settings.phone || "+91 98765 43210") && (
                <a
                  href={`tel:${(settings.phone || "+91 98765 43210").replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.phone || "+91 98765 43210"}
                </a>
              )}
              {(settings.email || "hello@buildera.co") && (
                <a
                  href={`mailto:${settings.email || "hello@buildera.co"}`}
                  className="hover:text-white transition-colors"
                >
                  {settings.email || "hello@buildera.co"}
                </a>
              )}
              {(settings.address || "Kanpur, Uttar Pradesh, India") && (
                <address className="not-italic leading-relaxed">
                  {settings.address || "Kanpur, Uttar Pradesh, India"}
                </address>
              )}
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>

            {/* Social icons */}
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

          {/* Columns 2-5: Link columns */}
          {COLUMNS.map((column) => (
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
        {/* action="#" is an intentional Phase 3 visual stub — POST /api/subscribers wiring deferred to Phase 5 plan 05-04 */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 py-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-white">
              Stay updated with Buildera
            </p>
            <p className="text-sm text-slate-400">
              Get the latest insights on technology trends and business growth.
            </p>
          </div>
          <form
            action="#"
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              aria-label="Email address for newsletter"
              className={cn(
                "bg-slate-800 border border-slate-700 text-white placeholder-slate-500",
                "rounded-lg px-4 py-2.5 text-sm min-h-[48px]",
                "focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent",
                "w-full sm:w-64"
              )}
            />
            <button
              type="submit"
              className={cn(
                "bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-dark)] text-white px-5 py-2.5 rounded-lg font-medium",
                "min-h-[48px] text-sm whitespace-nowrap",
                "transition-colors"
              )}
            >
              Subscribe
            </button>
          </form>
        </div>

        <Separator className="bg-slate-700" />

        {/* ── Bottom bar: copyright · attribution · legal ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 py-6 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {settings.company_name}. All rights reserved.
          </p>
          <p>
            Developed and managed by{" "}
            <a href="https://buildera.co" rel="nofollow" className="hover:text-white transition-colors">
              Buildera Technologies LLP
            </a>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-600">&middot;</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
