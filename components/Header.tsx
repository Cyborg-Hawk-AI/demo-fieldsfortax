import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-surface-900/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400 ring-1 ring-brand-500/30 transition group-hover:bg-brand-500/30">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="font-display text-lg font-bold text-white">
            Fields<span className="text-brand-400">ForTax</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/demo" className="text-sm text-slate-400 transition hover:text-white">
            Demo
          </Link>
          <Link href="/developers" className="text-sm text-slate-400 transition hover:text-white">
            Developers
          </Link>
          <Link href="/research" className="text-sm text-slate-400 transition hover:text-white">
            Research
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/demo" className="btn-primary text-xs sm:text-sm">
            Try the demo
          </Link>
        </div>
      </div>
    </header>
  );
}
