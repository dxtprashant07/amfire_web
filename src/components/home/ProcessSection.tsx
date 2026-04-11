import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSteps } from "@/config/home";

export function ProcessSection() {
  return (
    <section className="py-10 md:py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            eyebrow="How We Work"
            title="Milestone-Driven. No Surprises."
            description="Every project follows the same 7-step pipeline. You see progress at every stage — not just at the end."
            descriptionMb="mb-7 md:mb-10"
          />
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
  );
}
