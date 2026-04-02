import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { createMilestoneSchema, updateMilestoneSchema } from "@/lib/validations";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** POST — add milestone to project */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  const { id: projectId } = await params;

  // Verify project exists
  const project = await prisma.project.findUnique({ where: { id: projectId }, select: { id: true } });
  if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = createMilestoneSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const milestone = await prisma.milestone.create({
      data: {
        projectId,
        title: parsed.data.title,
        description: parsed.data.description,
        order: parsed.data.order,
        status: parsed.data.status || "PENDING",
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
        notes: parsed.data.notes,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "CREATE",
        entity: "milestone",
        entityId: milestone.id,
        details: `Added milestone "${parsed.data.title}" to project ${projectId}`,
      },
    }).catch(() => {});

    return NextResponse.json({ milestone }, { status: 201 });
  } catch (err) {
    console.error("[milestones] Create failed:", err);
    return NextResponse.json({ error: "Failed to create milestone" }, { status: 500 });
  }
}

/** PATCH — update a milestone (pass milestoneId in body) */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  await params;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { milestoneId, ...fields } = body as Record<string, unknown>;
  if (!milestoneId) return NextResponse.json({ error: "milestoneId required" }, { status: 400 });

  const parsed = updateMilestoneSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data: Record<string, unknown> = { ...parsed.data };
  if (data.dueDate) data.dueDate = new Date(data.dueDate as string);
  if (data.completedAt) data.completedAt = new Date(data.completedAt as string);
  if (data.status === "COMPLETED" && !data.completedAt) {
    data.completedAt = new Date();
  }

  try {
    const milestone = await prisma.milestone.update({
      where: { id: milestoneId as string },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "UPDATE",
        entity: "milestone",
        entityId: milestoneId as string,
        details: `Updated milestone: ${JSON.stringify(Object.keys(parsed.data))}`,
      },
    }).catch(() => {});

    return NextResponse.json({ milestone });
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("Record to update not found") || message.includes("NotFound")) {
      return NextResponse.json({ error: "Milestone not found" }, { status: 404 });
    }
    console.error("[milestones] Update failed:", err);
    return NextResponse.json({ error: "Failed to update milestone" }, { status: 500 });
  }
}
