import type { Metadata } from "next";
import { Mail, ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | amfire",
  description:
    "Tell us about your project. We'll respond within 48 hours with a detailed proposal.",
};

export default function ContactPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="amfire-wrap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* ── Left: Info ─────────────────────────────────────── */}
          <div>
            <ScrollReveal>
              <p className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
                Contact
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                Let's build{" "}
                <span className="gradient-text">together.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
                Tell us about your project. We'll respond within 48 hours with a detailed proposal on how we can help.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="mt-12 space-y-6">
                <a
                  href="mailto:contact@amfire.in"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-medium">contact@amfire.in</span>
                </a>
                <a
                  href="https://amfire.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                    <ArrowUpRight size={18} className="text-foreground" />
                  </div>
                  <span className="text-sm font-medium">amfire.in</span>
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-12 space-y-4">
                <h3 className="text-sm font-semibold text-foreground">What happens next?</h3>
                {[
                  "We review your message within 24 hours",
                  "A proposal lands in your inbox within 48 hours",
                  "Kickoff call scheduled at your convenience",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {i + 1}
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* ── Right: Form ────────────────────────────────────── */}
          <ScrollReveal delay={0.15} direction="right">
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
