import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Shield, Zap, Users, MessageSquare, FileText, CreditCard } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "How We Work",
  description: "Our 7-phase project delivery process — from discovery to deployment. Milestone-based, transparent, and built around your outcomes.",
};

const phases = [
  {
    step: "01",
    title: "Discovery & Scoping",
    duration: "3–5 days",
    description:
      "We start by deeply understanding your idea, business model, and target users. We map user flows, define the MVP feature set, and write a detailed scope document — no ambiguity, no surprise additions later.",
    deliverables: ["Scope document", "User flow diagrams", "Feature priority matrix", "Project timeline"],
    icon: FileText,
  },
  {
    step: "02",
    title: "Architecture",
    duration: "2–3 days",
    description:
      "We design the technical architecture before writing a line of code — database schema, API contracts, infrastructure plan, and the tech stack choice. This prevents expensive rework down the line.",
    deliverables: ["System architecture diagram", "Database schema", "API contract", "Tech stack decision"],
    icon: Shield,
  },
  {
    step: "03",
    title: "UI / UX Design",
    duration: "1–2 weeks",
    description:
      "We design every screen in Figma before development starts. You review and approve each flow. We don't build what hasn't been designed — this eliminates the 'that's not what I imagined' problem.",
    deliverables: ["Wireframes", "High-fidelity Figma screens", "Design system / tokens", "Prototype for review"],
    icon: Zap,
  },
  {
    step: "04",
    title: "Frontend Build",
    duration: "2–5 weeks",
    description:
      "We implement the approved designs in code — pixel-perfect, responsive, and accessible. Components are built to be reusable and match the design system exactly.",
    deliverables: ["Responsive UI implementation", "Component library", "Animations and interactions", "Cross-browser testing"],
    icon: Zap,
  },
  {
    step: "05",
    title: "Backend & APIs",
    duration: "2–6 weeks",
    description:
      "We build the server, database, and API layer — authentication, business logic, data models, and third-party integrations. All APIs are documented with Swagger/OpenAPI.",
    deliverables: ["REST / GraphQL APIs", "Database implementation", "Auth and permissions", "Third-party integrations"],
    icon: Shield,
  },
  {
    step: "06",
    title: "AI Integration",
    duration: "1–3 weeks",
    description:
      "For projects with AI features, we integrate LLMs, build RAG pipelines, or deploy autonomous agents. Every AI feature is evaluated for accuracy before release.",
    deliverables: ["AI feature implementation", "RAG or agent pipeline", "Evaluation framework", "Cost monitoring setup"],
    icon: Zap,
  },
  {
    step: "07",
    title: "Deploy & Handover",
    duration: "3–5 days",
    description:
      "We deploy to production on your cloud infrastructure, configure DNS and SSL, set up monitoring and alerting, and hand over all source code, credentials, and documentation.",
    deliverables: ["Production deployment", "CI/CD pipeline", "Monitoring and alerting", "Full code + credentials handover"],
    icon: CheckCircle2,
  },
];

const paymentMilestones = [
  { pct: "20%", label: "Project Kickoff", desc: "Paid before Discovery starts. Confirms commitment and lets us allocate the team." },
  { pct: "30%", label: "Design Approval", desc: "Paid when you sign off on the Figma designs. Development starts immediately after." },
  { pct: "25%", label: "Build Complete", desc: "Paid when the full build is delivered to staging for your testing and review." },
  { pct: "25%", label: "Final Delivery", desc: "Paid on production deployment and full asset handover. No deployment without final sign-off." },
];

const principles = [
  {
    icon: Clock,
    title: "Two-week sprints",
    desc: "All projects run in two-week cycles. You see working software every two weeks — not just status updates.",
  },
  {
    icon: MessageSquare,
    title: "One point of contact",
    desc: "You talk to one project lead throughout. No account managers, no relay chains.",
  },
  {
    icon: FileText,
    title: "Everything documented",
    desc: "Scope changes, decisions, and rationale are all written down. You always know what's happening and why.",
  },
  {
    icon: Shield,
    title: "No surprise invoices",
    desc: "Scope is fixed at kickoff. If requirements change, we scope the delta and agree before proceeding.",
  },
  {
    icon: Users,
    title: "Same team start to finish",
    desc: "The team you meet in discovery is the team that builds. No junior substitutes after the pitch.",
  },
  {
    icon: CreditCard,
    title: "You own everything",
    desc: "100% of source code, design files, infrastructure, and credentials transfer to you on final payment.",
  },
];

export default function HowWeWorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-4">How We Work</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Milestone-driven.{" "}
                <span className="gradient-text">No surprises.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                Every project follows the same 7-phase pipeline. You see working software every two weeks, pay in milestones, and own everything at the end.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Start a Project <ArrowRight size={15} />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                  View Pricing
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* 7-Phase Process */}
      <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">The Process</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">7 phases. Every project.</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-10">
              We follow this pipeline on every engagement — no shortcuts, no phases skipped.
            </p>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[23px] top-8 bottom-8 w-px bg-border hidden md:block" />

            <div className="space-y-6">
              {phases.map((phase, i) => (
                <ScrollReveal key={phase.step} delay={i * 0.06}>
                  <div className="flex gap-5 group">
                    {/* Step badge */}
                    <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center shrink-0 text-white text-xs font-bold relative z-10 group-hover:scale-110 transition-transform duration-200 shadow-md shadow-primary/20">
                      {phase.step}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-6 border-b border-border last:border-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{phase.title}</h3>
                        <span className="text-xs text-muted-foreground bg-secondary border border-border px-2.5 py-1 rounded-full shrink-0">{phase.duration}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{phase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {phase.deliverables.map((d) => (
                          <span key={d} className="inline-flex items-center gap-1.5 text-xs text-foreground bg-secondary border border-border px-2.5 py-1 rounded-full">
                            <CheckCircle2 size={10} className="text-primary" />
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment Milestones */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Payment Model</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">Pay as we deliver</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-10">
              We split every project into 4 payment milestones tied to real deliverables — not arbitrary calendar dates.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {paymentMilestones.map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 0.07}>
                <div className="flex gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all">
                  <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                    <span className="text-white font-bold text-sm">{m.pct}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">{m.label}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Working Principles */}
      <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Our Principles</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">How we operate</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-10">
              The rules we work by — on every project, for every client.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {principles.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.06}>
                <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/25 transition-all h-full">
                  <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center mb-3">
                    <p.icon size={16} className="text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
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
              Ready to kick off your project?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Tell us what you're building — we'll scope it, send a proposal, and schedule discovery within 48 hours.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                Get a Proposal <ArrowRight size={15} />
              </Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                See Pricing
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
