import { db } from "@/lib/db";
import Link from "next/link";

type Props = {
  currentPath: "/admin/dashboard" | "/admin/ratings";
};

export async function AdminSubNav({ currentPath }: Props) {
  const pending = await db.ratingSubmission.count({
    where: { status: "PENDING" },
  });

  const linkClass = (path: string) =>
    `rounded-md px-3 py-1.5 text-sm ${
      currentPath === path ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
    }`;

  return (
    <nav className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-4" aria-label="Admin sections">
      <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
        Requests
      </Link>
      <Link href="/admin/ratings" className={linkClass("/admin/ratings")}>
        Ratings
        {pending > 0 ? (
          <span className="ml-1.5 rounded-full bg-amber-500/25 px-2 py-0.5 text-xs font-medium text-amber-200">
            {pending} pending
          </span>
        ) : null}
      </Link>
    </nav>
  );
}
