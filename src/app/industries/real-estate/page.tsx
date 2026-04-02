import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Real Estate & PropTech",
  description: "Property listing portals, agent CRMs, AI valuation tools, and lead management platforms for real estate developers and brokers.",
};

const painPoints = [
  { title: "Leads lost in WhatsApp and Excel", desc: "Agents juggle inquiries across WhatsApp, email, and portals with no central system. Leads go cold because follow-ups are missed." },
  { title: "No live inventory visibility", desc: "Buyers can't see real availability. Agents manually update listings, leading to stale data and buyer frustration." },
  { title: "Slow, paper-heavy booking process", desc: "Token booking, agreement signing, and KYC are done offline. This delays deal closure and creates compliance risk." },
  { title: "Poor insights on which channels convert", desc: "Marketing spend goes to portals like 99acres and Housing with no data on which ones actually generate closed deals." },
];

const deliverables = [
  "Custom property listing portals with search, filters, and map view",
  "Agent and broker CRM with lead tracking and pipeline management",
  "AI-powered property valuation and price trend analysis",
  "Virtual tour and 3D floor plan integrations",
  "Online booking with token payment and agreement workflows",
  "Lead source attribution and marketing ROI dashboards",
  "Automated follow-up sequences via WhatsApp and email",
  "Developer project microsites with inventory availability",
];

const stack = [
  { name: "Next.js", color: "#000" },
  { name: "React Native", color: "#61DAFB" },
  { name: "Node.js", color: "#339933" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "PostGIS", color: "#336791" },
  { name: "Google Maps API", color: "#4285F4" },
  { name: "OpenAI", color: "#412991" },
  { name: "Razorpay", color: "#02042B" },
  { name: "AWS S3", color: "#FF9900" },
  { name: "Twilio", color: "#F22F46" },
  { name: "Redis", color: "#DC382D" },
];

const caseStudies = [
  {
    title: "PropEdge — Developer Sales Platform",
    desc: "Built a full-stack real estate sales platform for a tier-2 city developer — interactive floor plan selection, unit availability, token booking with Razorpay, WhatsApp lead follow-up automation, and a broker CRM with commission tracking.",
    tags: ["Next.js", "PostgreSQL", "Razorpay", "Twilio", "Google Maps"],
    result: "3x faster lead-to-booking conversion",
  },
  {
    title: "AgentIQ — AI Valuation & Lead CRM",
    desc: "An AI-powered CRM for real estate agents that scores leads by conversion probability, suggests follow-up timing based on past behaviour, and provides automated comparable property valuations.",
    tags: ["OpenAI", "FastAPI", "PostgreSQL", "React Native"],
    result: "28% increase in agent deal closure rate",
  },
];

const faqs = [
  {
    q: "Can you build a portal that competes with 99acres or Housing.com?",
    a: "Yes — we've built listing portals with full search, filters, map view, saved searches, and lead capture. For developer-specific portals, we add inventory management, booking flows, and agent assignment. The difference from aggregators is you own your data and lead funnel.",
  },
  {
    q: "How does AI property valuation work?",
    a: "We train models on historical transaction data, location attributes (proximity to schools, transit, amenities), and comparable listings. The model outputs price estimates with confidence ranges and trend direction — useful for buyer transparency and agent pitch materials.",
  },
  {
    q: "Can you integrate with RERA compliance requirements?",
    a: "We build with RERA disclosure requirements in mind — project registration display, carpet area transparency, and booking documentation workflows. Compliance requirements vary by state and we review them during scoping.",
  },
  {
    q: "Do you build for both residential and commercial real estate?",
    a: "Yes. Residential portals focus on search UX and buyer journey. Commercial real estate tools tend to focus more on leasing workflows, tenant CRM, and asset management dashboards. We've built for both.",
  },
  {
    q: "How long does a real estate platform take to build?",
    a: "A developer project microsite with booking takes 4–6 weeks. A full listing portal with agent CRM and AI valuation takes 12–18 weeks.",
  },
];

export default function RealEstatePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <Building2 size={12} className="text-primary" />
                Real Estate & PropTech
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                PropTech that{" "}
                <span className="gradient-text">closes deals faster</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                Listing portals, agent CRMs, AI valuation tools, and digital booking workflows — built for developers, brokers, and property managers who want to own their lead funnel.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Build Your PropTech Product <ArrowRight size={15} />
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">What real estate companies struggle with</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Real estate deliverables</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Technologies we use in Real Estate</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">PropTech products we've shipped</h2>
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Real estate questions answered</h2>
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
              Ready to build your real estate platform?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Tell us your property model — we'll scope the right platform and send a proposal within 48 hours.
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
