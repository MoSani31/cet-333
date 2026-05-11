# CyberNova Analytics (assessment prototype)

Fictitious company site: public pages for cybersecurity solutions and content, a **Contact Security Team** form (no user accounts), **client ratings** submitted for moderation, and a **password-protected admin** area with **service-request analytics**, **filters**, and **ratings moderation**.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   copy .env.example .env
   ```

3. Set `DATABASE_URL` in `.env` to your **PostgreSQL** database (e.g. [Neon](https://neon.tech) — pooled URL for serverless/Next.js).

4. Sync the database schema and generate the Prisma client (recommended for this prototype):

   ```bash
   npx prisma db push
   ```

   If you maintain formal migrations elsewhere, `prisma migrate dev` / `deploy` is fine—as long as the deployed schema matches [`prisma/schema.prisma`](prisma/schema.prisma), including `Inquiry`, **`RatingSubmission`**, and **`RatingStatus`**.

5. (Optional) Insert demo enquiries for admin analytics and video recording:

   ```bash
   npm run db:seed
   ```

   This resets demo **contact** rows (`@seed.cybernova.local`) and demo **ratings** (`@rating.seed.cybernova.local`).

6. Start the dev server:

   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000).  
   **Admin:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login) — password from `.env` as `ADMIN_PASSWORD`.

## Tech

- [Next.js](https://nextjs.org) (App Router)  
- [Prisma](https://www.prisma.io) + PostgreSQL for inquiries  
- [iron-session](https://github.com/vvo/iron-session) for the admin session cookie  
- [Zod](https://zod.dev) for contact API validation  

## Environment

| Variable         | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `DATABASE_URL`   | Postgres connection string (e.g. Neon pooler, `sslmode=require`) |
| `SESSION_SECRET` | **At least 32 characters**; encrypts the admin session cookie |
| `ADMIN_PASSWORD` | Plain text password for admin login (prototype) |

## Scripts

- `npm run build` — `prisma generate` then `next build`  
- `npm run db:push` — push `prisma/schema.prisma` to the database  
- `npm run db:seed` — insert demo enquiries ([`prisma/seed.mjs`](prisma/seed.mjs))  
- `npm run db:studio` — Prisma Studio  

## Docs

- [docs/TRACEABILITY.md](docs/TRACEABILITY.md) — requirement mapping for portfolio/video  
- [docs/DEMO_SCRIPT.md](docs/DEMO_SCRIPT.md) — suggested recording flow  
