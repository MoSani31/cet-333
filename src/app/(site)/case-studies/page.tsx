import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Case studies" };

const cases = [
  {
    sector: "Regional financial services",
    outcome:
      "We helped contain a credential stuffing wave on customer portals by blocking abusive IPs, speeding MFA for high risk accounts, and showing before and after metrics so leadership could see the effect.",
  },
  {
    sector: "National ministry programme",
    outcome:
      "We shortened dwell time after phishing led to footholds by joining endpoint and identity signals. Playbooks in the Cyber Assistant cut average triage time for on call analysts.",
  },
  {
    sector: "SME manufacturing group",
    outcome:
      "We split OT adjacent networks from corporate IT. Anomaly alerts caught misuse of a maintenance VPN before ransomware attempts spread in the supply chain.",
  },
] as const;

export default function CaseStudiesPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Work we have supported"
        subtitle="Examples of outcomes from real style engagements. Names and fine detail are kept generic on purpose."
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
