import { Breadcrumb } from '@/components/ui/Breadcrumb'

import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'privacy', {
    title: 'Privacy Policy — Buildera',
    description: "Buildera's privacy policy — how we collect, use, and protect your personal data.",
    path: '/privacy',
  })
}

export default function PrivacyPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <article className="container mx-auto px-8 max-w-4xl py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: January 2025 &middot; Effective: January 2025</p>
        </header>

        <p className="text-muted-foreground mb-10 leading-relaxed text-base">
          Buildera Technologies LLP (&ldquo;Buildera&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates
          the website buildera.co and related services. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you visit our website or engage our
          services. Please read this policy carefully. If you disagree with its terms, please
          discontinue use of the site.
        </p>

        <div className="flex flex-col gap-10">

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">1. Information We Collect</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">We collect information you provide directly and information collected automatically.</p>
            <h3 className="font-semibold text-foreground mb-2">Information you provide:</h3>
            <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1.5 leading-relaxed">
              <li>Name, email address, phone number, and company name when you submit a contact or lead form</li>
              <li>Project details and requirements shared during discovery calls or email correspondence</li>
              <li>Newsletter subscription email addresses</li>
              <li>Any information you voluntarily include in messages sent to us</li>
            </ul>
            <h3 className="font-semibold text-foreground mb-2">Information collected automatically:</h3>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li>IP address, browser type, operating system, and device type</li>
              <li>Pages visited, time spent on pages, and navigation paths (via Google Analytics 4)</li>
              <li>Heatmap and session recordings (via Microsoft Clarity) to improve user experience</li>
              <li>Referral source — how you found our website</li>
              <li>Cookie identifiers (see Section 6 for details)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li>Respond to your enquiries within our stated 4-business-hour SLA</li>
              <li>Schedule and conduct discovery calls, send project proposals, and manage client relationships</li>
              <li>Send project status updates, invoices, and service-related communications</li>
              <li>Send our newsletter to subscribers (you can unsubscribe at any time)</li>
              <li>Improve our website, services, and user experience based on usage analytics</li>
              <li>Comply with legal obligations under Indian law (including the IT Act 2000 and DPDP Act 2023)</li>
              <li>Detect and prevent fraud, abuse, or security incidents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">3. Legal Basis for Processing</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We process your personal data on one or more of the following bases:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li><strong className="text-foreground">Contractual necessity</strong> — processing required to respond to your enquiry or deliver services you requested</li>
              <li><strong className="text-foreground">Legitimate interests</strong> — analytics and security monitoring to operate and improve our services</li>
              <li><strong className="text-foreground">Consent</strong> — newsletter subscriptions and non-essential analytics cookies (you may withdraw consent at any time)</li>
              <li><strong className="text-foreground">Legal obligation</strong> — compliance with applicable Indian laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">4. Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              We do not sell, rent, or trade your personal data. We share data only in the following circumstances:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li><strong className="text-foreground">Service providers</strong> — email delivery (Resend), analytics (Google, Microsoft), and cloud hosting (Hostinger), each bound by data processing agreements</li>
              <li><strong className="text-foreground">Legal requirements</strong> — when required by law, court order, or government authority</li>
              <li><strong className="text-foreground">Business transfers</strong> — in the event of a merger, acquisition, or sale of assets, subject to the same privacy commitments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">5. Data Retention</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li>Contact form and lead data: retained for 3 years from last interaction, then deleted</li>
              <li>Client project data: retained for 7 years for legal and accounting purposes</li>
              <li>Newsletter subscriptions: retained until you unsubscribe</li>
              <li>Analytics data: retained per Google Analytics and Clarity default retention policies (typically 14 months)</li>
            </ul>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              You may request deletion of your personal data at any time by emailing
              <a href="mailto:info@buildera.co" className="text-[var(--brand-primary)] hover:underline"> info@buildera.co</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">6. Cookies</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">
              We use the following categories of cookies:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li><strong className="text-foreground">Essential cookies</strong> — required for the website to function. Cannot be disabled.</li>
              <li><strong className="text-foreground">Analytics cookies</strong> — Google Analytics 4 and Microsoft Clarity, used to understand how visitors use the site. Require consent.</li>
              <li><strong className="text-foreground">Marketing cookies</strong> — Facebook Pixel, Google Ads, LinkedIn Insight (if enabled). Require consent and are only loaded if configured in our admin panel.</li>
            </ul>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              You can withdraw cookie consent at any time by clearing your browser cookies and not accepting
              the consent banner on your next visit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">7. Your Rights</h2>
            <p className="text-muted-foreground mb-3 leading-relaxed">Under applicable law, you have the right to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li><strong className="text-foreground">Access</strong> — request a copy of the personal data we hold about you</li>
              <li><strong className="text-foreground">Correction</strong> — request correction of inaccurate or incomplete data</li>
              <li><strong className="text-foreground">Deletion</strong> — request deletion of your personal data (subject to legal retention obligations)</li>
              <li><strong className="text-foreground">Objection</strong> — object to processing based on legitimate interests</li>
              <li><strong className="text-foreground">Data portability</strong> — receive your data in a structured, machine-readable format</li>
              <li><strong className="text-foreground">Withdrawal of consent</strong> — withdraw consent at any time where processing is based on consent</li>
            </ul>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              To exercise any of these rights, email
              <a href="mailto:info@buildera.co" className="text-[var(--brand-primary)] hover:underline"> info@buildera.co</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">8. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement industry-standard technical and organisational measures to protect your
              personal data against unauthorised access, alteration, disclosure, or destruction. These
              include HTTPS encryption, access controls, and regular security reviews. However, no
              transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">9. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We have no control over and accept
              no responsibility for the privacy practices of those sites. We encourage you to read their
              privacy policies before providing any personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy periodically. Changes will be posted on this page with
              an updated &ldquo;Last updated&rdquo; date. We encourage you to review this page regularly.
              Continued use of our website after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">11. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy-related queries, complaints, or data subject requests:
            </p>
            <address className="not-italic mt-3 text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Buildera Technologies LLP</strong><br />
              Email: <a href="mailto:info@buildera.co" className="text-[var(--brand-primary)] hover:underline">info@buildera.co</a><br />
              India
            </address>
          </section>

        </div>
      </article>
    </main>
  )
}
