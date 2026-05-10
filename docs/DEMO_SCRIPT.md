# CET333 — Demo video script (AI-Solutions)

**Length target:** ~5–8 minutes (adjust to module guidance).  
**Before recording:** `npm run db:push` (or migrate), `npm run dev`, set `ADMIN_PASSWORD` in `.env`, clear browser cookies if you need a clean admin login.

## 0) Opening (20–30s)

- Open the site home (`/`).
- **Say:** who the “client” is (AI-Solutions, Sunderland) and that this is the agreed prototype for enquiries + marketing content.

## 1) Public marketing / scenario coverage (90–120s)

Walk **in order** (matches traceability table):

1. **Solutions** (`/solutions`) — what the company offers.
2. **Case studies** (`/case-studies`) — past-style outcomes.
3. **Feedback** (`/feedback`) — ratings + short quotes.
4. **Articles** (`/articles`) — three pieces + how they support the brand.
5. **Gallery** (`/gallery`) — photos + **upcoming events** list.

**Tip:** Pause 2 seconds on each page so markers can see nav + content clearly.

## 2) Contact form — happy path (60–90s)

- Go to **Contact** (`/contact`).
- Point out: **no customer login**; fields match the brief (name, email, phone, company name, country, job title, job details).
- Optionally mention the **privacy** line under the heading.
- Fill the form with a **test** identity you will recognise in admin.
- Submit → show **success** message.

## 3) Admin — password gate + inquiry data (90–120s)

- Open **`/admin/login`** in a fresh tab or private window if needed.
- **Fail once** on purpose (wrong password) → show friendly error.
- **Sign in** with correct `ADMIN_PASSWORD`.
- On **`/admin/dashboard`**:
  - Show **total** count increased.
  - Find the row for the test submission (name / email).
  - Scroll to **“What they wrote”** and show the **job details** text for that inquiry.

## 4) Log out + resilience (30–45s)

- Click **Log out**; confirm redirect to login.
- Try **`/admin/dashboard`** again → should bounce to login (protected route).

## 5) Close (20–30s)

- **Say:** requirements covered (marketing pages + contact + admin tally + stored details).
- **Say:** what you would add next (e.g. email notifications, full article pages) — one sentence shows critical reflection.

---

## Quick pre-flight checklist

- [ ] Home → Solutions → Case studies → Feedback → Articles → Gallery all load.
- [ ] Contact submit works; success banner appears.
- [ ] Admin login works; new inquiry visible with correct fields.
- [ ] Logout works; dashboard requires login again.
- [ ] Audio clear; text readable at 1080p.

## Optional retakes

- If rate limit triggers during practice (`429` on contact), wait **1 minute** or use another browser / IP for recording.
