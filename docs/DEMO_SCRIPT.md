# CyberNova — Demo video script

**Length target:** ~8–12 minutes (follow your module’s guidance).  
**Before recording:** `npx prisma db push`, optional **`npm run db:seed`**, `npm run dev`, set `ADMIN_PASSWORD` in `.env`.

## 0) Opening (20–30s)

- Open the site home (`/`).
- **Say:** client is **CyberNova Analytics Ltd**, based in **Gaborone**, serving **Southern Africa**; prototype covers marketing pages, **Contact Security Team** form (no public accounts), **client ratings** with moderation, and **password-protected admin** with **filters**, **analytics**, and **ratings review**.

## 1) Public marketing / scenario coverage (90–120s)

Walk **in order**:

1. **Solutions** (`/solutions`) — cybersecurity / AI monitoring positioning.
2. **Case studies** (`/case-studies`) — threat-mitigation style outcomes.
3. **Feedback** (`/feedback`) — scroll **Published testimonials** (approved only); point out **Submit your rating** form (submissions go to moderation, not straight to the grid).
4. **Articles** (`/articles`) — technical cyber-risk articles.
5. **Gallery** (`/gallery`) — training workshops and events (photos).

**Tip:** Pause ~2 seconds per page so markers can read headings and nav.

## 2) Contact Security Team — happy path (60–90s)

- Go to **Contact security** (`/contact`).
- Point out: **no customer login**; fields match the brief (organization, issue type, technical problem, etc.).
- Submit a **test** enquiry you will recognise in admin.

## 3) Client rating — submit + confirmation (45–75s)

- On **`/feedback`**, submit a **new rating** (stars + testimonial + display name).
- Show **success confirmation** message.
- Scroll **Published testimonials** — explain the new entry is **not** visible yet because it is **pending** (unless you approve it during recording).

## 4) Admin — service requests + analytics (90–120s)

- Open **`/admin/login`**; fail password once; sign in.
- **`/admin/dashboard`**: **Admin sub-nav** — note **pending** badge on **Ratings moderation** if seed or test data includes pending rows.
- Show **analytics** (services + region), **filter** by issue type, table + technical problem details for your contact submission.

## 5) Admin — ratings moderation (90–120s)

- Open **`/admin/ratings`** (via sub-nav).
- Find a **PENDING** row (seed includes one, or use your test submission).
- **Approve** — then open `/feedback` in a new tab and confirm the testimonial **appears** in Published testimonials.
- Optionally **Reject** another pending row and confirm it **does not** appear publicly.
- Show **Delete** on a row if you want to demonstrate removal.

## 6) Log out + protection (30–45s)

- **Log out**; try **`/admin/dashboard`** and **`/admin/ratings`** → must require login.

## 7) Close (20–30s)

- Summarise: marketing + contact + **rating pipeline with moderation** + admin analytics + secure admin areas.

---

## Pre-flight checklist

- [ ] Home → Solutions → Case studies → Feedback → Articles → Gallery load.
- [ ] Contact submits successfully; rating form submits; confirmation shows.
- [ ] `/feedback` public list only shows **approved** ratings.
- [ ] Admin dashboard analytics + filter work; ratings page approve/reject/delete work.
- [ ] Logout works; admin routes protected.

## Optional retakes

- If **rate limit** triggers (`429` on contact or ratings), wait **one minute** or switch browser.
