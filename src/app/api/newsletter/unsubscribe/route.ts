import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

/** POST /api/newsletter/unsubscribe — one-click unsubscribe */
export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const email = parsed.data.email.trim().toLowerCase();

  try {
    await prisma.subscriber.update({
      where: { email },
      data: { active: false },
    });
  } catch {
    // If subscriber doesn't exist, that's fine — they're already unsubscribed
  }

  return NextResponse.json({ ok: true });
}
