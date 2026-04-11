import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";

export function TestimonialsSection() {
  return (
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
  );
}
