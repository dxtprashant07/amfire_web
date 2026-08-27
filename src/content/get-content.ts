import { prisma } from "@/db/client";
import { contentRegistry, type ContentKey } from "./registry";

/**
 * Reads a CMS-editable content block for the given key. Falls back to the
 * registry's default value whenever the DB is unreachable (e.g. DATABASE_URL
 * not configured yet), the row doesn't exist, or its JSON fails schema
 * validation — the site must never break because of a missing/bad edit.
 */
export async function getContent<K extends ContentKey>(
  key: K
): Promise<(typeof contentRegistry)[K]["default"]> {
  const entry = contentRegistry[key];

  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });
    if (!row) return entry.default;

    const parsed = entry.schema.safeParse(JSON.parse(row.value));
    return parsed.success ? parsed.data : entry.default;
  } catch {
    return entry.default;
  }
}
