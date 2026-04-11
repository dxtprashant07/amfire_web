import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { IndustryCard } from "@/components/home/IndustryCard";
import { industries } from "@/config/home";

export function IndustriesSection() {
  return (
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
  );
}
