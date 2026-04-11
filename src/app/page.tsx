import { HeroSection } from "@/components/home/HeroSection";
import { TrustedBy } from "@/components/home/TrustedBy";
import { PricingSection } from "@/components/home/PricingSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { CaseStudySection } from "@/components/home/CaseStudySection";
import { WhyAmfireSection } from "@/components/home/WhyAmfireSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <PricingSection />
      <ServicesSection />
      <CaseStudySection />
      <WhyAmfireSection />
      <ProcessSection />
      <TestimonialsSection />
      <IndustriesSection />
      <CTASection />
    </>
  );
}
