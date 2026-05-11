import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Case studies" };

const cases = [
  {
    sector: "Regional financial services",
    outcome:
      "Contained a credential-stuffing surge across customer portals—blocking abusive IPs, tightening MFA rollout for high-risk accounts, and proving effectiveness with before/after telemetry.",
  },
  {
    sector: "National ministry programme",
    outcome:
      "Reduced dwell time after phishing-led footholds by correlating endpoint and identity signals; Cyber Assistant playbooks cut mean triage time for duty analysts.",
  },
  {
    sector: "SME manufacturing group",
    outcome:
      "Segmented OT-adjacent networks from corporate IT; anomaly alerts surfaced maintenance VPN misuse that preceded ransomware attempts elsewhere in the supply chain.",
  },
] as const;

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Threat mitigation highlights"
        subtitle="Illustrative outcomes from exercises and engagements—identifiers kept generic to respect client confidentiality."
      />
      <ol className="list-decimal space-y-5 pl-5 marker:text-cyan-400">
        {cases.map((c) => (
          <li key={c.sector} className="pl-1">
            <h2 className="text-lg font-medium text-white">{c.sector}</h2>
            <p className="mt-2 text-slate-400">{c.outcome}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
