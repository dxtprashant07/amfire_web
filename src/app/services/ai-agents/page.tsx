import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SubpageCaseStudyCarousel } from "@/components/home/SubpageCaseStudyCarousel";

export const metadata: Metadata = {
  title: "AI & Agents",
  description: "Custom AI agents, LLM integrations, RAG pipelines, and autonomous workflows built for production.",
};

const deliverables = [
  "Custom LLM-powered chatbots and assistants (GPT-4o, Claude, Gemini)",
  "Retrieval-Augmented Generation (RAG) pipelines over private data",
  "Autonomous AI agents with tool use and multi-step reasoning",
  "Document processing pipelines — OCR, extraction, summarisation",
  "AI-powered search and recommendation systems",
  "Fine-tuned models for domain-specific classification and generation",
  "Voice agents with speech-to-text and text-to-speech",
  "AI observability, eval frameworks, and cost tracking dashboards",
];

const stack = [
  { name: "OpenAI GPT-4o", color: "#412991" },
  { name: "Claude 3.5", color: "#D97706" },
  { name: "LangChain", color: "#1C3C3C" },
  { name: "LlamaIndex", color: "#FF6B35" },
  { name: "Pinecone", color: "#00D4AA" },
  { name: "pgvector", color: "#336791" },
  { name: "FastAPI", color: "#009688" },
  { name: "Python", color: "#3776AB" },
  { name: "Whisper", color: "#412991" },
  { name: "Weaviate", color: "#FA0050" },
  { name: "Langfuse", color: "#6366F1" },
  { name: "AWS Bedrock", color: "#FF9900" },
];

const caseStudies = [
  {
    title: "Clearpath — AI Document Processing Agent",
    desc: "An autonomous agent that reads construction permit PDFs, extracts key dates, obligations, and clauses, then populates structured records in the SaaS platform — replacing 4 hours of manual work per project.",
    tags: ["GPT-4o", "LangChain", "Pinecone", "FastAPI"],
  },
  {
    title: "TalentScout — AI Recruitment Assistant",
    desc: "A RAG-based assistant that answers candidates' questions from a company's internal knowledge base, screens resumes against role requirements, and drafts shortlist summaries for hiring managers.",
    tags: ["Claude", "LlamaIndex", "pgvector", "Python"],
  },
];

const faqs = [
  {
    q: "What's the difference between an AI integration and an AI agent?",
    a: "An AI integration calls a model (like GPT-4o) to generate text or classify data in a fixed pipeline. An AI agent goes further — it can reason about a goal, decide which tools to call, take actions (send emails, query databases, browse the web), and iterate until the task is complete. We build both.",
  },
  {
    q: "How do you keep AI responses accurate and avoid hallucinations?",
    a: "We use RAG (Retrieval-Augmented Generation) to ground responses in your actual data, structured output schemas to constrain model responses, and eval frameworks to measure accuracy before deployment. For production agents we also implement human-in-the-loop checkpoints for high-stakes actions.",
  },
  {
    q: "Can you build AI features on top of our existing product?",
    a: "Yes — this is the most common scenario. We connect to your existing database, APIs, and user context, and layer AI capabilities on top without a full rebuild.",
  },
  {
    q: "Which AI models do you work with?",
    a: "Primarily OpenAI (GPT-4o, o1), Anthropic (Claude 3.5 Sonnet), and Google (Gemini 1.5 Pro). For latency-sensitive or cost-sensitive cases we also work with open-source models via AWS Bedrock or self-hosted Ollama.",
  },
  {
    q: "How do you handle the cost of running AI in production?",
    a: "We implement caching, prompt compression, model routing (expensive models only for complex tasks), and observability dashboards so you can see cost per user/feature in real time. AI costs are always factored into our architecture recommendations.",
  },
];

export default function AiAgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <Brain size={12} className="text-primary" />
                AI & Agents
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                AI that works,{" "}
                <span className="gradient-text">not just demos</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                Production-ready AI agents, LLM pipelines, and RAG systems — built to run reliably on your data, at your scale, without hallucinating.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Discuss Your AI Project <ArrowRight size={15} />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">AI built for production, not prototypes</h2>
          </ScrollReveal>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <ScrollReveal delay={0.05}>
              <p>
                AI development at amfire goes beyond calling an OpenAI API and streaming text to a chatbox. We design systems — retrieval pipelines that ground responses in your actual data, agents that can reason across multiple steps and use tools like database queries, web search, or email sending, and evaluation frameworks that measure accuracy before anything touches production.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                Every AI system we build is observable: you can see what the model was asked, what it retrieved, what it decided, and how much it cost — per request, per user, per feature. Because the difference between a compelling demo and a production AI product is everything that happens when the model gets it wrong.
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
            <p className="text-sm text-muted-foreground mb-8">The models, frameworks, and infrastructure behind your AI product.</p>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">AI systems we've shipped</h2>
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
              Ready to add AI to your product?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              We'll audit your use case, recommend the right model and architecture, and build it production-ready.
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
