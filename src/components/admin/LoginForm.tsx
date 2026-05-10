"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErr(typeof data.error === "string" ? data.error : "That password didn't work.");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setErr("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-sm space-y-4">
      <label className="block text-sm text-slate-200">
        <span className="mb-1 block text-slate-400">Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="w-full rounded-md border border-slate-600 bg-slate-900/80 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500/50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {err && <p className="text-sm text-rose-300">{err}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-cyan-500 py-2.5 text-sm font-medium text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
