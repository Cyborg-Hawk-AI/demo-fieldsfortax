import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-surface-900">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-sm font-semibold text-white">FieldsForTax</p>
            <p className="mt-1 text-xs text-slate-500">
              Custom-field client data layer for TaxDome &amp; Canopy
            </p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/demo" className="text-slate-400 transition hover:text-brand-400">
              Demo
            </Link>
            <Link href="/developers" className="text-slate-400 transition hover:text-brand-400">
              Developers
            </Link>
            <Link href="/research" className="text-slate-400 transition hover:text-brand-400">
              How we found this idea
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-slate-600">
          Demo built by Idea Miner · No auth, no database — deploys on Vercel with zero config
        </p>
      </div>
    </footer>
  );
}
