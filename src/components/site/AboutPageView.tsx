import type { T } from "@/content/get-text";

export function AboutPageView({ t }: { t: T }) {
  return (
    <div className="page active" id="about">
    <section className="hero hero-sub"><div className="wrap hero-grid">
    <div>
    <span className="eyebrow">{t('about.about-us')}</span>
    <h1 className="h-lg">{t('about.one-team-full')} <span className="fire-text">{t('about.accountability')}</span>.</h1>
    <p className="lede">{t('about.we-re-an-ai-engineering-team')}</p>
    <div className="btn-row"><span className="btn pri" data-go="work">{t('about.see-our-work')}</span><span className="btn gho" data-go="contact">{t('about.start-a-conversation')}</span></div>
    </div>
    <div className="portal" style={{transform:'rotate(-.6deg)'}}><div className="bar"><i></i><i></i><i></i><b>{t('about.what-we-stand-for')}</b></div><div className="body">
    <div className="p-row"><h5 style={{fontSize:'14px'}}>{t('about.real-ai-in-production')}</h5><span className="chip">✓</span></div>
    <div className="p-row"><h5 style={{fontSize:'14px'}}>{t('about.full-stack-ownership')}</h5><span className="chip">✓</span></div>
    <div className="p-row"><h5 style={{fontSize:'14px'}}>{t('about.100-ip-to-you')}</h5><span className="chip">✓</span></div>
    <div className="mini-orbs" style={{marginTop:'8px'}}><span className="on"></span><span className="on"></span><span className="on"></span><span className="on"></span></div>
    </div></div>
    </div></section>
    <section className="sec sec-md"><div className="wrap" style={{maxWidth:'920px'}}>
    <div className="head-l"><span className="label">{t('about.why-amfire')}</span><h2 className="h-md">{t('about.six-commitments-that-shape-every-engagement')}</h2></div>
    <div className="why">
    <div className="w"><div className="n">{t('about.01')}</div><h3>{t('about.real-ai-not-a-dashboard')}</h3><p>{t('about.adaptive-engines-and-autonomous-agents-running')}</p></div>
    <div className="w"><div className="n">{t('about.02')}</div><h3>{t('about.full-stack-ownership-2')}</h3><p>{t('about.frontend-backend-ai-deployment-one-team')}</p></div>
    <div className="w"><div className="n">{t('about.03')}</div><h3>{t('about.india-first-engineering')}</h3><p>{t('about.built-for-indian-workflows-hierarchies-and')}</p></div>
    <div className="w"><div className="n">{t('about.04')}</div><h3>{t('about.transparent-scope')}</h3><p>{t('about.what-s-in-the-proposal-is')}</p></div>
    <div className="w"><div className="n">{t('about.05')}</div><h3>{t('about.agentic-architecture')}</h3><p>{t('about.multi-agent-systems-that-coordinate-autonomously')}</p></div>
    <div className="w"><div className="n">{t('about.06')}</div><h3>{t('about.post-launch-partnership')}</h3><p>{t('about.dedicated-support-after-delivery-we-stay')}</p></div>
    </div>
    </div></section>
    <section className="sec alt"><div className="wrap"><div className="engage">
    <div>
    <h2 className="h-sm">{t('about.how-we-engage')}</h2>
    <p style={{color:'var(--fg-muted)',marginBottom:'14px'}}>{t('about.simple-written-and-fair-the-same')}</p>
    <div className="g"><div className="k">{t('about.payment')}</div><p>{t('about.milestone-based-20-at-kickoff-scaling')}</p></div>
    <div className="g"><div className="k">{t('about.scope')}</div><p>{t('about.agreed-in-writing-before-we-start')}</p></div>
    <div className="g"><div className="k">{t('about.ownership')}</div><p>{t('about.100-of-the-ip-transfers-to')}</p></div>
    </div>
    <div style={{textAlign:'center'}}>
    <p className="quote">{t('about.we-stay-behind-the-work-not')}</p>
    <div className="btn-row" style={{justifyContent:'center',marginTop:'26px'}}><span className="btn pri" data-go="contact">{t('about.start-a-conversation-2')}</span></div>
    </div>
    </div></div></section>
    </div>
    
  );
}
