import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Articles" };

const articles = [
  {
    slug: "dei",
    date: "Mar 2026",
    title: "Why the digital employee experience is a board-level topic",
    summary:
      "When tools are clunky or hard to find, everyone loses time. A short note on why fixing that belongs in leadership conversations.",
  },
  {
    slug: "assistants",
    date: "Feb 2026",
    title: "What makes a workplace assistant useful (not just flashy)",
    summary:
      "Clear answers, trusted sources, and a way to improve from feedback—without that, assistants turn into week-two toys.",
  },
  {
    slug: "sunderland",
    date: "Jan 2026",
    title: "Building from the North East",
    summary:
      "We're based in the North East on purpose—local relationships, the same standards you'd expect anywhere.",
  },
] as const;

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Articles"
        subtitle="Short reads on people, process, and tech—written to be useful, not to sound clever."
      />
      <ul className="space-y-6">
        {articles.map((a) => (
          <li
            key={a.slug}
            className="rounded-lg border border-slate-800 bg-slate-900/30 p-5 sm:p-6"
          >
            <p className="text-xs text-slate-500">{a.date}</p>
            <h2 className="mt-1 text-xl font-medium text-white">{a.title}</h2>
            <p className="mt-2 text-slate-400">{a.summary}</p>
            <p className="mt-3 text-xs text-slate-500">Ask us if you'd like the full version of any piece.</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-slate-500">
        Need something tailored?{" "}
        <Link href="/contact" className="text-cyan-400 hover:underline">
          Get in touch
        </Link>
        .
      </p>
    </main>
  );
}
