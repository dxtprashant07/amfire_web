import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of amfire's website and services.",
};

export default function TermsOfServicePage() {
  return (
    <>
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-muted-foreground mb-10">
              Last updated: April 1, 2026
            </p>
          </ScrollReveal>

          <div className="prose-custom space-y-8">
            <ScrollReveal delay={0.05}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">1. Agreement to Terms</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  By accessing or using the amfire website (<a href="https://www.amfire.in" className="text-primary hover:underline">amfire.in</a>), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our website or services.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">2. Services</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  amfire provides custom software development, UI/UX design, AI integration, automation, and cloud infrastructure services. All project engagements are governed by a separate Statement of Work (SOW) or project proposal that is mutually agreed upon before development begins.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.11}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">3. Intellectual Property</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Website content:</strong> All content on this website — text, graphics, logos, designs, and code — is the property of amfire and protected by intellectual property laws.</p>
                  <p><strong className="text-foreground">Client deliverables:</strong> Upon full payment, 100% of the source code, design files, and deployment credentials for your project are transferred to you. amfire retains no proprietary claims on delivered work.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">4. Use of Website</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>You may not use this website for any unlawful purpose</li>
                  <li>You may not attempt to gain unauthorised access to any part of the website or its systems</li>
                  <li>You may not scrape, crawl, or use automated tools to extract content without written permission</li>
                  <li>You may not submit false or misleading information through our forms</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.17}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">5. Payment Terms</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All project payments follow the milestone schedule defined in the project proposal. amfire uses milestone-based billing — you pay only when agreed deliverables are completed and approved. Late payments beyond 15 days may result in project pauses until the balance is cleared.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">6. Post-Launch Support</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All projects include a 60-day post-launch support window. During this period, bug fixes and minor adjustments are included at no additional cost. Feature additions, redesigns, or scope changes beyond the original SOW are quoted separately.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.23}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  amfire shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.26}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">8. Confidentiality</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Both parties agree to keep confidential any proprietary information shared during the course of a project engagement. This includes but is not limited to business plans, technical specifications, user data, and trade secrets. NDAs are available upon request.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.29}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">9. Termination</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Either party may terminate a project engagement with 14 days written notice. In the event of termination, the client pays for all work completed up to the termination date. All delivered code and assets remain the client&apos;s property.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.32}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">10. Changes to These Terms</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We reserve the right to update these terms at any time. Changes will be posted on this page with an updated &quot;last updated&quot; date. Continued use of the website after changes constitutes acceptance of the new terms.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.35}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">11. Governing Law</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  These terms are governed by the laws of India. Any disputes shall be resolved through arbitration in accordance with the Arbitration and Conciliation Act, 1996.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.38}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">12. Contact</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you have any questions about these terms, contact us at{" "}
                  <a href="mailto:contact@amfire.in" className="text-primary hover:underline">contact@amfire.in</a>{" "}
                  or use our <Link href="/contact" className="text-primary hover:underline">contact form</Link>.
                </p>
              </section>
            </ScrollReveal>
          </div>
        </div>
      </section>

    </>
  );
}
