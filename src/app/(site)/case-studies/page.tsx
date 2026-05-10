import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Case studies" };

const cases = [
  {
    industry: "Public sector (regional team)",
    outcome:
      "Cut time-to-answer for internal HR queries with an assistant and a single knowledge path; satisfaction scores in pilots improved within six weeks.",
  },
  {
    industry: "Manufacturing",
    outcome:
      "Rapid frontline tablet app trial validated with shop-floor staff; reduced late rework in the pilot line by making instructions contextual.",
  },
  {
    industry: "SME services",
    outcome:
      "Replaced a patchwork of forms with one intake flow; leadership gained a shared queue of work instead of ad-hoc email threads.",
  },
] as const;

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Work we're proud of"
        subtitle="Examples of the kinds of outcomes we've helped with—sectors and names kept general on purpose."
      />
      <ol className="list-decimal space-y-5 pl-5 marker:text-cyan-400">
        {cases.map((c) => (
          <li key={c.industry} className="pl-1">
            <h2 className="text-lg font-medium text-white">{c.industry}</h2>
            <p className="mt-2 text-slate-400">{c.outcome}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
