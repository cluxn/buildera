import { Breadcrumb } from '@/components/ui/Breadcrumb'

import type { Metadata } from 'next'
import { generateSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return generateSeoMetadata('page', 'terms', {
    title: 'Terms of Service — Buildera',
    description: "Buildera's terms of service governing use of our website and services.",
    path: '/terms',
  })
}

export default function TermsPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
      <article className="container mx-auto px-8 max-w-4xl py-16">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: January 2025 &middot; Effective: January 2025</p>
        </header>

        <p className="text-muted-foreground mb-10 leading-relaxed text-base">
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Buildera website at buildera.co
          and your engagement with Buildera Technologies LLP (&ldquo;Buildera&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;)
          for any services. By accessing our website or engaging our services, you agree to be bound
          by these Terms. If you do not agree, please do not use our website or services.
        </p>

        <div className="flex flex-col gap-10">

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">1. Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Buildera provides custom software development, Salesforce implementation, DevOps and cloud
              services, AI agent development, and related IT consulting services. The specific scope,
              deliverables, timelines, and fees for each engagement are set out in a separate project
              agreement, proposal, or statement of work (&ldquo;Project Agreement&rdquo;) agreed in writing between
              you and Buildera.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In the event of any conflict between these Terms and a Project Agreement, the Project
              Agreement shall take precedence for the specific engagement it governs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">2. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Upon receipt of full payment for a project, you receive full ownership of all custom-developed
              code, designs, and assets created specifically for your engagement. This includes the right
              to modify, distribute, and commercialise those deliverables.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Buildera retains ownership of:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li>Reusable libraries, frameworks, and tooling developed independently of your project</li>
              <li>Pre-existing proprietary components incorporated into your project (for which you receive a perpetual licence)</li>
              <li>Methodologies, processes, and know-how developed through general practice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">3. Payment Terms</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li>Payment schedules are defined in each Project Agreement, typically structured as milestone-based instalments</li>
              <li>Invoices are payable within 14 days of issue unless otherwise agreed in writing</li>
              <li>Late payments attract interest at 2% per month on the outstanding amount</li>
              <li>Buildera reserves the right to pause work on projects with overdue invoices after written notice</li>
              <li>All fees are exclusive of applicable taxes (GST) unless stated otherwise</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">4. Project Changes and Scope</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Changes to the agreed project scope (&ldquo;change orders&rdquo;) must be requested in writing.
              Buildera will assess impact on timeline and cost, and provide a written change order for
              your approval before commencing work on the change.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Verbal or informal scope changes do not create obligations for Buildera and will not be
              treated as part of the project agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">5. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Both parties agree to keep confidential any non-public, proprietary, or sensitive
              information shared during the engagement, including but not limited to business plans,
              technical architecture, client data, and pricing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Confidentiality obligations survive termination of the engagement for a period of 3 years.
              A formal Non-Disclosure Agreement (NDA) is available on request prior to any technical
              discussion and will be provided free of charge.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">6. Warranties and Representations</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Buildera warrants that:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li>Services will be performed by qualified personnel with reasonable skill and care</li>
              <li>Deliverables will materially conform to the specifications agreed in the Project Agreement</li>
              <li>Buildera has the right to use any third-party components included in deliverables</li>
            </ul>
            <p className="text-muted-foreground mt-3 leading-relaxed">
              Buildera provides a 30-day warranty period post-launch during which defects that prevent
              the software from functioning as specified will be corrected at no additional charge.
              This warranty does not cover changes to requirements, third-party service failures, or
              issues arising from modifications made by the client.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">7. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Buildera&apos;s total liability for any claim arising from a specific engagement shall not
              exceed the total fees paid by you for that engagement in the 12 months preceding the claim.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall Buildera be liable for indirect, consequential, incidental, punitive,
              or special damages, including loss of revenue, data, or business opportunity, even if
              advised of the possibility of such damages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">8. Website Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li>Use our website for any unlawful purpose or in violation of applicable law</li>
              <li>Attempt to gain unauthorised access to any part of the website or its infrastructure</li>
              <li>Scrape, crawl, or extract data from our website beyond normal browsing</li>
              <li>Transmit spam, malware, or harmful content through any forms or contact channels</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">9. Termination</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Either party may terminate an engagement with 14 days&apos; written notice. In the event
              of termination:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-1.5 leading-relaxed">
              <li>You are liable for all work completed and expenses incurred up to the termination date</li>
              <li>Buildera will deliver all completed work and documentation within 14 days of final payment</li>
              <li>Either party may terminate immediately in the event of a material breach that is not remedied within 14 days of written notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">10. Governing Law and Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              These Terms are governed by the laws of India. Any disputes arising from these Terms or
              a Project Agreement shall first be referred to good-faith mediation between senior
              representatives of both parties.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If mediation fails, disputes shall be subject to the exclusive jurisdiction of the courts
              of Mumbai, Maharashtra, India.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">11. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms periodically. Updated Terms will be posted on this page with a
              revised &ldquo;Last updated&rdquo; date. Your continued use of our website or services following
              any update constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4 text-foreground">12. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For legal queries or notices:
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
