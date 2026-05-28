---
plan: "04-06"
phase: 4
status: complete
completed_at: "2026-05-28"
---

# Plan 04-06 Summary: Social Proof Backend — Migration, Controllers, Seeders

## What Was Built

### Migration
- `2026_05_27_000001_add_solution_slug_to_testimonials_and_case_studies.php` — adds `solution_slug` nullable string to both `testimonials` and `case_studies` tables

### Model Updates
- `Testimonial.php` — `solution_slug` added to `$fillable`
- `CaseStudy.php` — `solution_slug` added to `$fillable`

### Controller Extensions
- `TestimonialController@index` — added `?solution=` filter using `where('solution_slug', ...)`
- `CaseStudyController@index` — added `?service=` filter (whereJsonContains) and `?solution=` filter (where)

### Seeders
- `CaseStudySeeder.php` — 8 records from CLIENT-CONTEXT.md clients (Saharsh Packaging, Ease My Hotel, Equi Brief, PV Krishnan, Aroma Monk, SRJ, Barrel Books, GNC Exports) with correct D-11 tag mapping
- `TestimonialSeeder.php` — 20 records covering all 6 service categories: website-development ×4, salesforce-development ×3, devops-development ×3, ai-agent-development ×3, software-development ×4, hire-a-developer ×3
- `DatabaseSeeder.php` — CaseStudySeeder + TestimonialSeeder wired after SettingsSeeder

## Self-Check: PASSED

- `php artisan migrate` — clean, 1 migration applied
- `php artisan db:seed --class=CaseStudySeeder` — 8 records created
- `php artisan db:seed --class=TestimonialSeeder` — 20 records created
- `CS service=software-development` → 5 records ✓ (required: ≥4)
- `T service=website-development` → 4 records ✓ (required: ≥4)
- `CS solution=erp` → 1 record ✓ (required: ≥1)
- `T solution=crm` → 1 record ✓ (required: ≥1)

## Fix Applied
Initial seeders used `json_encode([...])` for JSON columns, causing double-encoding since Eloquent's `'array'` cast already handles encoding. Fixed by passing plain PHP arrays — the model cast handles JSON serialisation automatically.
