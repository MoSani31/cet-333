import { AdminSubNav } from "@/components/admin/AdminSubNav";
import { IssueFilterLinks } from "@/components/admin/IssueFilterLinks";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { db } from "@/lib/db";
import { countByCountry, countBySecurityIssueType } from "@/lib/inquiry-stats";
import { SECURITY_ISSUE_TYPES } from "@/lib/security-issue-types";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Service requests" };

function formatDate(d: Date) {
  return d.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function isValidIssue(value: string | undefined): value is (typeof SECURITY_ISSUE_TYPES)[number] {
  return value !== undefined && (SECURITY_ISSUE_TYPES as readonly string[]).includes(value);
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ issue?: string | string[] }>;
}) {
  const params = await searchParams;
  const raw = params.issue;
  const issueParam = Array.isArray(raw) ? raw[0] : raw;
  const issueFilter = isValidIssue(issueParam) ? issueParam : undefined;

  let inquiries: Awaited<ReturnType<typeof db.inquiry.findMany>> = [];
  let byType: Awaited<ReturnType<typeof countBySecurityIssueType>> = [];
  let byCountry: Awaited<ReturnType<typeof countByCountry>> = [];
  let loadError = false;
  let dbConnected = false;

  try {
    await db.$queryRaw`SELECT 1`;
    dbConnected = true;
    [inquiries, byType, byCountry] = await Promise.all([
      db.inquiry.findMany({
        where: issueFilter ? { securityIssueType: issueFilter } : undefined,
        orderBy: { createdAt: "desc" },
      }),
      countBySecurityIssueType(),
      countByCountry(),
    ]);
  } catch {
    // Keep admin dashboard accessible during transient DB/network issues.
    loadError = true;
  }

  const total = inquiries.length;

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
      <AdminSubNav currentPath="/admin/dashboard" />
      <div
        className={`mt-6 rounded-md border px-4 py-2 text-sm ${
          dbConnected
            ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-200"
            : "border-amber-600/40 bg-amber-500/10 text-amber-200"
        }`}
      >
        Database status: {dbConnected ? "Connected" : "Connection issue"}
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Technical service requests</h1>
          <p className="mt-1 text-sm text-slate-400">
            {issueFilter ? (
              <>
                Showing <span className="font-medium text-cyan-300">{total}</span> with issue type &quot;
                {issueFilter}&quot;
              </>
            ) : (
              <>
                Total requests: <span className="font-medium text-cyan-300">{total}</span>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sm text-cyan-400 hover:underline">
            View site
          </Link>
          <LogoutButton />
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-white">Analytics</h2>
        <p className="mt-1 text-sm text-slate-500">
          Most requested service types and regional demand across all submissions.
        </p>
        {loadError ? (
          <p className="mt-3 rounded-lg border border-amber-600/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
            Database connection is temporarily unavailable. Data views will return automatically once the connection
            is restored.
          </p>
        ) : null}
        <div className="mt-4 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-medium text-slate-300">Most requested services</h3>
            <p className="mt-1 text-xs text-slate-500">By security issue type</p>
            <ul className="mt-3 space-y-2 text-sm">
              {byType.length === 0 && <li className="text-slate-500">No data yet.</li>}
              {byType.map((row) => (
                <li key={row.label} className="flex justify-between gap-4 border-b border-slate-800/80 pb-2 last:border-0">
                  <span className="text-slate-300">{row.label}</span>
                  <span className="font-medium tabular-nums text-cyan-300">{row.count}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
            <h3 className="text-sm font-medium text-slate-300">Regional demand</h3>
            <p className="mt-1 text-xs text-slate-500">By country (as submitted)</p>
            <ul className="mt-3 space-y-2 text-sm">
              {byCountry.length === 0 && <li className="text-slate-500">No data yet.</li>}
              {byCountry.map((row) => (
                <li key={row.label} className="flex justify-between gap-4 border-b border-slate-800/80 pb-2 last:border-0">
                  <span className="text-slate-300">{row.label}</span>
                  <span className="font-medium tabular-nums text-cyan-300">{row.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium text-white">Filter by service type</h2>
        <p className="mt-1 text-sm text-slate-500">Limit the table to one category of security issue.</p>
        <div className="mt-3">
          <IssueFilterLinks activeIssue={issueFilter} />
        </div>
      </section>

      <div className="mt-8 overflow-x-auto rounded-lg border border-slate-800">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Organization</th>
              <th className="p-3 font-medium">Country</th>
              <th className="p-3 font-medium">Job title</th>
              <th className="p-3 font-medium min-w-[10rem]">Security issue</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={8} className="p-6 text-slate-500">
                  Nothing here for this filter. When someone submits the Contact Security Team form, rows appear here.
                </td>
              </tr>
            )}
            {inquiries.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-800/80 last:border-0 odd:bg-slate-950/50 even:bg-slate-900/20"
              >
                <td className="p-3 align-top text-slate-400 whitespace-nowrap">{formatDate(row.createdAt)}</td>
                <td className="p-3 align-top text-slate-200">{row.name}</td>
                <td className="p-3 align-top text-cyan-300/90">
                  <a href={`mailto:${row.email}`} className="hover:underline">
                    {row.email}
                  </a>
                </td>
                <td className="p-3 align-top text-slate-300">{row.phone}</td>
                <td className="p-3 align-top text-slate-300">{row.organization}</td>
                <td className="p-3 align-top text-slate-300">{row.country}</td>
                <td className="p-3 align-top text-slate-300">{row.jobTitle}</td>
                <td className="p-3 align-top text-slate-300">{row.securityIssueType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {inquiries.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-medium text-white">Technical problem details (newest first)</h2>
          {inquiries.map((row) => (
            <article key={row.id + "-details"} className="rounded-md border border-slate-800 bg-slate-900/40 p-4">
              <p className="text-xs text-slate-500">
                {formatDate(row.createdAt)} — {row.name} ({row.email}) · {row.securityIssueType}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{row.technicalProblem}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
