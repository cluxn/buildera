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
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: January 2025</p>

        <h2 className="text-xl font-semibold mb-3 mt-8">1. Acceptance of Terms</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          By accessing this website or engaging Buildera&apos;s services, you agree to these terms.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">2. Services</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Buildera provides custom software development, IT consulting, and related services.
          Specific deliverables, timelines, and payment terms are defined in individual project
          agreements or proposals.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">3. Intellectual Property</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Upon full payment, clients receive full ownership of custom-developed code and assets.
          Buildera retains rights to reusable frameworks, methodologies, and pre-existing components.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">4. Confidentiality</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Both parties agree to keep confidential any non-public information shared during the
          engagement. NDAs are available on request.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">5. Limitation of Liability</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Buildera&apos;s liability is limited to the fees paid for the specific project in which the
          issue arose. We are not liable for indirect, consequential, or incidental damages.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">6. Governing Law</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          These terms are governed by the laws of India. Disputes subject to jurisdiction of
          courts in India.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">7. Changes to Terms</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          We may update these terms. Continued use of our services constitutes acceptance of
          updated terms.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">8. Contact</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          For legal queries: info@buildera.co
        </p>
      </article>
    </main>
  )
}
