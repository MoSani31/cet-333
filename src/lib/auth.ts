import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionOptions } from "./session";

export async function getAdminSession() {
  return getIronSession(await cookies(), getSessionOptions());
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }
  return session;
}
