import type { ZodType } from "zod";
import {
  heroContentSchema,
  iconCardsSchema,
  workSchema,
  plansSchema,
  processSchema,
  productsSchema,
  testimonialsSchema,
} from "./schema";
import {
  heroDefault,
  heroPillarsDefault,
  heroStripDefault,
  workDefault,
  plansDefault,
  processDefault,
  productsDefault,
  paymentTrustDefault,
} from "./defaults";
import { testimonials as testimonialsDefault } from "@/config/home";

interface RegistryEntry {
  label: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: ZodType<any>;
  default: unknown;
}

// Single source of truth for every CMS-editable content block: what page it
// lives on, its validation shape, and the fallback value the site renders
// if the DB row is missing or fails validation. The admin content editor
// and the getContent() reader both key off this map.
export const contentRegistry = {
  "home.hero": {
    label: "Homepage — Hero",
    description: "Eyebrow badge, headline, and the 3 proof stats.",
    schema: heroContentSchema,
    default: heroDefault,
  },
  "home.heroPillars": {
    label: "Homepage — Hero pillars",
    description: "The 3 cards under the headline (Built for speed / clarity / impact).",
    schema: iconCardsSchema,
    default: heroPillarsDefault,
  },
  "home.heroStrip": {
    label: "Homepage — Trust strip",
    description: "The 4-item row (AI-Powered / End-to-End / Always On / Secure & Reliable).",
    schema: iconCardsSchema,
    default: heroStripDefault,
  },
  "home.work": {
    label: "Homepage — Selected work",
    description: "The 3 case-study cards.",
    schema: workSchema,
    default: workDefault,
  },
  "home.plans": {
    label: "Pricing plans",
    description: "The 4 pricing tiers shown on the homepage and /pricing.",
    schema: plansSchema,
    default: plansDefault,
  },
  "home.process": {
    label: "Homepage — Process steps",
    description: "The 7-step delivery pipeline.",
    schema: processSchema,
    default: processDefault,
  },
  "home.products": {
    label: "Homepage — Products",
    description: "The 3 product teaser cards.",
    schema: productsSchema,
    default: productsDefault,
  },
  "home.paymentTrust": {
    label: "Pricing — Trust row",
    description: "The 4 small trust badges under the pricing cards.",
    schema: iconCardsSchema,
    default: paymentTrustDefault,
  },
  "home.testimonials": {
    label: "Testimonials",
    description: "Client quotes shown in the testimonials carousel.",
    schema: testimonialsSchema,
    default: testimonialsDefault,
  },
} satisfies Record<string, RegistryEntry>;

export type ContentKey = keyof typeof contentRegistry;
