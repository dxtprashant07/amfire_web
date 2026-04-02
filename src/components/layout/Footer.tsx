import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { footerServicesLinks, footerCompanyLinks } from "@/constants/navigation";

function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 md:w-4 md:h-4" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 py-7 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">

          {/* Brand — full row on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-3 md:space-y-4">
            <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight inline-block">
              <span className="text-foreground">am</span>
              <span className="gradient-text">fire</span>
            </Link>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-xs">
              AI-First Digital Solutions. Complete software, real intelligence.
            </p>
            <div className="flex items-center gap-3 pt-0.5">
              <a href="https://twitter.com/amfire_in" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><IconTwitter /></a>
              <a href="https://linkedin.com/company/amfire" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors"><IconLinkedin /></a>
              <a href="https://github.com/amfire-in" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><IconGithub /></a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-2.5 md:space-y-4">
            <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">Services</h4>
            <div className="flex flex-col gap-2 md:gap-3">
              {footerServicesLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-2.5 md:space-y-4">
            <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">Company</h4>
            <div className="flex flex-col gap-2 md:gap-3">
              {footerCompanyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors w-fit">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact + Newsletter — full row on mobile */}
          <div className="col-span-2 md:col-span-1 space-y-2.5 md:space-y-4">
            <h4 className="text-xs md:text-sm font-semibold text-foreground uppercase tracking-wider">Get in Touch</h4>
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 md:flex-col md:gap-3">
              <a href="mailto:contact@amfire.in" className="flex items-center gap-1.5 text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail size={13} />contact@amfire.in
              </a>
              <a href="https://www.amfire.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors">
                www.amfire.in<ArrowUpRight size={11} />
              </a>
            </div>
            <div className="pt-2 border-t border-border space-y-1.5 md:space-y-2">
              <p className="text-[10px] md:text-xs font-semibold text-foreground uppercase tracking-wider pt-1.5 md:pt-2">Stay updated</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">Insights on AI, builds, and what we&apos;re shipping.</p>
              <NewsletterForm />
            </div>
          </div>

        </div>

        <div className="mt-6 md:mt-8 pt-4 md:pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
          <p className="text-[10px] md:text-xs text-muted-foreground">
            © {new Date().getFullYear()} amfire. All rights reserved.
          </p>
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/privacy-policy" className="text-[10px] md:text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-[10px] md:text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
