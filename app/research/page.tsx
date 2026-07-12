import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research — How we found FieldsForTax",
  description: "The origin story, validation results, and source pain points behind FieldsForTax.",
};

const checklist = [
  { label: "10+ posts with this pain", passed: true },
  { label: "Paying for inferior solution", passed: true },
  { label: "Reachable channel", passed: true },
  { label: "MVP < 4 weeks", passed: true },
  { label: "Price point high enough", passed: true },
  { label: "Hair-on-fire problem", passed: true },
  { label: "Can pre-sell", passed: true },
  { label: "< 3 competitors", passed: true },
  { label: "Low-maintenance ops (mailbox money)", passed: true },
];

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-medium text-brand-400">Idea Miner Research</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-white">Why FieldsForTax exists</h1>
        <p className="mt-4 text-lg text-slate-400">
          Real pain from real practitioners — scored, validated, and shipped as a working demo.
        </p>
      </div>

      {/* Origin story */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-white">The research: why this exists</h2>
        <div className="mt-4 space-y-4 text-slate-300 leading-relaxed">
          <p>
            A tax practice owner on r/Accounting described feeling like their practice management
            tool was &ldquo;restrictive&rdquo; and didn&apos;t let them track the detailed client data points
            they needed for tax preparation — things like carryover losses, dependent details, and
            entity-specific flags. Their workaround was TaxDome plus a separate spreadsheet, and they
            had already started building a custom internal solution because nothing on the market solved it.
          </p>
          <p>
            This is a classic &ldquo;power user trapped in a generic tool&rdquo; problem: TaxDome is built for
            workflow management, not flexible data modeling, and tax prep requires tracking dozens of
            client-specific variables that change year to year.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full border border-slate-700 bg-surface-800 px-3 py-1 text-xs text-slate-400">
            Cluster: Custom Client Data Tracking in Tax Workflows
          </span>
          <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs text-brand-300">
            Rubric score: 100/130
          </span>
          <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs text-brand-300">
            Validation: 9/9 checks passed
          </span>
        </div>
      </section>

      {/* Competitive landscape */}
      <section className="mb-12 card p-6">
        <h2 className="font-display text-xl font-semibold text-white">Competitive landscape</h2>
        <p className="mt-3 text-slate-300 leading-relaxed">
          No dedicated custom-field add-on for tax CRMs exists. TaxDome has limited built-in fields.
          Airtable/Notion are generic and require setup. This is a narrow, unserved niche.
        </p>
        <p className="mt-3 text-sm text-slate-400">
          <strong className="text-slate-300">Unfair advantage:</strong> Hyper-specific to tax data vocabulary
          — ships with pre-built field templates that a generic tool like Airtable never will, reducing
          setup friction to near zero.
        </p>
      </section>

      {/* Go-to-market */}
      <section className="mb-12 card p-6">
        <h2 className="font-display text-xl font-semibold text-white">Go-to-market</h2>
        <p className="mt-3 text-slate-300 leading-relaxed">
          r/Accounting and r/taxpros posts demonstrating the spreadsheet-replacement use case;
          TaxDome Facebook community; direct outreach to users who post about custom spreadsheets.
        </p>
      </section>

      {/* Automation */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-white">How this business runs itself</h2>
        <p className="mt-2 text-sm text-brand-400">Mailbox money · ~1 hour/week owner time</p>
        <div className="mt-4 space-y-4 text-slate-300 leading-relaxed">
          <p>
            The goal is passive, low-maintenance recurring revenue: AI is how we build and operate
            the business, not necessarily what it sells.
          </p>
          <p>
            The product is a pure CRUD SaaS — users enter data, the database stores it, exports are
            generated on demand. There is no recurring data processing, no content pipeline, and no
            integrations requiring maintenance. Stripe handles billing and sends dunning emails
            automatically. A Crisp or Intercom AI widget handles support questions. The owner reviews
            a weekly Stripe revenue digest (automated email) and a support ticket summary.
          </p>
        </div>
        <p className="mt-4 text-sm text-slate-500">
          MVP estimate: Next.js + Supabase (JSONB custom fields per client row) + Papaparse for CSV; 2 weeks to MVP
        </p>
      </section>

      {/* Validation checklist */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-white">Validation checklist (9/9)</h2>
        <ul className="mt-4 space-y-2">
          {checklist.map((item) => (
            <li key={item.label} className="flex items-center gap-3 text-sm">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/20 text-brand-400">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-slate-300">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Source pain points */}
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold text-white">Source pain points</h2>
        <div className="mt-6 space-y-4">
          <div className="card p-6">
            <h3 className="font-semibold text-white">
              Practice management tools are restrictive and don&apos;t accommodate tracking of detailed client data points needed for tax preparation.
            </h3>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-slate-500">Persona</dt>
                <dd className="text-slate-300">Tax accounting practice owner</dd>
              </div>
              <div>
                <dt className="text-slate-500">Workaround</dt>
                <dd className="text-slate-300">Using TaxDome plus spreadsheets; building custom solution internally</dd>
              </div>
              <div>
                <dt className="text-slate-500">Frequency</dt>
                <dd className="text-slate-300">Daily</dd>
              </div>
              <div>
                <dt className="text-slate-500">WTP signal</dt>
                <dd className="text-slate-300">Spending ~$500 annually on software; investing time to build custom solution</dd>
              </div>
            </dl>
            <a
              href="https://www.reddit.com/r/Accounting/comments/1udzgd3/anyone_else_feel_like_their_practice_management/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300"
            >
              View source on r/Accounting →
            </a>
          </div>
        </div>
      </section>

      {/* About Idea Miner */}
      <section className="rounded-xl border border-slate-700 bg-surface-800/50 p-6">
        <h2 className="font-display text-xl font-semibold text-white">About this program</h2>
        <p className="mt-3 text-sm text-slate-400 leading-relaxed">
          This demo was auto-built by the <strong className="text-slate-300">Idea Miner</strong> pipeline:
          a twice-daily research program that mines Reddit, Hacker News, Stack Exchange, and GitHub for
          real people describing real pain, scores the opportunities, and automatically ships a working
          mock of every idea that passes validation (&gt;=8/9 checks, momentum not declining, not previously built).
          The bar for every idea: low-maintenance recurring revenue that a solo owner can run in a few hours a week.
        </p>
        <p className="mt-3 text-xs text-slate-600">
          Generated by Idea Miner run 2026-07-12-am on 2026-07-12 12:10 UTC
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/demo" className="btn-primary text-sm">Try the demo</Link>
          <Link href="/developers" className="btn-secondary text-sm">Developer docs</Link>
        </div>
      </section>
    </div>
  );
}
