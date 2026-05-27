const LOGOS = [
  {
    name: "Nexova",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <rect x="4" y="10" width="20" height="20" rx="4" fill="#94a3b8" />
        <rect x="10" y="16" width="8" height="8" rx="1" fill="#cbd5e1" />
        <text x="32" y="26" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#94a3b8">NEXOVA</text>
      </svg>
    ),
  },
  {
    name: "Trilvex",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <circle cx="20" cy="20" r="14" stroke="#94a3b8" strokeWidth="3" />
        <circle cx="20" cy="20" r="6" fill="#94a3b8" />
        <text x="42" y="26" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#94a3b8">TRILVEX</text>
      </svg>
    ),
  },
  {
    name: "Quorix",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <polygon points="20,6 34,30 6,30" stroke="#94a3b8" strokeWidth="3" fill="none" />
        <text x="42" y="26" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#94a3b8">QUORIX</text>
      </svg>
    ),
  },
  {
    name: "Ventara",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <rect x="4" y="8" width="32" height="8" rx="2" fill="#94a3b8" />
        <rect x="4" y="22" width="20" height="8" rx="2" fill="#cbd5e1" />
        <text x="44" y="26" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#94a3b8">VENTARA</text>
      </svg>
    ),
  },
  {
    name: "Solkraft",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M6 20 L20 8 L34 20 L20 32 Z" stroke="#94a3b8" strokeWidth="3" fill="none" />
        <circle cx="20" cy="20" r="4" fill="#94a3b8" />
        <text x="42" y="26" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#94a3b8">SOLKRAFT</text>
      </svg>
    ),
  },
  {
    name: "Bytelink",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <rect x="4" y="8" width="14" height="24" rx="3" fill="#94a3b8" />
        <rect x="22" y="8" width="14" height="24" rx="3" fill="#cbd5e1" />
        <text x="44" y="26" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#94a3b8">BYTELINK</text>
      </svg>
    ),
  },
  {
    name: "Halvex",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <path d="M6 8 L6 32 M6 20 L28 20 M28 8 L28 32" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
        <text x="38" y="26" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#94a3b8">HALVEX</text>
      </svg>
    ),
  },
  {
    name: "Orbisen",
    svg: (
      <svg viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
        <ellipse cx="20" cy="20" rx="14" ry="10" stroke="#94a3b8" strokeWidth="3" fill="none" />
        <line x1="6" y1="20" x2="34" y2="20" stroke="#cbd5e1" strokeWidth="2" />
        <text x="42" y="26" fontFamily="sans-serif" fontSize="14" fontWeight="700" fill="#94a3b8">ORBISEN</text>
      </svg>
    ),
  },
]

export function ClientLogosMarquee() {
  return (
    <section className="py-12 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <p className="text-center text-sm text-muted-foreground font-medium">
          Trusted by businesses across India
        </p>
      </div>
      <div aria-hidden="true" className="overflow-hidden">
        <div className="marquee-track">
          {[...LOGOS, ...LOGOS].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="logo-item mx-8 flex-shrink-0 flex items-center h-12"
            >
              {logo.svg}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
