import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pricingPlans } from "@/config/pricing";

export function PricingSection() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Pricing"
            title="Simple, transparent pricing"
            description="Every project is milestone-based — you pay in stages, never upfront. Pick the tier that fits your scope."
            align="center"
            descriptionMaxW="max-w-xl"
            descriptionMb="mb-8 md:mb-12"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {pricingPlans.map((plan, i) => (
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
  );
}
