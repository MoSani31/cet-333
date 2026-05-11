import { db } from "@/lib/db";

/** Counts per security issue type (service demand). */
export async function countBySecurityIssueType() {
  const rows = await db.inquiry.groupBy({
    by: ["securityIssueType"],
    _count: { id: true },
    orderBy: { securityIssueType: "asc" },
  });
  return rows
    .map((r) => ({ label: r.securityIssueType, count: r._count.id }))
    .sort((a, b) => b.count - a.count);
}

/** Counts per country (regional demand). */
export async function countByCountry() {
  const rows = await db.inquiry.groupBy({
    by: ["country"],
    _count: { id: true },
    orderBy: { country: "asc" },
  });
  return rows
    .map((r) => ({ label: r.country, count: r._count.id }))
    .sort((a, b) => b.count - a.count);
}
