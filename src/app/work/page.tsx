import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Brain, Layers, Users, BarChart3 } from "lucide-react";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Work | amfire",
  description:
    "Case studies and portfolio — AI-powered platforms, SaaS products, and intelligent digital products built by amfire.",
};

const featuredStudy = {
  slug: "skillship",
  title: "Skillship",
  subtitle: "AI-Powered Learning Management System",
  description:
    "A next-generation adaptive learning platform that personalises education using AI agents, intelligent content delivery, and real-time analytics — built end-to-end by amfire.",
  tags: ["AI/ML", "EdTech", "Full-Stack", "Multi-Agent", "LMS"],
  highlights: [
    { icon: Brain, label: "AI-Powered", detail: "Adaptive learning paths driven by real-time student performance analysis" },
    { icon: Layers, label: "Multi-Agent", detail: "Orchestrated AI agents for content generation, assessment, and feedback" },
    { icon: Users, label: "Role-Based", detail: "Dedicated portals for students, teachers, parents, and administrators" },
    { icon: BarChart3, label: "Analytics", detail: "Comprehensive dashboards with predictive insights and engagement tracking" },
  ],
  features: [
    "AI-driven personalised learning paths",
    "Intelligent content recommendation engine",
    "Automated assessment generation & grading",
    "Real-time performance analytics dashboard",
    "Multi-tenant architecture with role-based access",
    "Gamification — badges, streaks, leaderboards",
    "Parent & teacher collaboration tools",
    "Mobile-responsive progressive web app",
  ],
  techStack: ["React", "Node.js", "Python", "TensorFlow", "PostgreSQL", "Redis", "AWS", "Docker"],
  phases: [
    "Discovery & Research",
    "Architecture & Design",
    "Core Platform Build",
    "AI Engine Integration",
    "Testing & QA",
    "Deployment & Launch",
    "Post-Launch Iteration",
  ],
};

const otherWork = [
  {
    title: "Clearpath — Construction SaaS",
    description:
      "Multi-tenant SaaS platform for construction firms with AI document processing. Reads and summarises permit documents automatically.",
    tags: ["SaaS", "AI", "Next.js", "FastAPI"],
  },
  {
    title: "AI Customer Support Agent",
    description:
      "Multi-channel support bot with RAG-powered knowledge retrieval and escalation workflows for a B2B fintech company.",
    tags: ["AI Agent", "RAG", "NLP"],
  },
  {
    title: "Predictive Analytics Dashboard",
    description:
      "Real-time data visualisation platform with ML-driven forecasting for e-commerce operations and inventory management.",
    tags: ["ML", "Data Viz", "Full-Stack"],
  },
  {
    title: "WhatsApp Sales Automation",
    description:
      "Automated WhatsApp workflows for a sales team — lead follow-ups, appointment reminders, and AI-powered replies saving 15 hours/week.",
    tags: ["Automation", "WhatsApp", "AI"],
  },
  {
    title: "Document Intelligence Pipeline",
    description:
      "Automated document processing system using OCR, NER, and classification models for a legal services firm.",
    tags: ["Computer Vision", "NLP", "Automation"],
  },
  {
    title: "NexaHealth — RAG Contract Analyser",
    description:
      "Backend rebuild with a RAG system that reads contracts and flags risks automatically — now the most-used internal tool.",
    tags: ["RAG", "Healthcare", "Backend"],
  },
];

export default function WorkPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
              Portfolio
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
              Work that <span className="gradient-text">speaks.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              A look at what we've built — from concept to production.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Featured Case Study ───────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="p-8 md:p-12 rounded-2xl border border-border bg-card">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border border-primary/30 text-primary mb-3">
                    Featured Case Study
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">{featuredStudy.title}</h2>
                  <p className="text-muted-foreground mt-1">{featuredStudy.subtitle}</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
                {featuredStudy.description}
              </p>

              {/* Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {featuredStudy.highlights.map((h, i) => (
                  <ScrollReveal key={h.label} delay={i * 0.05}>
                    <div className="p-5 rounded-xl border border-border bg-background">
                      <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center mb-3">
                        <h.icon size={18} className="text-white" />
                      </div>
                      <p className="font-semibold text-foreground text-sm mb-1">{h.label}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{h.detail}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Features + Tech */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {featuredStudy.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full gradient-bg shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {featuredStudy.techStack.map((t) => (
                        <span key={t} className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-secondary text-foreground border border-border">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                      Delivery Phases
                    </h3>
                    <ol className="space-y-2">
                      {featuredStudy.phases.map((p, i) => (
                        <li key={p} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          {p}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="mt-10 pt-8 border-t border-border flex flex-wrap gap-2">
                {featuredStudy.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium border border-border text-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Other Work ────────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24 bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-10">
              Other work
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherWork.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.07}>
                <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full flex flex-col">
                  <h3 className="text-base font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-secondary text-foreground border border-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
              Have a project in mind?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
              Let's discuss how we can bring your idea to life.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white font-medium hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Start a Conversation
              <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
