export function ResultMetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[var(--brand-surface)] border border-border rounded-xl p-6 text-center">
      <p className="text-3xl font-bold text-[var(--brand-primary)] mb-2">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
