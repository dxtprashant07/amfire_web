import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rocket, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Startups & SaaS",
  description: "MVP builds, multi-tenant SaaS platforms, AI feature sprints, and investor demo builds — shipped at startup speed without cutting corners on architecture.",
};

const painPoints = [
  { title: "Too slow to validate ideas", desc: "Most agencies take 6 months to ship an MVP. By then, the market has moved. You need a product in users' hands in weeks, not months." },
  { title: "Technical co-founder gap", desc: "Non-technical founders can't evaluate what they're being sold. Bad architecture early means expensive rewrites at Series A." },
  { title: "Scaling from MVP to production", desc: "Prototypes built to demo rarely survive real user load. The jump from demo to production requires a different level of engineering." },
  { title: "Adding AI without breaking things", desc: "Bolting AI onto an existing product as an afterthought creates brittle integrations. AI features need to be designed into the architecture." },
];

const deliverables = [
  "MVP builds in 4–8 weeks from scoping to launch",
  "Multi-tenant SaaS platforms with org/workspace architecture",
  "AI feature integration — agents, RAG, embeddings, recommendations",
  "Subscription billing with Stripe or Razorpay",
  "Role-based access control and team management",
  "Usage analytics and feature flag infrastructure",
  "Investor demo builds with polished UI and live data",
  "Architecture review and technical due diligence support",
];

const stack = [
  { name: "Next.js", color: "#000" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React Native", color: "#61DAFB" },
  { name: "FastAPI", color: "#009688" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Redis", color: "#DC382D" },
  { name: "OpenAI", color: "#412991" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Razorpay", color: "#02042B" },
  { name: "AWS", color: "#FF9900" },
  { name: "Vercel", color: "#000" },
  { name: "GitHub Actions", color: "#2088FF" },
];

const caseStudies = [
  {
    title: "Clearpath — Construction SaaS (0 → Production)",
    desc: "Took Clearpath from a Figma deck to a production multi-tenant SaaS in 10 weeks — auth, onboarding, project management, AI document processing, Stripe billing, and a polished dashboard. Used in the Series A pitch.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "GPT-4o", "Stripe"],
    result: "Series A raised using the working product",
  },
  {
    title: "Ridgeflow — Workflow SaaS with AI",
    desc: "Built a B2B workflow automation SaaS from scratch — drag-and-drop workflow builder, team workspaces, Razorpay subscription billing, and an AI assistant that suggests workflow optimisations based on historical run data.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "OpenAI", "Razorpay"],
    result: "60+ paying teams in first month post-launch",
  },
];

const faqs = [
  {
    q: "What exactly is included in an MVP build?",
    a: "Our MVP scope typically includes: core user flows (signup, onboarding, primary feature), basic admin panel, production-ready deployment on AWS/Vercel, and a CI/CD pipeline. We explicitly exclude: advanced analytics, complex integrations, and edge-case error handling — those come in v2. We scope this with you before writing a single line.",
  },
  {
    q: "How do you handle multi-tenancy?",
    a: "We implement workspace/organisation-level tenancy where each customer's data is isolated via row-level security in PostgreSQL or separate schemas depending on scale requirements. This is designed in from day one — retrofitting multi-tenancy is expensive.",
  },
  {
    q: "Can you help us prepare for a technical due diligence?",
    a: "Yes. We've supported founders through technical DD with architecture documentation, security review, code quality reports, and live walkthroughs with investor-side CTOs. We can also perform a technical audit on an existing codebase.",
  },
  {
    q: "We have an existing product. Can you add AI features without breaking it?",
    a: "Yes — AI feature sprints are one of our most common SaaS engagements. We audit your current architecture, identify the right integration points, and add AI features (RAG, agents, recommendations, search) without disrupting existing functionality.",
  },
  {
    q: "What's your approach when requirements change mid-build?",
    a: "We use two-week sprint cycles with a scope review at the end of each. If priorities shift, we reprioritise the next sprint. You never pay for features you didn't want — but we're explicit about what gets pushed out when scope changes.",
  },
];

export default function SaasPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <Rocket size={12} className="text-primary" />
                Startups & SaaS
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                From zero to launched,{" "}
                <span className="gradient-text">fast</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                MVP builds, multi-tenant SaaS platforms, and AI feature sprints — we move at startup speed with production-grade architecture. Your idea in users' hands in weeks, not months.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Build Your SaaS Product <ArrowRight size={15} />
                </Link>
                <Link href="/work" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                  See Case Studies
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* Pain Points */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Challenges we solve</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">What startups and SaaS founders struggle with</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {painPoints.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.06}>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">What We Build</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Startup & SaaS deliverables</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deliverables.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/25 transition-all">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Tech Stack</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Technologies we use for SaaS</h2>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech, i) => (
              <ScrollReveal key={tech.name} delay={i * 0.03}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-secondary/50 transition-all cursor-default">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tech.color }} />
                  {tech.name}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Case Studies</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">SaaS products we've shipped</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all h-full flex flex-col">
                  <h3 className="text-base font-semibold text-foreground mb-2">{cs.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{cs.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cs.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-foreground">{t}</span>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-primary">{cs.result}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Startup questions answered</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
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
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to build your startup's product?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Share your idea — we'll scope an MVP, estimate the cost in INR, and get building within a week.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
              Start the Conversation <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
