import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";
import { supportTicketSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  try {
    const tickets = await prisma.supportTicket.findMany({
      where: { userId: auth.payload.sub },
      include: { project: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ tickets });
  } catch (err) {
    console.error("[client/support] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch tickets." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = supportTicketSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  try {
    const project = await prisma.project.findFirst({
      where: { id: parsed.data.projectId, clientId: auth.payload.sub },
    });
    if (!project) {
      return NextResponse.json({ error: "Project not found." }, { status: 404 });
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        projectId: parsed.data.projectId,
        userId: auth.payload.sub,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });

    return NextResponse.json({ ticket }, { status: 201 });
  } catch (err) {
    console.error("[client/support] POST error:", err);
    return NextResponse.json({ error: "Failed to create ticket." }, { status: 500 });
  }
}
