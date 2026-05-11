"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/feedback", label: "Feedback" },
  { href: "/articles", label: "Articles" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact security" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="ml-auto md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="rounded-md border border-slate-600 px-3 py-1.5 text-sm text-slate-200"
        aria-expanded={open}
        aria-label="Toggle menu"
      >
        Menu
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-50 border-b border-slate-800 bg-slate-950 px-4 py-3 shadow-lg">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-slate-200 hover:bg-slate-800"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
