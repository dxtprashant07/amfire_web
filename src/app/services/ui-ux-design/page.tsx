import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Palette, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "UI / UX Design",
  description: "User-tested, Figma-based design systems — wireframes, prototypes, and production-ready design before a single line of code is written.",
};

const deliverables = [
  "User research, interviews, and competitive audit",
  "Information architecture and user flow mapping",
  "Low-fidelity wireframes for all key screens",
  "High-fidelity Figma prototypes (desktop + mobile)",
  "Complete design system: tokens, components, and usage docs",
  "Interactive prototypes for usability testing",
  "Accessibility-audited colour palettes and typography scales",
  "Developer handoff with specs, assets, and responsive breakpoints",
];

const stack = [
  { name: "Figma", color: "#F24E1E" },
  { name: "FigJam", color: "#9B59B6" },
  { name: "Framer", color: "#0055FF" },
  { name: "Maze", color: "#FFB800" },
  { name: "Hotjar", color: "#FF3C00" },
  { name: "Lottie", color: "#00DDB3" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "Storybook", color: "#FF4785" },
];

const caseStudies = [
  {
    title: "Clearpath — Construction SaaS",
    desc: "Designed a multi-role dashboard experience for site managers, admins, and clients — with a focus on information density without visual clutter. Delivered full Figma component library.",
    tags: ["Figma", "Design System", "Dashboard UI"],
  },
  {
    title: "Skillship — EdTech Platform",
    desc: "Created an adaptive learning interface with personalised progress tracking, AI tutor chat, and an assessment flow designed to reduce cognitive load and dropout.",
    tags: ["User Research", "Prototyping", "Accessibility"],
  },
];

const faqs = [
  {
    q: "Do you design before building?",
    a: "Always. Every project starts with wireframes and a validated Figma prototype before any code is written. This reduces scope changes and ensures we build the right thing.",
  },
  {
    q: "Can you redesign an existing product?",
    a: "Yes. We run a UX audit on your current product, identify pain points through analytics and user feedback, then redesign iteratively — from wireframes through high-fidelity mockups.",
  },
  {
    q: "Do you do user testing?",
    a: "Yes — usability testing is part of our standard process. We use tools like Maze for unmoderated tests and conduct moderated sessions for complex flows.",
  },
  {
    q: "What do I receive at the end?",
    a: "A complete Figma file with a design system (tokens, components, typography, colour palette), annotated screens for every breakpoint, interactive prototype, and a developer handoff document.",
  },
  {
    q: "Do you handle just design, or also implementation?",
    a: "Both. We design the full product and then build it — same team, no handoff friction. But if you only need design, we offer standalone design engagements too.",
  },
];

export default function UiUxDesignPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <Palette size={12} className="text-primary" />
                UI / UX Design
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Design that{" "}
                <span className="gradient-text">users remember</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                We design before we build. Figma-based, user-tested, accessible design systems that translate directly into production — no guesswork, no gaps.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Discuss Your Project <ArrowRight size={15} />
                </Link>
                <Link href="/work" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                  See Our Work
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* What It Is */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">What It Is</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">Design-first product development</h2>
          </ScrollReveal>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <ScrollReveal delay={0.05}>
              <p>
                UI/UX at amfire isn&apos;t a coat of paint applied after the backend is done. We treat design as the first engineering step — mapping user journeys, validating assumptions through prototypes, and building a component-level design system before a single React component is written.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                The result is products that feel intentional. Every interaction, every state, every edge case is accounted for in Figma — so the build phase is fast, predictable, and free of visual debt.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">What We Deliver</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Deliverables</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deliverables.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/25 hover:bg-card/80 transition-all">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Stack */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Design Toolkit</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Tools we use</h2>
            <p className="text-sm text-muted-foreground mb-8">Our design and testing toolkit.</p>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech, i) => (
              <ScrollReveal key={tech.name} delay={i * 0.03}>
                <span className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-secondary/50 transition-all cursor-default">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Products we&apos;ve designed</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all h-full flex flex-col">
                  <h3 className="text-base font-semibold text-foreground mb-2">{cs.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{cs.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.15}>
            <div className="mt-6 text-center">
              <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                See all case studies <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Common questions</h2>
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
              Ready to design your product?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Tell us what you&apos;re building — we&apos;ll start with wireframes and a validated prototype before writing any code.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all"
            >
              Discuss This Service <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
