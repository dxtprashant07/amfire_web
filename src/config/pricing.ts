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
    price: "₹20,000",
    desc: "Chatbot, CRM lead pipeline, and a small fleet of AI agents to kickstart automation.",
    features: [
      "19-day delivery",
      "WhatsApp / website chatbot",
      "5 custom AI agents",
      "5 workflow automations",
      "CRM setup + training call",
      "30-day free support",
    ],
    cta: "Get a Quote",
    highlight: false,
  },
  {
    tier: "Growth",
    price: "₹50,000",
    desc: "Everything in Starter, plus a live AI-enabled SaaS site and a 7–10 agent AI employee.",
    features: [
      "35-day delivery",
      "Live AI-enabled SaaS website",
      "10 custom automation workflows",
      "7–10 AI employee agents",
      "Performance dashboard",
      "Advanced CRM setup",
      "60-day free support",
    ],
    cta: "Get a Quote",
    highlight: false,
  },
  {
    tier: "Scale",
    price: "₹75,000",
    desc: "Everything in Starter + Growth, with an AI voice receptionist and predictive analytics.",
    features: [
      "51-day delivery",
      "15 custom automation workflows",
      "AI-enhanced advanced CRM & workflows",
      "AI virtual receptionist & voice agent",
      "Advanced analytics & predictive tools",
      "60-day free premium support",
    ],
    cta: "Get a Quote",
    highlight: true,
  },
  {
    tier: "Enterprise",
    price: "₹1,00,000+",
    desc: "Multi-lingual generative SaaS platform, 15–25 AI agents, and a dedicated AI account manager.",
    features: [
      "Custom timeline — fully bespoke",
      "Multi-lingual SaaS with generative content",
      "15+ AI agents (up to ~25 total)",
      "20+ workflow automations",
      "Generative Ad & Content Studio",
      "AI virtual receptionist (calls + scheduling)",
      "Predictive analytics dashboard",
      "90-day premium support + dedicated AI account manager",
    ],
    cta: "Let's Talk",
    highlight: false,
  },
];
