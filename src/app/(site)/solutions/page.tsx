import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Solutions" };

const solutions = [
  {
    name: "Continuous monitoring & anomaly detection",
    text: "Network and system signals reviewed for unusual behaviour, with context so your team can act—backed by the Cyber Assistant for triage and next steps.",
  },
  {
    name: "Automated risk assessment",
    text: "Structured views of exposure and control gaps, expressed in business-friendly language with remediation priorities.",
  },
  {
    name: "Predictive maintenance for critical systems",
    text: "Early indicators of failure or misconfiguration that could weaken security posture—before outages or breaches exploit them.",
  },
  {
    name: "Advisory & AI-powered guidance",
    text: "Chat-style assistance grounded in your policies and architecture patterns—explaining risks clearly and recommending mitigation paths.",
  },
  {
    name: "Digital transformation & secure prototyping",
    text: "Rapid, controlled pilots for new infrastructure and integrations—with security baked in from day one.",
  },
] as const;

export default function SolutionsPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Cybersecurity solutions"
        subtitle="Technical capabilities aligned with SMEs, banks, insurers, and government programmes expanding across the region."
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
