import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/services/auth/api-auth";
import { prisma } from "@/db/client";
import { createPaymentSchema, updatePaymentSchema } from "@/lib/validations";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** POST — add payment milestone to project */
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

  const parsed = createPaymentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const payment = await prisma.payment.create({
      data: {
        projectId,
        label: parsed.data.label,
        amount: parsed.data.amount,
        percent: parsed.data.percent,
        status: parsed.data.status || "PENDING",
        dueDate: parsed.data.dueDate ? new Date(parsed.data.dueDate) : null,
        invoiceUrl: parsed.data.invoiceUrl,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "CREATE",
        entity: "payment",
        entityId: payment.id,
        details: `Added payment "${parsed.data.label}" (${parsed.data.percent}%) to project ${projectId}`,
      },
    }).catch(() => {});

    return NextResponse.json({ payment: { ...payment, amount: payment.amount?.toString() ?? "0" } }, { status: 201 });
  } catch (err) {
    console.error("[payments] Create failed:", err);
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
  }
}

/** PATCH — update a payment (pass paymentId in body) */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  await params;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { paymentId, ...fields } = body as Record<string, unknown>;
  if (!paymentId) return NextResponse.json({ error: "paymentId required" }, { status: 400 });

  const parsed = updatePaymentSchema.safeParse(fields);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data: Record<string, unknown> = { ...parsed.data };
  if (data.dueDate) data.dueDate = new Date(data.dueDate as string);
  if (data.paidDate) data.paidDate = new Date(data.paidDate as string);
  if (data.status === "PAID" && !data.paidDate) {
    data.paidDate = new Date();
  }

  try {
    const payment = await prisma.payment.update({
      where: { id: paymentId as string },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "UPDATE",
        entity: "payment",
        entityId: paymentId as string,
        details: `Updated payment: ${JSON.stringify(Object.keys(parsed.data))}`,
      },
    }).catch(() => {});

    return NextResponse.json({ payment: { ...payment, amount: payment.amount?.toString() ?? "0" } });
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("Record to update not found") || message.includes("NotFound")) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }
    console.error("[payments] Update failed:", err);
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 });
  }
}

/** DELETE — remove a payment (pass paymentId in body) */
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  const { id: projectId } = await params;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { paymentId } = body as Record<string, unknown>;
  if (!paymentId || typeof paymentId !== "string") {
    return NextResponse.json({ error: "paymentId required" }, { status: 400 });
  }

  try {
    const existing = await prisma.payment.findUnique({
      where: { id: paymentId },
      select: { id: true, projectId: true, label: true },
    });
    if (!existing || existing.projectId !== projectId) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    await prisma.payment.delete({ where: { id: paymentId } });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "DELETE",
        entity: "payment",
        entityId: paymentId,
        details: `Deleted payment "${existing.label}" from project ${projectId}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[payments] Delete failed:", err);
    return NextResponse.json({ error: "Failed to delete payment" }, { status: 500 });
  }
}
