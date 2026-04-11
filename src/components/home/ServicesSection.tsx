import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ServicesCarousel } from "@/components/home/ServicesCarousel";
import { ServicesCarouselDesktop } from "@/components/home/ServicesCarouselDesktop";
import { services } from "@/config/home";

export function ServicesSection() {
  return (
    <section className="py-10 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <SectionHeader
            eyebrow="What We Build"
            title="Full-stack. AI-native."
            description="One team. Frontend, backend, AI, deployment — no handoff gaps."
          />
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
  );
}
