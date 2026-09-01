import { prisma } from "@/db/client";
import { textDefaults } from "./text-defaults";

export type T = (id: string) => string;

/**
 * Returns the text lookup used by every marketing page. Reads the single
 * "site.text" row (a flat id -> string map of admin overrides) and layers it
 * over the generated defaults, so an unknown or unedited id still renders the
 * shipped copy instead of blowing up the page.
 */
export async function getText(): Promise<T> {
  let overrides: Record<string, string> = {};

  try {
    const row = await prisma.siteContent.findUnique({ where: { key: "site.text" } });
    if (row) {
      const parsed: unknown = JSON.parse(row.value);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
          if (typeof v === "string") overrides[k] = v;
        }
      }
    }
  } catch {
    overrides = {};
  }

  return (id: string) => overrides[id] ?? textDefaults[id] ?? "";
}
