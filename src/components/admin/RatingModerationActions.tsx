"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

export function RatingModerationActions({ id, status }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function patch(action: "approve" | "reject") {
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/ratings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErr(data.error ?? "Update failed.");
        return;
      }
      router.refresh();
    } catch {
      setErr("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!window.confirm("Delete this rating permanently?")) return;
    setErr(null);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/ratings/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErr(data.error ?? "Delete failed.");
        return;
      }
      router.refresh();
    } catch {
      setErr("Could not reach the server.");
    } finally {
      setBusy(false);
    }
  }

  const btn =
    "rounded-md px-2.5 py-1 text-xs font-medium transition disabled:opacity-50 border border-slate-600 hover:bg-slate-800";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-2">
        {status === "PENDING" && (
          <>
            <button type="button" disabled={busy} className={`${btn} border-emerald-600/60 text-emerald-300`} onClick={() => patch("approve")}>
              Approve
            </button>
            <button type="button" disabled={busy} className={`${btn} border-rose-600/60 text-rose-300`} onClick={() => patch("reject")}>
              Reject
            </button>
          </>
        )}
        {status === "APPROVED" && (
          <button type="button" disabled={busy} className={`${btn} border-rose-600/60 text-rose-300`} onClick={() => patch("reject")}>
            Reject
          </button>
        )}
        {status === "REJECTED" && (
          <button type="button" disabled={busy} className={`${btn} border-emerald-600/60 text-emerald-300`} onClick={() => patch("approve")}>
            Approve
          </button>
        )}
        <button type="button" disabled={busy} className={`${btn} text-slate-400`} onClick={remove}>
          Delete
        </button>
      </div>
      {err && <p className="text-xs text-rose-400">{err}</p>}
    </div>
  );
}
