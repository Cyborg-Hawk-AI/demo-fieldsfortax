export type FieldType = "text" | "dropdown" | "checkbox" | "numeric" | "date";

export interface CustomField {
  id: string;
  name: string;
  type: FieldType;
  value: string | number | boolean;
  options?: string[];
  template?: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  entityType: string;
  filingStatus: string;
  priorYearAgi: number;
  dependents: number;
  carryoverLoss: number;
  status: "Active" | "In Review" | "Filed" | "Extension";
  lastUpdated: string;
  assignedTo: string;
  fields: CustomField[];
}

export interface AuditEntry {
  id: string;
  clientId: string;
  clientName: string;
  field: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  timestamp: string;
}

export interface FieldTemplate {
  id: string;
  name: string;
  description: string;
  fields: { name: string; type: FieldType; options?: string[] }[];
  appliedCount: number;
}

export const FIRM_NAME = "Whitfield & Associates CPA";

export const TEAM_MEMBERS = [
  "Sarah Whitfield, CPA",
  "Marcus Chen, EA",
  "Diana Reyes, Tax Preparer",
  "James Okafor, Senior Associate",
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: "c1",
    name: "Robert & Linda Martinez",
    email: "rmartinez@email.com",
    entityType: "Individual (1040)",
    filingStatus: "Married Filing Jointly",
    priorYearAgi: 187450,
    dependents: 2,
    carryoverLoss: 0,
    status: "In Review",
    lastUpdated: "2026-03-08",
    assignedTo: "Sarah Whitfield, CPA",
    fields: [
      { id: "f1", name: "Child Tax Credit Eligible", type: "checkbox", value: true, template: true },
      { id: "f2", name: "State of Residence", type: "dropdown", value: "California", options: ["California", "Texas", "New York", "Florida"], template: true },
      { id: "f3", name: "Estimated Q1 Payment", type: "numeric", value: 4200, template: false },
      { id: "f4", name: "K-1 Received Date", type: "date", value: "2026-02-14", template: false },
      { id: "f5", name: "Rental Property Count", type: "numeric", value: 1, template: false },
    ],
  },
  {
    id: "c2",
    name: "Greenleaf Organic Farms LLC",
    email: "accounting@greenleaforganic.com",
    entityType: "Partnership (1065)",
    filingStatus: "N/A",
    priorYearAgi: 0,
    dependents: 0,
    carryoverLoss: 12400,
    status: "Active",
    lastUpdated: "2026-03-07",
    assignedTo: "Marcus Chen, EA",
    fields: [
      { id: "f6", name: "Section 179 Election", type: "checkbox", value: true, template: true },
      { id: "f7", name: "Partner Count", type: "numeric", value: 3, template: true },
      { id: "f8", name: "NOL Carryforward", type: "numeric", value: 12400, template: true },
      { id: "f9", name: "Fiscal Year End", type: "date", value: "2025-12-31", template: false },
      { id: "f10", name: "Industry Code", type: "dropdown", value: "Agriculture", options: ["Agriculture", "Retail", "Manufacturing", "Services"], template: false },
    ],
  },
  {
    id: "c3",
    name: "Dr. Emily Nakamura",
    email: "enakamura@medmail.com",
    entityType: "S-Corp (1120-S)",
    filingStatus: "Single",
    priorYearAgi: 312800,
    dependents: 0,
    carryoverLoss: 0,
    status: "Filed",
    lastUpdated: "2026-03-05",
    assignedTo: "Diana Reyes, Tax Preparer",
    fields: [
      { id: "f11", name: "W-2 Wages", type: "numeric", value: 185000, template: true },
      { id: "f12", name: "Health Insurance Deduction", type: "checkbox", value: true, template: true },
      { id: "f13", name: "Reasonable Compensation Review", type: "dropdown", value: "Completed", options: ["Pending", "In Progress", "Completed"], template: false },
      { id: "f14", name: "QBI Deduction Eligible", type: "checkbox", value: true, template: true },
    ],
  },
  {
    id: "c4",
    name: "Harborview Property Group",
    email: "tax@harborviewpg.com",
    entityType: "C-Corp (1120)",
    filingStatus: "N/A",
    priorYearAgi: 0,
    dependents: 0,
    carryoverLoss: 45200,
    status: "Extension",
    lastUpdated: "2026-03-06",
    assignedTo: "James Okafor, Senior Associate",
    fields: [
      { id: "f15", name: "NOL Carryforward", type: "numeric", value: 45200, template: true },
      { id: "f16", name: "R&D Credit Carryforward", type: "numeric", value: 18750, template: true },
      { id: "f17", name: "Extension Filed", type: "checkbox", value: true, template: false },
      { id: "f18", name: "Extension Due Date", type: "date", value: "2026-09-15", template: false },
    ],
  },
  {
    id: "c5",
    name: "Thomas & Rachel Brooks",
    email: "tbrooks@gmail.com",
    entityType: "Individual (1040)",
    filingStatus: "Married Filing Jointly",
    priorYearAgi: 94500,
    dependents: 3,
    carryoverLoss: 3200,
    status: "Active",
    lastUpdated: "2026-03-08",
    assignedTo: "Sarah Whitfield, CPA",
    fields: [
      { id: "f19", name: "Child Tax Credit Eligible", type: "checkbox", value: true, template: true },
      { id: "f20", name: "Capital Loss Carryover", type: "numeric", value: 3200, template: true },
      { id: "f21", name: "HSA Contribution", type: "numeric", value: 7750, template: false },
      { id: "f22", name: "Education Credit Type", type: "dropdown", value: "AOTC", options: ["AOTC", "LLC", "None"], template: false },
    ],
  },
  {
    id: "c6",
    name: "Apex Consulting Inc.",
    email: "finance@apexconsulting.io",
    entityType: "S-Corp (1120-S)",
    filingStatus: "N/A",
    priorYearAgi: 0,
    dependents: 0,
    carryoverLoss: 0,
    status: "In Review",
    lastUpdated: "2026-03-07",
    assignedTo: "Marcus Chen, EA",
    fields: [
      { id: "f23", name: "Shareholder Count", type: "numeric", value: 2, template: true },
      { id: "f24", name: "Accountable Plan", type: "checkbox", value: true, template: false },
      { id: "f25", name: "Payroll Provider", type: "dropdown", value: "Gusto", options: ["Gusto", "ADP", "Paychex", "Manual"], template: false },
      { id: "f26", name: "Prior Year Revenue", type: "numeric", value: 890000, template: false },
    ],
  },
  {
    id: "c7",
    name: "Sunrise Childcare Center",
    email: "admin@sunrisechildcare.org",
    entityType: "Nonprofit (990)",
    filingStatus: "N/A",
    priorYearAgi: 0,
    dependents: 0,
    carryoverLoss: 0,
    status: "Active",
    lastUpdated: "2026-03-04",
    assignedTo: "Diana Reyes, Tax Preparer",
    fields: [
      { id: "f27", name: "501(c)(3) Status", type: "checkbox", value: true, template: true },
      { id: "f28", name: "Form 990 Type", type: "dropdown", value: "990", options: ["990-N", "990-EZ", "990", "990-PF"], template: true },
      { id: "f29", name: "Gross Receipts", type: "numeric", value: 425000, template: false },
      { id: "f30", name: "Filing Deadline", type: "date", value: "2026-05-15", template: false },
    ],
  },
  {
    id: "c8",
    name: "Victor Alvarado",
    email: "valvarado@outlook.com",
    entityType: "Individual (1040)",
    filingStatus: "Head of Household",
    priorYearAgi: 67800,
    dependents: 1,
    carryoverLoss: 0,
    status: "Active",
    lastUpdated: "2026-03-08",
    assignedTo: "James Okafor, Senior Associate",
    fields: [
      { id: "f31", name: "Self-Employment Income", type: "numeric", value: 42000, template: false },
      { id: "f32", name: "Schedule C Category", type: "dropdown", value: "Rideshare", options: ["Rideshare", "Freelance", "Consulting", "Other"], template: false },
      { id: "f33", name: "Estimated Tax Paid", type: "numeric", value: 6800, template: false },
      { id: "f34", name: "Mileage Log Complete", type: "checkbox", value: false, template: false },
    ],
  },
];

