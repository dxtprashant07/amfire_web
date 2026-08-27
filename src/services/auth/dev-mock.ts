import type { TokenPayload } from "./auth";

/**
 * Local-only stand-in for the database while DATABASE_URL isn't set yet
 * (you connect a real DB at deploy time). Auto-disables the moment
 * DATABASE_URL exists — never active in production regardless, since
 * production deployments always have DATABASE_URL configured.
 *
 * Session/audit-log persistence is skipped in this mode: login and refresh
 * work, but admin/client data pages that actually query the DB (projects,
 * users, stats) will still error — there's no database to query.
 */
export const devMockEnabled = process.env.NODE_ENV !== "production" && !process.env.DATABASE_URL;

const DEV_MOCK_USERS: Record<string, { password: string; payload: TokenPayload }> = {
  "admin@amfire.in": {
    password: "Admin@1234",
    payload: { sub: "dev-mock-admin", email: "admin@amfire.in", role: "SUPER_ADMIN", name: "Dev Admin" },
  },
  "client@amfire.in": {
    password: "Client@1234",
    payload: { sub: "dev-mock-client", email: "client@amfire.in", role: "CLIENT", name: "Dev Client" },
  },
};

export function findDevMockUser(email: string, password: string): TokenPayload | null {
  const entry = DEV_MOCK_USERS[email.toLowerCase()];
  if (!entry || entry.password !== password) return null;
  return entry.payload;
}

/** Fixture data for /api/admin/stats when devMockEnabled — lets the admin
 * dashboard be reviewed locally without a database. Same auto-disable rule
 * as the login bypass above. */
export const devMockStats = {
  totalLeads: 34,
  leadsThisMonth: 9,
  newLeads: 4,
  activeProjects: 5,
  totalClients: 6,
  openTickets: 3,
  recentLeads: [
    { id: "l1", name: "Sneha Rao", email: "sneha@nexahealth.in", service: "AI Agents", status: "NEW", createdAt: new Date().toISOString() },
    { id: "l2", name: "Arjun Mehta", email: "arjun@clearpath.in", service: "Web Development", status: "CONTACTED", createdAt: new Date().toISOString() },
    { id: "l3", name: "Priya Sharma", email: "priya@eduforge.in", service: "Automation", status: "WON", createdAt: new Date().toISOString() },
  ],
  activeProjectsList: [
    { id: "p1", name: "Skillship LMS", client: "NexaHealth", status: "IN_PROGRESS", progress: 72 },
    { id: "p2", name: "AI Career Copilot v2", client: "EduForge", status: "IN_PROGRESS", progress: 88 },
    { id: "p3", name: "Clearpath Contracts", client: "Clearpath", status: "DISCOVERY", progress: 22 },
    { id: "p4", name: "Field Ops App", client: "Thorogood", status: "ON_HOLD", progress: 5 },
  ],
  pendingTasks: [
    { id: "t1", subject: "Sign off Skillship M3 deliverables", status: "OPEN", project: { name: "Skillship LMS" } },
    { id: "t2", subject: "Chase SSO cert from Thorogood IT", status: "OPEN", project: { name: "Field Ops App" } },
    { id: "t3", subject: "Follow up Clearpath discovery notes", status: "IN_PROGRESS", project: { name: "Clearpath Contracts" } },
  ],
  upcomingMilestones: [
    { id: "m1", title: "M3 · AI Integration", dueDate: new Date(Date.now() + 4 * 86400000).toISOString(), project: { name: "Skillship LMS" } },
    { id: "m2", title: "Launch", dueDate: new Date(Date.now() + 9 * 86400000).toISOString(), project: { name: "AI Career Copilot v2" } },
    { id: "m3", title: "M2 · Ops dashboard", dueDate: new Date(Date.now() + 14 * 86400000).toISOString(), project: { name: "Field Ops App" } },
  ],
  recentActivity: [
    { id: "a1", action: "UPDATE", entity: "payment", details: "Invoice INV-1042 sent to Skillship LMS", createdAt: new Date().toISOString(), user: { name: "Dev Admin" } },
    { id: "a2", action: "SIGN", entity: "project", details: "Clearpath signed the discovery contract", createdAt: new Date(Date.now() - 86400000).toISOString(), user: { name: "Dev Admin" } },
    { id: "a3", action: "CREATE", entity: "support_ticket", details: "SSO ticket opened — Thorogood", createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), user: { name: "Dev Admin" } },
  ],
  outstandingPayments: [
    { id: "pay1", label: "Milestone 3 — AI Integration", amount: "180000", status: "PENDING", dueDate: new Date(Date.now() + 5 * 86400000).toISOString(), project: { name: "Skillship LMS" } },
    { id: "pay2", label: "Milestone 1 — Discovery", amount: "175000", status: "OVERDUE", dueDate: new Date(Date.now() - 3 * 86400000).toISOString(), project: { name: "Clearpath Contracts" } },
  ],
  trends: {
    leadsThisMonth: { sparkline: [1, 2, 1, 3, 2, 4, 3], trend: { direction: "up" as const, text: "+22% this week" } },
    newLeads: { sparkline: [1, 2, 1, 3, 2, 4, 3], trend: { direction: "up" as const, text: "+22% this week" } },
    activeProjects: { sparkline: [0, 1, 0, 1, 1, 0, 1], trend: { direction: "up" as const, text: "+1 this week" } },
    totalClients: { sparkline: [0, 0, 1, 0, 0, 1, 0], trend: { direction: "up" as const, text: "+2 this week" } },
    openTickets: { sparkline: [2, 1, 2, 3, 2, 1, 3], trend: { direction: "down" as const, text: "-10% this week" } },
    totalLeads: { sparkline: [3, 4, 3, 5, 4, 6, 5], trend: { direction: "up" as const, text: "+15% this week" } },
  },
};

/** Fixture for /api/client/projects when devMockEnabled — lets the client
 * portal dashboard be reviewed locally without a database. */
export const devMockClientProjects = [
  {
    id: "cp1",
    name: "AI SaaS Launch",
    description: "End-to-end SaaS platform with AI-powered onboarding and analytics.",
    status: "IN_PROGRESS",
    startDate: new Date(Date.now() - 30 * 86400000).toISOString(),
    endDate: new Date(Date.now() + 20 * 86400000).toISOString(),
    totalValue: "450000",
    milestones: [
      { id: "cm1", title: "Discovery", status: "COMPLETED", dueDate: null, completedAt: new Date(Date.now() - 25 * 86400000).toISOString(), order: 1 },
      { id: "cm2", title: "Design approved", status: "COMPLETED", dueDate: null, completedAt: new Date(Date.now() - 10 * 86400000).toISOString(), order: 2 },
      { id: "cm3", title: "AI integration", status: "IN_PROGRESS", dueDate: new Date(Date.now() + 4 * 86400000).toISOString(), completedAt: null, order: 3 },
      { id: "cm4", title: "Production launch", status: "PENDING", dueDate: new Date(Date.now() + 20 * 86400000).toISOString(), completedAt: null, order: 4 },
    ],
    payments: [
      { status: "PAID", amount: "90000" },
      { status: "PAID", amount: "135000" },
      { status: "PENDING", amount: "135000" },
      { status: "PENDING", amount: "90000" },
    ],
  },
];
