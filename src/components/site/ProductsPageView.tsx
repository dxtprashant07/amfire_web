import type { T } from "@/content/get-text";

export function ProductsPageView({ t }: { t: T }) {
  return (
    <div className="page active" id="products">
    <section className="hero hero-sub"><div className="wrap" style={{textAlign:'center',maxWidth:'760px'}}>
    <h1 className="h-lg" style={{lineHeight:'1.08'}}>{t('products.we-don-t-just-build-for')}<br /><span className="fire-text">{t('products.we-build-for-the-world')}</span></h1>
    <p style={{fontSize:'14px',color:'var(--fg-muted)',background:'var(--surface-card)',border:'1px solid var(--border-default)',display:'inline-block',padding:'11px 20px',borderRadius:'100px',marginTop:'20px',boxShadow:'var(--shadow-sm)'}}>{t('products.services-build-custom-solutions-for-your')} <span className="link" data-go="services">{t('products.view-services')}</span></p>
    </div></section>
    <section className="sec sec-md"><div className="wrap hero-grid">
    <div>
    <span className="live-tag"><span className="d"></span>{t('products.live')}</span>
    <h2 className="h-md">{t('products.ai-career-copilot')}</h2>
    <p className="lede">{t('products.ai-powered-career-roadmap-generator-for')}</p>
    <div className="btn-row"><span className="btn pri">{t('products.try-the-beta')}</span><span className="btn gho">{t('products.watch-demo')}</span></div>
    <div className="pstats-4"><div><b>{t('products.1-400')}</b><br /><small>{t('products.career-paths')}</small></div><div><b>{t('products.12')}</b><br /><small>{t('products.skill-domains')}</small></div><div><b>{t('products.2-5s')}</b><br /><small>{t('products.response')}</small></div><div><b>{t('products.92')}</b><br /><small>{t('products.accuracy')}</small></div></div>
    </div>
    <div style={{display:'flex',justifyContent:'center'}}><div className="phone"><div className="scr">
    <div className="chat-b">{t('products.hi-what-class-are-you-in')}</div>
    <div className="chat-b me">{t('products.class-11-pcm')}</div>
    <div className="chat-b">{t('products.interested-in-ai-or-core-engineering')}</div>
    <div className="chat-b me">{t('products.ai-definitely')}</div>
    <div className="chat-b" style={{width:'88%'}}>{t('products.here-s-a-roadmap-b-tech')}</div>
    <div className="chat-b me" style={{width:'46%'}}>{t('products.amazing-thank-you')}</div>
    </div></div></div>
    </div></section>
    <section className="sec alt" style={{textAlign:'center'}}><div className="wrap" style={{maxWidth:'680px'}}>
    <h3 style={{fontSize:'20px',fontWeight:'800'}}>{t('products.more-products-in-the-works')}</h3>
    <p style={{color:'var(--fg-muted)',marginTop:'8px'}}>{t('products.we-re-turning-the-problems-we')}</p>
    <div className="btn-row" style={{justifyContent:'center'}}><span className="btn gho">{t('products.join-the-waitlist')}</span><span className="btn pri" data-go="contact">{t('products.talk-white-label-custom')}</span></div>
    </div></section>
    </div>
    
  );
}