export const INITIAL_AUDIT_LOG: AuditEntry[] = [
  { id: "a1", clientId: "c1", clientName: "Robert & Linda Martinez", field: "Estimated Q1 Payment", oldValue: "3800", newValue: "4200", changedBy: "Sarah Whitfield, CPA", timestamp: "2026-03-08 14:32" },
  { id: "a2", clientId: "c2", clientName: "Greenleaf Organic Farms LLC", field: "NOL Carryforward", oldValue: "10200", newValue: "12400", changedBy: "Marcus Chen, EA", timestamp: "2026-03-07 11:15" },
  { id: "a3", clientId: "c3", clientName: "Dr. Emily Nakamura", field: "Reasonable Compensation Review", oldValue: "In Progress", newValue: "Completed", changedBy: "Diana Reyes, Tax Preparer", timestamp: "2026-03-05 16:48" },
  { id: "a4", clientId: "c4", clientName: "Harborview Property Group", field: "Extension Filed", oldValue: "false", newValue: "true", changedBy: "James Okafor, Senior Associate", timestamp: "2026-03-06 09:22" },
  { id: "a5", clientId: "c5", clientName: "Thomas & Rachel Brooks", field: "HSA Contribution", oldValue: "7000", newValue: "7750", changedBy: "Sarah Whitfield, CPA", timestamp: "2026-03-08 10:05" },
  { id: "a6", clientId: "c6", clientName: "Apex Consulting Inc.", field: "Prior Year Revenue", oldValue: "850000", newValue: "890000", changedBy: "Marcus Chen, EA", timestamp: "2026-03-07 13:40" },
  { id: "a7", clientId: "c8", clientName: "Victor Alvarado", field: "Mileage Log Complete", oldValue: "false", newValue: "false", changedBy: "James Okafor, Senior Associate", timestamp: "2026-03-08 08:55" },
  { id: "a8", clientId: "c1", clientName: "Robert & Linda Martinez", field: "K-1 Received Date", oldValue: "2026-02-10", newValue: "2026-02-14", changedBy: "Sarah Whitfield, CPA", timestamp: "2026-03-06 15:20" },
];

