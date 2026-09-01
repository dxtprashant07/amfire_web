import type { T } from "@/content/get-text";
import { ImageSlot } from "./ImageSlot";

export function CaseStudyPageView({ t }: { t: T }) {
  return (
    <div className="page active" id="casestudy">
    <div className="wrap crumbs"><span className="link" data-go="work" style={{fontSize:'13px'}}>{t('casestudy.work')}</span> {t('casestudy.skillship')}</div>
    <section style={{padding:'24px 0 0'}}><div className="wrap">
    <div className="cs-hero">
    <div className="bg"><ImageSlot src={t('image.cs-hero-shot')} placeholder={t('casestudy.drop-the-product-screenshot')} /></div>
    <div className="cap">
    <span className="eyebrow2"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.5l4.5 4.5L19 7" /></svg>{t('casestudy.case-study')}</span>
    <h1>{t('casestudy.skillship-2')}</h1>
    <p className="lede2">{t('casestudy.a-complete-ai-education-ecosystem-live')}</p>
    <div className="row"><span>{t('casestudy.edtech')}</span><span>{t('casestudy.next-js-react-ai-ml')}</span><span>{t('casestudy.skillship-in')}</span></div>
    </div>
    </div>
    </div></section>
    <section className="sec sec-md"><div className="wrap" style={{maxWidth:'1080px'}}>
    <div className="cs-narrative">
    <div className="cs-story-row">
    <div className="cs-story-media"><span className="ghost">{t('casestudy.01')}</span><div className="shot"><ImageSlot src={t('image.cs-step-1')} placeholder={t('casestudy.ai-career-pilot-in-action')} /></div></div>
    <div className="cs-story-text"><span className="tag">{t('casestudy.ai-career-pilot')}</span><h3>{t('casestudy.personalised-from-day-one')}</h3><p>{t('casestudy.every-student-gets-a-career-roadmap')}</p></div>
    </div>
    <div className="cs-story-row rev">
    <div className="cs-story-media"><span className="ghost">{t('casestudy.02')}</span><div className="shot"><ImageSlot src={t('image.cs-step-2')} placeholder={t('casestudy.students-in-a-hands-on-lab')} /></div></div>
    <div className="cs-story-text"><span className="tag">{t('casestudy.8-advanced-labs')}</span><h3>{t('casestudy.hands-on-not-theoretical')}</h3><p>{t('casestudy.robotics-ai-and-iot-modules-with')}</p></div>
    </div>
    <div className="cs-story-row">
    <div className="cs-story-media"><span className="ghost">{t('casestudy.03')}</span><div className="shot"><ImageSlot src={t('image.cs-step-3')} placeholder={t('casestudy.college-finder-screenshot')} /></div></div>
    <div className="cs-story-text"><span className="tag">{t('casestudy.college-finder')}</span><h3>{t('casestudy.deadlines-that-find-you')}</h3><p>{t('casestudy.a-nirf-ranked-database-with-automated')}</p></div>
    </div>
    </div>
    </div></section>
    <section className="sec alt sec-md"><div className="wrap"><div className="cs-stat-rail">
    <div className="item"><b className="fire-text">{t('casestudy.20')}</b><small>{t('casestudy.schools-live')}</small><svg className="spark" viewBox="0 0 100 24" width="100%" height="24" preserveAspectRatio="none"><path d="M0 20 L20 17 L40 15 L60 10 L80 6 L100 3" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" /></svg></div>
    <div className="item"><b className="fire-text">{t('casestudy.1-400')}</b><small>{t('casestudy.career-paths-generated')}</small><svg className="spark" viewBox="0 0 100 24" width="100%" height="24" preserveAspectRatio="none"><path d="M0 18 L20 19 L40 12 L60 13 L80 5 L100 4" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" /></svg></div>
    <div className="item"><b className="fire-text">{t('casestudy.12')}</b><small>{t('casestudy.skill-domains-covered')}</small><svg className="spark" viewBox="0 0 100 24" width="100%" height="24" preserveAspectRatio="none"><path d="M0 16 L20 14 L40 15 L60 9 L80 8 L100 2" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" /></svg></div>
    <div className="item"><b className="fire-text">{t('casestudy.94')}</b><small>{t('casestudy.teacher-certification-rate')}</small><svg className="spark" viewBox="0 0 100 24" width="100%" height="24" preserveAspectRatio="none"><path d="M0 19 L20 15 L40 16 L60 8 L80 5 L100 3" fill="none" stroke="var(--color-orange)" strokeWidth="2" strokeLinecap="round" /></svg></div>
    </div></div></section>
    <section className="sec sec-md"><div className="wrap"><div className="cs-quote"><span className="qm">&quot;</span><p>{t('casestudy.skillship-gave-our-teachers-a-certification')}</p><div className="who"><span className="av">{t('casestudy.rk')}</span><div style={{textAlign:'left'}}><b>{t('casestudy.ritu-kapoor')}</b><small>{t('casestudy.principal-skillship-partner-school')}</small></div></div></div></div></section>
    <section className="sec"><div className="wrap">
    <div className="head-l"><span className="label">{t('casestudy.more-work')}</span><h2 className="h-sm">{t('casestudy.other-projects-we-ve-shipped')}</h2></div>
    <div className="g3">
    <div className="tile cs-work-tile" style={{height:'200px'}}><div className="bg" style={{background:'linear-gradient(135deg,#14311f,#1f5a37)'}}></div><span className="tg">{t('casestudy.iot-mobile')}</span><div className="cap"><b>{t('casestudy.mygreenhome')}</b><small>{t('casestudy.smart-home-automation')}</small></div></div>
    <div className="tile cs-work-tile" style={{height:'200px'}}><div className="bg" style={{background:'linear-gradient(135deg,#3a1c08,#7a3d13)'}}></div><span className="tg">{t('casestudy.live-product')}</span><div className="cap"><b>{t('casestudy.ai-career-copilot')}</b><small>{t('casestudy.bilingual-career-ai')}</small></div></div>
    <div className="tile cs-work-tile" style={{height:'200px',display:'flex',alignItems:'center',justifyContent:'center'}}><div className="bg" style={{background:'linear-gradient(135deg,#FFF1E9,#fff)'}}></div><div style={{position:'relative',textAlign:'center'}}><span className="link" data-go="work">{t('casestudy.see-all-projects')}</span></div></div>
    </div>
    </div></section>
    <section className="sec alt cta-band sec-tight"><div className="wrap"><h2>{t('casestudy.need-something-similar')}</h2><div className="btn-row" style={{justifyContent:'center'}}><span className="btn pri" data-go="contact">{t('casestudy.start-your-project')}</span><span className="btn gho">{t('casestudy.visit-skillship-in')}</span></div></div></section>
    </div>
    
    
  );
}
