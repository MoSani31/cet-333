# CyberNova (ai-solutions) walkthrough by page

This walks the **Next.js App Router** tree the way a visitor or admin would hit it. File paths are under `src/app` unless noted. Brand in the UI is **CyberNova Analytics**.

## Layouts that wrap everything

**`src/app/layout.tsx`** is the root shell: fonts, global CSS, default browser title and description for the whole product, and the dark page background on `body`.

**`src/app/(site)/layout.tsx`** wraps only the marketing site. It adds the top **Header** and bottom **Footer** around each public page in that group. Admin URLs sit outside this group so they do not get the public chrome.

**`src/app/admin/layout.tsx`** is a thin wrapper (same dark styling idea) for anything under `/admin`.

**`src/app/admin/dashboard/layout.tsx`** and **`src/app/admin/ratings/layout.tsx`** both call `requireAdmin()` so the child page only runs for a signed in admin session.

## Public site (with header and footer)

### `/` Home

**File:** `(site)/page.tsx`

Hero for CyberNova, short positioning line, primary buttons to **Solutions** and **Contact security**, then three highlight cards (monitoring, assistant, regional focus). All static content in the file.

### `/solutions`

**File:** `(site)/solutions/page.tsx`

List of five named cybersecurity offerings with a short paragraph each, plus a page heading and subtitle aimed at SMEs, finance, insurance, and government.

### `/case-studies`

**File:** `(site)/case-studies/page.tsx`

Numbered list of three anonymised “threat mitigation” style stories (sector label plus outcome text). No separate detail URLs, everything is on this page.

### `/feedback`

**File:** `(site)/feedback/page.tsx`

Two jobs at once. Upper block is **`RatingForm`** so anyone can submit a star rating and comment (POST **`/api/ratings`**). Lower block loads **approved** rows from **`RatingSubmission`** in Postgres and shows them in a grid with stars. If the database call fails, the page still renders and shows a gentle warning so the form stays usable.

### `/articles`

**File:** `(site)/articles/page.tsx`

Three article teasers (date, title, summary). No `/articles/[slug]` routes in the repo: each card is display only, with a line inviting contact for full write ups and a link to the contact page.

### `/gallery`

**File:** `(site)/gallery/page.tsx`

Responsive image grid (remote Unsplash URLs via `next/image`) with captions. No separate event calendar section in the current file, just the gallery grid.

### `/contact`

**File:** `(site)/contact/page.tsx` plus **`src/components/ContactForm.tsx`**

Marketing copy and a short privacy note, then the **Contact Security Team** form (name, email, phone, organization, country, job title, issue type from a shared list, free text description). Submit posts JSON to **`/api/contact`**, which validates, rate limits, and inserts an **`Inquiry`** row.

## Admin (no public header or footer)

### `/admin` and `/admin/login`

**Files:** `admin/page.tsx` (redirects to login), `admin/login/page.tsx`, **`src/components/admin/LoginForm.tsx`**

`/admin` immediately sends you to **`/admin/login`**. Login is password only (no username table). **`POST /api/admin/login`** checks the password, then sets an **iron session** cookie. **`POST /api/admin/logout`** clears it.

### `/admin/dashboard`

**File:** `admin/dashboard/page.tsx` plus **`AdminSubNav`**, **`IssueFilterLinks`**, **`src/lib/inquiry-stats.ts`**

After auth: subnav to switch between service requests and ratings moderation (pending ratings show a badge count). A small **database status** banner reflects a trivial `SELECT 1` check. Main table lists **Inquiry** rows with optional **`?issue=`** filter from the issue type links. Analytics sections summarise counts by issue type and by country when the DB is healthy. Deeper “what they wrote” style blocks follow the table when there is data.

### `/admin/ratings`

**File:** `admin/ratings/page.tsx` plus **`RatingModerationActions`**

Table of every **`RatingSubmission`** sorted with pending first. Staff approve or reject; actions hit **`PATCH /api/admin/ratings/[id]`** which updates status and is guarded by **`requireAdminApi`**.

## API routes (no HTML, used by the pages above)

| Route | Role |
|-------|------|
| `api/contact/route.ts` | Accepts contact form JSON, rate limit, Zod, Prisma `Inquiry` insert |
| `api/ratings/route.ts` | Accepts public rating JSON, rate limit, Zod, Prisma `RatingSubmission` insert as **PENDING** |
| `api/admin/login/route.ts` | Sets admin session when password matches env |
| `api/admin/logout/route.ts` | Destroys admin session |
| `api/admin/ratings/[id]/route.ts` | PATCH approve or reject for one rating id |

## Data layer (Prisma)

**`prisma/schema.prisma`** defines **`Inquiry`** (service requests from contact) and **`RatingSubmission`** (stars, comment, moderation status). **`DATABASE_URL`** points at Postgres (Neon in your deployment). **`src/lib/db.ts`** exports the shared Prisma client.

## Shared UI pieces worth naming once

**`src/components/Header.tsx`** and **`MobileNav.tsx`** drive the nav links for all public routes.

**`src/components/Footer.tsx`** company blurb and link to contact.

**`src/components/PageHeading.tsx`** is the repeated title plus subtitle block on inner marketing pages.

## If you compare to `SUPERVISOR_WALKTHROUGH.md`

That file zooms in on **one** vertical slice (contact submit through the API). This document is the **full surface map** page by page and where data enters or leaves the system.
