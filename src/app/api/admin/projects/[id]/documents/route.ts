import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { createDocumentSchema } from "@/lib/validations";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** POST — add document to project */
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

  const parsed = createDocumentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const doc = await prisma.document.create({
      data: {
        projectId,
        name: parsed.data.name,
        type: parsed.data.type,
        url: parsed.data.url,
        size: parsed.data.size ?? null,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "CREATE",
        entity: "document",
        entityId: doc.id,
        details: `Added document "${parsed.data.name}" to project ${projectId}`,
      },
    }).catch(() => {});

    return NextResponse.json({ document: doc }, { status: 201 });
  } catch (err) {
    console.error("[documents] Create failed:", err);
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 });
  }
}

/** DELETE — remove a document (pass documentId in body) */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  await params;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { documentId } = body as { documentId?: string };
  if (!documentId) return NextResponse.json({ error: "documentId required" }, { status: 400 });

  try {
    await prisma.document.delete({ where: { id: documentId } });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "DELETE",
        entity: "document",
        entityId: documentId,
        details: `Deleted document ${documentId}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("Record to delete does not exist") || message.includes("NotFound")) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }
    console.error("[documents] Delete failed:", err);
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 });
  }
}
