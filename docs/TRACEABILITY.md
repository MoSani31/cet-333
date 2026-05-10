# CET333 — Requirements traceability (AI-Solutions prototype)

Use this table in your portfolio (Testing & Evaluation / Solution Design) and align your **demo video timestamps** to the “Evidence” column.

Legend: **R** = requirement from the module brief / agreed client spec. **Status** = met in current codebase unless noted.

| ID | Source (brief) | Requirement | Implementation | How to verify | Evidence |
|----|----------------|--------------|----------------|---------------|----------|
| R1 | Scenario | Site presents **software solutions** offered | `/solutions` — list of services + copy | Open route; content visible | Screenshot / video |
| R2 | Scenario | **Past solutions** / industry highlights | `/case-studies` — anonymised outcomes | Open route; three items | Screenshot / video |
| R3 | Scenario | **Customer feedback** with **ratings** | `/feedback` — star display + quotes | Open route; stars + text | Screenshot / video |
| R4 | Scenario | **Articles** promoting the company | `/articles` — dated list + summaries | Open route; three articles | Screenshot / video |
| R5 | Scenario | **Photo gallery** of promotional events | `/gallery` — Unsplash images + captions | Open route; images load | Screenshot / video |
| R6 | Scenario | **Upcoming events** listed | `/gallery` — “Upcoming events” section | Scroll; dates visible | Screenshot / video |
| R7 | Scenario | **Contact Us** — name | `ContactForm` field `name` (label: Full name) | Submit with empty name → blocked | Manual / UI |
| R8 | Scenario | **Contact Us** — email | `ContactForm` + `POST /api/contact` + Zod email | Invalid email → API 400 | Manual / optional automated test |
| R9 | Scenario | **Contact Us** — phone | `ContactForm` field `phone` | Required; stored in `Inquiry` | DB / admin |
| R10 | Scenario | **Contact Us** — company **name** | `ContactForm` field `companyName` (label: Company name) | Required; Prisma `companyName` | DB / admin |
| R11 | Scenario | **Contact Us** — country | `ContactForm` field `country` | Required | DB / admin |
| R12 | Scenario | **Contact Us** — job title | `ContactForm` field `jobTitle` | Required | DB / admin |
| R13 | Scenario | **Contact Us** — job details | `ContactForm` textarea `jobDetails` | Required | DB / admin |
| R14 | Scenario | Customers **no accounts / no passwords** | No public auth; contact only | No signup flow on site | Video narrative |
| R15 | Scenario | **Password-protected admin** | `/admin/login` + `iron-session`; `requireAdmin()` on dashboard layout | Hit `/admin/dashboard` logged out → redirect login | Video |
| R16 | Scenario | Admin sees **inquiry volume / data** | `/admin/dashboard` — total count + table + “What they wrote” | Submit contact form → row appears + total increments | Video |
| R17 | Task 2 | Solution **functional**, largely error-free | Forms, navigation, API validation | Happy path + invalid input + wrong admin password | §6 test results |
| R18 | Task 2 | Conforms to **agreed** requirements | Must match **signed** spec, not only scenario PDF | Cross-check signed doc ↔ this table | Client sign-off scan |

## API & data

| Item | Detail |
|------|--------|
| Persist inquiries | `POST /api/contact` → Prisma `Inquiry` (`prisma/schema.prisma`) |
| Admin session | `POST /api/admin/login`, `POST /api/admin/logout`, cookie via `iron-session` (`src/lib/session.ts`) |
| Abuse mitigation | `POST /api/contact` — IP-based rate limit (`src/lib/rate-limit.ts`) |

## Optional portfolio extras (not required by code)

- **R4 depth**: If your agreed spec promises full article pages, add `/articles/[slug]`; if teasers only, state that in the signed requirements.
- **Non-functional**: note responsiveness, basic security (HTTPS in prod), privacy text on contact page.

## Changelog

- Add rows here when the client approves scope changes (keeps traceability honest).
