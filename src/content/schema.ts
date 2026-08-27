import { z } from "zod";
import { iconNames } from "./icon-map";

const iconField = z.enum(iconNames as [string, ...string[]]);

export const heroContentSchema = z.object({
  eyebrow: z.string().min(1),
  headline: z.string().min(1),
  headlineAccent: z.string().min(1),
  headlineSuffix: z.string().min(1),
  proof: z.array(z.object({ value: z.string(), label: z.string() })).min(1),
});

export const iconCardsSchema = z.array(
  z.object({ icon: iconField, title: z.string().min(1), text: z.string().min(1) })
).min(1);

export const workSchema = z.array(
  z.object({
    tag: z.string().min(1),
    title: z.string().min(1),
    text: z.string().min(1),
    metric: z.string().min(1),
  })
).min(1);

export const plansSchema = z.array(
  z.object({
    name: z.string().min(1),
    price: z.string().min(1),
    desc: z.string().min(1),
    features: z.array(z.string().min(1)).min(1),
    popular: z.boolean().optional(),
  })
).min(1);

export const processSchema = z.array(
  z.object({
    icon: z.string().min(1), // image URL, not a lucide icon
    step: z.string().min(1),
    title: z.string().min(1),
    text: z.string().min(1),
    dur: z.string().min(1),
  })
).min(1);

export const productsSchema = z.array(
  z.object({
    icon: iconField,
    iconBg: z.string().min(1),
    iconColor: z.string().min(1),
    accent: z.string().min(1),
    name: z.string().min(1),
    text: z.string().min(1),
    featured: z.boolean().optional(),
  })
).min(1);

export const testimonialsSchema = z.array(
  z.object({
    quote: z.string().min(1),
    name: z.string().min(1),
    role: z.string().min(1),
    stars: z.number().int().min(1).max(5),
  })
).min(1);

export type HeroContent = z.infer<typeof heroContentSchema>;
export type IconCards = z.infer<typeof iconCardsSchema>;
export type WorkItems = z.infer<typeof workSchema>;
export type Plans = z.infer<typeof plansSchema>;
export type ProcessSteps = z.infer<typeof processSchema>;
export type Products = z.infer<typeof productsSchema>;
export type Testimonials = z.infer<typeof testimonialsSchema>;
