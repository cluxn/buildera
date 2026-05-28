---
plan: "06-02"
status: complete
completed_at: "2026-05-28"
---

# Plan 06-02 Summary: CaseStudy/Guide/Testimonial Backend

## What Was Built

- **CaseStudy model**: added key_metrics (array cast), testimonial_quote, testimonial_author to fillable; doNotGenerateSlugsOnUpdate
- **CaseStudyResource**: 4-tab Schema with Repeater for key_metrics, RichEditor for challenge/solution/results, industry Select
- **Guide model**: added resource_type, description, external_link, cover_image_alt to fillable
- **GuideResource**: 4-tab Schema with resource_type Select, description Textarea, external_link, RichEditor body
- **Testimonial model**: added service_category, industry to fillable; scopeForService() scope
- **TestimonialResource**: single-tab Schema with service_category + industry Select fields, rating Select, is_featured/is_published toggles
- **CaseStudyController**: paginate(12), industry filter, maps challenge→problem, featured_image→hero_image in response
- **GuideController**: paginate(12), category+resource_type filters, maps featured_image→cover_image in response
- **TestimonialController**: get() with service_category/industry/featured filters; maps content→quote, client_title→job_title, client_photo→company_logo, rating→star_rating

## Deviations

- Testimonial schema uses existing column names (content/rating/client_title etc.); JSON response maps to plan-expected names (quote/star_rating/job_title etc.)
- Guide uses `featured_image` for cover; mapped to `cover_image` in API response
- CaseStudy `challenge` column maps to `problem` in API detail response

## Self-Check: PASSED