export const FIELD_TEMPLATES: FieldTemplate[] = [
  {
    id: "t1",
    name: "Individual 1040 Essentials",
    description: "Filing status, dependents, prior-year AGI, and common credits",
    appliedCount: 142,
    fields: [
      { name: "Filing Status", type: "dropdown", options: ["Single", "MFJ", "MFS", "HOH", "QSS"] },
      { name: "Dependents", type: "numeric" },
      { name: "Prior-Year AGI", type: "numeric" },
      { name: "Child Tax Credit Eligible", type: "checkbox" },
    ],
  },
  {
    id: "t2",
    name: "Carryover & Loss Tracking",
    description: "NOL, capital loss, and credit carryforwards",
    appliedCount: 87,
    fields: [
      { name: "NOL Carryforward", type: "numeric" },
      { name: "Capital Loss Carryover", type: "numeric" },
      { name: "R&D Credit Carryforward", type: "numeric" },
    ],
  },
  {
    id: "t3",
    name: "Entity Classification",
    description: "Entity type flags and structure-specific fields",
    appliedCount: 96,
    fields: [
      { name: "Entity Type", type: "dropdown", options: ["Individual", "Partnership", "S-Corp", "C-Corp", "Nonprofit"] },
      { name: "Partner/Shareholder Count", type: "numeric" },
      { name: "Section 179 Election", type: "checkbox" },
    ],
  },
  {
    id: "t4",
    name: "S-Corp Compliance",
    description: "Reasonable compensation, QBI, and payroll tracking",
    appliedCount: 64,
    fields: [
      { name: "W-2 Wages", type: "numeric" },
      { name: "Reasonable Compensation Review", type: "dropdown", options: ["Pending", "In Progress", "Completed"] },
      { name: "QBI Deduction Eligible", type: "checkbox" },
      { name: "Health Insurance Deduction", type: "checkbox" },
    ],
  },
  {
    id: "t5",
    name: "Nonprofit 990",
    description: "501(c)(3) status, form type, and filing deadlines",
    appliedCount: 23,
    fields: [
      { name: "501(c)(3) Status", type: "checkbox" },
      { name: "Form 990 Type", type: "dropdown", options: ["990-N", "990-EZ", "990", "990-PF"] },
      { name: "Gross Receipts", type: "numeric" },
      { name: "Filing Deadline", type: "date" },
    ],
  },
];

export const SAMPLE_CSV_EXPORT = `Client Name,Email,Entity Type,Filing Status,Prior-Year AGI,Dependents,NOL Carryforward,Status,Assigned To
Robert & Linda Martinez,rmartinez@email.com,Individual (1040),Married Filing Jointly,187450,2,0,In Review,Sarah Whitfield CPA
Greenleaf Organic Farms LLC,accounting@greenleaforganic.com,Partnership (1065),N/A,0,0,12400,Active,Marcus Chen EA
Dr. Emily Nakamura,enakamura@medmail.com,S-Corp (1120-S),Single,312800,0,0,Filed,Diana Reyes
Harborview Property Group,tax@harborviewpg.com,C-Corp (1120),N/A,0,0,45200,Extension,James Okafor`;

export const SAMPLE_BULK_PASTE = `Client Name\tField\tValue
Thomas & Rachel Brooks\tHSA Contribution\t8000
Victor Alvarado\tEstimated Tax Paid\t7200
Apex Consulting Inc.\tPrior Year Revenue\t920000`;

export const DASHBOARD_STATS = {
  totalClients: 248,
  fieldsConfigured: 1847,
  csvExportsThisMonth: 34,
  auditEventsToday: 12,
  templatesApplied: 412,
  avgFieldsPerClient: 7.4,
};

export const MONTHLY_ACTIVITY = [
  { month: "Oct", imports: 18, exports: 22, updates: 145 },
  { month: "Nov", imports: 24, exports: 28, updates: 198 },
  { month: "Dec", imports: 31, exports: 35, updates: 267 },
  { month: "Jan", imports: 42, exports: 38, updates: 312 },
  { month: "Feb", imports: 38, exports: 41, updates: 289 },
  { month: "Mar", imports: 28, exports: 34, updates: 224 },
];
