import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TrustedBy } from "@/components/home/TrustedBy";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { AnimatedTagline } from "@/components/home/AnimatedTagline";
import { HeroBackground } from "@/components/home/HeroBackground";
import { ServicesCarousel } from "@/components/home/ServicesCarousel";
import { ServicesCarouselDesktop } from "@/components/home/ServicesCarouselDesktop";
import { CaseStudyCarousel } from "@/components/home/CaseStudyCarousel";
import { IndustryCard } from "@/components/home/IndustryCard";
import { WhyAmfireCards } from "@/components/home/WhyAmfireCards";
import { stats, services, differentiators, processSteps, industries } from "@/data/home";

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-28">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5 md:mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                Available for new projects
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-3 md:mb-5">
                AI-First Digital Solutions
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-foreground">
                Build products{" "}
                <AnimatedTagline />
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-5 md:mt-8 text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
                We build end-to-end digital products — from the first pixel to the deployed AI agent running in production. Custom platforms, mobile apps, autonomous agents, and agentic workflows.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-6 md:mt-10 flex flex-wrap gap-3 md:gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg gradient-bg text-white text-sm md:text-base font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all duration-200">
                  Start a Conversation
                  <ArrowRight size={15} />
                </Link>
                <Link href="/services" className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg border border-border text-foreground text-sm md:text-base font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all duration-200">
                  Explore Services
                </Link>
              </div>
            </ScrollReveal>

            {/* Stats strip */}
            <ScrollReveal delay={0.4}>
              <div className="mt-8 md:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-sm sm:max-w-xl">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
        <HeroBackground />
      </section>

      {/* ── Trusted By ───────────────────────────────────────────── */}
      <TrustedBy />

      {/* ── Pricing ──────────────────────────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-3 md:mb-4 text-center">Pricing</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 md:mb-4 text-center">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-xl mx-auto text-center mb-8 md:mb-12">
              Every project is milestone-based — you pay in stages, never upfront. Pick the tier that fits your scope.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              {
                tier: "Starter",
                price: "Under ₹1L",
                desc: "Landing pages, portfolios, simple automation scripts, and MVP prototypes.",
                features: ["1–2 week delivery", "1 revision round", "Basic SEO setup", "Deployment included"],
                cta: "Get a Quote",
                highlight: false,
              },
              {
                tier: "Growth",
                price: "₹1L – ₹3L",
                desc: "Full-featured web apps, mobile apps, or AI integrations for early-stage startups.",
                features: ["3–6 week delivery", "2 revision rounds", "Analytics integration", "3 months post-launch support"],
                cta: "Get a Quote",
                highlight: false,
              },
              {
                tier: "Scale",
                price: "₹3L – ₹10L",
                desc: "Complex SaaS platforms, multi-role apps, and production AI agents.",
                features: ["6–12 week delivery", "Unlimited revisions", "Full QA & testing", "6 months post-launch support"],
                cta: "Get a Quote",
                highlight: true,
              },
              {
                tier: "Enterprise",
                price: "₹10L+",
                desc: "End-to-end digital transformation, multi-product builds, and ongoing retainers.",
                features: ["Custom timeline", "Dedicated team", "DevOps & infra", "12 months support"],
                cta: "Let's Talk",
                highlight: false,
              },
            ].map((plan, i) => (
              <ScrollReveal key={plan.tier} delay={i * 0.08}>
                <div className={`relative rounded-2xl border p-6 h-full flex flex-col transition-all duration-300 hover:shadow-lg ${plan.highlight ? "border-primary/50 bg-card shadow-md shadow-primary/10" : "border-border bg-card hover:border-primary/25"}`}>
                  {plan.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-3 py-1 rounded-full gradient-bg text-white text-xs font-semibold">Most Popular</span>
                    </div>
                  )}
                  <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-2">{plan.tier}</p>
                  <p className="text-2xl font-bold text-foreground mb-3">{plan.price}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{plan.desc}</p>
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-4 h-4 rounded-full gradient-bg flex items-center justify-center shrink-0 mt-0.5">
                          <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className={`block w-full text-center py-2.5 rounded-lg text-sm font-medium transition-all active:scale-[0.97] ${plan.highlight ? "gradient-bg text-white hover:opacity-90" : "border border-border text-foreground hover:bg-secondary/50 hover:border-primary/30"}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <p className="text-center text-xs text-muted-foreground mt-8">
              All prices in INR. Milestone-based payment — 20% to kick off, rest on delivery stages.{" "}
              <Link href="/pricing" className="text-primary hover:underline">See full pricing details →</Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Services (What We Build) ─────────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-3 md:mb-4">What We Build</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
              Full-stack. AI-native.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-lg mb-8 md:mb-10">
              One team. Frontend, backend, AI, deployment — no handoff gaps.
            </p>
          </ScrollReveal>

          {/* Mobile: 1-card carousel */}
          <div className="md:hidden">
            <ServicesCarousel
              cards={services.map((s) => ({
                href: s.href,
                icon: <s.icon size={20} className="text-white" />,
                title: s.title,
                description: s.description,
              }))}
            />
          </div>

          {/* Desktop: 3-card sliding carousel */}
          <div className="hidden md:block">
            <ServicesCarouselDesktop
              cards={services.map((s) => ({
                href: s.href,
                icon: <s.icon size={20} className="text-white" />,
                title: s.title,
                description: s.description,
              }))}
            />
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 md:mt-12 text-center">
              <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                View all services <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Featured Case Study ───────────────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-3 md:mb-4">Case Study</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-7 md:mb-10">
              Recent work
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <CaseStudyCarousel />
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-6 md:mt-8 text-center">
              <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                See all case studies <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Why amfire ───────────────────────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
            <div>
              <ScrollReveal>
                <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-3 md:mb-4">Why amfire</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 md:mb-6">
                  What makes us <span className="gradient-text">different</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base lg:text-lg leading-relaxed max-w-md">
                  Most agencies hand off a codebase and disappear. We stay. Your product is our product until it succeeds.
                </p>
              </ScrollReveal>
            </div>
            <WhyAmfireCards
              cards={differentiators.map((d) => ({
                title: d.title,
                description: d.description,
                icon: <d.icon size={20} className="text-white" />,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ── How We Work (Process) ────────────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <p className="text-xs sm:text-sm font-medium text-primary tracking-wider uppercase mb-3 md:mb-4">How We Work</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
              Milestone-Driven. No Surprises.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-lg mb-7 md:mb-10">
              Every project follows the same 7-step pipeline. You see progress at every stage — not just at the end.
            </p>
          </ScrollReveal>

          <div className="relative">
            <div className="absolute left-[19px] top-4 bottom-4 w-px bg-border hidden md:block" />
            {processSteps.map((phase, i) => (
              <ScrollReveal key={phase.step} delay={i * 0.08}>
                <div className="flex items-start gap-4 md:gap-5 py-2.5 md:py-3 group cursor-default">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full gradient-bg flex items-center justify-center shrink-0 text-white text-xs font-bold relative z-10 group-hover:scale-110 transition-transform duration-200">
                    {phase.step}
                  </div>
                  <div className="flex items-center h-9 md:h-10">
                    <h4 className="text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{phase.title}</h4>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
              What our clients say
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-7 md:mb-10">
              From startups to enterprises — built with care, shipped with confidence.
            </p>
          </ScrollReveal>
          <TestimonialsCarousel />
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3 md:mb-4">
              Industries we serve
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-lg mb-7 md:mb-10">
              Built for every sector that runs on software.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 overflow-visible">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.06} className="h-full overflow-visible">
                <IndustryCard
                  href={ind.href}
                  name={ind.name}
                  icon={<ind.icon size={18} className="text-white" />}
                  useCases={ind.useCases}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────── */}
      <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 md:mb-6">
              Ready to build with <span className="gradient-text">amfire?</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-7 md:mb-10 max-w-md mx-auto">
              Tell us what you're building. We'll put together a detailed proposal within 48 hours.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg gradient-bg text-white text-sm md:text-base font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all duration-200">
                Get a Free Proposal <ArrowRight size={15} />
              </Link>
              <Link href="/work" className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg border border-border text-foreground text-sm md:text-base font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all duration-200">
                See Our Work
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
