# Features Research — Buildera IT Agency Website

## Table Stakes (Must Have — Users Expect These)

### Navigation & Structure
- Sticky header with logo, nav links, primary CTA button
- Mobile hamburger menu (full-screen or drawer)
- Footer with service links, social icons, legal links
- Breadcrumbs on deep pages (service detail, blog posts)
- 404 page with navigation back to key pages

### Services Presentation
- Tab-based service category switcher (Website Dev, Salesforce, DevOps, AI Agent, Software Dev, Hire a Dev)
- Sub-service cards with icon, title, description, "Learn More →" link
- Individual service detail pages with: hero, what we do, process/approach, use cases, CTA
- Solutions grid page (~18 items) with individual detail pages

### Lead Capture
- Contact form: name, email, phone, company, message, service interest
- Honeypot spam protection (hidden field)
- Confirmation/thank-you state after submission
- Calendly embed for direct booking
- WhatsApp click-to-chat widget
- Floating CTA button (sticky bottom-right)

### Social Proof
- Testimonials section (homepage + dedicated page)
- Client logos strip / partner badges
- Case studies with: problem, solution, results, metrics
- Stats bar (years experience, projects delivered, clients, etc.)

### Content Pages
- Blog with categories, tags, estimated read time, author
- Guides / resources with downloadable or linkable content
- Industry-specific landing pages

### SEO
- Server-side meta tags via generateMetadata (Next.js native)
- Open Graph / Twitter Card tags
- Canonical URLs
- robots.txt and sitemap.xml
- Structured data (Organization, WebPage, BlogPosting schemas)
- PageSpeed 85+ mobile

### Analytics
- GA4 (consent-gated)
- Microsoft Clarity session recording
- Google Ads conversion tracking
- LinkedIn Insight tag
- Facebook Pixel

## Differentiators (Competitive Advantage)

### Conversion Optimization
- Nudge banner (top of page — time/date-limited promotional message)
- Exit-intent popup (captures leaving visitors)
- Idle popup (appears after N seconds of inactivity)
- Cookie consent banner (GDPR-friendly)
- AI chat widget integration (optional v2)

### "Hire a Developer" Section
- Engagement model cards (hourly, part-time, full-time)
- Technology stack badges (languages/frameworks Buildera staffs)
- Process: requirements → screening → onboarding flow

### Industry Pages
- Each major industry Buildera serves gets a dedicated page
- Problem/solution framing specific to that industry
- Relevant case studies pulled in
- Industry-specific CTAs

## Anti-Features (Deliberately NOT Build in v1)

- Client portal / authenticated user area
- Project management / ticketing for clients
- Live chat (use WhatsApp widget instead)
- Multi-language / i18n
- E-commerce / payment flows
- Job board / careers section
- Community / forum features

## Content Volume Estimate

| Section | Pages |
|---------|-------|
| Service detail pages | ~24 (6 categories × ~4 sub-services) |
| Solution detail pages | ~18 |
| Industry pages | ~8-12 (estimate) |
| Case Studies | ~10-20 (grows over time) |
| Blog posts | ~20-50 (grows over time) |
| Guides | ~10-20 (grows over time) |
| Static pages (home, contact, testimonials, etc.) | ~8 |
| **Total** | **~100-150 pages at maturity** |
