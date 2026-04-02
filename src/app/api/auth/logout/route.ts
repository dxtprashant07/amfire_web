import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import { clearRefreshCookie, getRefreshCookie, verifyRefreshToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const token = await getRefreshCookie();

  if (token) {
    const hash = crypto.createHash("sha256").update(token).digest("hex");

    // Delete session and audit the logout
    const payload = await verifyRefreshToken(token);
    const userId = payload?.sub;

    await prisma.session.deleteMany({ where: { refreshToken: hash } }).catch((err) => {
      console.error("[logout] Session deletion failed:", err);
    });

    if (userId) {
      await prisma.auditLog.create({
        data: {
          userId,
          action: "LOGOUT",
          entity: "user",
          entityId: userId,
          ip: req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown",
        },
      }).catch(() => {});
    }
  }

  await clearRefreshCookie();

  return NextResponse.json({ ok: true });
}
