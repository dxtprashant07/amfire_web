import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { AnimatedTagline } from "@/components/home/AnimatedTagline";
import { HeroBackground } from "@/components/home/HeroBackground";
import { stats } from "@/config/home";

export function HeroSection() {
  return (
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
  );
}
