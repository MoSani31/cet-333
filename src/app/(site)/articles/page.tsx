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
      "Immutable backups, recovery drills, and identity controls matter as much as detection—what we verify first when stress-testing response plans.",
  },
  {
    slug: "phishing-metrics",
    date: "Feb 2026",
    title: "Measuring phishing resilience beyond click rates",
    summary:
      "Report rates, time-to-containment, and repeat targeting tell you more than a single campaign percentage—how to interpret signals without blaming users.",
  },
  {
    slug: "zero-trust-pragmatic",
    date: "Jan 2026",
    title: "Zero trust in practice for mid-sized enterprises",
    summary:
      "Segmentation, device posture, and least-privilege access without boiling the ocean—a staged roadmap CyberNova uses with regional clients.",
  },
] as const;

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Technical articles"
        subtitle="Short, practitioner-focused notes on cyber risks and controls—written for technical and security leads."
      />
      <ul className="space-y-6">
        {articles.map((a) => (
          <li key={a.slug} className="rounded-lg border border-slate-800 bg-slate-900/30 p-5 sm:p-6">
            <p className="text-xs text-slate-500">{a.date}</p>
            <h2 className="mt-1 text-xl font-medium text-white">{a.title}</h2>
            <p className="mt-2 text-slate-400">{a.summary}</p>
            <p className="mt-3 text-xs text-slate-500">Contact us if you would like the full write-up on any topic.</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-slate-500">
        Need advice tailored to your environment?{" "}
        <Link href="/contact" className="text-cyan-400 hover:underline">
          Contact Security Team
        </Link>
        .
      </p>
    </main>
  );
}
