import type { SessionOptions } from "iron-session";

/** Shape stored in the sealed admin session cookie (iron-session v8 expects an explicit generic). */
export type AdminSessionData = {
  isLoggedIn?: boolean;
};

function sessionSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error("SESSION_SECRET must be set to at least 32 characters in .env");
  }
  return s;
}

let cached: SessionOptions | null = null;

export function getSessionOptions(): SessionOptions {
  if (!cached) {
    cached = {
      password: sessionSecret(),
      cookieName: "ai_solutions_admin",
      cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      },
    };
  }
  return cached;
}
