import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/60">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">AI-Solutions</p>
            <p className="mt-1 max-w-sm text-sm text-slate-400">
              Small software projects, workplace assistants, and a bit of hands-on delivery. Based in Sunderland, UK.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-200">Get in touch</p>
            <ul className="mt-2 space-y-1 text-sm text-cyan-400/90">
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-slate-500">
          © {new Date().getFullYear()} AI-Solutions · Sunderland, UK
        </p>
      </div>
    </footer>
  );
}
