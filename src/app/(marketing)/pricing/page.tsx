import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, X, Sprout, TrendingUp, Star, Crown,
  ShieldCheck, Zap, Lock, Headphones,
} from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { PricingFaq } from "@/components/pricing/PricingFaq";

const tierIcons = [Sprout, TrendingUp, Star, Crown];

const trustBadges = [
  { icon: ShieldCheck, title: "No long-term contracts", text: "Cancel anytime, no questions asked." },
  { icon: Zap, title: "Onboard in 48 hours", text: "Quick setup, fast results." },
  { icon: Lock, title: "Bank-level security", text: "Your data is encrypted and always protected." },
  { icon: Headphones, title: "Human support", text: "Talk to real people who actually care." },
  { icon: TrendingUp, title: "Built for scale", text: "Upgrade or downgrade as you grow." },
];

const paymentSteps = [
  { pct: "20%", img: "/amfire-design/pricing/kickoff.png", title: "Project kickoff", text: "We start by aligning on goals, scope, and success metrics." },
  { pct: "30%", img: "/amfire-design/pricing/staging.png", title: "Design + backend on staging", text: "You pay when the design is approved and backend is live on staging." },
  { pct: "25%", img: "/amfire-design/pricing/ai.png", title: "AI integration complete", text: "You pay when AI features are integrated and tested." },
  { pct: "25%", img: "/amfire-design/pricing/launch.png", title: "Production launch", text: "You pay when everything is live and ready for real users." },
];

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple fixed-price AI automation packages in INR — from ₹20K Starter to ₹1L+ Enterprise. Each tier ships with AI agents, workflow automations, CRM setup, and post-launch support.",
};

const tiers = [
  {
    name: "Starter",
    price: "₹20,000",
    tagline: "Chatbot, CRM automation, and 5 AI agents",
    description: "For small businesses ready to launch their first AI-assisted stack: a live chatbot, CRM lead pipeline, and a starter fleet of automations.",
    highlight: false,
    features: [
      { text: "19-day project delivery", included: true },
      { text: "WhatsApp / website chatbot", included: true },
      { text: "CRM setup & automation (lead pipeline)", included: true },
      { text: "5 custom AI agents (scoped to your business)", included: true },
      { text: "5 workflow automations", included: true },
      { text: "Training call included", included: true },
      { text: "30 days free support", included: true },
      { text: "Monthly Care Plan available (₹1,999/mo)", included: true },
      { text: "Full SaaS product build", included: false },
      { text: "AI voice receptionist", included: false },
    ],
    cta: "Get a Quote",
    note: "Monthly Care Plan kicks in after the 30-day free window",
  },
  {
    name: "Growth",
    price: "₹50,000",
    tagline: "Everything in Starter + a live AI-enabled SaaS site",
    description: "For startups ready to launch a production SaaS product with an AI employee running sales, support, and ops in the background.",
    highlight: false,
    features: [
      { text: "35-day project delivery", included: true },
      { text: "Everything in Starter", included: true },
      { text: "Live AI-enabled production SaaS website", included: true },
      { text: "10 custom automation workflows", included: true },
      { text: "AI employee: 7–10 custom agents", included: true },
      { text: "Performance dashboard", included: true },
      { text: "Advanced CRM setup", included: true },
      { text: "60 days free support", included: true },
      { text: "Monthly Care Plan available (₹1,999/mo)", included: true },
      { text: "AI voice receptionist", included: false },
    ],
    cta: "Get a Quote",
    note: "Typical fit: early-stage startups launching their first AI product",
  },
  {
    name: "Scale",
    price: "₹75,000",
    tagline: "Voice AI, predictive analytics, and deep CRM automation",
    description: "For growing companies scaling their AI operations — voice agents, advanced CRM, and predictive analytics for ROI and funnel forecasting.",
    highlight: true,
    features: [
      { text: "51-day project delivery", included: true },
      { text: "Everything in Starter + Growth", included: true },
      { text: "Live AI-enabled production SaaS website", included: true },
      { text: "15 custom automation workflows", included: true },
      { text: "AI-enhanced advanced CRM & workflows", included: true },
      { text: "AI virtual receptionist & voice agent", included: true },
      { text: "Advanced analytics & predictive tools", included: true },
      { text: "60 days free premium support", included: true },
      { text: "Monthly Care Plan available (₹1,999/mo)", included: true },
      { text: "Dedicated AI account manager", included: false },
    ],
    cta: "Get a Quote",
    note: "Typical fit: scaling startups, SaaS teams, growing service businesses",
  },
  {
    name: "Enterprise",
    price: "₹1,00,000+",
    tagline: "Multi-lingual AI SaaS, generative studio, and 25 agents",
    description: "For enterprises and funded startups needing a full AI operating system — multi-lingual generative SaaS, a generative ad studio, and a dedicated AI account manager.",
    highlight: false,
    features: [
      { text: "Custom timeline (fully bespoke)", included: true },
      { text: "All Growth + Scale features", included: true },
      { text: "Multi-lingual SaaS with generative content", included: true },
      { text: "15+ custom AI agents (up to ~25 total)", included: true },
      { text: "20+ workflow automations", included: true },
      { text: "Generative Ad & Content Studio (A/B testing)", included: true },
      { text: "AI virtual receptionist (calls + scheduling)", included: true },
      { text: "Predictive analytics: real-time ROI & funnel forecasts", included: true },
      { text: "90 days free premium support", included: true },
      { text: "Premium Care Plan: 24/7 + dedicated AI account manager", included: true },
    ],
    cta: "Let's Talk",
    note: "Fully customizable to your business — includes NDA, MSA, and custom contract terms",
  },
];

