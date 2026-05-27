import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FaqItem } from '@/types/service-page'

interface Props {
  items: FaqItem[]
  headline?: string
}

export function ServiceFaq({ items, headline }: Props) {
  return (
    <section className="py-16 bg-[var(--brand-surface)]">
      <div className="container mx-auto px-8 max-w-7xl">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--brand-primary)] mb-4">
          Frequently Asked Questions
        </p>
        {headline && (
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">{headline}</h2>
        )}
        <div className="max-w-3xl">
          <Accordion>
            {items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-xl font-semibold text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
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
