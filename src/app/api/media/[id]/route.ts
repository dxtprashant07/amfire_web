import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";

/**
 * Serves an admin-uploaded image. Public by design — these are the pictures on
 * the marketing site. Rows are immutable (a replacement is a new upload with a
 * new id), so the response can be cached hard.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let media;
  try {
    media = await prisma.media.findUnique({
      where: { id },
      select: { data: true, mimeType: true, filename: true },
    });
  } catch (err) {
    console.error("[media] Read failed:", err);
    return new NextResponse("Not found", { status: 404 });
  }

  if (!media) return new NextResponse("Not found", { status: 404 });

  const body = new Uint8Array(media.data);

  return new NextResponse(body, {
    headers: {
      // mimeType was sniffed from the bytes at upload time, not taken from the
      // client; nosniff keeps the browser from second-guessing it.
      "Content-Type": media.mimeType,
      "Content-Length": String(body.byteLength),
      "X-Content-Type-Options": "nosniff",
      "Content-Disposition": `inline; filename="${media.filename.replace(/"/g, "")}"`,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
