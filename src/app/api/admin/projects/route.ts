import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { createProjectSchema, updateProjectSchema } from "@/lib/validations";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** GET /api/admin/projects — list all projects with client info */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  try {
    const projects = await prisma.project.findMany({
      include: {
        client: { select: { id: true, name: true, email: true, company: true } },
        milestones: { orderBy: { order: "asc" } },
        payments: { orderBy: { percent: "asc" } },
        documents: true,
        _count: { select: { supportTickets: true, feedback: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ projects });
  } catch (err) {
    console.error("[projects] Fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

/** POST /api/admin/projects — create a new project */
export async function POST(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = createProjectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { name, description, clientId, status, startDate, endDate, totalValue } = parsed.data;

  // Verify client exists
  const client = await prisma.user.findUnique({ where: { id: clientId } });
  if (!client || client.role !== "CLIENT") {
    return NextResponse.json({ error: "Invalid client" }, { status: 400 });
  }

  try {
    const project = await prisma.project.create({
      data: {
        name,
        description,
        clientId,
        status: status || "DISCOVERY",
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
        totalValue: totalValue ?? null,
      },
      include: { client: { select: { id: true, name: true, email: true } } },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "CREATE",
        entity: "project",
        entityId: project.id,
        details: `Created project "${name}" for ${client.name}`,
      },
    }).catch(() => {});

    return NextResponse.json({ project }, { status: 201 });
  } catch (err) {
    console.error("[projects] Create failed:", err);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

/** PATCH /api/admin/projects — update a project (pass id in body) */
export async function PATCH(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { id, ...fields } = body as Record<string, unknown>;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Project id required" }, { status: 400 });
  }

  const parsed = updateProjectSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data: Record<string, unknown> = { ...parsed.data };
  if (data.startDate) data.startDate = new Date(data.startDate as string);
  if (data.endDate) data.endDate = new Date(data.endDate as string);

  try {
    const project = await prisma.project.update({
      where: { id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "UPDATE",
        entity: "project",
        entityId: project.id,
        details: `Updated project: ${JSON.stringify(Object.keys(parsed.data))}`,
      },
    }).catch(() => {});

    return NextResponse.json({ project });
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("Record to update not found") || message.includes("NotFound")) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    console.error("[projects] Update failed:", err);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}
