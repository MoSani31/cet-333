import { AdminSubNav } from "@/components/admin/AdminSubNav";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { RatingModerationActions } from "@/components/admin/RatingModerationActions";
import { db } from "@/lib/db";
import type { RatingStatus } from "@prisma/client";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Ratings moderation" };

function formatDate(d: Date) {
  return d.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const statusOrder: Record<RatingStatus, number> = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
};

export default async function AdminRatingsPage() {
  const rows = await db.ratingSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  const sorted = [...rows].sort((a, b) => {
    const byStatus = statusOrder[a.status] - statusOrder[b.status];
    if (byStatus !== 0) return byStatus;
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
      <AdminSubNav currentPath="/admin/ratings" />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Client ratings</h1>
          <p className="mt-1 text-sm text-slate-400">
            Approve or reject testimonials before they appear on the public feedback page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-cyan-400 hover:underline">
            View site
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-lg border border-slate-800">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Stars</th>
              <th className="p-3 font-medium">Display name</th>
              <th className="p-3 font-medium">Organization</th>
              <th className="p-3 font-medium">Contact email</th>
              <th className="p-3 font-medium min-w-[14rem]">Comment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-slate-500">
                  No rating submissions yet.
                </td>
              </tr>
            )}
            {sorted.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-800/80 last:border-0 odd:bg-slate-950/50 even:bg-slate-900/20"
              >
                <td className="p-3 align-top text-slate-400 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                <td className="p-3 align-top">
                  <span
                    className={
                      row.status === "PENDING"
                        ? "text-amber-300"
                        : row.status === "APPROVED"
                          ? "text-emerald-300"
                          : "text-rose-300"
                    }
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-3 align-top text-slate-200">{row.stars}</td>
                <td className="p-3 align-top text-slate-200">{row.displayName}</td>
                <td className="p-3 align-top text-slate-400">{row.organization ?? "—"}</td>
                <td className="p-3 align-top text-cyan-300/80 text-xs">
                  {row.contactEmail ? (
                    <a href={`mailto:${row.contactEmail}`} className="hover:underline">
                      {row.contactEmail}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="p-3 align-top text-slate-300 max-w-xs">
                  <span className="line-clamp-4">{row.comment}</span>
                </td>
                <td className="p-3 align-top">
                  <RatingModerationActions id={row.id} status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
