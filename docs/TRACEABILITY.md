# CyberNova — Requirements traceability (BSc Computer Systems Engineering)

Use this in your portfolio (if required) and align your **demo video** to the “Evidence” column.

Legend: **R** = requirement from the CyberNova assessment scenario (`cyber_nova.md` at repo root). **Status** = met in the current codebase unless noted.

| ID | Source (brief) | Requirement | Implementation | How to verify | Evidence |
|----|----------------|-------------|----------------|---------------|----------|
| R1 | Scenario | **Overview of cybersecurity solutions** | `/solutions` — service list + copy | Open route; content visible | Screenshot / video |
| R2 | Scenario | **Case studies** of previous **threat mitigation** | `/case-studies` — sector-style outcomes | Open route; three items | Screenshot / video |
| R3 | Scenario | **Technical blog articles** on **cyber risks** | `/articles` — dated list + summaries | Open route; three articles | Screenshot / video |
| R4 | Scenario | **Customer testimonials** with **rating system** | `/feedback` — **published** approved-only testimonials (`RatingSubmission`); **`RatingForm`** posts `POST /api/ratings` (pending moderation) | Stars + quotes + submit flow | Screenshot / video |
| R5 | Scenario | **Photo gallery** of **training workshops and events** | `/gallery` — image grid + captions | Open route; images load | Screenshot / video |
| R6 | Scenario | **Contact Security Team** — name | `ContactForm` + `POST /api/contact` | Required field; stored in `Inquiry` | Form + admin row |
| R7 | Scenario | **Email** | `ContactForm` + Zod `email` in API | Invalid email → 400 | Manual / API |
| R8 | Scenario | **Phone** | `ContactForm` field | Required; `Inquiry.phone` | DB / admin |
| R9 | Scenario | **Organization** | `ContactForm` `organization` → Prisma `organization` `@map("companyName")` | Required | DB / admin |
| R10 | Scenario | **Country** | `ContactForm` field | Required | DB / admin |
| R11 | Scenario | **Job title** | `ContactForm` field | Required | DB / admin |
| R12 | Scenario | **Type of Security Issue** | `ContactForm` `<select>` + `securityIssueType` | Required enum list ([`security-issue-types.ts`](../src/lib/security-issue-types.ts)) | DB / admin column |
| R13 | Scenario | **Description of technical problem** | `ContactForm` textarea → `technicalProblem` `@map("jobDetails")` | Required | Admin “Technical problem details” |
| R14 | Scenario | Customers **no accounts / no passwords** | No public auth | No signup on site | Video narrative |
| R15 | Scenario | **Password-protected admin panel** | `/admin/login` + iron-session; dashboard layout guarded | Logged out → redirect login | Video |
| R16 | Scenario | Backend **stores requests in a database** | Prisma `Inquiry`; `POST /api/contact` | Submit form → row in DB / admin | Video |
| R17 | Scenario | **Filtering by service type** | `/admin/dashboard?issue=…` + `IssueFilterLinks`; `findMany` `where` | Change filter; table updates | Video |
| R18 | Scenario | **Analytics** — **most requested services** | `countBySecurityIssueType()` — `groupBy` issue type | Dashboard “Most requested services” | Video |
| R19 | Scenario | **Analytics** — **regional demand** | `countByCountry()` — `groupBy` country | Dashboard “Regional demand” | Video |
| R20 | Task 2 | Solution **functional**, largely error-free | Forms, nav, API validation | Happy path + invalid input | Testing notes / video |
| R21 | Task 2 | Conforms to **agreed** requirements | Match approved spec if one exists | Cross-check sign-off ↔ table | Client doc |
| R22 | Extended FR | Client **submits a rating** | `RatingForm` → `POST /api/ratings` → `RatingSubmission` `PENDING` | Submit → confirmation banner | Video |
| R23 | Extended FR | **Approved ratings only** on public site | `/feedback` lists `status === APPROVED` only | Pending submission invisible until approved | Video |
| R24 | Extended FR | Admin **moderates** ratings | `/admin/ratings`; `PATCH` / `DELETE` on `src/app/api/admin/ratings/[id]/route.ts` | Approve / reject / delete | Video |
| R25 | Extended FR | **Pending count** notification | `AdminSubNav` badge on **Ratings moderation** | Dashboard link shows pending | Video |
| R26 | Extended NFR | Ratings gated before publish | Rejected/pending never shown publicly | Approve then refresh `/feedback` | Video |

## API & data

| Item | Detail |
|------|--------|
| Persist inquiries | `POST /api/contact` → Prisma `Inquiry` ([`prisma/schema.prisma`](../prisma/schema.prisma)) |
| Persist ratings | `POST /api/ratings` → Prisma `RatingSubmission` (`PENDING`) |
| Moderate ratings | `PATCH` / `DELETE` `/api/admin/ratings/[id]` (admin session required) |
| Admin session | `POST /api/admin/login`, `POST /api/admin/logout`, cookie ([`src/lib/session.ts`](../src/lib/session.ts)) |
| Abuse mitigation | Contact + ratings routes — IP rate limit ([`src/lib/rate-limit.ts`](../src/lib/rate-limit.ts)) |

## Changelog

- Add rows when the assessor or client approves scope changes.
