import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How amfire collects, uses, and protects your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground mb-10">
              Last updated: April 1, 2026
            </p>
          </ScrollReveal>

          <div className="prose-custom space-y-8">
            <ScrollReveal delay={0.05}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">1. Who We Are</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  amfire (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates the website{" "}
                  <a href="https://www.amfire.in" className="text-primary hover:underline">amfire.in</a>.
                  This policy explains how we collect, use, and protect your personal data when you visit our website or use our services.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">2. Information We Collect</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Contact form submissions:</strong> Name, email address, phone number (optional), company name (optional), project details, budget range, and timeline preference.</p>
                  <p><strong className="text-foreground">Newsletter subscriptions:</strong> Email address.</p>
                  <p><strong className="text-foreground">Automatically collected:</strong> IP address, browser type, device type, pages visited, and referral source — via cookies and analytics tools.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.11}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>To respond to your enquiries and prepare project proposals</li>
                  <li>To send our newsletter (only if you subscribe — you can unsubscribe any time)</li>
                  <li>To improve our website and services through anonymised analytics</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.14}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">4. Data Storage & Security</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your data is stored securely on our servers and third-party services (Supabase, Vercel). We use HTTPS encryption for all data in transit and encrypt sensitive data at rest. Access to personal data is restricted to authorised team members only.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.17}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">5. Cookies</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>We use the following types of cookies:</p>
                  <ul className="space-y-2 list-disc list-inside">
                    <li><strong className="text-foreground">Essential:</strong> Required for site functionality (e.g., dark mode preference, cookie consent).</li>
                    <li><strong className="text-foreground">Analytics:</strong> Help us understand how visitors use the site (e.g., page views, traffic sources). Only enabled with your consent.</li>
                  </ul>
                  <p>You can manage cookie preferences through the cookie banner or your browser settings.</p>
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">6. Third-Party Services</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We may share data with the following third-party services to operate our business: Supabase (database), Vercel (hosting), Resend (transactional email), and Google Analytics (anonymised analytics). These services have their own privacy policies and are GDPR-compliant.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.23}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">7. Your Rights</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Access, correct, or delete your personal data</li>
                  <li>Withdraw consent for data processing at any time</li>
                  <li>Request a copy of your data in a portable format</li>
                  <li>Object to processing based on legitimate interests</li>
                  <li>Lodge a complaint with a data protection authority</li>
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.26}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">8. Data Retention</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Contact form submissions are retained for up to 24 months. Newsletter subscriptions are retained until you unsubscribe. Analytics data is anonymised and retained for 14 months.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.29}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We may update this policy from time to time. Changes will be posted on this page with an updated &quot;last updated&quot; date. We encourage you to review this page periodically.
                </p>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={0.32}>
              <section>
                <h2 className="text-lg font-semibold text-foreground mb-3">10. Contact Us</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you have any questions about this privacy policy or your personal data, please contact us at{" "}
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
