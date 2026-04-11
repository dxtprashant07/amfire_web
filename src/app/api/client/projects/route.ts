import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { requireAuth } from "@/services/auth/api-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  try {
    const projects = await prisma.project.findMany({
      where: { clientId: auth.payload.sub },
      include: {
        milestones: { orderBy: { order: "asc" } },
        payments: { orderBy: { percent: "asc" } },
      },
      orderBy: { createdAt: "desc" },
    });

    const safe = projects.map((p) => ({
      ...p,
      totalValue: p.totalValue?.toString() ?? "0",
      payments: p.payments.map((pay) => ({
        ...pay,
        amount: pay.amount?.toString() ?? "0",
      })),
    }));

    return NextResponse.json({ projects: safe });
  } catch (err) {
    console.error("[client/projects] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch projects." }, { status: 500 });
  }
}
