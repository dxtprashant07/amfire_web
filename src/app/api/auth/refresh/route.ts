import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";
import {
  verifyRefreshToken,
  createAccessToken,
  createRefreshToken,
  setRefreshCookie,
  getRefreshCookie,
} from "@/lib/auth";

export async function POST() {
  const token = await getRefreshCookie();
  if (!token) {
    return NextResponse.json({ error: "No refresh token." }, { status: 401 });
  }

  const payload = await verifyRefreshToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid refresh token." }, { status: 401 });
  }

  // Verify token exists in DB (not revoked)
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  const session = await prisma.session.findUnique({ where: { refreshToken: hash } });
  if (!session || session.expiresAt < new Date()) {
    return NextResponse.json({ error: "Session expired." }, { status: 401 });
  }

  // Fetch latest user data
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || !user.active) {
    return NextResponse.json({ error: "Account disabled." }, { status: 401 });
  }

  const newPayload = { sub: user.id, email: user.email, role: user.role, name: user.name };
  const newAccessToken = await createAccessToken(newPayload);
  const newRefreshToken = await createRefreshToken(newPayload);

  // Rotate refresh token
  const newHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");
  await prisma.session.update({
    where: { id: session.id },
    data: { refreshToken: newHash, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
  });

  await setRefreshCookie(newRefreshToken);

  return NextResponse.json({
    accessToken: newAccessToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}
