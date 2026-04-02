import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Briefcase, Heart, Zap, Users, Globe, Shield } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Careers",
  description: "Join amfire — we're a small, high-output team building AI-first digital products. Remote-first, outcome-driven, and always learning.",
};

const openRoles = [
  {
    title: "Full-Stack Engineer",
    type: "Full-time",
    location: "Remote (India)",
    experience: "2–5 years",
    stack: ["Next.js", "TypeScript", "Node.js / FastAPI", "PostgreSQL"],
    description:
      "We're looking for a full-stack engineer who loves shipping products end-to-end. You'll work across the frontend, backend, and deployment pipeline on client SaaS and AI products.",
    responsibilities: [
      "Build and ship full-stack features across Next.js frontends and Node.js / FastAPI backends",
      "Design and implement database schemas, REST APIs, and third-party integrations",
      "Collaborate with designers and AI engineers on product features",
      "Participate in code reviews and maintain quality across the codebase",
    ],
    requirements: [
      "Strong proficiency in TypeScript, React, and Node.js or Python (FastAPI)",
      "Comfortable owning a feature from design handoff to production deployment",
      "Experience with PostgreSQL or similar relational databases",
      "Bonus: Experience with Next.js App Router, Tailwind CSS, or Docker",
    ],
  },
  {
    title: "AI / ML Engineer",
    type: "Full-time",
    location: "Remote (India)",
    experience: "1–4 years",
    stack: ["Python", "LangChain / LlamaIndex", "OpenAI API", "pgvector / Pinecone"],
    description:
      "We're looking for an AI engineer who can take an AI use case from whiteboard to production — building RAG pipelines, AI agents, and LLM-powered features that actually work reliably.",
    responsibilities: [
      "Design and implement RAG pipelines, LLM chains, and autonomous agents",
      "Build document processing, extraction, and summarisation pipelines",
      "Implement evaluation frameworks to measure AI output quality",
      "Monitor AI feature performance, cost, and latency in production",
    ],
    requirements: [
      "Solid Python skills and experience with OpenAI or Anthropic APIs",
      "Hands-on experience with LangChain, LlamaIndex, or similar frameworks",
      "Understanding of vector databases (pgvector, Pinecone, Weaviate)",
      "Bonus: Experience with fine-tuning, Whisper, or multimodal models",
    ],
  },
  {
    title: "UI/UX Designer",
    type: "Full-time / Contract",
    location: "Remote (India)",
    experience: "2–4 years",
    stack: ["Figma", "Auto Layout", "Prototyping", "Design Systems"],
    description:
      "We're looking for a product designer who thinks in user flows before pixels. You'll design the full product experience — from discovery to handoff — for web apps, mobile apps, and SaaS platforms.",
    responsibilities: [
      "Conduct user flow mapping and wireframing before high-fidelity design",
      "Design high-fidelity Figma screens for web and mobile products",
      "Build and maintain design systems and component libraries",
      "Work closely with engineers to ensure designs are implemented accurately",
    ],
    requirements: [
      "Expert-level Figma skills including Auto Layout and component variants",
      "Portfolio demonstrating product design for web and / or mobile",
      "Strong visual design taste — typography, spacing, and colour",
      "Bonus: Experience with motion design or Lottie animations",
    ],
  },
];

const values = [
  { icon: Zap, title: "Ship fast, learn faster", desc: "We move in two-week sprints, ship often, and improve based on feedback. Speed is a feature." },
  { icon: Shield, title: "Quality isn't optional", desc: "Fast doesn't mean sloppy. We write tests, document decisions, and build things that last." },
  { icon: Heart, title: "Ownership over permission", desc: "You own your work. If you see a problem, fix it. If you have an idea, propose it." },
  { icon: Users, title: "Small team, big output", desc: "We stay small on purpose. Everyone here has a disproportionate impact." },
  { icon: Globe, title: "Remote-first, async-friendly", desc: "Work from anywhere. We communicate in writing, meet intentionally, and trust each other." },
  { icon: Briefcase, title: "Breadth over narrow specialisation", desc: "We value engineers who can think across the stack and designers who understand code." },
];

const perks = [
  "Competitive salary in line with top-quartile Indian tech companies",
  "Fully remote — work from anywhere in India",
  "Flexible hours — we measure output, not hours logged",
  "MacBook / equipment allowance for home office setup",
  "Learning budget — courses, books, and conferences",
  "Work on real products used by real customers from day one",
  "Direct access to founders — no middle management",
  "Annual team retreat",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-4">Careers</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Build products that{" "}
                <span className="gradient-text">matter</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                amfire is a small, high-output team building AI-first digital products for startups and enterprises. We hire people who want ownership, not just a job.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <a href="#open-roles" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  See Open Roles <ArrowRight size={15} />
                </a>
                <Link href="/about" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                  About amfire
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* Values */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">How we work</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">What it's like here</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-10">
              We're not for everyone. We're for people who want to own their work and do the best work of their careers.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.06}>
                <div className="p-5 rounded-xl border border-border bg-card hover:border-primary/25 transition-all h-full">
                  <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center mb-3">
                    <v.icon size={16} className="text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{v.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Benefits</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">What you get</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {perks.map((perk, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/25 transition-all">
                  <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                  <span className="text-sm text-foreground">{perk}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-10 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Open Roles</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3">We're hiring</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mb-10">
              Three roles open right now. All remote, all India-based.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {openRoles.map((role, i) => (
              <ScrollReveal key={role.title} delay={i * 0.07}>
                <div className="rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden">
                  {/* Role header */}
                  <div className="p-6 border-b border-border">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-foreground">{role.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary border border-border px-2.5 py-1 rounded-full">
                          <Briefcase size={10} /> {role.type}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary border border-border px-2.5 py-1 rounded-full">
                          <MapPin size={10} /> {role.location}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary border border-border px-2.5 py-1 rounded-full">
                          <Clock size={10} /> {role.experience}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{role.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {role.stack.map((t) => (
                        <span key={t} className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-foreground">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Responsibilities + Requirements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                    <div className="p-6">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">What you'll do</h4>
                      <ul className="space-y-2">
                        {role.responsibilities.map((r, ri) => (
                          <li key={ri} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0 mt-1.5" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">What we look for</h4>
                      <ul className="space-y-2">
                        {role.requirements.map((r, ri) => (
                          <li key={ri} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0 mt-1.5" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Apply CTA */}
                  <div className="px-6 py-4 bg-secondary/30 border-t border-border flex items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">Send your resume + 2–3 past projects or GitHub profile.</p>
                    <Link
                      href={`/contact?role=${encodeURIComponent(role.title)}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-xs font-medium hover:opacity-90 active:scale-[0.97] transition-all shrink-0"
                    >
                      Apply Now <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Open application */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Don't see your role?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              We occasionally hire for roles outside of this list. If you're exceptional and aligned with how we work, send us your profile — we read every message.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
              Send an Open Application <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
