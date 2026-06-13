import { PageHero } from '@/components/sections/PageHero'

export function AboutHero() {
  return (
    <PageHero
      eyebrow="About Buildera"
      heading={
        <>
          Software That Moves<br />
          <span className="text-[var(--brand-primary)]">Your Business Forward.</span>
        </>
      }
      description="We help growing businesses replace manual processes and legacy systems with custom software that actually fits how they work."
    />
  )
}