const paymentFaqs = [
  { q: "Do you offer payment plans?", a: "Yes — every tier is milestone-based. You pay in stages as work is delivered, never upfront in full." },
  { q: "What if the project goes over budget?", a: "Fixed-price guarantee — the quoted price is the price. Scope changes are quoted before any billing." },
  { q: "Who owns the code?", a: "You do. 100% of the IP transfers to you on final payment." },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20 text-center">
        <div className="amfire-wrap mx-auto max-w-3xl">
          <ScrollReveal>
            <span className="amfire-eyebrow">Pricing</span>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="mt-6 text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.1] tracking-[-0.03em] text-[var(--fg-default)]">
              Plans that grow as fast as <span className="gradient-text">you do.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-[1.7] text-[var(--fg-muted)]">
              Flexible AI solutions for every stage of your journey. Upgrade, scale, or customize — all without limits.
            </p>
          </ScrollReveal>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* Pricing Tiers */}
      <section className="py-4 md:py-8 pb-16 md:pb-20">
        <div className="amfire-wrap">
          {/* Orb connector row */}
          <div className="relative mb-8 hidden lg:grid grid-cols-4 items-end">
            <svg className="pointer-events-none absolute inset-x-0 top-6 h-6 w-full" viewBox="0 0 800 24" preserveAspectRatio="none" aria-hidden="true">
              <path
                d="M 100 12 C 200 12, 200 4, 300 4 S 400 20, 500 20, 600 4, 700 12"
                fill="none"
                stroke="url(#pricingLine)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="pricingLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="var(--color-orange)" />
                  <stop offset="100%" stopColor="var(--color-red)" />
                </linearGradient>
              </defs>
            </svg>
            {tiers.map((tier, i) => {
              const Icon = tierIcons[i];
              return (
                <div key={tier.name} className="relative z-10 flex flex-col items-center gap-2">
                  <span className="text-[13px] font-bold tracking-[0.1em] text-[var(--color-orange)]">0{i + 1}</span>
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-full border ${
                      tier.highlight
                        ? "border-[var(--color-orange)] bg-[var(--color-orange)] text-white shadow-[var(--shadow-glow)]"
                        : "border-[var(--border-accent)] bg-[var(--accent-tint)] text-[var(--color-orange)]"
                    }`}
                  >
                    <Icon size={22} />
                  </span>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.07}>
                <div className={`relative rounded-2xl border p-6 h-full flex flex-col transition-all duration-300 hover:shadow-xl ${tier.highlight ? "border-primary/50 bg-card shadow-lg shadow-primary/10" : "border-border bg-card hover:border-primary/25 hover:shadow-primary/5"}`}>
                  {tier.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1.5 rounded-full gradient-bg text-white text-xs font-semibold shadow-md">Most Popular</span>
                    </div>
                  )}

                  <div className="mb-5">
                    <p className="text-xs font-bold text-primary tracking-widest uppercase mb-2">{tier.name}</p>
                    <p className="text-2xl font-bold text-foreground mb-1">{tier.price}</p>
                    <p className="text-xs text-muted-foreground leading-snug">{tier.tagline}</p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-5 pb-5 border-b border-border">{tier.description}</p>

                  <ul className="space-y-2.5 mb-6 flex-1">
                    {tier.features.map((f) => (
                      <li key={f.text} className="flex items-start gap-2.5">
                        {f.included ? (
                          <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                        ) : (
                          <X size={14} className="text-muted-foreground/40 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-xs ${f.included ? "text-foreground" : "text-muted-foreground/50"}`}>{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className={`block w-full text-center py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.97] ${tier.highlight ? "gradient-bg text-white hover:opacity-90 shadow-md shadow-primary/20" : "border border-border text-foreground hover:bg-secondary/50 hover:border-primary/30"}`}
                    >
                      {tier.cta}
                    </Link>
                    <p className="text-[10px] text-muted-foreground text-center leading-snug">{tier.note}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.3}>
            <p className="text-center text-xs text-muted-foreground mt-8">
              All prices exclude 18% GST. Milestone payment model applies to all tiers.{" "}
              <Link href="/how-we-work" className="text-primary hover:underline">How our payment model works →</Link>
            </p>
          </ScrollReveal>

          {/* Trust badges */}
          <div className="mt-10 grid gap-6 border-t border-[var(--border-default)] pt-10 sm:grid-cols-2 lg:grid-cols-5">
            {trustBadges.map((b) => (
              <div key={b.title} className="flex flex-col items-start gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--border-default)] text-[var(--color-orange)]">
                  <b.icon size={19} />
                </span>
                <div>
                  <b className="block text-sm font-bold text-[var(--fg-default)]">{b.title}</b>
                  <small className="mt-0.5 block text-xs leading-5 text-[var(--fg-muted)]">{b.text}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestone-based payments */}
      <section className="amfire-section amfire-section-alt">
        <div className="amfire-wrap text-center">
          <span className="amfire-eyebrow">How you pay</span>
          <h2 className="mt-5 text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em]">Milestone-based payments</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-7 text-[var(--fg-muted)]">
            You pay as value is delivered — never upfront, always tied to real progress.
          </p>

          <div className="relative mt-16 hidden md:block">
            <div className="absolute left-[12.5%] right-[12.5%] top-2.5 h-px bg-[var(--border-accent)]" aria-hidden="true" />
            <div className="grid grid-cols-4">
              {paymentSteps.map((s) => (
                <div key={s.title} className="relative flex flex-col items-center">
                  <span className="relative z-10 h-[9px] w-[9px] rounded-full gradient-bg shadow-[var(--shadow-glow-sm)]" />
                  <span className="mt-3 h-4 w-px border-l border-dashed border-[var(--border-accent)]" />
                  <span className="mt-2 rounded-full border border-[var(--border-default)] bg-[var(--surface-card)] px-3 py-1 text-xs font-bold text-[var(--color-orange)] shadow-[var(--shadow-sm)]">{s.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-8 text-left sm:grid-cols-2 lg:grid-cols-4">
            {paymentSteps.map((s) => (
              <div key={s.title}>
                <div className="md:hidden mb-2 inline-block rounded-full border border-[var(--border-default)] bg-[var(--surface-card)] px-3 py-1 text-xs font-bold text-[var(--color-orange)]">{s.pct}</div>
                <div className="overflow-hidden rounded-2xl">
                  <Image src={s.img} alt="" width={280} height={200} className="h-auto w-full object-cover" />
                </div>
                <h4 className="mt-4 text-[15px] font-bold text-[var(--fg-default)]">{s.title}</h4>
                <p className="mt-1.5 text-sm leading-6 text-[var(--fg-muted)]">{s.text}</p>
                <span className="mt-3 block h-[3px] w-8 rounded-full gradient-bg" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment FAQ */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Billing FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-10">Pricing questions answered</h2>
          </ScrollReveal>
          <PricingFaq faqs={paymentFaqs} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Not sure which tier fits?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Tell us what you're building and we'll recommend the right scope and send a detailed proposal within 48 hours.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
              Get a Free Estimate <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
