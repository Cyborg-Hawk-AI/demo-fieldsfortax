import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Docs — FieldsForTax",
  description: "Feature documentation for the FieldsForTax demo: what's mocked, what's real in production, and integration notes.",
};

const features = [
  {
    name: "Unlimited Custom Fields",
    demoPath: "/demo → Clients & Fields tab",
    tryIt: "Select any client in the left panel, then edit field values inline. Click '+ Add Field' to create a new text, numeric, date, dropdown, or checkbox field.",
    mocked: "Field definitions and values live in React state, initialized from lib/mock-data.ts. Changes persist only for the session.",
    production: "Supabase PostgreSQL with JSONB column per client row storing field schema + values. Field type validation via Zod schema. No row limit per firm.",
    dataFlow: "User edits field → client validates type → PATCH /api/clients/:id/fields → JSONB merge → audit_log insert → realtime subscription pushes to other team members.",
  },
  {
    name: "Tax-Specific Field Templates",
    demoPath: "/demo → Templates tab",
    tryIt: "Browse the 5 pre-built templates (1040 Essentials, Carryover & Loss, Entity Classification, S-Corp Compliance, Nonprofit 990). Click 'Apply to client' then select a client.",
    mocked: "Templates are hardcoded in FIELD_TEMPLATES array. Applying copies field definitions into the selected client's in-memory state.",
    production: "templates table with field_definitions JSONB. 'Apply' creates field schema entries on the client row. Template usage tracked for analytics.",
    dataFlow: "User selects template → POST /api/templates/:id/apply { clientId } → server copies field defs → returns updated client → audit log records 'template applied'.",
  },
  {
    name: "Two-Way CSV Import/Export",
    demoPath: "/demo → CSV Sync tab",
    tryIt: "Switch between Import, Export, and Column Mapping sub-tabs. Load sample TaxDome CSV, parse it, review column mapping, then confirm import. On Export, generate and copy CSV.",
    mocked: "Papaparse would parse CSV in production; demo uses pre-written SAMPLE_CSV_EXPORT string. Import confirms with toast but doesn't add rows.",
    production: "Papaparse client-side parse → column mapping UI → server validates & upserts clients. Export queries all clients + custom fields, generates TaxDome/Canopy-compatible headers.",
    dataFlow: "Import: CSV file → Papaparse → mapping UI → POST /api/import { rows, mapping } → upsert clients. Export: GET /api/export?format=taxdome → stream CSV download.",
  },
  {
    name: "Per-Client Audit Log",
    demoPath: "/demo → Audit Log tab (also Dashboard → Recent Activity)",
    tryIt: "Edit any field value on the Clients tab, then switch to Audit Log to see the new entry. Filter by client. Click a row to jump to that client.",
    mocked: "Audit entries stored in React state. New entries created on field edit with 'You (Demo User)' as author.",
    production: "Append-only audit_log table: (id, firm_id, client_id, field_name, old_value, new_value, user_id, created_at). No deletes or updates allowed.",
    dataFlow: "Any field mutation → trigger or application code inserts audit row → Dashboard queries recent entries → Audit tab supports client filter + date range + CSV export.",
  },
  {
    name: "Bulk Field Update via Spreadsheet Paste",
    demoPath: "/demo → Bulk Update tab",
    tryIt: "Review the pre-loaded tab-separated data, click 'Preview changes' to validate rows, then 'Apply N updates' to batch-modify client fields.",
    mocked: "Tab-separated paste parsed in-browser. Preview shows matched client + field pairs. Apply calls the same updateField function in a loop.",
    production: "Client-side parse → validation against field types → POST /api/bulk-update { updates: [{clientId, fieldId, value}] } → transaction wraps all updates + audit inserts.",
    dataFlow: "Paste from Excel/Sheets → parse TSV → match client names to IDs → validate types → batch RPC → N audit entries → toast with success/failure count.",
  },
  {
    name: "Dashboard & Analytics",
    demoPath: "/demo → Dashboard tab",
    tryIt: "Click stat cards for drill-down toasts. Click chart bars for monthly breakdown. Click activity feed items to jump to audit log.",
    mocked: "Stats from DASHBOARD_STATS constant. Chart from MONTHLY_ACTIVITY array. Activity feed from live audit log state.",
    production: "Materialized views refreshed hourly: client_count, field_count, csv_activity, audit_events. Chart from time-series aggregation query.",
    dataFlow: "Cron refreshes materialized views → GET /api/dashboard → cached response with 5-min TTL → client renders cards + chart.",
  },
];

