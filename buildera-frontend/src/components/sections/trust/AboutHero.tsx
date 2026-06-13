import { PageHero } from '@/components/sections/PageHero'

export function AboutHero() {
  return (
    <PageHero
      eyebrow="About Buildera"
      heading={
        <>
          We Build Software<br />
          <span className="text-[var(--brand-primary)]">That Moves</span> Businesses Forward.
        </>
      }
      description="Buildera is a global IT services company helping growing businesses replace manual processes and legacy systems with custom software that actually fits the way they work."
    />
  )
}
