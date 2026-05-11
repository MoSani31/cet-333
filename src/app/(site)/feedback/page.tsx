import { RatingForm } from "@/components/RatingForm";
import { Stars } from "@/components/Stars";
import { PageHeading } from "@/components/PageHeading";
import { db } from "@/lib/db";
import { RatingStatus } from "@prisma/client";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Feedback" };
export const dynamic = "force-dynamic";

export default async function FeedbackPage() {
  const approved = await db.ratingSubmission.findMany({
    where: { status: RatingStatus.APPROVED },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="mx-auto max-w-6xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <PageHeading
        title="Customer testimonials"
        subtitle="Approved ratings from organisations we support—submissions are moderated before they appear here."
      />

      <div className="mb-14 space-y-6">
        <RatingForm />
      </div>

      <h2 className="text-xl font-semibold text-white">Published testimonials</h2>
      <p className="mt-1 text-sm text-slate-500">Only ratings approved by CyberNova are shown.</p>

      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {approved.length === 0 && (
          <li className="col-span-full rounded-lg border border-slate-800 bg-slate-900/30 p-8 text-center text-slate-500">
            No approved testimonials yet—submit a rating above, or check back after moderators publish submissions.
          </li>
        )}
        {approved.map((r) => (
          <li key={r.id} className="flex flex-col rounded-lg border border-slate-800 bg-slate-900/40 p-5">
            <Stars n={r.stars} />
            <p className="mt-3 text-sm text-slate-300">&ldquo;{r.comment}&rdquo;</p>
            <p className="mt-4 text-xs text-slate-500">
              {r.displayName}
              {r.organization ? ` · ${r.organization}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