const architecture = [
  { layer: "Frontend", tech: "Next.js 14 App Router, React, Tailwind CSS", notes: "This demo — zero server state" },
  { layer: "API", tech: "Next.js Route Handlers or Supabase Edge Functions", notes: "REST endpoints for CRUD + CSV" },
  { layer: "Database", tech: "Supabase (PostgreSQL)", notes: "JSONB custom fields, audit_log table, RLS per firm" },
  { layer: "CSV", tech: "Papaparse", notes: "Client-side parse, server-side generate" },
  { layer: "Auth", tech: "Supabase Auth or Clerk", notes: "Firm-scoped multi-user, not in demo" },
  { layer: "Billing", tech: "Stripe Checkout + Customer Portal", notes: "Webhook activates firm subscription" },
  { layer: "Support", tech: "Crisp or Intercom AI widget", notes: "Handles 95%+ of CRUD tool questions" },
];

export default function DevelopersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <p className="text-sm font-medium text-brand-400">Developer Documentation</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-white">FieldsForTax Feature Map</h1>
        <p className="mt-4 text-lg text-slate-400">
          Every feature in the{" "}
          <Link href="/demo" className="text-brand-400 hover:text-brand-300">interactive demo</Link>
          {" "}is documented below: what it does, where to click, what&apos;s mocked, and the production data flow.
        </p>
      </div>

      <div className="mb-12 rounded-xl border border-slate-700 bg-surface-800/50 p-6">
        <h2 className="font-display text-lg font-semibold text-white">Quick start</h2>
        <ol className="mt-4 space-y-2 text-sm text-slate-400 list-decimal list-inside">
          <li>Open <Link href="/demo" className="text-brand-400">/demo</Link> — no login required</li>
          <li>Look for amber <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/20 text-[10px] font-bold text-amber-400 ring-1 ring-amber-500/40">i</span> icons beside major controls — these are DEV NOTE tooltips</li>
          <li>Every button, tab, and row is interactive — nothing is a dead control</li>
          <li>MVP estimate from research: Next.js + Supabase (JSONB) + Papaparse — 2 weeks</li>
        </ol>
      </div>

      <div className="space-y-8">
        {features.map((feature, i) => (
          <article key={feature.name} className="card p-6">
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/20 text-sm font-bold text-brand-400">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-semibold text-white">{feature.name}</h2>
                <p className="mt-1 text-sm text-brand-400">{feature.demoPath}</p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">How to try it</h3>
                    <p className="mt-1 text-sm text-slate-300">{feature.tryIt}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">What&apos;s mocked</h3>
                    <p className="mt-1 text-sm text-slate-300">{feature.mocked}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Production implementation</h3>
                    <p className="mt-1 text-sm text-slate-300">{feature.production}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Data flow</h3>
                    <p className="mt-1 text-sm text-slate-300">{feature.dataFlow}</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl font-bold text-white">Intended production stack</h2>
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-700">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700 bg-surface-800/50 text-left text-xs text-slate-500">
                <th className="p-3 font-medium">Layer</th>
                <th className="p-3 font-medium">Technology</th>
                <th className="p-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {architecture.map((row) => (
                <tr key={row.layer} className="border-b border-slate-700/50">
                  <td className="p-3 font-medium text-white">{row.layer}</td>
                  <td className="p-3 text-brand-300">{row.tech}</td>
                  <td className="p-3 text-slate-400">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-12 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
        <h2 className="font-semibold text-amber-300">Deploy notes</h2>
        <p className="mt-2 text-sm text-slate-300">
          This demo requires zero configuration for Vercel: no environment variables, no custom server,
          no rewrites. Run <code className="rounded bg-surface-700 px-1.5 py-0.5 text-xs">npm run build</code> to
          verify production build. All interactivity is client-side React state with hardcoded sample data.
        </p>
      </div>
    </div>
  );
}
