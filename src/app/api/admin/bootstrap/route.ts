import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/db/client";

/**
 * One-time bootstrap endpoint to create the initial SUPER_ADMIN user.
 *
 * Call with header: `x-bootstrap-secret: <BOOTSTRAP_SECRET env var>`
 *
 * Refuses to run if any user already exists in the database — prevents
 * accidental re-seeding or takeover of a live system.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.BOOTSTRAP_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "BOOTSTRAP_SECRET is not configured on the server." },
      { status: 500 }
    );
  }

  const provided = req.headers.get("x-bootstrap-secret");
  if (provided !== secret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const userCount = await prisma.user.count();
  if (userCount > 0) {
    return NextResponse.json(
      { error: "Bootstrap refused: users already exist." },
      { status: 409 }
    );
  }

  const email = process.env.SEED_ADMIN_EMAIL || "admin@amfire.in";
  const password = process.env.SEED_ADMIN_PASSWORD || "Admin@1234";
  const name = process.env.SEED_ADMIN_NAME || "amfire Admin";

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: "SUPER_ADMIN",
    },
    select: { id: true, email: true, name: true, role: true },
  });

  return NextResponse.json({
    message: "Admin user created. Change the password immediately after first login.",
    user,
  });
}
