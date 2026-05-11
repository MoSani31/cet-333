"use client";

import { useState } from "react";
import { SECURITY_ISSUE_TYPES } from "@/lib/security-issue-types";

const initial = {
  name: "",
  email: "",
  phone: "",
  organization: "",
  country: "",
  jobTitle: "",
  securityIssueType: SECURITY_ISSUE_TYPES[0],
  technicalProblem: "",
};

type Field = keyof typeof initial;

const labels: Record<Field, string> = {
  name: "Full name",
  email: "Email",
  phone: "Phone",
  organization: "Organization",
  country: "Country",
  jobTitle: "Job title",
  securityIssueType: "Type of security issue",
  technicalProblem: "Description of technical problem",
};

type Status = { type: "idle" } | { type: "sending" } | { type: "ok" } | { type: "err"; message: string };

export function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<Status>({ type: "idle" });

  function onChange(name: Field, value: string) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus({ type: "err", message: data.error ?? "Something went wrong—please try again." });
        return;
      }
      setForm(initial);
      setStatus({ type: "ok" });
    } catch {
      setStatus({ type: "err", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {(
          [
            "name",
            "email",
            "phone",
            "organization",
            "country",
            "jobTitle",
          ] as const
        ).map((field) => (
          <label key={field} className="block text-sm text-slate-200">
            <span className="mb-1 block text-slate-400">{labels[field]}</span>
            <input
              name={field}
              required
              className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none ring-cyan-500/50 focus:ring-2"
              value={form[field]}
              onChange={(e) => onChange(field, e.target.value)}
              type={field === "email" ? "email" : "text"}
            />
          </label>
        ))}
      </div>
      <label className="block text-sm text-slate-200">
        <span className="mb-1 block text-slate-400">{labels.securityIssueType}</span>
        <select
          name="securityIssueType"
          required
          className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none ring-cyan-500/50 focus:ring-2"
          value={form.securityIssueType}
          onChange={(e) => onChange("securityIssueType", e.target.value)}
        >
          {SECURITY_ISSUE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-slate-200">
        <span className="mb-1 block text-slate-400">{labels.technicalProblem}</span>
        <textarea
          name="technicalProblem"
          required
          rows={5}
          className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none ring-cyan-500/50 focus:ring-2"
          value={form.technicalProblem}
          onChange={(e) => onChange("technicalProblem", e.target.value)}
        />
      </label>
      {status.type === "ok" && (
        <p className="rounded-md border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
          Thank you—we&apos;ve received your request and the security team will be in touch soon.
        </p>
      )}
      {status.type === "err" && (
        <p className="rounded-md border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-200" role="alert">
          {status.message}
        </p>
      )}
      <div>
        <button
          type="submit"
          disabled={status.type === "sending"}
          className="inline-flex min-w-36 items-center justify-center rounded-md bg-cyan-500 px-4 py-2.5 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
        >
          {status.type === "sending" ? "Sending…" : "Send to security team"}
        </button>
      </div>
    </form>
  );
}
