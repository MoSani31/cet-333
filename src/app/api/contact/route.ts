import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { rateLimitSlidingWindow } from "@/lib/rate-limit";

const bodySchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(50),
  companyName: z.string().min(1).max(200),
  country: z.string().min(1).max(100),
  jobTitle: z.string().min(1).max(200),
  jobDetails: z.string().min(1).max(5000),
});

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
  await db.inquiry.create({ data: data });
  return NextResponse.json({ ok: true });
}
