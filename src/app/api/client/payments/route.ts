import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  const payments = await prisma.payment.findMany({
    where: { project: { clientId: auth.payload.sub } },
    include: { project: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ payments });
}
