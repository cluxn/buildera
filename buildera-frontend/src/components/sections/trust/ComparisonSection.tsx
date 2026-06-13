import { IconCheck, IconX } from '@tabler/icons-react'

const COLUMNS = ['Buildera', 'Freelancer', 'Outsourcing Agency', 'In-House Team']

const ROWS: { feature: string; values: boolean[] }[] = [
  { feature: 'Fixed-price proposal before work starts', values: [true, false, false, false] },
  { feature: 'Weekly working software demos', values: [true, false, false, false] },
  { feature: '100% source code & IP ownership', values: [true, true, false, true] },
  { feature: 'No 2–3 month hiring delay', values: [true, true, true, false] },
  { feature: 'Backup coverage if someone is unavailable', values: [true, false, true, false] },
  { feature: '30-day post-launch support included', values: [true, false, false, true] },
]

function Cell({ value }: { value: boolean }) {
  return value ? (
    <IconCheck className="w-4 h-4 text-[var(--brand-primary)]" />
  ) : (
    <IconX className="w-4 h-4 text-muted-foreground/50" />
  )
}

export function ComparisonSection() {
  return (
    <section className="py-20 bg-[var(--brand-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)] mb-3">
            Buildera vs. The Alternatives
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How We Compare to Your Other Options
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Before you hire a freelancer, sign with an agency, or post a job listing — see what each option actually gives you.
          </p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[640px] rounded-xl border border-border bg-background overflow-hidden">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 px-6 py-4 border-b border-border">
              <span />
              {COLUMNS.map((col) => (
                <span
                  key={col}
                  className={`text-xs font-semibold uppercase tracking-wide text-center ${col === 'Buildera' ? 'text-[var(--brand-primary)]' : 'text-muted-foreground'}`}
                >
                  {col}
                </span>
              ))}
            </div>

            {ROWS.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 items-center px-6 py-4 ${i % 2 === 1 ? 'bg-[var(--brand-surface)]' : ''}`}
              >
                <span className="text-sm text-foreground">{row.feature}</span>
                {row.values.map((v, j) => (
                  <span key={j} className="flex justify-center">
                    <Cell value={v} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
