import { NextRequest, NextResponse } from "next/server";
import { RatingStatus } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";
import { rateLimitSlidingWindow } from "@/lib/rate-limit";

const bodySchema = z.object({
  stars: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().min(1).max(2000),
  displayName: z.string().trim().min(1).max(200),
  organization: z.preprocess(
    (v) => (v === undefined || v === null || v === "" ? undefined : String(v).trim()),
    z.union([z.undefined(), z.string().max(200)]),
  ),
  contactEmail: z.preprocess(
    (v) => (v === undefined || v === null || v === "" ? undefined : String(v).trim()),
    z.union([z.undefined(), z.string().max(200)]),
  ),
});

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() ?? request.headers.get("x-real-ip") ?? "unknown";
  if (!rateLimitSlidingWindow(`ratings:${ip}`, 10, 60_000)) {
    return NextResponse.json(
      { error: "You've submitted several ratings recently. Please wait a minute and try again." },
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
  if (data.contactEmail && !z.string().email().safeParse(data.contactEmail).success) {
    return NextResponse.json({ error: "Please enter a valid contact email or leave it blank." }, { status: 400 });
  }

  await db.ratingSubmission.create({
    data: {
      stars: data.stars,
      comment: data.comment,
      displayName: data.displayName,
      organization: data.organization,
      contactEmail: data.contactEmail,
      status: RatingStatus.PENDING,
    },
  });

  return NextResponse.json({ ok: true });
}
