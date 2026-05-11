import Link from "next/link";
import { MobileNav } from "./MobileNav";

const nav = [
  { href: "/", label: "Home" },
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/feedback", label: "Feedback" },
  { href: "/articles", label: "Articles" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
] as const;

export function Header() {
  return (
    <header className="relative border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="shrink-0 text-lg font-semibold tracking-tight text-white">
          CyberNova Analytics
          <span className="ml-1 text-cyan-400">Gaborone</span>
        </Link>
        <nav className="hidden flex-1 items-center justify-end gap-1 md:flex md:flex-wrap">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-slate-300 transition hover:bg-slate-800/80 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
