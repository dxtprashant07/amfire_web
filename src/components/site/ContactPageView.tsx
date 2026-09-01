import type { T } from "@/content/get-text";
import { ContactWizard } from "./ContactWizard";
import { wizardCopy } from "./wizard-copy";

export function ContactPageView({ t }: { t: T }) {
  return (
    <div className="page active" id="contact">
    <section className="sec sec-md"><div className="wrap csplit">
    <div>
    <span className="eyebrow">{t('contact.contact')}</span>
    <h1 className="h-lg">{t('contact.let-s-build')} <span className="fire-text">{t('contact.together')}</span>.</h1>
    <p className="lede">{t('contact.tell-us-about-your-project-we')}</p>
    <div className="wa"><div className="d">💬</div><div><b>{t('contact.prefer-whatsapp')}</b><small>{t('contact.message-us-and-we-ll-reply')}</small></div><span className="link" style={{marginLeft:'auto'}}>{t('contact.chat')}</span></div>
    <div style={{marginTop:'28px'}}><a className="link" style={{display:'block',marginBottom:'10px'}}>{t('contact.contact-amfire-in')}</a><a className="link" style={{display:'block'}}>{t('contact.amfire-in')}</a></div>
    <div style={{marginTop:'36px'}}>
    <h3 style={{fontSize:'13px',fontWeight:'700',marginBottom:'16px',textTransform:'uppercase',letterSpacing:'.08em',color:'var(--fg-muted)'}}>{t('contact.what-happens-next')}</h3>
    <div className="stepn"><span>1</span>{t('contact.we-review-your-message-within-24')}</div>
    <div className="stepn"><span>2</span>{t('contact.a-detailed-proposal-lands-in-your')}</div>
    <div className="stepn"><span>3</span>{t('contact.kickoff-scheduled-async-or-over-chat')}</div>
    </div>
    </div>
    <ContactWizard copy={wizardCopy(t)} />
    </div></section>
    </div>
    
  );
}
