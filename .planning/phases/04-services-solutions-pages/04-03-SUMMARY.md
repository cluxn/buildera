---
plan: "04-03"
phase: 4
status: complete
completed_at: "2026-05-28"
---

# Plan 04-03 Summary: Salesforce + DevOps Data Files

## What Was Built

Full persuasive marketing copy for 5 Salesforce and 4 DevOps sub-service pages (9 total):

### salesforce.ts — `salesforceServices: ServicePageData[]` (5 objects)

Shared across all 5: `sfTech` array (Salesforce, Apex, Lightning Web Components, Salesforce Flow, Node.js, AWS) and `sfSteps` (Assessment → Implementation → Training) — extracted as module-level constants to avoid repetition.

| Slug | Hero Stat | Copy Angle |
|------|-----------|-----------|
| `crm` | 35% Avg Pipeline Growth | "Stop paying for features you never use" — adoption-first framing |
| `marketing-cloud` | 50% Engagement Uplift | Personalized journeys vs batch-and-blast |
| `service-cloud` | 45% Faster Resolution | Omnichannel case management; SLA tracking |
| `commerce-cloud` | 30% Higher Conversion Rate | B2B+B2C unified; 30% fewer order errors metric |
| `experience-cloud` | 60% Self-Service Adoption | 60% reduction in support tickets metric |

### devops.ts — `devopsServices: ServicePageData[]` (4 objects)

Shared across all 4: `devopsSteps` (Audit → Implement → Monitor) as module-level constant.

| Slug | Hero Stat | Copy Angle |
|------|-----------|-----------|
| `cloud-infrastructure` | 99.9% Uptime SLA | Handle 10x traffic spikes; infrastructure as code |
| `ci-cd-pipeline` | 10x Faster Deployments | Deploy in minutes; zero-downtime; Friday deploys safe |
| `cloud-management` | 40% Cost Savings | 40% avg cloud cost reduction; right-sizing |
| `server-monitoring` | 5min Avg Response Time | Know about problems before customers do |

## Self-Check: PASSED

- `salesforceServices` exports exactly 5 objects; `devopsServices` exports exactly 4
- All slugs match canonical URLs from RESEARCH.md
- All required `ServicePageData` fields populated — no placeholder text
- Shared step/tech constants reduce duplication without compromising per-page accuracy
- Total service pages in system after this plan: 13 (4 website + 5 salesforce + 4 devops)
