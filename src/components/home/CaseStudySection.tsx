import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CaseStudyCarousel } from "@/components/home/CaseStudyCarousel";

export function CaseStudySection() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Case Study"
            title="Recent work"
            titleMb="mb-7 md:mb-10"
          />
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
  );
}
