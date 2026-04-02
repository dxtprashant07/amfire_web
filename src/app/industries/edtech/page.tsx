import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "EdTech & Education",
  description: "Learning management systems, AI tutors, cohort platforms, and student portals built for education companies and institutions.",
};

const painPoints = [
  { title: "Low course completion rates", desc: "Generic platforms don't adapt to learners. Students disengage when content isn't personalised or paced right." },
  { title: "Manual admin overhead", desc: "Attendance tracking, progress reports, certificate generation — done by hand and prone to error." },
  { title: "Poor mobile experience", desc: "Learners expect to study on the go. Most LMS platforms are desktop-only or have unusable mobile apps." },
  { title: "No data on what's working", desc: "Without analytics, you're guessing which lessons work, where students drop off, and what to improve." },
];

const deliverables = [
  "Full-featured LMS with course builder, quizzes, and certificates",
  "AI tutoring assistant with personalised question generation",
  "Cohort-based learning with live sessions and peer collaboration",
  "Student progress dashboards and instructor analytics",
  "Mobile app (iOS + Android) for on-the-go learning",
  "Automated enrollment, billing, and certificate workflows",
  "Video hosting integration (Vimeo, Mux, or self-hosted)",
  "Multi-tenant setup for B2B EdTech (sell to institutions)",
];

const stack = [
  { name: "Next.js", color: "#000" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "OpenAI", color: "#412991" },
  { name: "Mux Video", color: "#FB2334" },
  { name: "Razorpay", color: "#02042B" },
  { name: "Redis", color: "#DC382D" },
  { name: "AWS S3", color: "#FF9900" },
  { name: "Langfuse", color: "#6366F1" },
];

const caseStudies = [
  {
    title: "Skillship — Cohort-Based Learning Platform",
    desc: "Built a full EdTech platform for a cohort-based startup — course builder, live session rooms, assignment submissions, mentor feedback, and a Razorpay-powered enrollment flow. 2,000+ students onboarded in the first quarter.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Razorpay", "React Native"],
    result: "2,000+ students enrolled, 78% course completion rate",
  },
  {
    title: "EduForge — AI-Powered Tutoring Assistant",
    desc: "Built a RAG-based AI tutor that answers subject-specific questions from a curated knowledge base, generates practice problems at the student's level, and tracks weak areas over time.",
    tags: ["OpenAI GPT-4o", "LangChain", "pgvector", "FastAPI"],
    result: "42% improvement in student assessment scores",
  },
];

const faqs = [
  {
    q: "Can you build an LMS from scratch or only customise existing platforms?",
    a: "Both. We build fully custom LMS platforms when clients need control over data, UX, and AI features. We also integrate with or extend existing platforms like Moodle or Teachable when a full custom build isn't needed.",
  },
  {
    q: "How do you handle video streaming for course content?",
    a: "We integrate with Mux or Vimeo for adaptive video streaming, DRM, and playback analytics. For clients with budget constraints, we also set up self-hosted solutions on AWS CloudFront.",
  },
  {
    q: "Can the platform handle both B2C (direct students) and B2B (selling to schools)?",
    a: "Yes. We build multi-tenant architectures where your platform is sold as a white-labelled product to institutions, each with their own branding, student base, and admin panel.",
  },
  {
    q: "What does the AI tutor actually do?",
    a: "It answers learner questions using your course content as the knowledge base (RAG), generates contextual practice problems, explains concepts in different ways based on the student's history, and flags areas where a human instructor should intervene.",
  },
  {
    q: "How long does a full EdTech platform take to build?",
    a: "A focused LMS with core features (courses, quizzes, progress tracking, payments) takes 8–12 weeks. Adding AI tutoring, mobile apps, and multi-tenancy adds 4–6 weeks.",
  },
];

export default function EdtechPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <GraduationCap size={12} className="text-primary" />
                Education & EdTech
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Learning platforms that{" "}
                <span className="gradient-text">actually teach</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                We build EdTech products that drive measurable learning outcomes — LMS platforms, AI tutors, cohort tools, and mobile learning apps used by thousands of students.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Build Your EdTech Product <ArrowRight size={15} />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">What EdTech companies struggle with</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">EdTech deliverables</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Technologies we use in EdTech</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">EdTech products we've shipped</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">EdTech questions answered</h2>
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
              Ready to build your EdTech product?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Share your learning platform idea — we'll scope it and send a proposal within 48 hours.
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
