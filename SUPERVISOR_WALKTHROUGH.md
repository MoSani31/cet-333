# Supervisor walkthrough (CyberNova / ai-solutions)

This is a short tour of **one** feature end to end so you can show how the pieces connect without jumping around the whole repo. The thread is the **Contact security** form: someone reports a service request, the app saves it, staff can read it in admin.

## What happens in plain terms

The visitor fills the form in the browser and presses send. The page posts JSON to our own API route. That route checks who is sending (rough IP limit), checks the body shape with Zod, then writes one row through Prisma into PostgreSQL. The browser gets back either OK or a clear error. Later, the admin area loads those rows for review and simple counts.

## Order of execution

1. User submits the form on `/contact`.
2. `ContactForm` runs `onSubmit` and calls `fetch` with `POST` to `/api/contact`.
3. Next.js runs `POST` in `src/app/api/contact/route.ts`.
4. That handler rate limits by IP, parses JSON, validates with `bodySchema`, then `db.inquiry.create(...)`.
5. Admin pages query the same `Inquiry` table (see `src/app/admin/dashboard/page.tsx`).

## Where the browser hands off to the server

```40:48:c:\Users\HP\Documents\mohammed\ai-solutions\src\components\ContactForm.tsx
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
```

The form state holds name, email, phone, organization, country, job title, issue type from a fixed list, and a free text description. All of that goes in the JSON body.

## Where the server checks input and saves

```22:60:c:\Users\HP\Documents\mohammed\ai-solutions\src\app\api\contact\route.ts
export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
  if (!rateLimitSlidingWindow(`contact:${ip}`, 15, 60_000)) {
    return NextResponse.json(
      { error: "You've sent several messages in a short time. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "That request didn't go through. Refresh the page and try again." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form—one or more fields look wrong.", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  await db.inquiry.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      organization: data.organization,
      country: data.country,
      jobTitle: data.jobTitle,
      securityIssueType: data.securityIssueType,
      technicalProblem: data.technicalProblem,
    },
  });
  return NextResponse.json({ ok: true });
}
```

Rate limiting lives in `src/lib/rate-limit.ts` so one address cannot spam submissions in a short window. Zod rejects bad email or missing fields before any insert. Prisma turns `db.inquiry.create` into a normal SQL insert on the hosted Postgres (Neon in our setup).

## Admin side

After data exists, signed in staff use the admin dashboard to list requests, filter by issue type where that is wired in, and see aggregates. Same database table, this time for reading instead of writing.

## If you want a second story in another repo

The `auth-system` project is a different brief. The closest parallel pattern there is login: post credentials, validate, set a session cookie the page scripts cannot read. Same idea of UI then route then persistence, different tables and rules.
