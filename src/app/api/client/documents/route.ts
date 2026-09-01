import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { requireAuth } from "@/services/auth/api-auth";
import { devMockEnabled, devMockDocuments } from "@/services/auth/dev-mock";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  if (devMockEnabled) return NextResponse.json({ documents: devMockDocuments });

  try {
    const documents = await prisma.document.findMany({
      where: { project: { clientId: auth.payload.sub } },
      include: { project: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ documents });
  } catch (err) {
    console.error("[client/documents] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch documents." }, { status: 500 });
  }
}
