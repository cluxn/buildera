---
quick_id: 260615-izi
status: complete
---

# Fix UI layout consistency + admin image upload + admin save bug

## Scope

1. Solutions page: equal-height card layout (left dashboard card vs right stat/progress cards).
2. About page: equal-height "Our Story" column vs differentiators grid.
3. Guide detail page: equal-height author/download section; replace right-side gradient
   placeholder with guide heading + cover image (fetched from admin, same pattern as GuideCard).
4. Contact page: equal-height form/info columns; "Send Us a Message" heading moved to a
   full-width row above both columns; add company email/address/phone to ContactInfo,
   sourced from `site_settings`.
5. Case studies: fix Key Metrics stat values overflowing their card box.
6. Blog post page: remove AuthorBio section.
7. Admin Settings: remove unused Calendly URL field.
8. Admin Settings (Appearance) + Client Logos: add image upload (ImageUploadField) for
   Logo URL / Favicon URL / Client Logo URL instead of plain text inputs.
9. Fix admin GuideEditor/BlogEditor/CaseStudyEditor save handler crash
   ("Unexpected end of JSON input") — safe response parsing + error surfacing.
10. Fix related-guides ("More Resources") section to fall back to any other published
    guide when none share the same category.
11. Data fix: restore `lead_magnets.status` to PUBLISHED for the one guide that had been
    silently flipped to DRAFT by the editor save bug (id=1).
12. `site_settings`: set `company_email`, `company_address`, `company_phone`.
