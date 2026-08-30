import Link from "next/link";
import type { T } from "@/content/get-text";
import { FooterNewsletter } from "./FooterNewsletter";
import { wizardCopy } from "./wizard-copy";

export function SiteFooter({ t }: { t: T }) {
  return (
    <footer className="foot"><div className="wrap">
    <div className="foot-top">
    <div><div className="brand">{t('footer.am')}<span style={{color:'var(--color-orange)'}}>{t('footer.fire')}</span></div><p className="desc">{t('footer.ai-first-digital-solutions-complete-software')}</p></div>
    <div className="foot-news"><h5>{t('footer.stay-in-the-loop')}</h5><p className="desc">{t('footer.insights-on-ai-builds-and-what')}</p><FooterNewsletter placeholder={t('footer.your-email-com')} copy={wizardCopy(t)} /></div>
    </div>
    <div className="foot-grid">
    <div>
    <div className="socials">
    <i><svg viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20" /></svg></i>
    <i><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4" /></svg></i>
    <i><svg viewBox="0 0 24 24"><path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.6 11.6 0 0 0-6 0C6.3 2.3 5.3 2.6 5.3 2.6a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" /></svg></i>
    </div>
    </div>
    <div><h5>{t('footer.services')}</h5><a data-go="services">{t('footer.web-development')}</a><a data-go="services">{t('footer.mobile-apps')}</a><a data-go="services">{t('footer.ai-agents')}</a><a data-go="services">{t('footer.automation')}</a><a data-go="services">{t('footer.cloud-devops')}</a></div>
    <div><h5>{t('footer.company')}</h5><a data-go="about">{t('footer.about')}</a><a data-go="work">{t('footer.work')}</a><a data-go="products">{t('footer.products')}</a><a data-go="pricing">{t('footer.pricing')}</a><a data-go="contact">{t('footer.contact')}</a><Link href="/login">{t('footer.client-login')}</Link></div>
    <div><h5>{t('footer.get-in-touch')}</h5><a>{t('footer.contact-amfire-in')}</a><a>{t('footer.amfire-in')}</a></div>
    </div>
    <div className="foot-bot"><span>{t('footer.2026-amfire-all-rights-reserved')}</span><span>{t('footer.privacy-policy-terms-of-service')}</span></div>
    </div></footer>
    
  );
}
