import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function CTASection() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 md:mb-6">
            Ready to build with <span className="gradient-text">amfire?</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg mb-7 md:mb-10 max-w-md mx-auto">
            Tell us what you&apos;re building. We&apos;ll put together a detailed proposal within 48 hours.
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
  );
}
