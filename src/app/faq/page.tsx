import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to the most common questions about working with amfire — scoping, pricing, timelines, IP ownership, and more.",
};

const categories = [
  {
    title: "Getting Started",
    faqs: [
      {
        q: "How do I start a project with amfire?",
        a: "Fill in the contact form at /contact — tell us what you're building, your rough budget range, and your timeline. We'll schedule a 30-minute discovery call within 24 hours, then send a detailed proposal within 48 hours of the call.",
      },
      {
        q: "Do you work with early-stage founders who don't have a fully defined idea?",
        a: "Yes, often. A significant portion of our projects start from a rough idea or a problem statement rather than a detailed spec. Discovery is the first phase of every engagement — we help you shape the scope before any code is written.",
      },
      {
        q: "Can I see examples of your past work?",
        a: "Yes — visit /work for case studies. We detail the problem, solution, tech stack, and outcomes for each project. We also share live demos during the proposal call for relevant past projects.",
      },
      {
        q: "Do you sign NDAs?",
        a: "Yes. We sign mutual NDAs before any sensitive project discussions. For enterprise clients, we also sign MSAs with custom terms. Just ask and we'll send the paperwork.",
      },
    ],
  },
  {
    title: "Scoping & Timelines",
    faqs: [
      {
        q: "How long does it take to build an MVP?",
        a: "A focused MVP — 4–6 core screens, auth, one primary feature, and deployment — typically takes 4–8 weeks. Timeline depends on design complexity, number of integrations, and whether AI features are involved.",
      },
      {
        q: "What if my requirements change during the project?",
        a: "Scope is locked at kickoff. If you want to add or change features mid-project, we scope the change, price it, and you approve before we build it. We never add billable work without your explicit sign-off.",
      },
      {
        q: "How do you handle project delays?",
        a: "If we miss a milestone due to our own capacity or execution, we absorb the cost and deliver at no extra charge. If delays are caused by late feedback or approval from your side, the timeline shifts accordingly — we'll always communicate this clearly in advance.",
      },
      {
        q: "Can you work with a deadline I have in mind?",
        a: "We scope to your deadline. If the full feature set can't be built in time, we'll recommend what to include in v1 to hit the date and what to push to v2.",
      },
    ],
  },
  {
    title: "Pricing & Payments",
    faqs: [
      {
        q: "How does your pricing work?",
        a: "We price per project, not per hour. Every engagement has a fixed total fee split into 4 milestone payments: 20% at kickoff, 30% at design approval, 25% at build completion, 25% at final delivery.",
      },
      {
        q: "Do you charge hourly or fixed-price?",
        a: "Fixed-price for project engagements. This means you know exactly what you'll pay before we start. We also offer monthly retainers for ongoing development at a fixed monthly rate.",
      },
      {
        q: "What's included in the project fee?",
        a: "Design, development, deployment, testing, and a 60-day post-launch support window. Infrastructure costs (AWS, database hosting, third-party APIs) are billed separately at cost.",
      },
      {
        q: "Is GST applicable?",
        a: "Yes — 18% GST is applicable on all invoices for Indian clients. Prices shown on our site are exclusive of GST. International clients are invoiced in USD without GST.",
      },
    ],
  },
  {
    title: "IP & Ownership",
    faqs: [
      {
        q: "Who owns the code after the project?",
        a: "You do — 100%. On final payment, we transfer all source code, design files, database schemas, infrastructure credentials, and third-party API keys. We retain no rights or access.",
      },
      {
        q: "Can I modify the code after delivery?",
        a: "Completely. You receive the full source code with no licence restrictions. You can modify, extend, or hand it to another developer at any time.",
      },
      {
        q: "Do you reuse code across client projects?",
        a: "We use our own internal component libraries and boilerplates (which we own), but all custom business logic, architecture, and product-specific code is written exclusively for you and transferred fully on delivery.",
      },
    ],
  },
  {
    title: "Technology",
    faqs: [
      {
        q: "Which tech stack do you use?",
        a: "Our default stack is Next.js + TypeScript for web, React Native for mobile, and Node.js or FastAPI for the backend, with PostgreSQL or MongoDB. For AI, we work with OpenAI, Anthropic, LangChain, and pgvector. We adapt based on project requirements.",
      },
      {
        q: "Can you work with our existing codebase?",
        a: "Yes. We regularly take over and extend existing products. We'll do a code audit first to understand the architecture, then propose the best approach — whether that's incremental improvement or a targeted rebuild.",
      },
      {
        q: "Do you provide hosting and infrastructure?",
        a: "We set up and configure your cloud infrastructure (AWS, GCP, or Vercel), but the accounts are in your name and you pay the bills directly. We don't mark up infrastructure costs.",
      },
      {
        q: "Can you build for both web and mobile at the same time?",
        a: "Yes — we frequently build a web app and React Native mobile app in parallel, sharing the same backend and API layer. This is often more efficient than building them sequentially.",
      },
    ],
  },
  {
    title: "Post-Launch & Support",
    faqs: [
      {
        q: "What happens after the project is delivered?",
        a: "Every project includes a 60-day post-launch support window — bug fixes and minor UI adjustments at no extra charge. After 60 days, we offer monthly retainer engagements for ongoing development and support.",
      },
      {
        q: "What's covered under post-launch support?",
        a: "Bug fixes for issues introduced by our code, minor UI adjustments, and deployment troubleshooting. Feature additions, third-party API changes, and new integrations are out of scope and quoted separately.",
      },
      {
        q: "Do you offer SLAs for enterprise clients?",
        a: "Yes — enterprise retainer agreements include custom SLAs for response time, uptime monitoring, and incident escalation. Details are agreed in the MSA before the project starts.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-4">FAQ</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5">
                Questions,{" "}
                <span className="gradient-text">answered</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                Everything you need to know about working with amfire — scoping, pricing, timelines, IP ownership, and more.
              </p>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* FAQ Categories */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <div className="space-y-14">
            {categories.map((cat, ci) => (
              <ScrollReveal key={cat.title} delay={ci * 0.05}>
                <div>
                  <h2 className="text-lg font-bold text-foreground mb-5 pb-3 border-b border-border">{cat.title}</h2>
                  <div className="space-y-3">
                    {cat.faqs.map((faq, i) => (
                      <div key={i} className="p-5 rounded-xl border border-border bg-card hover:border-primary/20 transition-all">
                        <h3 className="text-sm font-semibold text-foreground mb-2">{faq.q}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-14 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Still have a question?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              We're happy to answer anything on a quick call. Book a 30-minute intro or just send a message.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                Get in Touch <ArrowRight size={15} />
              </Link>
              <Link href="/how-we-work" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                How We Work
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
