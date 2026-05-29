---
plan: "06-04"
status: completed
---

## Completed

- `/case-studies` list + `/case-studies/[slug]` detail: IndustryFilterTabs, ResultMetricCard grid, MiniLeadForm mid-page, BlogCtaBanner, testimonial blockquote
- `/guides` list + `/guides/[slug]` detail: ResourceTypeFilterTabs, MiniLeadForm @33%, BlogCtaBanner @66%, external link button, related guides
- `/testimonials`: CSS masonry (columns-1/2/3), ServiceCategoryFilterTabs, TestimonialCard with break-inside-avoid
- All content API types added to api.ts (ContentCaseStudy, ContentCaseStudyDetail, Guide, GuideDetail, Testimonial)
- All pages use generateStaticParams + await searchParams (Next.js 15 pattern)
- `npm run build` exits 0
