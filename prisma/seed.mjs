/**
 * Demo seed data for CyberNova admin analytics (issue-type + regional breakdowns).
 * Removes only rows whose email ends with @seed.cybernova.local, then inserts fresh samples.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DEMO_EMAIL_SUFFIX = "@seed.cybernova.local";

/** Mirrors src/lib/security-issue-types.ts — keep categories aligned. */
const ISSUE_TYPES = [
  "Incident response",
  "Vulnerability assessment",
  "Monitoring & SOC",
  "Security awareness / training",
  "Infrastructure hardening",
  "Compliance / audit support",
  "Other",
];

const seeds = [
  {
    name: "Thabo Molefe",
    email: `thabo.molefe${DEMO_EMAIL_SUFFIX}`,
    phone: "+267 71 000 1001",
    organization: "Botswana Retail Cooperative",
    country: "Botswana",
    jobTitle: "IT Director",
    securityIssueType: "Incident response",
    technicalProblem:
      "Suspected lateral movement after phishing against finance staff; need containment playbook and evidence bundle for insurers.",
  },
  {
    name: "Nomsa Dlamini",
    email: `nomsa.dlamini${DEMO_EMAIL_SUFFIX}`,
    phone: "+27 82 100 2200",
    organization: "Eastern Cape Municipal Services",
    country: "South Africa",
    jobTitle: "Chief Information Officer",
    securityIssueType: "Vulnerability assessment",
    technicalProblem:
      "Annual VA scope for hybrid Active Directory and SAP interfaces; prioritised remediation list required within two weeks.",
  },
  {
    name: "Jean-Pierre Mukendi",
    email: `jp.mukendi${DEMO_EMAIL_SUFFIX}`,
    phone: "+243 99 400 3300",
    organization: "Kinshasa FinTech Collective",
    country: "Democratic Republic of the Congo",
    jobTitle: "Head of Security Engineering",
    securityIssueType: "Monitoring & SOC",
    technicalProblem:
      "24/7 Azure footprint lacks correlated alerts with on-prem DC; evaluating SOC light monitoring plus Cyber Assistant triage.",
  },
  {
    name: "Chanda Mulenga",
    email: `chanda.mulenga${DEMO_EMAIL_SUFFIX}`,
    phone: "+260 97 700 4400",
    organization: "Copperbelt Healthcare Trust",
    country: "Zambia",
    jobTitle: "Risk Manager",
    securityIssueType: "Security awareness / training",
    technicalProblem:
      "Clinical staff clicking SMS links; need role-based micro-learning in English and local languages plus phishing metrics.",
  },
  {
    name: "Rudo Chiwenga",
    email: `rudo.chiwenga${DEMO_EMAIL_SUFFIX}`,
    phone: "+263 77 300 5500",
    organization: "Harare Logistics Ltd",
    country: "Zimbabwe",
    jobTitle: "Operations Lead",
    securityIssueType: "Infrastructure hardening",
    technicalProblem:
      "Flat OT segment touching warehouse scanners; request VLAN review and jump-host policy before ransomware insurance renewal.",
  },
  {
    name: "Amelia van Wyk",
    email: `amelia.vanwyk${DEMO_EMAIL_SUFFIX}`,
    phone: "+264 81 200 6600",
    organization: "Walvis Smart Port Initiative",
    country: "Namibia",
    jobTitle: "Programme Manager",
    securityIssueType: "Compliance / audit support",
    technicalProblem:
      "Aligning port CCTV and visitor logs with national critical infrastructure reporting; gap analysis vs last audit findings.",
  },
  {
    name: "Kgotla Motsepe",
    email: `kgotla.motsepe${DEMO_EMAIL_SUFFIX}`,
    phone: "+267 73 400 7700",
    organization: "Gaborone Microfinance",
    country: "Botswana",
    jobTitle: "CISO",
    securityIssueType: "Monitoring & SOC",
    technicalProblem:
      "Duplicate Botswana entries to stress-test regional demand charts; MFA rollout telemetry needs dashboard integration.",
  },
  {
    name: "Sarah Naidoo",
    email: `sarah.naidoo${DEMO_EMAIL_SUFFIX}`,
    phone: "+27 60 900 8800",
    organization: "Cape SME Manufacturers",
    country: "South Africa",
    jobTitle: "Managing Director",
    securityIssueType: "Incident response",
    technicalProblem:
      "Ransomware attempt via exposed RDP; need IR retainer activation and forensic imaging checklist for legal.",
  },
  {
    name: "Pedro Cardoso",
    email: `pedro.cardoso${DEMO_EMAIL_SUFFIX}`,
    phone: "+258 84 500 9900",
    organization: "Maputo Trade Gateway",
    country: "Mozambique",
    jobTitle: "IT Manager",
    securityIssueType: "Other",
    technicalProblem:
      "Question about integrating Cyber Assistant read-only into Teams for policy Q&A without storing message bodies offshore.",
  },
];

function validateSeeds() {
  const allowed = new Set(ISSUE_TYPES);
  for (const row of seeds) {
    if (!allowed.has(row.securityIssueType)) {
      throw new Error(`Invalid securityIssueType in seed: ${row.securityIssueType}`);
    }
  }
}

async function main() {
  validateSeeds();

  const deleted = await prisma.inquiry.deleteMany({
    where: { email: { endsWith: DEMO_EMAIL_SUFFIX } },
  });

  await prisma.inquiry.createMany({ data: seeds });

  const ratingSuffix = "@rating.seed.cybernova.local";
  await prisma.ratingSubmission.deleteMany({
    where: { contactEmail: { endsWith: ratingSuffix } },
  });

  const moderated = new Date();
  const ratingSeeds = [
    {
      stars: 5,
      comment:
        "The Cyber Assistant turned noisy SOC feeds into clear narratives for our board—we finally aligned budget asks with evidence.",
      displayName: "CISO",
      organization: "Banking · Southern Africa",
      contactEmail: `ciso.demo${ratingSuffix}`,
      status: "APPROVED",
      moderatedAt: moderated,
    },
    {
      stars: 5,
      comment:
        "Their monitoring rollout respected our legacy constraints. When incidents happened, triage playbooks cut response time versus our old ticketing spiral.",
      displayName: "Head of IT",
      organization: "Public-sector agency",
      contactEmail: `headit.demo${ratingSuffix}`,
      status: "APPROVED",
      moderatedAt: moderated,
    },
    {
      stars: 4,
      comment:
        "Practical recommendations we could implement without a massive contractor bench. We measure fewer repeat incidents after hardening.",
      displayName: "Managing director",
      organization: "SME services group",
      contactEmail: `md.demo${ratingSuffix}`,
      status: "APPROVED",
      moderatedAt: moderated,
    },
    {
      stars: 5,
      comment:
        "[Seed pending] Awaiting moderation—use this row to demo approve/reject in admin.",
      displayName: "Security lead",
      organization: "Regional NGO",
      contactEmail: `pending.demo${ratingSuffix}`,
      status: "PENDING",
      moderatedAt: null,
    },
  ];

  await prisma.ratingSubmission.createMany({ data: ratingSeeds });

  console.log(
    `Seed complete: removed ${deleted.count} prior demo row(s), inserted ${seeds.length} CyberNova demo enquiries.`,
  );
  console.log(
    `Ratings seed: replaced demo ratings (${ratingSeeds.length} rows: 3 approved, 1 pending).`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
