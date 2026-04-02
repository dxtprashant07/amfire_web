import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** GET /api/admin/stats — dashboard stats */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      totalLeads,
      leadsThisMonth,
      newLeads,
      activeProjects,
      totalClients,
      openTickets,
      recentLeads,
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
    ]);

    return NextResponse.json({
      totalLeads,
      leadsThisMonth,
      newLeads,
      activeProjects,
      totalClients,
      openTickets,
      recentLeads,
    });
  } catch (err) {
    console.error("[stats] Failed:", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
