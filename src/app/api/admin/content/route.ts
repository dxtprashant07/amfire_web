import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["SUPER_ADMIN", "ADMIN"]);
  if ("error" in auth) return auth.error;

  try {
    const content = await prisma.siteContent.findMany({ orderBy: { key: "asc" } });
    return NextResponse.json({ content });
  } catch (err) {
    console.error("[content] Fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const auth = await requireAuth(req, ["SUPER_ADMIN", "ADMIN"]);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { key, value } = body as { key?: string; value?: string };
  if (!key || typeof value !== "string") {
    return NextResponse.json({ error: "Key and value required." }, { status: 400 });
  }

  try {
    const entry = await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "UPDATE_CONTENT",
        entity: "site_content",
        entityId: key,
        details: `Updated "${key}"`,
      },
    }).catch(() => {});

    return NextResponse.json({ entry });
  } catch (err) {
    console.error("[content] Upsert failed:", err);
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
  }
}
