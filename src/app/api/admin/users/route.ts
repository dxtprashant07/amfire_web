import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";
import { createUserSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "@/lib/email";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** GET /api/admin/users — list all users */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        company: true,
        phone: true,
        active: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (err) {
    console.error("[users] Fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

/** POST /api/admin/users — create a new user */
export async function POST(req: NextRequest) {
  const auth = await requireAuth(req, ["SUPER_ADMIN"]);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { email, password, name, role, company, phone } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const [user] = await prisma.$transaction([
      prisma.user.create({
        data: { email, passwordHash, name, role, company, phone },
        select: { id: true, email: true, name: true, role: true },
      }),
      // Audit log placeholder — entityId set after
    ].filter(Boolean));

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "CREATE",
        entity: "user",
        entityId: user.id,
        details: `Created ${role} user: ${email}`,
      },
    }).catch(() => {});

    // Send welcome email with credentials (fire-and-forget)
    sendWelcomeEmail({ to: email, name, email, password, role }).catch((err) =>
      console.error("Failed to send welcome email:", err)
    );

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("[users] Create failed:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
