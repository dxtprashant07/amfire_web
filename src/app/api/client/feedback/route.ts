import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";
import { feedbackSchema } from "@/lib/validations";

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ["CLIENT"]);
  if ("error" in auth) return auth.error;

  const feedback = await prisma.feedback.findMany({
    where: { userId: auth.payload.sub },
    include: { project: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ feedback });
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

  // Verify project belongs to this client
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
}
