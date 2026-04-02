import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { updateUserSchema } from "@/lib/validations";

/** PATCH /api/admin/users/[id] — update a user */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(req, ["SUPER_ADMIN"]);
  if ("error" in auth) return auth.error;

  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = updateUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data: parsed.data,
      select: { id: true, email: true, name: true, role: true, active: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "UPDATE",
        entity: "user",
        entityId: id,
        details: `Updated user: ${JSON.stringify(Object.keys(parsed.data))}`,
      },
    }).catch(() => {});

    return NextResponse.json({ user });
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("Record to update not found") || message.includes("NotFound")) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    console.error("[users] Update failed:", err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
