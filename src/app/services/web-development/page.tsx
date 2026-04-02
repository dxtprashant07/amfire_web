import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SubpageCaseStudyCarousel } from "@/components/home/SubpageCaseStudyCarousel";

export const metadata: Metadata = {
  title: "Web Development",
  description: "Custom web applications, SaaS platforms, e-commerce, and progressive web apps built with modern stacks.",
};

const deliverables = [
  "Custom SaaS platforms and multi-tenant web applications",
  "E-commerce storefronts with payment gateway integration",
  "Progressive Web Apps (PWAs) with offline capability",
  "Internal tools, dashboards, and admin portals",
  "RESTful and GraphQL APIs with documentation",
  "CMS-powered marketing sites and landing pages",
  "Real-time apps with WebSocket support (chat, notifications, live data)",
  "Web portals with role-based access control",
];

const stack = [
  { name: "Next.js", color: "#000" },
  { name: "React", color: "#61DAFB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#339933" },
  { name: "FastAPI", color: "#009688" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Redis", color: "#DC382D" },
  { name: "Tailwind CSS", color: "#06B6D4" },
  { name: "AWS", color: "#FF9900" },
  { name: "Vercel", color: "#000" },
  { name: "Docker", color: "#2496ED" },
];

const caseStudies = [
  {
    title: "Clearpath — Construction SaaS",
    desc: "Multi-tenant SaaS platform for construction project management with AI document processing, real-time notifications, and role-based dashboards for admins, site managers, and clients.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "AWS"],
  },
  {
    title: "Skillship — EdTech Platform",
    desc: "Full-featured learning management system with course creation, student progress tracking, live cohort sessions, and Razorpay-powered enrollment flow.",
    tags: ["Next.js", "Node.js", "MongoDB", "Razorpay"],
  },
];

const faqs = [
  {
    q: "How long does a typical web application take to build?",
    a: "A simple web app takes 3–6 weeks. A full SaaS platform with auth, billing, and dashboards typically takes 8–16 weeks depending on feature scope. We scope everything before we write a single line of code.",
  },
  {
    q: "Do you handle both frontend and backend?",
    a: "Yes — always. We build the full stack: UI, APIs, database schema, deployment, and DevOps. No partial handoffs.",
  },
  {
    q: "Which tech stack do you use for web development?",
    a: "Our default stack is Next.js + TypeScript on the frontend, and Node.js or FastAPI on the backend, with PostgreSQL or MongoDB. We adjust based on your scale and requirements.",
  },
  {
    q: "Can you redesign or rebuild an existing product?",
    a: "Yes. We regularly take over legacy codebases for rewrites or incremental modernisation. We audit the existing system first, then propose a migration path.",
  },
  {
    q: "Will I own the code after delivery?",
    a: "Completely. You receive 100% of the source code, design files, and deployment credentials. We transfer all assets upon final payment milestone.",
  },
];

export default function WebDevelopmentPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <Globe size={12} className="text-primary" />
                Web Development
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Web apps that{" "}
                <span className="gradient-text">scale with you</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                From MVPs to enterprise SaaS — we build performant, secure, production-ready web applications your users will actually enjoy using.
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
        {/* Background gradient orb */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* What It Is */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">What It Is</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">Full-stack web development, end to end</h2>
          </ScrollReveal>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <ScrollReveal delay={0.05}>
              <p>
                Web development at amfire means owning the entire product surface — from the pixel-perfect UI your users interact with, to the APIs and databases that power it, to the cloud infrastructure it runs on. We don't hand off backend work to a third party or leave you hunting for a DevOps engineer after launch.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                We specialise in building products that start lean and grow gracefully. Whether that's a two-week MVP to test market demand, or a multi-tenant SaaS platform serving thousands of concurrent users — the architecture we choose on day one is designed to support where you're going, not just where you are today.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">What We Build</p>
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

      {/* Decode the Stack */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Decode the Stack</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Technologies we use</h2>
            <p className="text-sm text-muted-foreground mb-8">Hover a tag to learn what it does in your stack.</p>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Web apps we've shipped</h2>
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
              Ready to build your web app?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Tell us what you're building — we'll scope it, price it, and start within a week.
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
