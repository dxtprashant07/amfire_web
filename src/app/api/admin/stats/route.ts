import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/services/auth/api-auth";
import { prisma } from "@/db/client";
import { devMockEnabled, devMockStats } from "@/services/auth/dev-mock";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** Buckets a list of timestamps into daily counts for the last `days` days
 * (oldest first) — powers the KPI sparklines with real data instead of
 * fabricated trend lines. */
function dailyBuckets(timestamps: Date[], days = 7): number[] {
  const buckets = Array(days).fill(0);
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  for (const ts of timestamps) {
    const diffDays = Math.floor((endOfToday.getTime() - ts.getTime()) / 86400000);
    if (diffDays >= 0 && diffDays < days) buckets[days - 1 - diffDays]++;
  }
  return buckets;
}

function trend(buckets: number[]): { direction: "up" | "down"; text: string } {
  const mid = Math.floor(buckets.length / 2);
  const recent = buckets.slice(mid).reduce((a, b) => a + b, 0);
  const prior = buckets.slice(0, mid).reduce((a, b) => a + b, 0);
  if (prior === 0 && recent === 0) return { direction: "up", text: "no change this week" };
  if (prior === 0) return { direction: "up", text: `+${recent} this week` };
  const pct = Math.round(((recent - prior) / prior) * 100);
  return { direction: pct >= 0 ? "up" : "down", text: `${pct >= 0 ? "+" : ""}${pct}% this week` };
}

/** GET /api/admin/stats — dashboard stats */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  if (devMockEnabled) return NextResponse.json(devMockStats);

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);

    const [
      totalLeads,
      leadsThisMonth,
      newLeads,
      activeProjects,
      totalClients,
      openTickets,
      recentLeads,
      activeProjectRows,
      openTicketRows,
      upcomingMilestoneRows,
      recentActivityRows,
      outstandingPaymentRows,
      leadsLast7,
      projectsLast7,
      clientsLast7,
      ticketsLast7,
    ] = await Promise.all([
      prisma.lead.count(),
      prisma.lead.count({ where: { createdAt: { gte: startOfMonth } } }),
      prisma.lead.count({ where: { status: "NEW" } }),
      prisma.project.count({ where: { status: { in: ["DISCOVERY", "IN_PROGRESS"] } } }),
      prisma.user.count({ where: { role: "CLIENT", active: true } }),
      prisma.supportTicket.count({ where: { status: { in: ["OPEN", "IN_PROGRESS"] } } }),
      prisma.lead.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: { id: true, name: true, email: true, service: true, status: true, createdAt: true },
      }),
      prisma.project.findMany({
        where: { status: { in: ["DISCOVERY", "IN_PROGRESS", "ON_HOLD"] } },
        orderBy: { updatedAt: "desc" },
        take: 5,
        select: {
          id: true,
          name: true,
          status: true,
          client: { select: { name: true, company: true } },
          milestones: { select: { status: true } },
        },
      }),
      prisma.supportTicket.findMany({
        where: { status: { in: ["OPEN", "IN_PROGRESS"] } },
        orderBy: { createdAt: "desc" },
        take: 4,
        select: { id: true, subject: true, status: true, project: { select: { name: true } } },
      }),
      prisma.milestone.findMany({
        where: { status: { in: ["PENDING", "IN_PROGRESS"] } },
        orderBy: { dueDate: "asc" },
        take: 3,
        select: { id: true, title: true, dueDate: true, project: { select: { name: true } } },
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 4,
        select: { id: true, action: true, entity: true, details: true, createdAt: true, user: { select: { name: true } } },
      }),
      prisma.payment.findMany({
        where: { status: { in: ["PENDING", "OVERDUE"] } },
        orderBy: { dueDate: "asc" },
        take: 3,
        select: { id: true, label: true, amount: true, status: true, dueDate: true, project: { select: { name: true } } },
      }),
      prisma.lead.findMany({ where: { createdAt: { gte: sevenDaysAgo } }, select: { createdAt: true } }),
      prisma.project.findMany({ where: { createdAt: { gte: sevenDaysAgo } }, select: { createdAt: true } }),
      prisma.user.findMany({ where: { role: "CLIENT", createdAt: { gte: sevenDaysAgo } }, select: { createdAt: true } }),
      prisma.supportTicket.findMany({ where: { createdAt: { gte: sevenDaysAgo } }, select: { createdAt: true } }),
    ]);

    const activeProjectsList = activeProjectRows.map((p) => {
      const total = p.milestones.length;
      const done = p.milestones.filter((m) => m.status === "COMPLETED").length;
      return {
        id: p.id,
        name: p.name,
        client: p.client.company || p.client.name,
        status: p.status,
        progress: total > 0 ? Math.round((done / total) * 100) : 0,
      };
    });

    const leadBuckets = dailyBuckets(leadsLast7.map((r) => r.createdAt));
    const projectBuckets = dailyBuckets(projectsLast7.map((r) => r.createdAt));
    const clientBuckets = dailyBuckets(clientsLast7.map((r) => r.createdAt));
    const ticketBuckets = dailyBuckets(ticketsLast7.map((r) => r.createdAt));

    return NextResponse.json({
      totalLeads,
      leadsThisMonth,
      newLeads,
      activeProjects,
      totalClients,
      openTickets,
      recentLeads,
      activeProjectsList,
      pendingTasks: openTicketRows,
      upcomingMilestones: upcomingMilestoneRows,
      recentActivity: recentActivityRows,
      outstandingPayments: outstandingPaymentRows,
      trends: {
        leadsThisMonth: { sparkline: leadBuckets, trend: trend(leadBuckets) },
        newLeads: { sparkline: leadBuckets, trend: trend(leadBuckets) },
        activeProjects: { sparkline: projectBuckets, trend: trend(projectBuckets) },
        totalClients: { sparkline: clientBuckets, trend: trend(clientBuckets) },
        openTickets: { sparkline: ticketBuckets, trend: trend(ticketBuckets) },
        totalLeads: { sparkline: leadBuckets, trend: trend(leadBuckets) },
      },
    });
  } catch (err) {
    console.error("[stats] Failed:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
