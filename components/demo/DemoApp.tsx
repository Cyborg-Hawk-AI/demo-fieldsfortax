"use client";

import { useState, useCallback } from "react";
import { DevNote } from "@/components/DevNote";
import { Toast } from "@/components/Toast";
import {
  INITIAL_CLIENTS,
  INITIAL_AUDIT_LOG,
  FIELD_TEMPLATES,
  SAMPLE_CSV_EXPORT,
  SAMPLE_BULK_PASTE,
  DASHBOARD_STATS,
  MONTHLY_ACTIVITY,
  FIRM_NAME,
  type Client,
  type AuditEntry,
  type CustomField,
  type FieldType,
} from "@/lib/mock-data";

type Tab = "dashboard" | "clients" | "templates" | "csv" | "audit" | "bulk";

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-brand-500/20 text-brand-300",
  "In Review": "bg-amber-500/20 text-amber-300",
  Filed: "bg-blue-500/20 text-blue-300",
  Extension: "bg-purple-500/20 text-purple-300",
};

export default function DemoApp() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [auditLog, setAuditLog] = useState<AuditEntry[]>(INITIAL_AUDIT_LOG);
  const [selectedClientId, setSelectedClientId] = useState<string>("c1");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [toast, setToast] = useState({ visible: false, message: "" });
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState<string | null>(null);
  const [csvStep, setCsvStep] = useState<"import" | "export" | "map">("import");
  const [csvContent, setCsvContent] = useState("");
  const [bulkPaste, setBulkPaste] = useState(SAMPLE_BULK_PASTE);
  const [bulkPreview, setBulkPreview] = useState<{ client: string; field: string; value: string }[]>([]);
  const [auditFilter, setAuditFilter] = useState("all");
  const [newField, setNewField] = useState({ name: "", type: "text" as FieldType });

  const showToast = useCallback((message: string) => {
    setToast({ visible: true, message });
  }, []);

  const hideToast = useCallback(() => {
    setToast({ visible: false, message: "" });
  }, []);

  const selectedClient = clients.find((c) => c.id === selectedClientId) ?? clients[0];

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredAudit = auditLog.filter(
    (a) => auditFilter === "all" || a.clientId === auditFilter
  );

  const updateField = (clientId: string, fieldId: string, newValue: string | number | boolean) => {
    setClients((prev) =>
      prev.map((c) => {
        if (c.id !== clientId) return c;
        const field = c.fields.find((f) => f.id === fieldId);
        if (!field) return c;
        const oldVal = String(field.value);
        const newVal = String(newValue);
        if (oldVal !== newVal) {
          setAuditLog((log) => [
            {
              id: `a${Date.now()}`,
              clientId,
              clientName: c.name,
              field: field.name,
              oldValue: oldVal,
              newValue: newVal,
              changedBy: "You (Demo User)",
              timestamp: new Date().toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" }),
            },
            ...log,
          ]);
        }
        return {
          ...c,
          lastUpdated: new Date().toISOString().split("T")[0],
          fields: c.fields.map((f) => (f.id === fieldId ? { ...f, value: newValue } : f)),
        };
      })
    );
    showToast(`Updated ${fieldId} successfully`);
  };

  const addCustomField = () => {
    if (!newField.name.trim()) return;
    const field: CustomField = {
      id: `f${Date.now()}`,
      name: newField.name,
      type: newField.type,
      value: newField.type === "checkbox" ? false : newField.type === "numeric" ? 0 : "",
      options: newField.type === "dropdown" ? ["Option A", "Option B", "Option C"] : undefined,
    };
    setClients((prev) =>
      prev.map((c) =>
        c.id === selectedClientId ? { ...c, fields: [...c.fields, field] } : c
      )
    );
    setShowAddFieldModal(false);
    setNewField({ name: "", type: "text" });
    showToast(`Added field "${field.name}" to ${selectedClient.name}`);
  };

  const applyTemplate = (templateId: string, clientId: string) => {
    const template = FIELD_TEMPLATES.find((t) => t.id === templateId);
    const client = clients.find((c) => c.id === clientId);
    if (!template || !client) return;
    const newFields: CustomField[] = template.fields.map((f, i) => ({
      id: `f${Date.now() + i}`,
      name: f.name,
      type: f.type,
      value: f.type === "checkbox" ? false : f.type === "numeric" ? 0 : f.type === "dropdown" ? (f.options?.[0] ?? "") : "",
      options: f.options,
      template: true,
    }));
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId ? { ...c, fields: [...c.fields, ...newFields] } : c
      )
    );
    setShowTemplateModal(null);
    showToast(`Applied "${template.name}" template to ${client.name}`);
  };

  const handleBulkPreview = () => {
    const lines = bulkPaste.trim().split("\n").slice(1);
    const parsed = lines.map((line) => {
      const [client, field, value] = line.split("\t");
      return { client: client ?? "", field: field ?? "", value: value ?? "" };
    });
    setBulkPreview(parsed);
    showToast(`Parsed ${parsed.length} rows for preview`);
  };

  const handleBulkApply = () => {
    let count = 0;
    bulkPreview.forEach((row) => {
      const client = clients.find((c) => c.name === row.client);
      if (!client) return;
      const field = client.fields.find((f) => f.name === row.field);
      if (!field) return;
      updateField(client.id, field.id, isNaN(Number(row.value)) ? row.value : Number(row.value));
      count++;
    });
    showToast(`Applied ${count} bulk updates across clients`);
    setBulkPreview([]);
  };

  const handleCsvImport = () => {
    setCsvStep("map");
    showToast("CSV parsed — review column mapping");
  };

  const handleCsvConfirmImport = () => {
    showToast("Imported 3 clients from TaxDome CSV (mock)");
    setCsvStep("import");
    setCsvContent("");
  };

  const handleCsvExport = () => {
    setCsvContent(SAMPLE_CSV_EXPORT);
    showToast("CSV export generated — compatible with TaxDome & Canopy");
  };

  const maxActivity = Math.max(...MONTHLY_ACTIVITY.flatMap((m) => [m.imports, m.exports, m.updates]));

  const tabs: { id: Tab; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "clients", label: "Clients & Fields" },
    { id: "templates", label: "Templates" },
    { id: "csv", label: "CSV Sync" },
    { id: "audit", label: "Audit Log" },
    { id: "bulk", label: "Bulk Update" },
  ];

  return (
    <div className="min-h-screen bg-surface-900">
      {/* Demo top bar */}
      <div className="border-b border-slate-800 bg-surface-800/50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/20 text-brand-400 text-xs font-bold">
              FFT
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{FIRM_NAME}</p>
              <p className="text-xs text-slate-500">Tax Year 2025 · Demo Mode</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DevNote text="Production: firm context loaded from Supabase after Stripe subscription webhook confirms active plan." />
            <button
              type="button"
              onClick={() => showToast("Settings panel opened (mock)")}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-400 hover:bg-surface-700 hover:text-white"
            >
              Settings
            </button>
            <button
              type="button"
              onClick={() => showToast("Billing portal would open via Stripe Customer Portal")}
              className="rounded-lg bg-brand-500/20 px-3 py-1.5 text-xs font-medium text-brand-300 hover:bg-brand-500/30"
            >
              $29/mo · Active
            </button>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-slate-800 bg-surface-900">
        <div className="mx-auto flex max-w-[1400px] gap-1 overflow-x-auto px-4">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
                tab === t.id
                  ? "border-brand-400 text-brand-300"
                  : "border-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 py-6">
        {/* Dashboard */}
        {tab === "dashboard" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">Firm Overview</h2>
              <DevNote text="Dashboard aggregates from PostgreSQL/Supabase: client count, field definitions, CSV activity, and audit events via materialized views refreshed hourly." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Clients", value: DASHBOARD_STATS.totalClients, delta: "+12 this month" },
                { label: "Fields Configured", value: DASHBOARD_STATS.fieldsConfigured.toLocaleString(), delta: `${DASHBOARD_STATS.avgFieldsPerClient} avg/client` },
                { label: "CSV Exports (Mar)", value: DASHBOARD_STATS.csvExportsThisMonth, delta: "TaxDome compatible" },
                { label: "Audit Events Today", value: DASHBOARD_STATS.auditEventsToday, delta: "All tracked" },
              ].map((stat) => (
                <button
                  key={stat.label}
                  type="button"
                  onClick={() => showToast(`Drill-down: ${stat.label} detail view`)}
                  className="card p-5 text-left transition hover:border-brand-500/30"
                >
                  <p className="text-xs text-slate-500">{stat.label}</p>
                  <p className="mt-1 font-display text-2xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-brand-400">{stat.delta}</p>
                </button>
              ))}
            </div>

            {/* Activity chart */}
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">CSV &amp; Update Activity</h3>
                <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-brand-400" /> Imports</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-400" /> Exports</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-amber-400" /> Field Updates</span>
                </div>
              </div>
              <div className="mt-6 flex items-end gap-3 h-40">
                {MONTHLY_ACTIVITY.map((m) => (
                  <button
                    key={m.month}
                    type="button"
                    onClick={() => showToast(`${m.month}: ${m.imports} imports, ${m.exports} exports, ${m.updates} updates`)}
                    className="flex flex-1 flex-col items-center gap-1 group"
                  >
                    <div className="flex w-full items-end justify-center gap-0.5 h-32">
                      <div className="w-2 rounded-t bg-brand-400 transition group-hover:bg-brand-300" style={{ height: `${(m.imports / maxActivity) * 100}%` }} />
                      <div className="w-2 rounded-t bg-blue-400 transition group-hover:bg-blue-300" style={{ height: `${(m.exports / maxActivity) * 100}%` }} />
                      <div className="w-2 rounded-t bg-amber-400 transition group-hover:bg-amber-300" style={{ height: `${(m.updates / maxActivity) * 100}%` }} />
                    </div>
                    <span className="text-xs text-slate-500">{m.month}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent activity feed */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Recent Activity</h3>
                <button type="button" onClick={() => setTab("audit")} className="text-xs text-brand-400 hover:text-brand-300">
                  View full audit log →
                </button>
              </div>
              <div className="space-y-3">
                {auditLog.slice(0, 5).map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    onClick={() => { setTab("audit"); setAuditFilter(entry.clientId); }}
                    className="flex w-full items-center gap-4 rounded-lg border border-slate-700/50 p-3 text-left transition hover:border-slate-600 hover:bg-surface-700/50"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-xs text-brand-400">
                      {entry.changedBy.split(" ")[0]?.[0]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-slate-200">
                        <span className="font-medium text-white">{entry.changedBy}</span> updated{" "}
                        <span className="text-brand-300">{entry.field}</span> on{" "}
                        <span className="text-white">{entry.clientName}</span>
                      </p>
                      <p className="text-xs text-slate-500">
                        {entry.oldValue} → {entry.newValue} · {entry.timestamp}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Clients & Fields */}
        {tab === "clients" && (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search clients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 rounded-lg border border-slate-700 bg-surface-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-brand-500 focus:outline-none"
                />
                <DevNote text="Production: full-text search via Postgres tsvector on client name, email, and custom field values stored in JSONB." />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-surface-800 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="all">All statuses</option>
                <option value="Active">Active</option>
                <option value="In Review">In Review</option>
                <option value="Filed">Filed</option>
                <option value="Extension">Extension</option>
              </select>
              <div className="card max-h-[600px] overflow-y-auto">
                {filteredClients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => setSelectedClientId(client.id)}
                    className={`flex w-full items-center justify-between border-b border-slate-700/50 p-4 text-left transition last:border-0 ${
                      selectedClientId === client.id ? "bg-brand-500/10" : "hover:bg-surface-700/50"
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{client.name}</p>
                      <p className="text-xs text-slate-500">{client.entityType}</p>
                    </div>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[client.status]}`}>
                      {client.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 space-y-4">
              <div className="card p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{selectedClient.name}</h3>
                    <p className="text-sm text-slate-400">{selectedClient.email}</p>
                    <div className="mt-2 flex flex-wrap gap-2 text-xs">
                      <span className="rounded bg-surface-700 px-2 py-0.5 text-slate-300">{selectedClient.entityType}</span>
                      <span className="rounded bg-surface-700 px-2 py-0.5 text-slate-300">{selectedClient.filingStatus}</span>
                      <span className="rounded bg-surface-700 px-2 py-0.5 text-slate-300">AGI: ${selectedClient.priorYearAgi.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[selectedClient.status]}`}>
                    {selectedClient.status}
                  </span>
                </div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-white">
                    Custom Fields ({selectedClient.fields.length})
                    <DevNote text="Production: fields stored as JSONB array on client row in Supabase. Schema validates type, options, and required flags. Unlimited per client." />
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAddFieldModal(true)}
                    className="rounded-lg bg-brand-500/20 px-3 py-1.5 text-xs font-medium text-brand-300 hover:bg-brand-500/30"
                  >
                    + Add Field
                  </button>
                </div>
                <div className="space-y-4">
                  {selectedClient.fields.map((field) => (
                    <div key={field.id} className="flex items-center gap-4 rounded-lg border border-slate-700/50 p-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-slate-200">{field.name}</p>
                          <span className="rounded bg-surface-700 px-1.5 py-0.5 text-[10px] text-slate-400">{field.type}</span>
                          {field.template && (
                            <span className="rounded bg-brand-500/10 px-1.5 py-0.5 text-[10px] text-brand-400">template</span>
                          )}
                        </div>
                      </div>
                      <FieldEditor field={field} onChange={(val) => updateField(selectedClient.id, field.id, val)} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Templates */}
        {tab === "templates" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Tax Field Templates</h2>
                <p className="text-sm text-slate-400">Pre-built field sets for common tax scenarios</p>
              </div>
              <DevNote text="Production: templates stored in a templates table. Applying a template copies field definitions to the client's JSONB schema. Community templates planned for v2." />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FIELD_TEMPLATES.map((template) => (
                <div key={template.id} className="card p-5">
                  <h3 className="font-semibold text-white">{template.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{template.description}</p>
                  <p className="mt-2 text-xs text-slate-500">{template.fields.length} fields · Applied {template.appliedCount} times</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {template.fields.map((f) => (
                      <span key={f.name} className="rounded bg-surface-700 px-2 py-0.5 text-[10px] text-slate-400">
                        {f.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowTemplateModal(template.id)}
                      className="flex-1 rounded-lg bg-brand-500/20 py-2 text-xs font-medium text-brand-300 hover:bg-brand-500/30"
                    >
                      Apply to client
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast(`Preview: ${template.name} — ${template.fields.map((f) => f.name).join(", ")}`)}
                      className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:bg-surface-700"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CSV Sync */}
        {tab === "csv" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">CSV Import &amp; Export</h2>
                <p className="text-sm text-slate-400">Two-way sync with TaxDome and Canopy client lists</p>
              </div>
              <DevNote text="Production: Papaparse handles CSV parsing. Column mapping UI maps TaxDome/Canopy export headers to FieldsForTax schema. Export generates CRM-compatible CSV on demand." />
            </div>

            <div className="flex gap-2">
              {(["import", "export", "map"] as const).map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCsvStep(step)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium capitalize ${
                    csvStep === step
                      ? "bg-brand-500/20 text-brand-300"
                      : "text-slate-500 hover:bg-surface-700 hover:text-slate-300"
                  }`}
                >
                  {step === "map" ? "Column Mapping" : step}
                </button>
              ))}
            </div>

            {csvStep === "import" && (
              <div className="card p-6 space-y-4">
                <p className="text-sm text-slate-400">Paste a TaxDome or Canopy client export, or upload a .csv file:</p>
                <textarea
                  value={csvContent}
                  onChange={(e) => setCsvContent(e.target.value)}
                  placeholder="Client Name,Email,Entity Type,Status..."
                  rows={8}
                  className="w-full rounded-lg border border-slate-700 bg-surface-900 p-4 font-mono text-xs text-slate-300 focus:border-brand-500 focus:outline-none"
                />
                <div className="flex gap-3">
                  <button type="button" onClick={() => { setCsvContent(SAMPLE_CSV_EXPORT); showToast("Loaded sample TaxDome export"); }} className="btn-secondary text-xs">
                    Load sample TaxDome CSV
                  </button>
                  <button type="button" onClick={handleCsvImport} disabled={!csvContent.trim()} className="btn-primary text-xs disabled:opacity-50">
                    Parse &amp; map columns
                  </button>
                </div>
              </div>
            )}

            {csvStep === "map" && (
              <div className="card p-6 space-y-4">
                <h3 className="font-semibold text-white">Column Mapping</h3>
                <div className="space-y-2">
                  {[
                    { csv: "Client Name", field: "name" },
                    { csv: "Email", field: "email" },
                    { csv: "Entity Type", field: "entityType" },
                    { csv: "Filing Status", field: "filingStatus" },
                    { csv: "Prior-Year AGI", field: "priorYearAgi" },
                    { csv: "Status", field: "status" },
                  ].map((mapping) => (
                    <div key={mapping.csv} className="flex items-center gap-4 rounded-lg border border-slate-700/50 p-3">
                      <span className="w-40 text-sm text-slate-400">{mapping.csv}</span>
                      <span className="text-slate-600">→</span>
                      <select className="flex-1 rounded border border-slate-700 bg-surface-900 px-2 py-1 text-sm text-white">
                        <option>{mapping.field}</option>
                        <option>Skip column</option>
                        <option>Create custom field</option>
                      </select>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleCsvConfirmImport} className="btn-primary text-xs">
                  Confirm import (3 clients)
                </button>
              </div>
            )}

            {csvStep === "export" && (
              <div className="card p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" defaultChecked className="rounded border-slate-600" /> TaxDome format
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" className="rounded border-slate-600" /> Canopy format
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-300">
                    <input type="checkbox" defaultChecked className="rounded border-slate-600" /> Include custom fields
                  </label>
                </div>
                <button type="button" onClick={handleCsvExport} className="btn-primary text-xs">
                  Generate export
                </button>
                {csvContent && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-500">Export preview ({clients.length} clients)</p>
                      <button
                        type="button"
                        onClick={() => { navigator.clipboard?.writeText(csvContent); showToast("CSV copied to clipboard"); }}
                        className="text-xs text-brand-400 hover:text-brand-300"
                      >
                        Copy to clipboard
                      </button>
                    </div>
                    <pre className="max-h-60 overflow-auto rounded-lg border border-slate-700 bg-surface-900 p-4 font-mono text-xs text-slate-300">
                      {csvContent}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Audit Log */}
        {tab === "audit" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Change History</h2>
                <p className="text-sm text-slate-400">Per-client field edit audit trail</p>
              </div>
              <div className="flex items-center gap-2">
                <DevNote text="Production: append-only audit_log table with client_id, field_id, old_value, new_value, user_id, timestamp. Immutable — no deletes." />
                <select
                  value={auditFilter}
                  onChange={(e) => setAuditFilter(e.target.value)}
                  className="rounded-lg border border-slate-700 bg-surface-800 px-3 py-1.5 text-sm text-white"
                >
                  <option value="all">All clients</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-surface-800/50 text-left text-xs text-slate-500">
                    <th className="p-3 font-medium">Timestamp</th>
                    <th className="p-3 font-medium">Client</th>
                    <th className="p-3 font-medium">Field</th>
                    <th className="p-3 font-medium">Change</th>
                    <th className="p-3 font-medium">By</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAudit.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-b border-slate-700/50 hover:bg-surface-700/30 cursor-pointer"
                      onClick={() => { setTab("clients"); setSelectedClientId(entry.clientId); showToast(`Opened ${entry.clientName}`); }}
                    >
                      <td className="p-3 text-slate-400">{entry.timestamp}</td>
                      <td className="p-3 text-white">{entry.clientName}</td>
                      <td className="p-3 text-brand-300">{entry.field}</td>
                      <td className="p-3 text-slate-400">
                        <span className="line-through text-slate-600">{entry.oldValue}</span>
                        {" → "}
                        <span className="text-white">{entry.newValue}</span>
                      </td>
                      <td className="p-3 text-slate-400">{entry.changedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bulk Update */}
        {tab === "bulk" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-white">Bulk Field Update</h2>
                <p className="text-sm text-slate-400">Paste spreadsheet rows to update multiple clients at once</p>
              </div>
              <DevNote text="Production: tab-separated paste parsed client-side, validated against schema, then batch-updated via Supabase RPC. Each row creates an audit log entry." />
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="card p-6 space-y-4">
                <p className="text-xs text-slate-500">Format: Client Name [tab] Field Name [tab] Value (one row per update)</p>
                <textarea
                  value={bulkPaste}
                  onChange={(e) => setBulkPaste(e.target.value)}
                  rows={10}
                  className="w-full rounded-lg border border-slate-700 bg-surface-900 p-4 font-mono text-xs text-slate-300 focus:border-brand-500 focus:outline-none"
                />
                <div className="flex gap-3">
                  <button type="button" onClick={handleBulkPreview} className="btn-secondary text-xs">
                    Preview changes
                  </button>
                  <button
                    type="button"
                    onClick={() => { setBulkPaste(SAMPLE_BULK_PASTE); showToast("Loaded sample bulk paste data"); }}
                    className="text-xs text-slate-500 hover:text-slate-300"
                  >
                    Reset sample
                  </button>
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-semibold text-white mb-4">
                  Preview ({bulkPreview.length} changes)
                </h3>
                {bulkPreview.length === 0 ? (
                  <p className="text-sm text-slate-500">Click &quot;Preview changes&quot; to validate pasted rows</p>
                ) : (
                  <>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {bulkPreview.map((row, i) => (
                        <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-700/50 p-2 text-xs">
                          <span className="text-white font-medium">{row.client}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-brand-300">{row.field}</span>
                          <span className="text-slate-600">→</span>
                          <span className="text-slate-300">{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <button type="button" onClick={handleBulkApply} className="btn-primary mt-4 w-full text-xs">
                      Apply {bulkPreview.length} updates
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Field Modal */}
      {showAddFieldModal && (
        <Modal onClose={() => setShowAddFieldModal(false)} title="Add Custom Field">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400">Field name</label>
              <input
                type="text"
                value={newField.name}
                onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                placeholder="e.g. QBI Deduction Amount"
                className="mt-1 w-full rounded-lg border border-slate-700 bg-surface-900 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400">Field type</label>
              <select
                value={newField.type}
                onChange={(e) => setNewField({ ...newField, type: e.target.value as FieldType })}
                className="mt-1 w-full rounded-lg border border-slate-700 bg-surface-900 px-3 py-2 text-sm text-white focus:border-brand-500 focus:outline-none"
              >
                <option value="text">Text</option>
                <option value="numeric">Numeric</option>
                <option value="date">Date</option>
                <option value="dropdown">Dropdown</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </div>
            <button type="button" onClick={addCustomField} className="btn-primary w-full text-sm">
              Add to {selectedClient.name}
            </button>
          </div>
        </Modal>
      )}

      {/* Apply Template Modal */}
      {showTemplateModal && (
        <Modal onClose={() => setShowTemplateModal(null)} title="Apply Template">
          <p className="text-sm text-slate-400 mb-4">
            Select a client to apply &quot;{FIELD_TEMPLATES.find((t) => t.id === showTemplateModal)?.name}&quot;:
          </p>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {clients.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => applyTemplate(showTemplateModal, c.id)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-700 p-3 text-left text-sm hover:bg-surface-700"
              >
                <span className="text-white">{c.name}</span>
                <span className="text-xs text-slate-500">{c.fields.length} fields</span>
              </button>
            ))}
          </div>
        </Modal>
      )}

      <Toast message={toast.message} visible={toast.visible} onClose={hideToast} />
    </div>
  );
}

function FieldEditor({
  field,
  onChange,
}: {
  field: CustomField;
  onChange: (value: string | number | boolean) => void;
}) {
  switch (field.type) {
    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={Boolean(field.value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-600 text-brand-500 focus:ring-brand-500"
        />
      );
    case "dropdown":
      return (
        <select
          value={String(field.value)}
          onChange={(e) => onChange(e.target.value)}
          className="rounded border border-slate-700 bg-surface-900 px-2 py-1 text-sm text-white"
        >
          {(field.options ?? []).map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    case "numeric":
      return (
        <input
          type="number"
          value={Number(field.value)}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-28 rounded border border-slate-700 bg-surface-900 px-2 py-1 text-sm text-white text-right"
        />
      );
    case "date":
      return (
        <input
          type="date"
          value={String(field.value)}
          onChange={(e) => onChange(e.target.value)}
          className="rounded border border-slate-700 bg-surface-900 px-2 py-1 text-sm text-white"
        />
      );
    default:
      return (
        <input
          type="text"
          value={String(field.value)}
          onChange={(e) => onChange(e.target.value)}
          className="w-40 rounded border border-slate-700 bg-surface-900 px-2 py-1 text-sm text-white"
        />
      );
  }
}

function Modal({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/60" onClick={onClose} aria-label="Close modal" />
      <div className="relative w-full max-w-md rounded-xl border border-slate-700 bg-surface-800 p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white">{title}</h3>
          <button type="button" onClick={onClose} className="text-slate-500 hover:text-white">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}
