import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, milestone-based pricing in INR. Four tiers from under ₹1L to enterprise — scoped to your project, paid as we deliver.",
};

const tiers = [
  {
    name: "Starter",
    price: "Under ₹1L",
    tagline: "For landing pages, portfolios, and lightweight tools",
    description: "Best for solo founders, freelancers, or businesses that need a clean digital presence or a simple automation script.",
    highlight: false,
    features: [
      { text: "1–3 screens / pages", included: true },
      { text: "Responsive design", included: true },
      { text: "Basic SEO setup", included: true },
      { text: "Production deployment", included: true },
      { text: "1 revision round", included: true },
      { text: "1–2 week delivery", included: true },
      { text: "Backend / API", included: false },
      { text: "Mobile app", included: false },
      { text: "AI integration", included: false },
      { text: "Post-launch support", included: false },
    ],
    cta: "Get a Quote",
    note: "Typical projects: landing pages, portfolios, micro-tools",
  },
  {
    name: "Growth",
    price: "₹1L – ₹3L",
    tagline: "For MVPs, web apps, and mobile app builds",
    description: "Built for early-stage startups and businesses launching a digital product for the first time. Full stack, production-ready.",
    highlight: false,
    features: [
      { text: "Full web or mobile app", included: true },
      { text: "Custom backend + APIs", included: true },
      { text: "Auth and user management", included: true },
      { text: "Payment gateway integration", included: true },
      { text: "2 revision rounds", included: true },
      { text: "3–6 week delivery", included: true },
      { text: "Analytics integration", included: true },
      { text: "3 months post-launch support", included: true },
      { text: "AI integration", included: false },
      { text: "Multi-tenant architecture", included: false },
    ],
    cta: "Get a Quote",
    note: "Typical projects: MVPs, booking apps, internal tools",
  },
  {
    name: "Scale",
    price: "₹3L – ₹10L",
    tagline: "For SaaS platforms, AI products, and complex apps",
    description: "For businesses building a flagship product — multi-tenant SaaS, AI-powered platforms, or complex mobile apps with a full backend.",
    highlight: true,
    features: [
      { text: "Full-stack SaaS platform", included: true },
      { text: "Multi-tenant architecture", included: true },
      { text: "AI / LLM integration", included: true },
      { text: "Admin dashboard + CMS", included: true },
      { text: "Unlimited revisions", included: true },
      { text: "6–14 week delivery", included: true },
      { text: "Full QA and testing", included: true },
      { text: "CI/CD pipeline + DevOps", included: true },
      { text: "6 months post-launch support", included: true },
      { text: "Architecture documentation", included: true },
    ],
    cta: "Get a Quote",
    note: "Typical projects: SaaS platforms, AI agents, marketplaces",
  },
  {
    name: "Enterprise",
    price: "₹10L+",
    tagline: "For large-scale digital transformation and retainers",
    description: "For enterprises, funded startups, or businesses needing a dedicated team for ongoing product development and infrastructure.",
    highlight: false,
    features: [
      { text: "Dedicated full-stack team", included: true },
      { text: "Custom architecture design", included: true },
      { text: "Multi-product builds", included: true },
      { text: "Enterprise integrations (ERP, CRM)", included: true },
      { text: "Custom timeline", included: true },
      { text: "Advanced AI & automation", included: true },
      { text: "Security audit and compliance", included: true },
      { text: "12 months support + SLA", included: true },
      { text: "On-site workshops (optional)", included: true },
      { text: "Monthly retainer available", included: true },
    ],
    cta: "Let's Talk",
    note: "Includes NDA, MSA, and custom contract terms",
  },
];

const addOns = [
  { name: "UI/UX Design Sprint", price: "₹20,000–₹60,000", desc: "3–5 day Figma design sprint for one user flow or full product." },
  { name: "AI Feature Sprint", price: "₹30,000–₹80,000", desc: "RAG pipeline, LLM chatbot, or AI agent added to an existing product." },
  { name: "DevOps Setup", price: "₹25,000–₹50,000", desc: "CI/CD pipeline, Docker, AWS/GCP setup, and monitoring dashboard." },
  { name: "Monthly Retainer", price: "₹40,000–₹1,20,000/mo", desc: "Ongoing development, bug fixes, feature additions, and support." },
  { name: "Code Audit", price: "₹15,000–₹40,000", desc: "Technical review of an existing codebase — security, performance, architecture." },
  { name: "Tech Due Diligence", price: "₹20,000–₹50,000", desc: "Full technical audit + documentation for investor or acquisition DD." },
];

const paymentFaqs = [
  { q: "How does milestone-based payment work?", a: "We split the total project fee into 4 payments — 20% at kickoff, 30% at design approval, 25% at build completion, and 25% at final delivery. You never pay for work that hasn't happened." },
  { q: "Do you charge GST?", a: "Yes — 18% GST is applicable on all invoices as per Indian tax regulations. The prices above are exclusive of GST." },
  { q: "Can I pay in USD?", a: "Yes. International clients can pay in USD via wire transfer or Stripe. We invoice in USD at the prevailing INR rate at project kickoff." },
  { q: "What if the scope changes mid-project?", a: "Scope is locked at kickoff. If you want to add features, we scope the delta, price it, and you approve before we build. No surprise additions to your invoice." },
  { q: "Do you offer refunds?", a: "Milestone payments are non-refundable once the milestone deliverable has been delivered and approved. If we fail to deliver a milestone, we refund that milestone's payment in full." },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-3xl">
          <ScrollReveal>
            <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-4">Pricing</p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5">
              Simple, transparent pricing
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed mb-6">
              Every project is milestone-based — you pay as we deliver, never upfront. All prices in INR, exclusive of GST.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              20% to start · 30% on designs · 25% on build · 25% on delivery
            </div>
          </ScrollReveal>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* Pricing Tiers */}
      <section className="py-4 md:py-8 pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6">
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
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Add-ons</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">À la carte services</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-10">
              Bolt these onto any project tier, or engage them independently.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((a, i) => (
              <ScrollReveal key={a.name} delay={i * 0.06}>
                <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all h-full">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground">{a.name}</h3>
                  </div>
                  <p className="text-xs font-bold gradient-text mb-2">{a.price}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                </div>
              </ScrollReveal>
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
          <div className="space-y-4">
            {paymentFaqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
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
