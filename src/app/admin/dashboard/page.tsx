import { LogoutButton } from "@/components/admin/LogoutButton";
import { db } from "@/lib/db";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Messages" };

function formatDate(d: Date) {
  return d.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminDashboardPage() {
  const inquiries = await db.inquiry.findMany({ orderBy: { createdAt: "desc" } });
  const total = inquiries.length;

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Contact messages</h1>
          <p className="mt-1 text-sm text-slate-400">
            Total: <span className="font-medium text-cyan-300">{total}</span>
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
              <th className="p-3 font-medium">Name</th>
              <th className="p-3 font-medium">Email</th>
              <th className="p-3 font-medium">Phone</th>
              <th className="p-3 font-medium">Company</th>
              <th className="p-3 font-medium">Country</th>
              <th className="p-3 font-medium">Title</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-slate-500">
                  Nothing here yet. When someone uses the contact form on the site, their message will show up in this table.
                </td>
              </tr>
            )}
            {inquiries.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-800/80 last:border-0 odd:bg-slate-950/50 even:bg-slate-900/20"
              >
                <td className="p-3 align-top text-slate-400 whitespace-nowrap">
                  {formatDate(row.createdAt)}
                </td>
                <td className="p-3 align-top text-slate-200">{row.name}</td>
                <td className="p-3 align-top text-cyan-300/90">
                  <a href={`mailto:${row.email}`} className="hover:underline">
                    {row.email}
                  </a>
                </td>
                <td className="p-3 align-top text-slate-300">{row.phone}</td>
                <td className="p-3 align-top text-slate-300">{row.companyName}</td>
                <td className="p-3 align-top text-slate-300">{row.country}</td>
                <td className="p-3 align-top text-slate-300">{row.jobTitle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {inquiries.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-medium text-white">What they wrote (newest first)</h2>
          {inquiries.map((row) => (
            <article
              key={row.id + "-details"}
              className="rounded-md border border-slate-800 bg-slate-900/40 p-4"
            >
              <p className="text-xs text-slate-500">
                {formatDate(row.createdAt)} — {row.name} ({row.email})
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">{row.jobDetails}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
