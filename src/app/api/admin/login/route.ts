import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { getSessionOptions } from "@/lib/session";
import { isAdminPasswordValid } from "@/lib/admin-password";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "That request didn't go through. Refresh the page and try again." }, { status: 400 });
  }

  const password =
    typeof body === "object" && body !== null && "password" in body
      ? (body as { password?: unknown }).password
      : undefined;

  if (typeof password !== "string") {
    return NextResponse.json({ error: "Password is required." }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!isAdminPasswordValid(password, expected)) {
    return NextResponse.json({ error: "That password didn't work." }, { status: 401 });
  }

  const session = await getIronSession(await cookies(), getSessionOptions());
  session.isLoggedIn = true;
  await session.save();
  return NextResponse.json({ ok: true });
}
