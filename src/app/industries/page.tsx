import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, HeartPulse, ShoppingCart, Building2, TrendingUp, Rocket } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description: "amfire builds digital products across EdTech, Healthcare, Retail, Real Estate, Fintech, and SaaS — tailored to each industry's workflows and compliance needs.",
};

const industries = [
  {
    icon: GraduationCap,
    name: "Education & EdTech",
    slug: "edtech",
    tagline: "Learning platforms that actually teach",
    description: "From AI tutors and LMS platforms to cohort-based learning tools — we build EdTech products that drive engagement and measurable learning outcomes.",
    useCases: ["LMS & course platforms", "AI tutoring systems", "Student progress tracking", "Live cohort sessions", "EdTech mobile apps"],
    accent: "#6366F1",
  },
  {
    icon: HeartPulse,
    name: "Healthcare & MedTech",
    slug: "healthcare",
    tagline: "Digital health that clinicians and patients trust",
    description: "Patient portals, teleconsult apps, and AI-assisted diagnostics — built with the security and compliance that healthcare demands.",
    useCases: ["Patient management portals", "Teleconsultation apps", "Appointment booking systems", "Medical record digitisation", "AI symptom checkers"],
    accent: "#10B981",
  },
  {
    icon: ShoppingCart,
    name: "Retail & E-Commerce",
    slug: "retail",
    tagline: "Commerce experiences that convert",
    description: "Custom storefronts, inventory systems, and AI-powered recommendation engines — built to drive sales and reduce operational overhead.",
    useCases: ["Custom e-commerce storefronts", "Inventory & order management", "AI product recommendations", "Multi-vendor marketplaces", "D2C mobile apps"],
    accent: "#F59E0B",
  },
  {
    icon: Building2,
    name: "Real Estate",
    slug: "real-estate",
    tagline: "Proptech that closes deals faster",
    description: "Listing portals, agent CRMs, and AI valuation tools — digital infrastructure for developers, brokers, and property managers.",
    useCases: ["Property listing portals", "Agent CRM systems", "AI property valuation", "Virtual tour platforms", "Lead management dashboards"],
    accent: "#8B5CF6",
  },
  {
    icon: TrendingUp,
    name: "Finance & Fintech",
    slug: "fintech",
    tagline: "Financial software built for trust and speed",
    description: "Trading dashboards, KYC automation, and wallet apps — built with the security and auditability that financial products require.",
    useCases: ["Trading & portfolio dashboards", "KYC & onboarding automation", "Digital wallet apps", "Lending platforms", "Expense management tools"],
    accent: "#06B6D4",
  },
  {
    icon: Rocket,
    name: "Startups & SaaS",
    slug: "saas",
    tagline: "From zero to launched, fast",
    description: "MVP builds, multi-tenant SaaS platforms, and AI feature sprints — we move at startup speed without cutting corners on architecture.",
    useCases: ["MVP in 4–8 weeks", "Multi-tenant SaaS platforms", "AI feature integration", "Investor demo builds", "Product-market fit iteration"],
    accent: "#EF4444",
  },
];

const whyIndustryFocus = [
  {
    title: "Domain-specific UX patterns",
    desc: "Every industry has workflows that users expect. We design to match those mental models — not generic templates.",
  },
  {
    title: "Compliance awareness",
    desc: "Healthcare needs HIPAA thinking. Fintech needs audit trails. We know what questions to ask before we architect.",
  },
  {
    title: "Relevant case studies",
    desc: "We've shipped products in each vertical. We bring that institutional knowledge into every new engagement.",
  },
  {
    title: "Faster scoping",
    desc: "Because we've built similar products before, we scope faster, catch edge cases earlier, and build the right thing first.",
  },
];

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-4">Industries</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Built for the industries{" "}
                <span className="gradient-text">that run on software</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                We build digital products across six verticals — each with its own compliance needs, user expectations, and technical challenges. We know the patterns because we've shipped in all of them.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Start a Conversation <ArrowRight size={15} />
                </Link>
                <Link href="/work" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                  See Case Studies
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[140px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* Industry Cards */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.slug} delay={i * 0.07}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-border bg-card p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                      <ind.icon size={20} className="text-white" />
                    </div>
                    <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 mt-1" />
                  </div>
                  <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-1">{ind.tagline}</p>
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{ind.description}</p>
                  <ul className="space-y-1.5">
                    {ind.useCases.map((uc) => (
                      <li key={uc} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0" />
                        {uc}
                      </li>
                    ))}
                  </ul>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why industry focus */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Why it matters</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">
              Industry expertise isn't a differentiator — it's a prerequisite
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-10">
              Generic dev shops build generic products. We build products that know your domain.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whyIndustryFocus.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07}>
                <div className="p-6 rounded-xl border border-border bg-card hover:border-primary/25 transition-all">
                  <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Don't see your industry?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              We've built for industries beyond these six. If software can solve it, we can build it. Let's talk.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
              Get in Touch <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
