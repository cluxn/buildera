import { Breadcrumb } from '@/components/ui/Breadcrumb'

export const metadata = {
  title: 'Privacy Policy | Buildera',
  description: 'How Buildera collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <article className="container mx-auto px-8 max-w-4xl py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: January 2025</p>

        <h2 className="text-xl font-semibold mb-3 mt-8">1. Information We Collect</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
          <li>Contact information: name, email, phone number when you submit a form</li>
          <li>
            Usage data: pages visited, time on site (via Google Analytics with consent)
          </li>
          <li>Technical data: IP address, browser type, device type</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 mt-8">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-1">
          <li>Respond to your enquiries and provide requested services</li>
          <li>Send project updates and relevant communications</li>
          <li>Improve our website and service offerings</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold mb-3 mt-8">3. Data Sharing</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          We do not sell your personal data. We share data only with service providers necessary
          to operate our services (email delivery, analytics), bound by confidentiality agreements.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">4. Data Retention</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Contact form submissions retained for 3 years. You may request deletion at any time by
          emailing info@buildera.co.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">5. Cookies</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          We use essential cookies for site functionality and analytics cookies with your consent.
          You can withdraw consent at any time via our cookie settings.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">6. Your Rights</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          Under applicable data protection laws, you have the right to access, correct, delete,
          or object to processing of your personal data.
        </p>

        <h2 className="text-xl font-semibold mb-3 mt-8">7. Contact</h2>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          For privacy-related queries: info@buildera.co | Buildera, India
        </p>
      </article>
    </main>
  )
}
