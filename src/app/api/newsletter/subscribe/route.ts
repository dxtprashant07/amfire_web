import { NextRequest, NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/validations";
import { prisma } from "@/lib/db";

/* ── Simple in-memory rate limiter ─────────────────────────────────── */
const rateLimit = new Map<string, { count: number; reset: number }>();
const LIMIT = 3;
const WINDOW_MS = 60_000;

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

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 422 });
  }

  const email = parsed.data.email.trim().toLowerCase();
  const source = parsed.data.source || "footer";

  try {
    await prisma.subscriber.upsert({
      where: { email },
      update: { active: true, source },
      create: { email, source },
    });
  } catch (err) {
    console.error("[newsletter] DB save failed:", err);
    // Don't fail — log and continue
  }

  console.log("[newsletter] new subscriber:", { email, source, ip });

  return NextResponse.json({ ok: true }, { status: 200 });
}
