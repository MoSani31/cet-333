import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Solutions" };

const solutions = [
  {
    name: "Workplace assistant",
    text: "Handle repeat questions, point people to the right policy or form, and free your service desk for trickier work. Tuned to your organisation's language.",
  },
  {
    name: "Early software builds",
    text: "Wireframes through to working previews so stakeholders can react to something real before you freeze requirements.",
  },
  {
    name: "Light adoption checks",
    text: "Simple views on what's being used, where people get stuck, and what they're asking for—so you fix small problems before they grow.",
  },
  {
    name: "Joining up your tools",
    text: "Link HR, IT, and comms so staff aren't bouncing between five different places to finish one task.",
  },
] as const;

export default function SolutionsPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="What we do"
        subtitle="A short list of things we're often asked for. If your need isn't on here, still get in touch—we'll say honestly if we're the right fit."
      />
      <ul className="space-y-4">
        {solutions.map((s) => (
          <li
            key={s.name}
            className="rounded-lg border border-slate-800 bg-slate-900/30 p-6 sm:p-7"
          >
            <h2 className="text-lg font-medium text-cyan-100">{s.name}</h2>
            <p className="mt-2 text-slate-400">{s.text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
