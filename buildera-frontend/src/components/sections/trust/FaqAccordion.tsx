import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export interface FaqItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How long does a typical project take?',
    answer:
      "Depends entirely on scope. A focused CRM integration takes 3–4 weeks. A full custom ERP takes 4–6 months. We give you a specific timeline in the proposal — not a range.",
  },
  {
    question: 'Do you work with fixed-price or time-and-material contracts?',
    answer:
      "Both, depending on project type. Well-defined projects (which we push for) are fixed-price. Ongoing retainer work is T&M. We'll recommend the right model after the discovery workshop.",
  },
  {
    question: 'What happens if requirements change mid-project?',
    answer:
      "Changes happen — we plan for them. If a change affects timeline or budget, we tell you in the same meeting, not after we've built it. Small adjustments are absorbed; significant scope additions get a change order.",
  },
  {
    question: 'Do I own the source code?',
    answer:
      "100%. Full source code, no lock-in, no licensing fees. You can take it in-house or use any developer to maintain it after delivery.",
  },
  {
    question: 'What technologies do you use?',
    answer:
      "We choose the stack that fits the problem — not the one our team prefers. Typical stack: Next.js / React for frontend, Laravel / Node.js for backend, MySQL / PostgreSQL for data. Salesforce where CRM is the core need.",
  },
  {
    question: 'How do I know the project is on track?',
    answer:
      "Weekly demo calls — you see working software, not slides. We use a shared project board you can access any time. No news is never good news with us; we over-communicate.",
  },
  {
    question: "What's included in post-launch support?",
    answer:
      "30 days of bug-fix support is included in every project. After that, we offer monthly retainer plans for ongoing support and feature development.",
  },
  {
    question: 'Can you integrate with our existing systems (Tally, SAP, Zoho)?',
    answer:
      "Yes — integrations are one of our core strengths. We've connected systems to Tally, Zoho CRM, Salesforce, SAP, IndiaMart, and 30+ other platforms. We'll assess integration complexity in the requirements workshop.",
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      "Yes, before any detailed requirements conversation. Standard NDA template is available — most clients use ours, some bring their own.",
  },
  {
    question: 'How do payments work?',
    answer:
      "Typically: 40% upfront, 40% at midpoint milestone, 20% on delivery. Payment schedule is outlined in the proposal. We accept bank transfer and UPI.",
  },
  {
    question: 'Do you work with startups or only established businesses?',
    answer:
      "Both. We work with funded startups that need to ship an MVP, and with established businesses that need to replace legacy systems. The discovery process is the same either way.",
  },
  {
    question: 'What makes Buildera different from a freelancer or offshore agency?',
    answer:
      "Accountability. A freelancer disappears after delivery. An offshore agency sends someone different every week. We're a dedicated team — same PM, same lead dev, same QA — from discovery to post-launch support.",
  },
]

interface Props {
  items?: FaqItem[]
  singleColumn?: boolean
}

export function FaqAccordion({ items = FAQ_ITEMS, singleColumn = false }: Props) {
  if (singleColumn) {
    return (
      <section className="py-20 bg-[var(--brand-surface)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              The questions we get on every sales call — answered honestly.
            </p>
          </div>

          <Accordion>
            {items.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-base font-semibold text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }

  const half = Math.ceil(items.length / 2)
  const LEFT_FAQS = items.slice(0, half)
  const RIGHT_FAQS = items.slice(half)

  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            The questions we get on every sales call — answered honestly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
          {/* Left column */}
          <Accordion>
            {LEFT_FAQS.map((item, i) => (
              <AccordionItem key={i} value={`left-${i}`}>
                <AccordionTrigger className="text-base font-semibold text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Right column */}
          <Accordion>
            {RIGHT_FAQS.map((item, i) => (
              <AccordionItem key={i} value={`right-${i}`}>
                <AccordionTrigger className="text-base font-semibold text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
