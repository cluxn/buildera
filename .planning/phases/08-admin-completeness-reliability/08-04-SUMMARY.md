---
plan: 08-04
title: "Partner Badges, Technologies & Popup Manager"
status: complete
completed_at: "2026-05-29"
---

# Summary: Plan 08-04

## What Was Built

Created PartnerBadge and Technology models + migrations + Filament resources. Added PopupManagerPage Filament page for popup configuration. Seeded 6 partner badges.

## Key Changes

### Migrations
- `2026_08_01_000001_create_partner_badges_table.php`: partner_badges (id, name, logo, link, category, display_order, is_visible, timestamps)
- `2026_08_01_000002_create_technologies_table.php`: technologies (id, name, logo, category enum Frontend/Backend/Cloud/CRM/E-Commerce, display_order, timestamps)

### Models
- `PartnerBadge.php`: fillable, boolean/integer casts, scopeVisible()
- `Technology.php`: fillable, integer casts

### Filament Resources
- `PartnerBadgeResource`: Website nav group, heroicon-o-shield-check, full CRUD, category badge, sort by display_order
- `TechnologyResource`: Website nav group, heroicon-o-cpu-chip, full CRUD, category badge, sort by display_order

### PopupManagerPage
- Website nav group, heroicon-o-bell-alert
- Settings-backed form for exit-intent popup (enabled, headline, subtext, cta) and idle popup (enabled, headline, subtext)
- Follows AnalyticsScriptsPage/ManageSettings pattern with content() + Form wrapper
- Blade view: filament.pages.popup-manager

### Seeder
- `PartnerBadgeSeeder.php`: 6 badges (Salesforce, Google Cloud, Microsoft, AWS, Shopify, Meta) with firstOrCreate idempotency
- Registered in DatabaseSeeder.php

## Notes
- Remote MySQL at 207.180.252.239 not accessible locally (no mid-project deploys) — migrations run on deployment
- All code follows existing project patterns exactly

## Self-Check: PASSED

- All 4 tasks completed: migrations, models, resources, seeder
- PopupManagerPage follows AnalyticsScriptsPage pattern precisely
- 6 partner badges seeded with correct categories and display_order 1-6
