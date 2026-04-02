import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { prisma } from "@/lib/db";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** GET /api/admin/projects/[id] — get single project with all relations */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: { select: { id: true, name: true, email: true, company: true } },
        milestones: { orderBy: { order: "asc" } },
        payments: { orderBy: { percent: "asc" } },
        documents: { orderBy: { createdAt: "desc" } },
        _count: { select: { supportTickets: true, feedback: true } },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (err) {
    console.error("[projects] Fetch single failed:", err);
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}
