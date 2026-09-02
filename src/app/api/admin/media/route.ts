import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { requireAuth } from "@/services/auth/api-auth";
import { sniffImageMime, readImageSize, IMAGE_EXTENSIONS } from "@/lib/image-type";

const ADMIN_ROLES = ["SUPER_ADMIN", "ADMIN"];

/** Postgres BYTEA is fine at this size; anything larger belongs in object storage. */
const MAX_BYTES = 5 * 1024 * 1024;

/** GET — list the media library (metadata only; bytes are served by /api/media/[id]). */
export async function GET(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, filename: true, mimeType: true, size: true, width: true, height: true, createdAt: true },
    });
    return NextResponse.json({
      media: media.map((m) => ({ ...m, url: `/api/media/${m.id}` })),
    });
  } catch (err) {
    console.error("[media] Fetch failed:", err);
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 });
  }
}

/** POST — upload one image as multipart/form-data under the field name "file". */
export async function POST(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected a multipart/form-data upload." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `Image is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 5 MB.` },
      { status: 413 }
    );
  }

  const bytes = new Uint8Array(await file.arrayBuffer());

  // The declared File.type comes from the browser and is not trusted; the
  // stored and served type is whatever the bytes actually are.
  const mimeType = sniffImageMime(bytes);
  if (!mimeType) {
    return NextResponse.json(
      { error: "Unsupported file. Upload a PNG, JPEG, WebP, GIF, or AVIF image." },
      { status: 415 }
    );
  }

  const size = readImageSize(bytes, mimeType);
  const base = (file.name || "image").replace(/\.[^.]+$/, "").replace(/[^\w.-]+/g, "-").slice(0, 60) || "image";

  try {
    const media = await prisma.media.create({
      data: {
        filename: `${base}.${IMAGE_EXTENSIONS[mimeType]}`,
        mimeType,
        size: file.size,
        width: size?.width ?? null,
        height: size?.height ?? null,
        data: Buffer.from(bytes),
        uploadedBy: auth.payload.sub,
      },
      select: { id: true, filename: true, mimeType: true, size: true, width: true, height: true, createdAt: true },
    });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "UPLOAD_MEDIA",
        entity: "media",
        entityId: media.id,
        details: `Uploaded "${media.filename}" (${Math.round(media.size / 1024)} KB)`,
      },
    }).catch(() => {});

    return NextResponse.json({ media: { ...media, url: `/api/media/${media.id}` } }, { status: 201 });
  } catch (err) {
    console.error("[media] Upload failed:", err);
    return NextResponse.json({ error: "Failed to store image" }, { status: 500 });
  }
}

/** DELETE — remove an image from the library (pass mediaId in the body). */
export async function DELETE(req: NextRequest) {
  const auth = await requireAuth(req, ADMIN_ROLES);
  if ("error" in auth) return auth.error;

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { mediaId } = body as { mediaId?: string };
  if (!mediaId) return NextResponse.json({ error: "mediaId required" }, { status: 400 });

  try {
    await prisma.media.delete({ where: { id: mediaId } });

    await prisma.auditLog.create({
      data: {
        userId: auth.payload.sub,
        action: "DELETE",
        entity: "media",
        entityId: mediaId,
        details: `Deleted media ${mediaId}`,
      },
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = (err as Error).message || "";
    if (message.includes("Record to delete does not exist") || message.includes("NotFound")) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    console.error("[media] Delete failed:", err);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
