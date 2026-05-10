import { PageHeading } from "@/components/PageHeading";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Feedback" };

const reviews: { name: string; org: string; text: string; stars: 1 | 2 | 3 | 4 | 5 }[] = [
  {
    name: "Operations lead",
    org: "Regional services",
    text: "The early version gave our exec team something solid to react to. We sidestepped a costly misfire on requirements.",
    stars: 5,
  },
  {
    name: "IT manager",
    org: "SME, North East",
    text: "It wasn't perfect on day one, but it was clear when it was sure and when it wasn't. We improved it quickly with real use.",
    stars: 4,
  },
  {
    name: "Product owner",
    org: "B2B software",
    text: "We finally had a single place for our internal \"how do I\" questions. Less noise in Teams channels.",
    stars: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < n ? "text-amber-400" : "text-slate-600"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="What people say"
        subtitle="Short quotes from folks we've worked with on pilots and first roll-outs—names and organisations kept light."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <li
            key={r.name + r.org}
            className="flex flex-col rounded-lg border border-slate-800 bg-slate-900/40 p-5"
          >
            <Stars n={r.stars} />
            <p className="mt-3 text-sm text-slate-300">&ldquo;{r.text}&rdquo;</p>
            <p className="mt-4 text-xs text-slate-500">
              {r.name} · {r.org}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
