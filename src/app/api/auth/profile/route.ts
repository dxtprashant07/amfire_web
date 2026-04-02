import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { updateProfileSchema } from "@/lib/validations";

/** PATCH /api/auth/profile — update own profile */
export async function PATCH(req: NextRequest) {
  const auth = await requireAuth(req);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = updateProfileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id: auth.payload.sub },
      data: parsed.data,
      select: { id: true, name: true, email: true, role: true, company: true, phone: true },
    });
    return NextResponse.json({ user });
  } catch (err) {
    console.error("[profile] Update failed:", err);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
