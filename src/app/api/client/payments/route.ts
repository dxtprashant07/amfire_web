import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  try {
    const payments = await prisma.payment.findMany({
      where: { project: { clientId: auth.payload.sub } },
      include: { project: { select: { name: true } } },
      orderBy: { createdAt: "asc" },
    });

    const safe = payments.map((p) => ({
      ...p,
      amount: p.amount?.toString() ?? "0",
    }));

    return NextResponse.json({ payments: safe });
  } catch (err) {
    console.error("[client/payments] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch payments." }, { status: 500 });
  }
}
