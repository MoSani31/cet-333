import { timingSafeEqual } from "node:crypto";

export function isAdminPasswordValid(attempt: string | undefined, expected: string | undefined) {
  if (typeof attempt !== "string" || typeof expected !== "string" || !expected) {
    return false;
  }
  const a = Buffer.from(attempt, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length === 0 || a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}
