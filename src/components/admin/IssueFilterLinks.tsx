import Link from "next/link";
import { SECURITY_ISSUE_TYPES } from "@/lib/security-issue-types";

type Props = {
  activeIssue: string | undefined;
};

export function IssueFilterLinks({ activeIssue }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/admin/dashboard"
        className={`rounded-md px-3 py-1.5 text-sm ${
          !activeIssue ? "bg-cyan-600 text-slate-950" : "border border-slate-600 text-slate-300 hover:bg-slate-800"
        }`}
      >
        All types
      </Link>
      {SECURITY_ISSUE_TYPES.map((t) => {
        const selected = activeIssue === t;
        return (
          <Link
            key={t}
            href={`/admin/dashboard?issue=${encodeURIComponent(t)}`}
            className={`rounded-md px-3 py-1.5 text-sm ${
              selected ? "bg-cyan-600 text-slate-950" : "border border-slate-600 text-slate-300 hover:bg-slate-800"
            }`}
          >
            {t}
          </Link>
        );
      })}
    </div>
  );
}
