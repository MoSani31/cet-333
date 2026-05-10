# AI-Solutions (CET333 prototype)

Fictitious company site for the Product Development assessment: public marketing pages, a **Contact us** form (no user accounts), and a **password-protected admin** view of submitted inquiries.

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables and adjust if needed:

   ```bash
   copy .env.example .env
   ```

3. Create the SQLite database and Prisma client:

   ```bash
   npx prisma db push
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).  
   **Admin:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login) — default password is in `.env` as `ADMIN_PASSWORD` (e.g. `admin123` as shipped in the example).

## Tech

- [Next.js](https://nextjs.org) (App Router)  
- [Prisma](https://www.prisma.io) + SQLite for inquiries  
- [iron-session](https://github.com/vvo/iron-session) for the admin session cookie  
- [Zod](https://zod.dev) for contact API validation  

## Environment

| Variable         | Purpose                                      |
| ---------------- | -------------------------------------------- |
| `DATABASE_URL`   | SQLite file path, e.g. `file:./prisma/dev.db` |
| `SESSION_SECRET` | **At least 32 characters**; encrypts the admin session cookie |
| `ADMIN_PASSWORD` | Plain text password for the admin login (prototype) |

## Scripts

- `npm run build` — `prisma generate` then `next build`  
- `npm run db:push` — update DB schema from `prisma/schema.prisma`  
- `npm run db:studio` — open Prisma Studio on the local DB  
