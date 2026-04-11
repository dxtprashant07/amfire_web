/**
 * Pricing tiers data.
 * Edit this file to update pricing on the homepage.
 */

export interface PricingPlan {
  tier: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export const pricingPlans: PricingPlan[] = [
  {
    tier: "Starter",
    price: "Under ₹1L",
    desc: "Landing pages, portfolios, simple automation scripts, and MVP prototypes.",
    features: ["1–2 week delivery", "1 revision round", "Basic SEO setup", "Deployment included"],
    cta: "Get a Quote",
    highlight: false,
  },
  {
    tier: "Growth",
    price: "₹1L – ₹3L",
    desc: "Full-featured web apps, mobile apps, or AI integrations for early-stage startups.",
    features: ["3–6 week delivery", "2 revision rounds", "Analytics integration", "3 months post-launch support"],
    cta: "Get a Quote",
    highlight: false,
  },
  {
    tier: "Scale",
    price: "₹3L – ₹10L",
    desc: "Complex SaaS platforms, multi-role apps, and production AI agents.",
    features: ["6–12 week delivery", "Unlimited revisions", "Full QA & testing", "6 months post-launch support"],
    cta: "Get a Quote",
    highlight: true,
  },
  {
    tier: "Enterprise",
    price: "₹10L+",
    desc: "End-to-end digital transformation, multi-product builds, and ongoing retainers.",
    features: ["Custom timeline", "Dedicated team", "DevOps & infra", "12 months support"],
    cta: "Let's Talk",
    highlight: false,
  },
];
