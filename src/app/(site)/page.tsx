import Link from "next/link";

const highlights = [
  {
    title: "Threat-aware monitoring",
    body: "We help you spot odd traffic early so alerts go to the right people instead of getting lost in noise.",
  },
  {
    title: "Cyber Assistant",
    body: "Plain language on what the risk is, why it matters, and what your teams can do next.",
  },
  {
    title: "Built for the region",
    body: "Packages that fit SMEs, banks, insurers, and public bodies as you grow across Southern Africa.",
  },
] as const;

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-cyan-950/40 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400/90">
            Based in Gaborone, serving Southern Africa
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Stronger digital security with AI where it actually helps
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-400">
            CyberNova Analytics brings together monitoring, risk checks, and advice so you can protect critical systems
            without burying staff in jargon or dashboards alone.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="inline-flex rounded-md bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              See what we offer
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-md border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-800/50"
            >
              Contact the security team
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white">Where we focus</h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-3">
          {highlights.map((h) => (
            <li
              key={h.title}
              className="rounded-lg border border-slate-800 bg-slate-900/40 p-5 shadow-sm shadow-cyan-950/20"
            >
              <h3 className="text-lg font-medium text-cyan-100">{h.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{h.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
