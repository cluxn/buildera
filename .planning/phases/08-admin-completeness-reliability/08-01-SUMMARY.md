---
plan: 08-01
title: "Unified Lead Inbox & Newsletter CSV Export"
status: complete
completed_at: "2026-05-29"
---

# Summary: Plan 08-01

## What Was Built

Enhanced LeadResource with a red/green duplicate badge, date range filter on submitted_at, and explicit source_form options. Added CSV bulk export to NewsletterSubscriberResource.

## Key Changes

### LeadResource.php
- Replaced `IconColumn::make('is_duplicate')->boolean()` with `TextColumn::make()->badge()` showing "Duplicate" (danger/red) or "Unique" (success/green)
- Added explicit source_form SelectFilter options: contact-form, mini-cta, mini-popup, floating-cta, exit-popup, inline-blog, service-cta, homepage-cta
- Added `Filter::make('submitted_at')` with DatePicker from/until fields applying whereDate() clauses
- Added imports: `DatePicker`, `Filter`, `Builder`

### NewsletterSubscriberResource.php
- Added `BulkAction::make('export_csv')` that generates and streams a CSV file with columns: email, name, status, subscribed_at
- CSV filename uses current date: `subscribers-YYYY-MM-DD.csv`
- Proper quote escaping for CSV fields
- Added imports: `BulkAction`, `Collection`

## Self-Check: PASSED

- LeadResource filters: source_form (8 options), status (4 options), is_duplicate (ternary), submitted_at (date range)
- is_duplicate shows as colored badge (not boolean icon)
- NewsletterSubscriberResource has CSV bulk export action
- No new migrations needed
