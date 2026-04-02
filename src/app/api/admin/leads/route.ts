import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { updateLeadSchema } from "@/lib/validations";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** GET /api/admin/leads — list all leads */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ leads });
  } catch (err) {
    console.error("[leads] Fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

/** PATCH /api/admin/leads — update lead status, notes, assignedTo, followUpDate */
export async function PATCH(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { id, ...fields } = body as Record<string, unknown>;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Lead id required" }, { status: 400 });
  }

  const parsed = updateLeadSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (parsed.data.status) data.status = parsed.data.status;
  if (parsed.data.notes !== undefined) data.notes = parsed.data.notes;
  if (parsed.data.assignedTo !== undefined) data.assignedTo = parsed.data.assignedTo;
  if (parsed.data.followUpDate) data.followUpDate = new Date(parsed.data.followUpDate);
  else if (parsed.data.followUpDate === null) data.followUpDate = null;

  try {
    const lead = await prisma.lead.update({ where: { id }, data });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "UPDATE",
        entity: "lead",
        entityId: lead.id,
        details: `Updated lead: ${JSON.stringify(Object.keys(data))}`,
      },
    }).catch(() => {});

    return NextResponse.json({ lead });
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("Record to update not found") || message.includes("NotFound")) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    console.error("[leads] Update failed:", err);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
