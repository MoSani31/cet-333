"use client";

import { useState } from "react";

const initial = {
  stars: 5 as 1 | 2 | 3 | 4 | 5,
  comment: "",
  displayName: "",
  organization: "",
  contactEmail: "",
};

type Status = { type: "idle" } | { type: "sending" } | { type: "ok" } | { type: "err"; message: string };

export function RatingForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stars: form.stars,
          comment: form.comment,
          displayName: form.displayName,
          organization: form.organization || undefined,
          contactEmail: form.contactEmail || undefined,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus({ type: "err", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setForm(initial);
      setStatus({ type: "ok" });
    } catch {
      setStatus({ type: "err", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  return (
    <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-6 sm:p-8">
      <h2 className="text-lg font-semibold text-white">Share a rating</h2>
      <p className="mt-1 text-sm text-slate-400">
        Add a star score and a short note. We read each one before it goes live on this page.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-5">
        <fieldset>
          <legend className="mb-2 text-sm text-slate-400">Rating</legend>
          <div className="flex flex-wrap gap-2">
            {([1, 2, 3, 4, 5] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setForm((f) => ({ ...f, stars: n }))}
                className={`rounded-md border px-3 py-2 text-sm transition ${
                  form.stars === n
                    ? "border-cyan-500 bg-cyan-500/20 text-cyan-200"
                    : "border-slate-600 text-slate-300 hover:border-slate-500"
                }`}
              >
                {n} star{n !== 1 ? "s" : ""}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block text-sm text-slate-200">
          <span className="mb-1 block text-slate-400">Your comment</span>
          <textarea
            required
            rows={4}
            maxLength={2000}
            className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none ring-cyan-500/50 focus:ring-2"
            value={form.comment}
            onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
            placeholder="What worked well for you?"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-slate-200">
            <span className="mb-1 block text-slate-400">Display name</span>
            <input
              required
              type="text"
              className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none ring-cyan-500/50 focus:ring-2"
              value={form.displayName}
              onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
              placeholder="e.g. IT Director"
            />
          </label>
          <label className="block text-sm text-slate-200">
            <span className="mb-1 block text-slate-400">Organisation (optional)</span>
            <input
              type="text"
              className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none ring-cyan-500/50 focus:ring-2"
              value={form.organization}
              onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
              placeholder="Sector or company type"
            />
          </label>
        </div>
        <label className="block text-sm text-slate-200">
          <span className="mb-1 block text-slate-400">Contact email for moderators only (optional)</span>
          <input
            type="email"
            className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none ring-cyan-500/50 focus:ring-2"
            value={form.contactEmail}
            onChange={(e) => setForm((f) => ({ ...f, contactEmail: e.target.value }))}
            placeholder="Not shown on the public page"
          />
        </label>
        {status.type === "ok" && (
          <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
            Thank you. Your rating was received and will show here after the team approves it.
          </p>
        )}
        {status.type === "err" && (
          <p className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200" role="alert">
            {status.message}
          </p>
        )}
        <button
          type="submit"
          disabled={status.type === "sending"}
          className="rounded-md bg-cyan-500 px-4 py-2.5 text-sm font-medium text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
        >
          {status.type === "sending" ? "Sending…" : "Submit rating"}
        </button>
      </form>
    </section>
  );
}
