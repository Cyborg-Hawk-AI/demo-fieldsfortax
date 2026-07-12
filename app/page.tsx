import Link from "next/link";

const features = [
  {
    title: "Unlimited custom fields",
    description:
      "Dropdowns, checkboxes, numeric, date, and text fields — as many as your practice needs per client.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
    ),
  },
  {
    title: "Tax-specific templates",
    description:
      "Pre-built field sets for dependents, carryover losses, entity type, filing status, and prior-year AGI.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    ),
  },
  {
    title: "Two-way CSV sync",
    description:
      "Import and export client lists compatible with TaxDome and Canopy — no API keys required.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
    ),
  },
  {
    title: "Change history & audit log",
    description:
      "Every field edit is tracked per client — who changed what, when, and the before/after values.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    title: "Bulk spreadsheet paste",
    description:
      "Copy rows from Excel or Google Sheets and update hundreds of client fields in one action.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
    ),
  },
  {
    title: "Runs itself",
    description:
      "Pure CRUD SaaS — Stripe billing, AI support widget, weekly revenue digest. Under 1 hour/week owner time.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/30 via-surface-900 to-surface-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxZTI5M2IiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC00di00aDR2NHptMC02aC00di00aDR2NHptLTYgNmgtdi00aDR2NHptMC02aC00di00aDR2NHptLTYgNmgtdi00aDR2NHptMC02aC00di00aDR2NHptLTYgNmgtdi00aDR2NHptMC02aC00di00aDR2NHptLTYgNmgtdi00aDR2NHptMC02aC00di00aDR2NHpNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0tNiA2aC00di00aDR2NHptMC02aC00di00aDR2NHptLTYgNmgtdi00aDR2NHptMC02aC00di00aDR2NHptLTYgNmgtdi00aDR2NHptMC02aC00di00aDR2NHptLTYgNmgtdi00aDR2NHptMC02aC00di00aDR2NHp6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300">
              <span className="h-2 w-2 rounded-full bg-brand-400 animate-pulse" />
              Built for TaxDome &amp; Canopy users
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Stop juggling spreadsheets for{" "}
              <span className="bg-gradient-to-r from-brand-300 to-brand-500 bg-clip-text text-transparent">
                custom client data
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              FieldsForTax is the custom-field data layer tax preparers plug into TaxDome or
              any tax CRM via CSV sync. Unlimited fields, tax-specific templates, full audit
              history — $29/month per firm.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/demo" className="btn-primary px-8 py-3 text-base">
                Explore interactive demo
              </Link>
              <Link href="/research" className="btn-secondary px-8 py-3 text-base">
                How we found this idea
              </Link>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              248 mock clients · 1,847 fields · 9/9 validation checks passed
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-slate-800 bg-surface-800/30 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Everything your tax CRM is missing</h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              TaxDome manages workflow. FieldsForTax manages the dozens of client-specific
              variables that change year to year.
            </p>
          </div>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="card p-6 transition hover:border-brand-500/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="font-display text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="section-heading">Simple per-firm pricing</h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Unlimited clients. Unlimited fields. One flat price per firm.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="card p-8">
              <h3 className="font-display text-lg font-semibold text-white">Monthly</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-white">$29</span>
                <span className="text-slate-400">/month per firm</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckIcon /> Unlimited clients
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Unlimited custom fields
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> CSV import &amp; export
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Full audit log
                </li>
              </ul>
              <Link href="/demo" className="btn-secondary mt-8 w-full">
                Try demo first
              </Link>
            </div>
            <div className="card relative border-brand-500/40 p-8 ring-1 ring-brand-500/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-0.5 text-xs font-semibold text-white">
                Save $58/year
              </div>
              <h3 className="font-display text-lg font-semibold text-white">Annual</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-5xl font-bold text-white">$290</span>
                <span className="text-slate-400">/year per firm</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckIcon /> Everything in Monthly
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Priority email support
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Early access to templates
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> 2 months free vs monthly
                </li>
              </ul>
              <Link href="/demo" className="btn-primary mt-8 w-full">
                Start with demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-gradient-to-b from-surface-800/50 to-surface-900 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white">
            Replace the spreadsheet. Keep your CRM.
          </h2>
          <p className="mt-4 text-slate-400">
            See every MVP feature in the interactive demo — custom fields, templates, CSV
            sync, audit log, and bulk paste. No signup required.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/demo" className="btn-primary px-8 py-3">
              Open the demo
            </Link>
            <Link href="/developers" className="btn-secondary px-8 py-3">
              Developer docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function CheckIcon() {
  return (
    <svg className="h-4 w-4 shrink-0 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
