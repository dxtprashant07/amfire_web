import { z } from "zod";
import type { ZodType } from "zod";
import { textDefaults } from "./text-defaults";

interface RegistryEntry {
  label: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ZodType<any>;
  default: unknown;
}

// Single source of truth for every CMS-editable content block: its validation
// shape and the fallback the site renders if the DB row is missing or fails
// validation. The admin content editor and the content readers both key off
// this map.
export const contentRegistry = {
  "site.text": {
    label: "Page text",
    description: "Every heading, paragraph, label, and image URL on the marketing site.",
    schema: z.record(z.string(), z.string()),
    default: textDefaults,
  },
} satisfies Record<string, RegistryEntry>;

export type ContentKey = keyof typeof contentRegistry;
