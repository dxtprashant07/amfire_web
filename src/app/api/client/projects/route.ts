import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  const projects = await prisma.project.findMany({
    where: { clientId: auth.payload.sub },
    include: {
      milestones: { orderBy: { order: "asc" } },
      payments: { orderBy: { percent: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ projects });
}
