import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { FaqItem } from '@/types/service-page'

interface Props { items: FaqItem[]; headline?: string }

export function ServiceFaq({ items }: Props) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Answers to the questions we hear most often before a project starts.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion>
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-xl font-semibold text-left">{item.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
