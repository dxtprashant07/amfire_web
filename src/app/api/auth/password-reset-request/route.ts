import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { sendPasswordResetRequest } from "@/services/integrations/email";

/* ── Simple in-memory rate limiter (per IP, resets on server restart) ─ */
const rateLimit = new Map<string, { count: number; reset: number }>();
const LIMIT = 3;
const WINDOW_MS = 10 * 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

/**
 * Records a password-reset request and notifies the amfire team, who reset the
 * password and send new credentials. There is no self-serve reset token yet, so
 * this deliberately does not change any password by itself.
 *
 * Always answers 200 regardless of whether the address exists — the response
 * must not reveal which emails have accounts.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String((body as { email?: string }).email ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, name: true } });
    if (user) {
      await prisma.auditLog
        .create({
          data: {
            userId: user.id,
            action: "PASSWORD_RESET_REQUEST",
            entity: "users",
            entityId: user.id,
            details: `Password reset requested from ${ip}`,
          },
        })
        .catch(() => {});
      await sendPasswordResetRequest({ name: user.name, email }).catch((err) => {
        console.error("[password-reset] email failed:", err);
      });
    }
  } catch (err) {
    console.error("[password-reset] lookup failed:", err);
  }

  return NextResponse.json({ ok: true });
}
