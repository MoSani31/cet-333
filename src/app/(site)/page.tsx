import Link from "next/link";

const highlights = [
  { title: "Quick to try", body: "Get something you can click through and react to early, before you commit big budget." },
  { title: "Workplace assistant", body: "Answer common questions in plain language and cut down repeat tickets to your help desk." },
  { title: "Built for real days at work", body: 'We start from how people actually get things done—not from slides about "transformation".' },
] as const;

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="border-b border-slate-800/60 bg-gradient-to-b from-cyan-950/40 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm font-medium uppercase tracking-wider text-cyan-400/90">
            Based in Sunderland, UK
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Practical help for teams who live in software all day
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-400">
            We&apos;re a small Sunderland-based team: sensible builds, a workplace assistant when you need one, and
            honest advice about what&apos;s worth automating.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/solutions"
              className="inline-flex rounded-md bg-cyan-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              What we offer
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-md border border-slate-600 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-500 hover:bg-slate-800/50"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-semibold text-white">Where we usually help</h2>
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
