import type { T } from "@/content/get-text";

export function WorkPageView({ t }: { t: T }) {
  return (
    <div className="page active" id="work">
    <section className="hero hero-sub"><div className="wrap" style={{textAlign:'center',maxWidth:'720px'}}>
    <h1 className="h-lg">{t('work.real-work')} <span className="fire-text">{t('work.real-impact')}</span></h1>
    <p className="lede" style={{margin:'0 auto'}}>{t('work.from-edtech-platforms-to-iot-automation')}</p>
    <div className="stats" style={{justifyContent:'center',marginTop:'30px'}}>
    <div className="s"><span className="fire-text">{t('work.20')}</span><small>{t('work.schools-automated')}</small></div>
    <div className="s"><span className="fire-text">{t('work.50')}</span><small>{t('work.iot-installations')}</small></div>
    <div className="s"><span className="fire-text">{t('work.1-400')}</span><small>{t('work.career-paths')}</small></div>
    </div>
    </div></section>
    <section className="sec sec-md"><div className="wrap">
    <div className="filter"><span className="p on">{t('work.all')}</span><span className="p">{t('work.web')}</span><span className="p">{t('work.mobile')}</span><span className="p">{t('work.ai')}</span><span className="p">{t('work.automation')}</span></div>
    <div className="bento">
    <div className="tile big" data-go="casestudy"><div className="bg" style={{background:'linear-gradient(135deg,#12233b,#1e3a5f)'}}></div><span className="tg">{t('work.edtech')}</span><div className="cap"><b>{t('work.skillship-ai-powered-lms')}</b><small>{t('work.8-ai-labs-teacher-certification-adaptive')}</small></div></div>
    <div className="tile"><div className="bg" style={{background:'linear-gradient(135deg,#14311f,#1f5a37)'}}></div><span className="tg">{t('work.iot-mobile')}</span><div className="cap"><b>{t('work.mygreenhome')}</b><small>{t('work.smart-home-automation')}</small></div></div>
    <div className="tile"><div className="bg" style={{background:'linear-gradient(135deg,#3a1c08,#7a3d13)'}}></div><span className="tg">{t('work.live-product')}</span><div className="cap"><b>{t('work.ai-career-copilot')}</b><small>{t('work.bilingual-career-ai')}</small></div></div>
    </div>
    </div></section>
    <section className="sec alt cta-band"><div className="wrap"><h2>{t('work.need-something-built')}</h2><p>{t('work.every-project-starts-with-a-conversation')}</p><div className="btn-row" style={{justifyContent:'center'}}><span className="btn pri" data-go="contact">{t('work.start-a-project')}</span></div></div></section>
    </div>
    
  );
}
