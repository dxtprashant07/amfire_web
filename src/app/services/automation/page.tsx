import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SubpageCaseStudyCarousel } from "@/components/home/SubpageCaseStudyCarousel";

export const metadata: Metadata = {
  title: "Automation",
  description: "Business process automation, workflow orchestration, and no-code/custom integration pipelines that eliminate manual work.",
};

const deliverables = [
  "End-to-end business process automation (onboarding, billing, reporting)",
  "CRM and ERP integrations (Salesforce, HubSpot, Zoho, SAP)",
  "Custom webhook pipelines and event-driven architectures",
  "Scheduled data sync and ETL pipelines between platforms",
  "Document generation, e-signature workflows, and approval chains",
  "Email and WhatsApp automation with conditional logic",
  "No-code workflow builders (n8n, Make, Zapier) for non-technical teams",
  "Internal automation dashboards with run history and error alerting",
];

const stack = [
  { name: "n8n", color: "#EA4B71" },
  { name: "Make", color: "#6D00CC" },
  { name: "Zapier", color: "#FF4A00" },
  { name: "Python", color: "#3776AB" },
  { name: "FastAPI", color: "#009688" },
  { name: "Celery", color: "#37814A" },
  { name: "Redis", color: "#DC382D" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Temporal", color: "#141414" },
  { name: "AWS Lambda", color: "#FF9900" },
  { name: "Webhooks", color: "#6366F1" },
  { name: "Resend", color: "#000" },
];

const caseStudies = [
  {
    title: "FinTrack — Automated Bookkeeping Pipeline",
    desc: "An automation pipeline that pulls bank transactions daily, categorises expenses using a fine-tuned classifier, reconciles against invoices in Zoho, and generates weekly P&L summaries — fully hands-free.",
    tags: ["Python", "Celery", "Redis", "Zoho API"],
  },
  {
    title: "HireFlow — Recruitment Workflow Automation",
    desc: "An n8n-based workflow that routes applications from LinkedIn and job boards, sends personalised acknowledgement emails, schedules interviews via Calendly, and updates the ATS record at each stage.",
    tags: ["n8n", "Calendly API", "Gmail", "PostgreSQL"],
  },
];

const faqs = [
  {
    q: "What's the difference between no-code automation and custom automation?",
    a: "No-code tools like n8n, Make, or Zapier are fast to set up and great for simple linear workflows. Custom automation (Python scripts, Celery workers, Temporal workflows) handles complex logic, high volumes, retries, and error recovery that no-code tools can't reliably manage. We recommend the right approach for your scale.",
  },
  {
    q: "Which systems can you integrate?",
    a: "Anything with an API — CRMs, ERPs, payment gateways, communication tools (Slack, WhatsApp, email), cloud storage, databases, and custom internal systems. If it has a webhook or REST API, we can connect it.",
  },
  {
    q: "How do you handle failures in automated workflows?",
    a: "Every automation we build includes retry logic, dead-letter queues for failed tasks, error alerting (Slack/email), and a run history dashboard so you can see exactly what ran, when, and why it failed.",
  },
  {
    q: "Can automation replace a team member?",
    a: "In many cases, yes — for repetitive, rule-based work. Our automations have replaced manual data entry, report generation, follow-up emails, and invoice reconciliation for clients. We scope the ROI before we build.",
  },
  {
    q: "How long does a typical automation project take?",
    a: "A single workflow (e.g., lead routing or invoice generation) takes 1–2 weeks. A full process automation suite covering multiple business functions takes 4–8 weeks.",
  },
];

export default function AutomationPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <Zap size={12} className="text-primary" />
                Automation
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Automate the work{" "}
                <span className="gradient-text">nobody wants to do</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                Business process automation that actually runs in production — with retries, error handling, and dashboards. Not just a Zap that breaks silently at 2am.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Discuss Your Workflow <ArrowRight size={15} />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">Workflows that run themselves</h2>
          </ScrollReveal>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <ScrollReveal delay={0.05}>
              <p>
                Automation at amfire means connecting your business systems — CRMs, databases, communication tools, payment gateways — and making them talk to each other without a human in the middle. We map your current manual processes, identify the bottlenecks, and replace them with reliable, observable workflows.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                We pick the right tool for the job: n8n or Make for fast visual workflows, Python and Celery for high-volume or complex logic, and Temporal for long-running multi-step processes that need guaranteed execution. Every automation is monitored, alerting you before a problem becomes a crisis.
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
            <p className="text-sm text-muted-foreground mb-8">Tools that power your automated workflows.</p>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Automations we've shipped</h2>
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
              Ready to automate your operations?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Tell us which manual process costs you the most time — we'll map the workflow and estimate the build within 48 hours.
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
