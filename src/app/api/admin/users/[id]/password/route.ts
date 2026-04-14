import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/services/auth/api-auth";
import { prisma } from "@/db/client";
import { passwordSchema } from "@/lib/validations";
import { z } from "zod";
import bcrypt from "bcryptjs";

const resetPasswordSchema = z.object({
  password: passwordSchema,
});

/** POST /api/admin/users/[id]/password — reset a user's password (SUPER_ADMIN only) */
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(req, ["SUPER_ADMIN"]);
  if ("error" in auth) return auth.error;

  const { id } = await params;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, role: true },
  });
  if (!existing) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Block resetting another SUPER_ADMIN's password — prevents privilege takeover
  if (existing.role === "SUPER_ADMIN" && existing.id !== auth.payload.sub) {
    return NextResponse.json(
      { error: "Cannot reset another SUPER_ADMIN's password" },
      { status: 403 }
    );
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: { passwordHash, failedAttempts: 0, lockedUntil: null },
      }),
      // Revoke all existing sessions so the user must log in again with the new password
      prisma.session.deleteMany({ where: { userId: id } }),
    ]);

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "UPDATE",
        entity: "user",
        entityId: id,
        details: `Reset password for ${existing.email}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[users/password] Reset failed:", err);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
