import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { loginSchema } from "@/lib/validations";
import {
  createAccessToken,
  createRefreshToken,
  setRefreshCookie,
  MAX_FAILED_ATTEMPTS,
  LOCKOUT_DURATION_MS,
} from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.active) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  // Check lockout
  if (user.lockedUntil && user.lockedUntil > new Date()) {
    const minutesLeft = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
    return NextResponse.json(
      { error: `Account locked. Try again in ${minutesLeft} minute(s).` },
      { status: 429 }
    );
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    const attempts = user.failedAttempts + 1;
    const update: { failedAttempts: number; lockedUntil?: Date | null } = {
      failedAttempts: attempts,
    };
    if (attempts >= MAX_FAILED_ATTEMPTS) {
      update.lockedUntil = new Date(Date.now() + LOCKOUT_DURATION_MS);
    }
    await prisma.user.update({ where: { id: user.id }, data: update });
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const payload = { sub: user.id, email: user.email, role: user.role, name: user.name };
  const accessToken = await createAccessToken(payload);
  const refreshToken = await createRefreshToken(payload);
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";

  // Atomic: reset attempts + create session + audit log
  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: { failedAttempts: 0, lockedUntil: null },
      }),
      prisma.session.create({
        data: {
          userId: user.id,
          refreshToken: crypto.createHash("sha256").update(refreshToken).digest("hex"),
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "LOGIN",
          entity: "user",
          entityId: user.id,
          ip,
        },
      }),
    ]);
  } catch (err) {
    console.error("[login] Transaction failed:", err);
    return NextResponse.json({ error: "Login failed, please try again." }, { status: 500 });
  }

  await setRefreshCookie(refreshToken);

  return NextResponse.json({
    accessToken,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
}
