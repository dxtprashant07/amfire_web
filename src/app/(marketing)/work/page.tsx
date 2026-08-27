import type { Metadata } from "next";
import Link from "next/link";
import { Brain, Layers, Users, BarChart3 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { WorkGrid, type Tile } from "@/components/work/WorkGrid";

export const revalidate = 3600; // ISR: revalidate every hour

export const metadata: Metadata = {
  title: "Work | amfire",
  description:
    "Case studies and portfolio — AI-powered platforms, SaaS products, and intelligent digital products built by amfire.",
};

const stats = [
  { value: "20+", label: "Schools automated" },
  { value: "50+", label: "IoT installations" },
  { value: "1,400+", label: "Career paths" },
];

const tiles: Tile[] = [
  {
    title: "Skillship — AI-powered LMS",
    tag: "EdTech",
    caption: "8 AI labs · teacher certification · adaptive learning · 20+ schools",
    gradient: "linear-gradient(135deg,#12233b,#1e3a5f)",
    category: ["Web", "AI"],
    big: true,
  },
  {
    title: "MyGreenHome",
    tag: "IoT · Mobile",
    caption: "Smart-home automation",
    gradient: "linear-gradient(135deg,#14311f,#1f5a37)",
    category: ["Mobile", "Automation"],
  },
  {
    title: "AI Career Copilot",
    tag: "Live Product",
    caption: "Bilingual career AI",
    gradient: "linear-gradient(135deg,#3a1c08,#7a3d13)",
    category: ["Web", "AI"],
  },
  {
    title: "Clearpath — Construction SaaS",
    tag: "SaaS · AI",
    caption: "Multi-tenant platform that reads and summarises permit documents automatically",
    gradient: "linear-gradient(135deg,#1f1a3a,#3d2f6b)",
    category: ["Web", "AI"],
  },
  {
    title: "AI Customer Support Agent",
    tag: "AI Agent · RAG",
    caption: "Multi-channel support bot with RAG-powered knowledge retrieval",
    gradient: "linear-gradient(135deg,#2a1414,#5c2626)",
    category: ["AI", "Automation"],
  },
  {
    title: "Predictive Analytics Dashboard",
    tag: "ML · Data Viz",
    caption: "Real-time forecasting for e-commerce operations and inventory",
    gradient: "linear-gradient(135deg,#0d2b2b,#1a5252)",
    category: ["Web", "AI"],
  },
  {
    title: "WhatsApp Sales Automation",
    tag: "Automation",
    caption: "Lead follow-ups and AI-powered replies saving 15 hours/week",
    gradient: "linear-gradient(135deg,#1a2e0d,#3d5c1a)",
    category: ["Automation"],
  },
  {
    title: "Document Intelligence Pipeline",
    tag: "Computer Vision · NLP",
    caption: "OCR, NER, and classification models for a legal services firm",
    gradient: "linear-gradient(135deg,#2b1a0d,#5c3a1a)",
    category: ["AI", "Automation"],
  },
  {
    title: "NexaHealth — RAG Contract Analyser",
    tag: "RAG · Healthcare",
    caption: "Reads contracts and flags risks automatically — now the most-used internal tool",
    gradient: "linear-gradient(135deg,#1a0d2b,#3a1a5c)",
    category: ["AI"],
  },
];

const featuredStudy = {
  title: "Skillship",
  subtitle: "AI-Powered Learning Management System",
  description:
    "A next-generation adaptive learning platform that personalises education using AI agents, intelligent content delivery, and real-time analytics — built end-to-end by amfire.",
  highlights: [
    { icon: Brain, label: "AI-Powered", detail: "Adaptive learning paths driven by real-time student performance analysis" },
    { icon: Layers, label: "Multi-Agent", detail: "Orchestrated AI agents for content generation, assessment, and feedback" },
    { icon: Users, label: "Role-Based", detail: "Dedicated portals for students, teachers, parents, and administrators" },
    { icon: BarChart3, label: "Analytics", detail: "Comprehensive dashboards with predictive insights and engagement tracking" },
  ],
  techStack: ["React", "Node.js", "Python", "TensorFlow", "PostgreSQL", "Redis", "AWS", "Docker"],
};

export default function WorkPage() {
  return (
    <>
      <section className="pb-4 pt-16 text-center md:pt-20">
        <div className="amfire-wrap mx-auto max-w-[720px]">
          <h1 className="text-[clamp(38px,5.5vw,58px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--fg-default)]">
            Real work. <span className="gradient-text">Real impact.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-[1.7] text-[var(--fg-muted)]">
            From EdTech platforms to IoT automation — the products we&apos;ve shipped, and the numbers behind them.
          </p>
          <div className="mt-8 flex justify-center gap-10">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="gradient-text block text-3xl font-extrabold">{s.value}</span>
                <small className="text-[13px] text-[var(--fg-muted)]">{s.label}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="amfire-section">
        <div className="amfire-wrap">
          <WorkGrid tiles={tiles} />
        </div>
      </section>

      <section className="amfire-section amfire-section-alt text-center">
        <div className="amfire-wrap max-w-[640px]">
          <h2 className="text-[clamp(28px,3.6vw,38px)] font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">Need something built?</h2>
          <p className="mt-3 text-[17px] text-[var(--fg-muted)]">Every project starts with a conversation, not a contract.</p>
          <div className="mt-7 flex justify-center">
            <Link href="/contact" className="amfire-primary inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
              Start a project
            </Link>
          </div>
        </div>
      </section>

      {/* Featured case study detail */}
      <section className="amfire-section">
        <div className="amfire-wrap">
          <ScrollReveal>
            <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-8 md:p-12">
              <span className="amfire-eyebrow">Featured Case Study</span>
              <h2 className="mt-4 text-3xl font-bold text-[var(--fg-default)] md:text-4xl">{featuredStudy.title}</h2>
              <p className="mt-1 text-[var(--fg-muted)]">{featuredStudy.subtitle}</p>
              <p className="mt-6 max-w-2xl leading-relaxed text-[var(--fg-muted)]">{featuredStudy.description}</p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {featuredStudy.highlights.map((h) => (
                  <div key={h.label} className="rounded-xl border border-[var(--border-default)] bg-[var(--surface-page)] p-5">
                    <div className="mb-3 grid h-9 w-9 place-items-center rounded-lg gradient-bg text-white">
                      <h.icon size={18} />
                    </div>
                    <p className="mb-1 text-sm font-semibold text-[var(--fg-default)]">{h.label}</p>
                    <p className="text-xs leading-relaxed text-[var(--fg-muted)]">{h.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--border-default)] pt-8">
                {featuredStudy.techStack.map((t) => (
                  <span key={t} className="rounded-md border border-[var(--border-default)] bg-[var(--surface-sunken)] px-3 py-1 text-xs font-medium text-[var(--fg-default)]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
