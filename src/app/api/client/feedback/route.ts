import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { requireAuth } from "@/services/auth/api-auth";
import { feedbackSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  try {
    const feedback = await prisma.feedback.findMany({
      where: { userId: auth.payload.sub },
      include: { project: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ feedback });
  } catch (err) {
    console.error("[client/feedback] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch feedback." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = feedbackSchema.safeParse(body);
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

    const entry = await prisma.feedback.create({
      data: {
        projectId: parsed.data.projectId,
        userId: auth.payload.sub,
        rating: parsed.data.rating,
        comment: parsed.data.comment,
      },
    });

    return NextResponse.json({ feedback: entry }, { status: 201 });
  } catch (err) {
    console.error("[client/feedback] POST error:", err);
    return NextResponse.json({ error: "Failed to create feedback." }, { status: 500 });
  }
}
