import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Articles" };

const articles = [
  {
    slug: "ransomware-readiness",
    date: "Mar 2026",
    title: "Ransomware readiness: backups alone are not a strategy",
    summary:
      "Immutable backups, recovery drills, and identity controls matter as much as detection. Here is what we check first when we stress test a response plan.",
  },
  {
    slug: "phishing-metrics",
    date: "Feb 2026",
    title: "Measuring phishing resilience beyond click rates",
    summary:
      "Report rates, time to containment, and repeat targeting often tell you more than one campaign percentage. How to read the signals without blaming users.",
  },
  {
    slug: "zero-trust-pragmatic",
    date: "Jan 2026",
    title: "Zero trust in practice for mid-sized enterprises",
    summary:
      "Segmentation, device posture, and least privilege in stages, without trying to boil the ocean. A roadmap we use with regional clients.",
  },
] as const;

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Articles"
        subtitle="Short notes for technical and security leads. Plain language, no filler."
      />
      <ul className="space-y-6">
        {articles.map((a) => (
          <li key={a.slug} className="rounded-lg border border-slate-800 bg-slate-900/30 p-5 sm:p-6">
            <p className="text-xs text-slate-500">{a.date}</p>
            <h2 className="mt-1 text-xl font-medium text-white">{a.title}</h2>
            <p className="mt-2 text-slate-400">{a.summary}</p>
            <p className="mt-3 text-xs text-slate-500">Ask us if you want the full write up on any topic.</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-slate-500">
        Want something written for your environment?{" "}
        <Link href="/contact" className="text-cyan-400 hover:underline">
          Contact the security team
        </Link>
        .
      </p>
    </main>
  );
}
