/**
 * Simple sliding-window rate limiter for API routes (per-process memory).
 * Suitable for a coursework prototype; replace with Redis etc. in production.
 */
const buckets = new Map<string, number[]>();

export function rateLimitSlidingWindow(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;
  const stamps = buckets.get(key) ?? [];
  const recent = stamps.filter((t) => t > windowStart);
  if (recent.length >= max) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}
