import Link from "next/link";
import type { T } from "@/content/get-text";

export function SiteNav({ t }: { t: T }) {
  return (
    <div className="nav" id="navbar"><div className="wrap">
    <div className="brand" data-go="home">{t('nav.am')}<span className="f">{t('nav.fire')}</span></div>
    <div className="nlinks" id="nav-links">
    <a data-go="home">{t('nav.home')}</a><a data-go="services">{t('nav.services')}</a><a data-go="products">{t('nav.products')}</a><a data-go="work">{t('nav.work')}</a><a data-go="pricing">{t('nav.pricing')}</a><a data-go="about">{t('nav.about')}</a><a data-go="contact">{t('nav.contact')}</a><Link href="/login" className="nav-login">{t('nav.client-login')}</Link>
    </div>
    <span className="nav-cta" data-go="contact">{t('nav.get-a-proposal')}</span>
    <button type="button" className="nav-burger" id="nav-burger" aria-label="Menu" aria-expanded="false" aria-controls="nav-links"><i /><i /><i /></button>
    </div></div>
  );
}
