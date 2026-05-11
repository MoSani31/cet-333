import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { getSessionOptions, type AdminSessionData } from "./session";

export async function getAdminSession() {
  return getIronSession<AdminSessionData>(await cookies(), getSessionOptions());
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }
  return session;
}

/** For Route Handlers: return JSON 401 if not logged in as admin. */
export async function requireAdminApi(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  return null;
}
