import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Solutions" };

const solutions = [
  {
    name: "Continuous monitoring and anomaly detection",
    text: "We watch network and host signals for unusual behaviour and give your team enough context to act. The Cyber Assistant can help triage and suggest next steps.",
  },
  {
    name: "Automated risk assessment",
    text: "Clear views of where you are exposed and where controls are thin, written so business leads understand it, with remediation order that makes sense.",
  },
  {
    name: "Predictive care for critical systems",
    text: "Early signs of misconfiguration or failure that could weaken your posture, surfaced before a small fault turns into downtime or a breach.",
  },
  {
    name: "Advisory and guided help",
    text: "Chat style help anchored in your policies and how you are built today. Risks explained in plain terms with practical mitigation paths.",
  },
  {
    name: "Secure change and pilots",
    text: "Controlled pilots for new kit and integrations, with security treated as part of day one work rather than a late add on.",
  },
] as const;

export default function SolutionsPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="What we can do for you"
        subtitle="Work we do often for SMEs, banks, insurers, and government teams across the region."
      />
      <ul className="space-y-4">
        {solutions.map((s) => (
          <li key={s.name} className="rounded-lg border border-slate-800 bg-slate-900/30 p-6 sm:p-7">
            <h2 className="text-lg font-medium text-cyan-100">{s.name}</h2>
            <p className="mt-2 text-slate-400">{s.text}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
