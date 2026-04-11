import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhyAmfireCards } from "@/components/home/WhyAmfireCards";
import { differentiators } from "@/config/home";

export function WhyAmfireSection() {
  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-start">
          <div>
            <ScrollReveal>
              <SectionHeader
                eyebrow="Why amfire"
                title={<>What makes us <span className="gradient-text">different</span></>}
                description="Most agencies hand off a codebase and disappear. We stay. Your product is our product until it succeeds."
                titleMb="mb-4 md:mb-6"
                descriptionMaxW="max-w-md"
                descriptionMb="leading-relaxed"
              />
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
  );
}
