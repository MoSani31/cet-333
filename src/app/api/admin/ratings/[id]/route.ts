import { NextRequest, NextResponse } from "next/server";
import { RatingStatus } from "@prisma/client";
import { z } from "zod";
import { requireAdminApi } from "@/lib/auth";
import { db } from "@/lib/db";

const patchSchema = z.object({
  action: z.enum(["approve", "reject"]),
});

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body." }, { status: 400 });
  }

  const now = new Date();
  const status =
    parsed.data.action === "approve" ? RatingStatus.APPROVED : RatingStatus.REJECTED;

  try {
    await db.ratingSubmission.update({
      where: { id },
      data: { status, moderatedAt: now },
    });
  } catch {
    return NextResponse.json({ error: "Rating not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  try {
    await db.ratingSubmission.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Rating not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
