import type { ContentKey } from "./registry";

export type FieldSpec =
  | { key: string; label: string; type: "text" }
  | { key: string; label: string; type: "textarea" }
  | { key: string; label: string; type: "icon" }
  | { key: string; label: string; type: "color" }
  | { key: string; label: string; type: "boolean" }
  | { key: string; label: string; type: "number" }
  | { key: string; label: string; type: "stringList" };

const iconCardFields: FieldSpec[] = [
  { key: "icon", label: "Icon", type: "icon" },
  { key: "title", label: "Title", type: "text" },
  { key: "text", label: "Description", type: "textarea" },
];

// Row field layout for every array-shaped ("list") registry section. Kept
// as an explicit table rather than derived from the zod schema at runtime —
// small and far more robust than introspecting zod internals.
export const listFieldSpecs: Partial<Record<ContentKey, FieldSpec[]>> = {
  "home.heroPillars": iconCardFields,
  "home.heroStrip": iconCardFields,
  "home.paymentTrust": iconCardFields,
  "home.work": [
    { key: "tag", label: "Tag", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "text", label: "Description", type: "textarea" },
    { key: "metric", label: "Metric", type: "text" },
  ],
  "home.plans": [
    { key: "name", label: "Plan name", type: "text" },
    { key: "price", label: "Price", type: "text" },
    { key: "desc", label: "Description", type: "textarea" },
    { key: "features", label: "Features (one per line)", type: "stringList" },
    { key: "popular", label: "Mark as “Most popular”", type: "boolean" },
  ],
  "home.process": [
    { key: "icon", label: "Icon image URL", type: "text" },
    { key: "step", label: "Step number", type: "text" },
    { key: "title", label: "Title", type: "text" },
    { key: "text", label: "Description", type: "textarea" },
    { key: "dur", label: "Duration", type: "text" },
  ],
  "home.products": [
    { key: "icon", label: "Icon", type: "icon" },
    { key: "iconBg", label: "Icon background color", type: "color" },
    { key: "iconColor", label: "Icon color", type: "color" },
    { key: "accent", label: "Accent color", type: "color" },
    { key: "name", label: "Product name", type: "text" },
    { key: "text", label: "Description", type: "textarea" },
    { key: "featured", label: "Featured", type: "boolean" },
  ],
  "home.testimonials": [
    { key: "quote", label: "Quote", type: "textarea" },
    { key: "name", label: "Name", type: "text" },
    { key: "role", label: "Role / Company", type: "text" },
    { key: "stars", label: "Stars (1-5)", type: "number" },
  ],
};

// "home.hero" is a single object (not a list) with a fixed-length nested
// proof array, so it gets a bespoke small form instead of the list editor.
export const heroFieldSpecs: FieldSpec[] = [
  { key: "eyebrow", label: "Eyebrow badge", type: "text" },
  { key: "headline", label: "Headline (before accent)", type: "text" },
  { key: "headlineAccent", label: "Headline accent (gradient word)", type: "text" },
  { key: "headlineSuffix", label: "Headline (after accent)", type: "text" },
];
