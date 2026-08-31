import React from 'react';
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { cn } from '@/lib/cn';
import NewsletterForm from "./NewsletterForm";
function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
    </svg>
  );
}

function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/amfire-ai", icon: IconLinkedin },
  { label: "GitHub", href: "https://github.com/amfire-in", icon: IconGithub },
];

const footerServicesLinks = [
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "Custom Software", href: "/services/custom-software" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Automation", href: "/services/automation" },
];

const footerCompanyLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
];

export function Footer() {
  return (
    <footer className="bg-[#0b0d10] text-[#f5f1ec]">
      <div className="amfire-wrap py-12 md:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.9fr]">
          <div>
            <Link href="/" aria-label="amfire home" className="text-3xl font-extrabold tracking-[-0.04em]">
              am<span className="text-[#f97316]">fire</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              AI-first digital solutions. Complete software, real intelligence, built end to end in India.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="grid h-9 w-9 place-items-center rounded-[9px] bg-white/8 text-white/65 transition-colors hover:bg-[#f97316] hover:text-white"
                >
                  <item.icon />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[20px] border border-white/10 bg-white/[0.04] p-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em]">Stay in the loop</h3>
            <p className="mt-3 text-sm leading-6 text-white/60">Insights on AI, builds, and what we are shipping.</p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Services</h4>
            <div className="mt-4 flex flex-col gap-3">
              {footerServicesLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit text-sm text-white/55 transition-colors hover:text-[#f97316]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Company</h4>
            <div className="mt-4 flex flex-col gap-3">
              {footerCompanyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit text-sm text-white/55 transition-colors hover:text-[#f97316]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Get in touch</h4>
            <div className="mt-4 flex flex-col gap-3">
              <a href="mailto:contact@amfire.in" className="flex w-fit items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#f97316]">
                <Mail size={14} />
                contact@amfire.in
              </a>
              <a href="https://www.amfire.in" target="_blank" rel="noopener noreferrer" className="flex w-fit items-center gap-2 text-sm text-white/55 transition-colors hover:text-[#f97316]">
                amfire.in
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          <div className="rounded-[16px] border border-white/10 p-5">
            <p className="text-sm font-semibold leading-6">Tell us what you are building. We will reply within 48 hours with a milestone plan.</p>
            <Link href="/contact" className="mt-4 inline-flex rounded-[9px] bg-white px-4 py-2.5 text-sm font-bold text-[#14110f] transition-colors hover:bg-[#fff1e9]">
              Get a Proposal
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} amfire. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-[#f97316]">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-[#f97316]">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
