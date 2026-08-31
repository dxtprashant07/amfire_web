import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { requireAuth } from "@/services/auth/api-auth";
import { contentRegistry, type ContentKey } from "@/content/registry";

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

  // Registry-managed keys (home.hero, home.plans, ...) hold structured JSON
  // rendered directly on the live site — validate against their schema so a
  // malformed admin edit can't break a page. Legacy flat string keys
  // (hero_headline, stat_projects, ...) aren't registered and skip this.
  const registryEntry = contentRegistry[key as ContentKey];
  if (registryEntry) {
    let parsedValue: unknown;
    try {
      parsedValue = JSON.parse(value);
    } catch {
      return NextResponse.json({ error: "Value must be valid JSON for this key." }, { status: 400 });
    }
    const result = registryEntry.schema.safeParse(parsedValue);
    if (!result.success) {
      return NextResponse.json({ error: `Invalid content: ${result.error.issues[0]?.message ?? "schema mismatch"}` }, { status: 400 });
    }
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
