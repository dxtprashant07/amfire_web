import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { changePasswordSchema } from "@/lib/validations";

/** PATCH /api/auth/password — change own password */
export async function PATCH(req: NextRequest) {
  const auth = await requireAuth(req);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: auth.payload.sub } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }

  try {
    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12);
    await prisma.user.update({
      where: { id: auth.payload.sub },
      data: { passwordHash },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "PASSWORD_CHANGE",
        entity: "user",
        entityId: auth.payload.sub,
        ip: req.headers.get("x-forwarded-for") ?? "unknown",
      },
    }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[password] Change failed:", err);
    return NextResponse.json({ error: "Failed to change password" }, { status: 500 });
  }
}
