import type { T } from "@/content/get-text";
import { ImageSlot } from "./ImageSlot";

export function HomePageView({ t }: { t: T }) {
  return (
    <div className="page active" id="home">
    <section className="hero">
    <div className="embers">
    <span className="ember" style={{left:'8%',animationDuration:'7s'}}></span>
    <span className="ember" style={{left:'20%',animationDuration:'9s',animationDelay:'1.4s'}}></span>
    <span className="ember" style={{left:'34%',animationDuration:'8s',animationDelay:'.6s'}}></span>
    <span className="ember" style={{left:'52%',animationDuration:'10s',animationDelay:'2.1s'}}></span>
    <span className="ember" style={{left:'68%',animationDuration:'7.5s',animationDelay:'1s'}}></span>
    <span className="ember" style={{left:'84%',animationDuration:'9.5s',animationDelay:'1.8s'}}></span>
    </div>
    <div className="wrap hero-grid">
    <div>
    <span className="eyebrow"><span className="d"></span>{t('home.now-open-for-new-projects')}</span>
    <h1>{t('home.we-build')} <span className="fire-text">{t('home.automation')}</span><br />{t('home.that-never-sleeps')}</h1>
    <div className="hx-minis">
    <div className="hx-mini"><span className="i"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L4 14h7l-1 8 9-12h-7z" /></svg></span><div><b>{t('home.built-for-speed')}</b><small>{t('home.ship-faster-with-ai-at-every')}</small></div></div>
    <div className="hx-mini"><span className="i"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.4" /><path d="M12 4v2M12 18v2M4 12h2M18 12h2" /></svg></span><div><b>{t('home.built-for-clarity')}</b><small>{t('home.full-transparency-zero-surprises')}</small></div></div>
    <div className="hx-mini"><span className="i"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.2-2.9 7.6-7 8.8-4.1-1.2-7-4.6-7-8.8V6z" /><path d="M9 11.5l2 2 4-4" /></svg></span><div><b>{t('home.built-for-impact')}</b><small>{t('home.smart-solutions-that-drive-real-results')}</small></div></div>
    </div>
    <div className="hx-cta">
    <span className="btn pri" data-go="contact"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" /></svg>{t('home.get-a-custom-proposal')}</span>
    <span className="btn gho" data-go="products"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>{t('home.explore-client-portal')}</span>
    </div>
    <div className="hx-strip">
    <div className="it"><div className="hd"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z" /><path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8z" /></svg><b>{t('home.ai-powered')}</b></div><p>{t('home.intelligent-automation-built-to-adapt')}</p></div>
    <div className="it"><div className="hd"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l9 5-9 5-9-5z" /><path d="M3 12l9 5 9-5M3 16l9 5 9-5" /></svg><b>{t('home.end-to-end')}</b></div><p>{t('home.from-idea-to-deployment-we-handle')}</p></div>
    <div className="it"><div className="hd"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg><b>{t('home.always-on')}</b></div><p>{t('home.real-time-updates-anytime-anywhere')}</p></div>
    <div className="it"><div className="hd"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.2-2.9 7.6-7 8.8-4.1-1.2-7-4.6-7-8.8V6z" /><path d="M9 11.5l2 2 4-4" /></svg><b>{t('home.secure-reliable')}</b></div><p>{t('home.enterprise-grade-security-you-can-trust')}</p></div>
    </div>
    </div>
    <div className="hx-visual">
    <div className="hx-win">
    <div className="bar"><i></i><i></i><i></i></div>
    <div className="hx-app">
    <div className="hx-side">
    <span className="logo">A</span>
    <svg className="ico" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
    <svg className="ico" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
    <svg className="ico ac" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v9l6 3" /><circle cx="12" cy="12" r="9" /></svg>
    <svg className="ico" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16v11H9l-5 4z" /></svg>
    <svg className="ico" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L16.5 3h-4l-.3 2.6a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L5.1 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 2.6h4l.3-2.6a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1z" /></svg>
    </div>
    <div className="hx-main">
    <div className="top"><h4>{t('home.project-skillship-lms')}</h4><span className="hx-chip">{t('home.on-track')}</span></div>
    <div className="hx-ms"><span>{t('home.milestone-3-of-4-ai-integration')}</span><b>{t('home.72')}</b></div>
    <div className="hx-prog"><i></i></div>
    <div className="hx-tl">
    <div className="st"><span className="dot done"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg></span><span className="lb">{t('home.discovery')}</span><span className="stt">{t('home.done')}</span></div>
    <div className="st"><span className="dot done"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg></span><span className="lb">{t('home.design')}</span><span className="stt">{t('home.done-2')}</span></div>
    <div className="st"><span className="dot now"></span><span className="lb">{t('home.development')}</span><span className="stt now">{t('home.in-progress')}</span></div>
    <div className="st"><span className="dot"></span><span className="lb">{t('home.testing')}</span><span className="stt">{t('home.upcoming')}</span></div>
    <div className="st"><span className="dot"></span><span className="lb">{t('home.launch')}</span><span className="stt">{t('home.upcoming-2')}</span></div>
    </div>
    <div className="hx-files">
    <div className="hx-file"><span className="fi"><svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /><path d="M9 13h6M9 17h6" /></svg></span><div><b>{t('home.staging-v3-pdf')}</b><small>{t('home.2-4-mb-design')}</small></div></div>
    <div className="hx-file"><span className="fi"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.8 2.8L16 10" /></svg></span><div><b>{t('home.qa-sign-off')}</b><small>{t('home.approved-mar-30')}</small></div></div>
    </div>
    </div>
    </div>
    </div>
    <div className="hx-badge"><span className="ck"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg></span><div><b>{t('home.milestone-shipped')}</b><small>{t('home.2-hours-ago')}</small></div></div>
    <div className="hx-prop hx-glass hx-chart"><svg viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V4" /><path d="M4 20h16" /><rect x="7" y="12" width="2.6" height="5" rx=".6" fill="var(--color-orange)" stroke="none" /><rect x="11" y="9" width="2.6" height="8" rx=".6" fill="var(--color-orange)" stroke="none" /><rect x="15" y="6" width="2.6" height="11" rx=".6" fill="var(--color-orange)" stroke="none" /></svg></div>
    <div className="hx-prop hx-glass hx-robot"><svg viewBox="0 0 24 24" fill="none" stroke="var(--color-orange)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v3" /><circle cx="12" cy="3" r="1" fill="var(--color-orange)" stroke="none" /><rect x="5" y="6.5" width="14" height="11" rx="4" /><circle cx="9.3" cy="12" r="1.4" fill="var(--color-orange)" stroke="none" /><circle cx="14.7" cy="12" r="1.4" fill="var(--color-orange)" stroke="none" /><path d="M3.5 10.5v3M20.5 10.5v3" /></svg></div>
    <div className="hx-prop hx-laptop"><div className="hx-lp-scr"><div className="ln" style={{width:'60%'}}></div><div className="ln b" style={{width:'80%'}}></div><div className="ln" style={{width:'45%'}}></div><div className="ln b" style={{width:'70%'}}></div><div className="ln" style={{width:'52%'}}></div><div className="ln b" style={{width:'64%'}}></div></div><div className="hx-lp-base"></div><div className="hx-lp-ped"></div></div>
    <div className="hx-prop hx-cube"><svg viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M9 8l-4 4 4 4M15 8l4 4-4 4" /></svg></div>
    </div>
    </div>
    </section>
    
    
    <section className="sec"><div className="wrap" style={{maxWidth:'none',padding:'0 10%'}}>
    <div className="center"><span className="eyebrow">{t('home.what-we-build')}</span><h2 style={{marginTop:'20px'}}>{t('home.full-stack-ai-native-end-to')}</h2><p>{t('home.one-team-owns-the-whole-surface')}</p></div>
    <div className="wwb-wrap" style={{margin:'0 auto'}}>
    <div className="wwb-grid">
    
    <div className="wwb-card wwb-1">
    <div className="wwb-1-visual">
    <div className="wwb-code"><div className="top"><i></i><i></i><i></i></div><pre><span className="k">import</span> <span className="t">React</span> <span className="k">from</span> <span className="t">&#39;react&#39;</span>
    
    <span className="k">export default function</span>
    <span className="t">Landing</span>() &#123;
    &nbsp;&nbsp;<span className="k">return</span> (
    &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="t">main</span> className=<span className="t">&quot;min-h-screen&quot;</span>&gt;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="t">Navbar</span> /&gt;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="t">Hero</span> /&gt;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="t">Features</span> /&gt;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="t">Footer</span> /&gt;
    &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="t">main</span>&gt;
    &nbsp;&nbsp;)
    &#125;</pre></div>
    <div className="wwb-browser">
    <div className="nv"><b>{t('home.amfire')}</b><span className="lk"><i>{t('home.product')}</i><i>{t('home.solutions')}</i><i>{t('home.resources')}</i></span><span className="go">{t('home.get-started')}</span></div>
    <div className="bd"><div><h4>{t('home.build-faster-launch-smarter-scale-without')}</h4><p>{t('home.we-build-digital-products-that-drive')}</p><div className="btns"><span className="pri">{t('home.get-started-2')}</span><span className="gho">{t('home.view-demo')}</span></div></div><div className="shot"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M3 17l5-5 4 4 4-3 5 4" /></svg></div></div>
    </div>
    <div className="wwb-phone"><div className="s"><div className="nv2"><b>{t('home.amfire-2')}</b><span>≡</span></div><h5>{t('home.build-faster-launch-smarter')}</h5><span className="go">{t('home.get-started-3')}</span></div></div>
    <div className="wwb-ic-float"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 8l-5 4 5 4M15 8l5 4-5 4" /></svg></div>
    </div>
    <span className="wwb-idx">{t('home.01')}</span>
    <h3>{t('home.web-development')} <span className="wwb-tag">{t('home.most-requested')}</span></h3>
    <p className="desc">{t('home.custom-platforms-client-portals-and-saas')}</p>
    </div>
    
    <div className="wwb-card wwb-2">
    <span className="wwb-idx">{t('home.02')}</span>
    <h3>{t('home.mobile-apps')}</h3>
    <p className="desc">{t('home.react-native-ios-android-with-offline')}</p>
    <div className="wwb-badges"><span><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16.5 1.5c.1 1-.3 2-1 2.8-.7.8-1.8 1.4-2.8 1.3-.1-1 .4-2.1 1-2.8.8-.9 2-1.4 2.8-1.3zM20 17.2c-.5 1.2-.8 1.7-1.5 2.8-1 1.5-2.3 3.4-4 3.4-1.5 0-1.9-1-3.9-1s-2.5 1-4 1c-1.7 0-3-1.7-4-3.2C.6 17 0 13.6 1.7 11c.9-1.4 2.4-2.3 3.9-2.3 1.6 0 2.6 1.1 3.9 1.1 1.3 0 2.1-1.1 3.9-1.1 1.3 0 2.7.7 3.7 1.9-3.3 1.8-2.7 6.4.9 7.6z" /></svg>{t('home.ios')}</span><span><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M6.2 9.6h11.6v6.8a1.4 1.4 0 0 1-1.4 1.4h-8.8a1.4 1.4 0 0 1-1.4-1.4z" /><rect x="4.6" y="10.6" width="1.6" height="5.4" rx="0.8" /><rect x="17.8" y="10.6" width="1.6" height="5.4" rx="0.8" /><path d="M8.4 5.4l-1-1.7M15.6 5.4l1-1.7" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round" /><ellipse cx="9.4" cy="7.6" rx="0.7" ry="0.7" /><ellipse cx="14.6" cy="7.6" rx="0.7" ry="0.7" /></svg>{t('home.android')}</span></div>
    <div className="wwb-phones2">
    <div className="wwb-ph2 a"><div className="s">
    <div className="nv2">{t('home.dashboard')}</div>
    <div className="wwb-stat2"><span><small>{t('home.clicks')}</small><b>{t('home.12-4k')}</b></span><em>{t('home.12-5')}</em></div>
    <div className="wwb-stat2"><span><small>{t('home.revenue')}</small><b>{t('home.32-8k')}</b></span><em>{t('home.12-9')}</em></div>
    <svg className="wwb-spark2" viewBox="0 0 90 26" preserveAspectRatio="none"><path d="M0 22 L14 17 L28 19 L42 10 L56 13 L70 5 L90 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
    <span className="wwb-fab"></span>
    </div></div>
    <div className="wwb-ph2 b"><div className="s">
    <div className="nv2">{t('home.messages')}</div>
    <div className="wwb-mrow"><span className="av"></span><span>{t('home.olivia-riye')}</span></div>
    <div className="wwb-mrow"><span className="av"></span><span>{t('home.liam-carter')}</span></div>
    <div className="wwb-mrow"><span className="av"></span><span>{t('home.ethan-brooks')}</span></div>
    <div className="wwb-mrow"><span className="av"></span><span>{t('home.ava-morgan')}</span></div>
    </div></div>
    </div>
    </div>
    
    <div className="wwb-card wwb-3">
    <span className="wwb-idx">{t('home.03')}</span>
    <h3>{t('home.ai-agents')}</h3>
    <p className="desc">{t('home.autonomous-agents-that-perform-tasks-coordinate')}</p>
    <div className="wwb-graph">
    <div className="wgc l"><span className="node">{t('home.user-request')}</span><span className="node">{t('home.documents')}</span><span className="node">{t('home.database')}</span><span className="node">{t('home.apis')}</span></div>
    <div className="wgap l"></div>
    <div className="wcore"><span className="orb"><svg viewBox="0 0 24 24"><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /><rect x="7" y="7" width="10" height="10" rx="3" /></svg></span><span className="wwb-running"><i></i>{t('home.agent-running')}</span></div>
    <div className="wgap r"></div>
    <div className="wgc r"><span className="node">{t('home.reasoning')}</span><span className="node">{t('home.action')}</span><span className="node">{t('home.response')}</span></div>
    </div>
    </div>
    
    <div className="wwb-card wwb-4">
    <span className="wwb-idx">{t('home.04')}</span>
    <h3>{t('home.automation-2')}</h3>
    <p className="desc">{t('home.kill-manual-workflows-data-pipelines-whatsapp')}</p>
    <div className="sv-pipe" style={{marginTop:'16px'}}>
    <div className="sv-nd live"><span className="sv-ic"><svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" /></svg></span><div className="t">{t('home.trigger')}</div><p>{t('home.new-form-submission')}</p></div>
    <span className="sv-link"><i></i></span>
    <div className="sv-nd"><span className="sv-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg></span><div className="t">{t('home.process')}</div><p>{t('home.validate-transform')}</p></div>
    <span className="sv-link"><i></i></span>
    <div className="sv-nd"><span className="sv-ic"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" /></svg></span><div className="t">{t('home.action-2')}</div><p>{t('home.send-email-whatsapp')}</p></div>
    <span className="sv-link"><i></i></span>
    <div className="sv-nd"><span className="sv-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.8 2.8L16 10" /></svg></span><div className="t">{t('home.result')}</div><p>{t('home.update-crm-notify')}</p></div>
    </div>
    <div className="wwb-stats-row"><div><small>{t('home.workflows-run')}</small><b>{t('home.12-842')}</b></div><div><small>{t('home.success-rate')}</small><b>{t('home.99-7')}</b></div><svg className="wwb-spark3" viewBox="0 0 88 30" preserveAspectRatio="none"><path d="M0 27 L11 24 L22 25 L33 18 L44 20 L55 12 L66 14 L77 5 L88 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
    </div>
    
    <div className="wwb-card wwb-5">
    <span className="wwb-idx">{t('home.05')}</span>
    <h3>{t('home.cloud-devops')}</h3>
    <p className="desc">{t('home.ci-cd-pipelines-and-containerised-deploys')}</p>
    <div className="wwb-flow">
    <div className="fnode"><span className="fic dark"><svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.68 0 3.83-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" /></svg></span><b>{t('home.code')}</b></div>
    <span className="fline"></span>
    <div className="fnode"><span className="fic"><svg viewBox="0 0 24 24"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 3v18M4 7.5l8 4.5 8-4.5" /></svg></span><b>{t('home.build')}</b></div>
    <span className="fline"></span>
    <div className="fnode"><span className="fic ok"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg></span><b>{t('home.test')}</b></div>
    <span className="fline"></span>
    <div className="fnode"><span className="fic warm"><svg viewBox="0 0 24 24"><path d="M12 3c3.4 2.6 5 6 5 9l-5 4-5-4c0-3 1.6-6.4 5-9z" /><path d="M9 18l-1.5 3M15 18l1.5 3" /></svg></span><b>{t('home.deploy')}</b></div>
    </div>
    <div className="wwb-providers"><span className="prov">{t('home.aws')}</span><span className="prov"><svg viewBox="0 0 24 24"><path d="M12 3l9 15.5H3z" fill="#4285F4" stroke="none" /><path d="M7.5 18.5L12 11l4.5 7.5z" fill="#EA4335" stroke="none" /></svg></span><span className="prov hz">H</span></div>
    <div className="wwb-stats-row"><div><small>{t('home.production')}</small><b><i className="dot"></i>{t('home.healthy')}</b></div><div><small>{t('home.uptime')}</small><b>{t('home.99-99')}</b></div><div><small>{t('home.deployments')}</small><b>{t('home.42')} <span className="mut">{t('home.this-month')}</span></b></div></div>
    </div>
    
    <div className="wwb-card wwb-6">
    <div><div className="ic-dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.3 4.3h5.4M7 3h2.6v2.6H7zM14.4 3H17v2.6h-2.6zM12 5.6v4M12 9.6l4 4-4 7-4-7z" /></svg></div>
    <span className="wwb-idx">{t('home.06')}</span>
    <h3>{t('home.ui-ux-design')}</h3>
    <p className="desc">{t('home.figma-based-user-tested-design-systems')}</p>
    </div>
    <div className="wwb-fig">
    <div className="wwb-fig-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="4" width="16" height="16" rx="2" /></svg><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 7h16M4 12h10M4 17h13" /></svg><span className="share">{t('home.share')}</span><span className="zoom">{t('home.100')}</span></div>
    <div className="wwb-fig-work">
    <div className="wwb-fig-layers"><span className="g">{t('home.layers')}</span><span className="it"><i></i>{t('home.header')}</span><span className="it"><i></i>{t('home.hero')}</span><span className="it"><i></i>{t('home.features')}</span><span className="it"><i></i>{t('home.pricing')}</span><span className="it"><i></i>{t('home.footer')}</span></div>
    <div className="wwb-fig-art"><div className="wwb-fig-card"><h5>{t('home.headline')}</h5><p>{t('home.medium-title-goes-here')}</p><div className="wwb-fig-ph"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M3 17l5-5 4 4 4-3 5 4" /></svg></div><span className="btn2">{t('home.primary-button')}</span></div></div>
    <div className="wwb-fig-insp"><div><span className="g">{t('home.design-2')}</span><div className="fld"><span>{t('home.frame')}</span></div><div className="fld"><span>X</span><b>{t('home.24')}</b></div><div className="fld"><span>Y</span><b>{t('home.96')}</b></div><div className="fld"><span>W</span><b>{t('home.1200')}</b></div><div className="fld"><span>H</span><b>{t('home.680')}</b></div></div><div><span className="g">{t('home.colors')}</span><div className="wwb-fig-sw"><i style={{background:'var(--color-orange)'}}></i><i style={{background:'#4a453d'}}></i><i style={{background:'#6b665e'}}></i><i style={{background:'#9b968d'}}></i><i style={{background:'#c9c4bb'}}></i></div></div></div>
    </div>
    </div>
    </div>
    
    </div>
    </div>
    </div></section>
    
    
    <section className="sec alt sec-lg"><div className="wrap hero-grid">
    <div>
    <span className="label">{t('home.unique-to-amfire')}</span>
    <h2 className="h-md">{t('home.real-time-project-visibility')}</h2>
    <p className="lede">{t('home.most-agencies-go-dark-after-kickoff')}</p>
    <ul style={{listStyle:'none',marginTop:'22px'}}>
    <li style={{paddingLeft:'26px',position:'relative',marginBottom:'12px',color:'var(--gray-700)'}}><span style={{position:'absolute',left:'0',color:'var(--color-orange)',fontWeight:'800'}}>✓</span>{t('home.milestone-tracker-with-staging-previews')}</li>
    <li style={{paddingLeft:'26px',position:'relative',marginBottom:'12px',color:'var(--gray-700)'}}><span style={{position:'absolute',left:'0',color:'var(--color-orange)',fontWeight:'800'}}>✓</span>{t('home.documents-invoices-payments-in-one-view')}</li>
    <li style={{paddingLeft:'26px',position:'relative',marginBottom:'12px',color:'var(--gray-700)'}}><span style={{position:'absolute',left:'0',color:'var(--color-orange)',fontWeight:'800'}}>✓</span>{t('home.feedback-threads-tied-to-each-deliverable')}</li>
    </ul>
    <div className="btn-row"><span className="btn pri" data-go="products">{t('home.try-the-demo-portal')}</span></div>
    </div>
    <div className="mock-ui"><div className="top"><i></i><i></i><i></i></div><div className="pane">
    <div className="p-row"><h5 style={{fontFamily:'var(--font-sans)',fontWeight:'700'}}>{t('home.milestones')}</h5><span className="chip">{t('home.live')}</span></div>
    <div className="pl"><span>{t('home.design-backend-on-staging')}</span><span>{t('home.done-3')}</span></div><div className="prog"><i style={{width:'100%'}}></i></div>
    <div className="pl" style={{marginTop:'12px'}}><span>{t('home.ai-integration')}</span><span>{t('home.72-2')}</span></div><div className="prog"><i style={{width:'72%'}}></i></div>
    <div className="pl" style={{marginTop:'12px'}}><span>{t('home.production-launch')}</span><span>—</span></div><div className="prog"><i style={{width:'8%'}}></i></div>
    <div className="tiles"><div className="t"><svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /></svg><div><b>{t('home.sprint-notes-pdf')}</b><small>{t('home.updated-today')}</small></div></div><div className="t"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></svg><div><b>{t('home.invoice-0032')}</b><small>{t('home.paid-1-25l')}</small></div></div></div>
    </div></div>
    </div></section>
    
    
    <section className="sec process"><div className="wrap">
    <div className="head-l"><span className="label">{t('home.our-process')}</span><h2 className="h-md">{t('home.7-steps-always-on-time')}</h2><p>{t('home.from-idea-to-impact-a-proven')}</p></div>
    <div className="prow-fit"><div className="prow">
    <div className="pcol" style={{width:'150px'}}>
    <div className="icon-slot"><img src={t('home.img-search')} style={{height:'190px'}} /></div>
    <span className="pnum">{t('home.01-2')}</span><h4>{t('home.discovery-2')}</h4><p>{t('home.understand-your-goals-and-uncover-opportunities')}</p><span className="dur">{t('home.3-5-days')}</span>
    </div>
    <div className="pbead lead-in"><img src={t('home.img-connector')} /></div>
    <div className="circuit">
    <div className="pcol" style={{width:'130px'}}>
    <div className="icon-slot"><img src={t('home.img-cubes')} /></div>
    <span className="pnum">{t('home.02-2')}</span><h4>{t('home.architecture')}</h4><p>{t('home.design-a-robust-scalable-blueprint')}</p><span className="dur">{t('home.2-3-days')}</span>
    </div>
    <div className="pbead"><img src={t('home.img-connector-2')} /></div>
    <div className="pcol" style={{width:'125px'}}>
    <div className="icon-slot"><img src={t('home.img-browser')} /></div>
    <span className="pnum">{t('home.03-2')}</span><h4>{t('home.ui-ux')}</h4><p>{t('home.craft-intuitive-experiences-users-love')}</p><span className="dur">{t('home.4-6-days')}</span>
    </div>
    <div className="pbead"><img src={t('home.img-connector-3')} /></div>
    <div className="pcol" style={{width:'130px'}}>
    <div className="icon-slot"><img src={t('home.img-frontend')} /></div>
    <span className="pnum">{t('home.04-2')}</span><h4>{t('home.frontend')}</h4><p>{t('home.build-fast-responsive-modern-interfaces')}</p><span className="dur">{t('home.5-7-days')}</span>
    </div>
    <div className="pbead"><img src={t('home.img-connector-4')} /></div>
    <div className="pcol" style={{width:'135px'}}>
    <div className="icon-slot"><img src={t('home.img-servers')} /></div>
    <span className="pnum">{t('home.05-2')}</span><h4>{t('home.backend')}</h4><p>{t('home.power-the-product-with-secure-apis')}</p><span className="dur">{t('home.4-6-days-2')}</span>
    </div>
    <div className="pbead"><img src={t('home.img-connector-5')} /></div>
    <div className="pcol" style={{width:'135px'}}>
    <div className="icon-slot"><img src={t('home.img-brain')} /></div>
    <span className="pnum">{t('home.06-2')}</span><h4>{t('home.ai-integration-2')}</h4><p>{t('home.integrate-intelligent-capabilities')}</p><span className="dur">{t('home.3-5-days-2')}</span>
    </div>
    </div>
    <div className="pbead exit"><img src={t('home.img-connector-6')} /></div>
    <div className="pcol" style={{width:'125px'}}>
    <div className="icon-slot"><img src={t('home.img-rocket')} style={{height:'185px'}} /></div>
    <span className="pnum">{t('home.07')}</span><h4>{t('home.deploy-2')}</h4><p>{t('home.launch-smoothly-with-continuous-delivery')}</p><span className="dur">{t('home.1-2-days')}</span>
    </div>
    </div></div>
    </div></section>
    
    
    
    <section className="sec"><div className="wrap" style={{maxWidth:'1340px'}}>
    <div className="rw-head">
    <div>
    <span className="rw-eyebrow">{t('home.real-work')}</span>
    <h2 className="rw-h">{t('home.real-work-2')} <span className="g">{t('home.real-impact')}</span></h2>
    <p className="rw-sub">{t('home.no-stock-logos-no-invented-case')}<br />{t('home.the-platforms-we-ve-actually-shipped')}</p>
    </div>
    <span className="rw-viewall" data-go="work">{t('home.view-all-work')} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg></span>
    </div>
    <div className="rw-stats">
    <div className="rw-stat"><span className="ib"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c3 1.5 5 4.8 5 8.5 0 2-.6 3.8-1.6 5.3L12 20l-3.4-4.2A9.4 9.4 0 0 1 7 10.5C7 6.8 9 3.5 12 2z" /><circle cx="12" cy="9.5" r="1.6" /><path d="M8.5 16l-2 4M15.5 16l2 4" /></svg></span><div><b>{t('home.20')}</b><small>{t('home.projects-delivered')}</small></div></div>
    <span className="rw-sdiv"></span>
    <div className="rw-stat"><span className="ib"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.6" /><path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" /></svg></span><div><b>{t('home.10k')}</b><small>{t('home.users-impacted')}</small></div></div>
    <span className="rw-sdiv"></span>
    <div className="rw-stat"><span className="ib"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 4 5.8 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.8-4-9s1.5-6.5 4-9z" /></svg></span><div><b>{t('home.3')}</b><small>{t('home.industries-served')}</small></div></div>
    </div>
    <div className="rw-bento">
    <div className="rw-card rw-big" data-go="casestudy">
    <div className="top"><span className="rw-tag">{t('home.edtech')}</span></div>
    <div className="mid">
    <span className="rw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-4 9 4-9 4z" /><path d="M6.5 10v4.5c0 1.3 2.5 2.5 5.5 2.5s5.5-1.2 5.5-2.5V10" /><path d="M12 12v5.5" /></svg></span>
    <h3>{t('home.skillship')}</h3>
    <p className="dsc">{t('home.ai-powered-learning-and-placement-guidance')}</p>
    <div className="rule"></div>
    <div className="rw-bstats">
    <div className="rw-bstat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V5l7-3v19M11 21h9V9l-9-3M14.5 10v0M14.5 13.5v0M14.5 17v0M7.5 9v0M7.5 13v0M7.5 17v0" /></svg><div><b>{t('home.20-2')}</b><small>{t('home.schools-automated')}</small></div></div>
    <div className="rw-bstat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.4 2.7-5.8 6-5.8s6 2.4 6 5.8" /><circle cx="17.5" cy="9" r="2.4" /><path d="M16 14.4c2.7.3 4.5 2.3 4.5 5.6" /></svg><div><b>{t('home.10k-2')}</b><small>{t('home.students-impacted')}</small></div></div>
    </div>
    </div>
    <div className="rw-laptop"><div className="rw-lt-scr"><ImageSlot src={t('image.rw-laptop-shot')} placeholder={t('home.skillship-dashboard-screenshot')} /></div><div className="rw-lt-base"></div></div>
    </div>
    <div className="rw-card rw-green" data-go="work">
    <span className="rw-tag">{t('home.iot-mobile')}</span>
    <div style={{marginTop:'18px'}}><span className="rw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" /><path d="M9.5 20v-5h5v5" /></svg></span></div>
    <h3>{t('home.mygreenhome')}</h3>
    <p className="dsc">{t('home.smart-home-automation-for-energy-efficiency')}</p>
    <div className="rw-phone"><div className="s">
    <div className="rw-ph-hd"><b>{t('home.mygreenhome-2')}</b><svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#9aa0a8" strokeWidth="2"><path d="M12 3v0M12 12v0M12 21v0" strokeLinecap="round" /></svg></div>
    <div className="rw-ph-tabs"><span className="on">{t('home.overview')}</span><span>{t('home.devices')}</span><span>{t('home.scenes')}</span></div>
    <div className="rw-ph-c"><div className="k"><span>{t('home.energy-usage')}</span><span>{t('home.today')}</span></div><div className="big">{t('home.2-45')} <span>{t('home.kwh')}</span></div><em>{t('home.12-vs-yesterday')}</em></div>
    <div className="rw-ph-room"><div><div className="k">{t('home.living-room')}</div><div className="big">{t('home.24-c')}</div><div className="k">{t('home.cooling')}</div></div><span className="rw-ph-tog"></span></div>
    </div></div>
    </div>
    <div className="rw-card rw-brown" data-go="products">
    <span className="rw-tag">{t('home.ai-web')}</span>
    <div style={{marginTop:'18px'}}><span className="rw-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-4 9 4-9 4z" /><path d="M6.5 10v4.5c0 1.3 2.5 2.5 5.5 2.5s5.5-1.2 5.5-2.5V10" /><path d="M12 12v5.5" /></svg></span></div>
    <h3>{t('home.ai-career-copilot')}</h3>
    <p className="dsc">{t('home.bilingual-ai-career-guidance-platform-for')}</p>
    <div className="rw-wg">
    <h6>{t('home.career-matches')}</h6>
    <div className="rw-wg-row">
    <span className="rw-ring"><i><b>{t('home.85')}</b><small>{t('home.great-match')}</small></i></span>
    <div className="rw-wg-list"><span>{t('home.data-scientist')}</span><span>{t('home.ml-engineer')}</span><span>{t('home.ai-analyst')}</span></div>
    </div>
    <div className="rw-wg-steps"><div className="g">{t('home.recommended-next-steps')}</div><div className="rw-wg-step"><span className="dt">{t('home.build-ml-project')}</span><em>{t('home.in-progress-2')}</em></div></div>
    </div>
    </div>
    </div>
    <div className="rw-trust">
    <div className="lbl">{t('home.trusted-by')}</div>
    <div className="rw-logos">
    <span className="rw-logo"><svg viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-4 9 4-9 4z" /><path d="M6.5 10v4.5c0 1.3 2.5 2.5 5.5 2.5s5.5-1.2 5.5-2.5V10" /></svg>{t('home.schools')}</span>
    <span className="rw-logo"><svg viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M8 7h2M14 7h2M8 11h2M14 11h2M8 15h2M14 15h2" /></svg>{t('home.enterprises')}</span>
    <span className="rw-logo"><svg viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-5 9 5M4 9v9M20 9v9M8 9v9M12 9v9M16 9v9M3 21h18" /></svg>{t('home.government')}</span>
    <span className="rw-logo"><svg viewBox="0 0 24 24" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 18 4h3v3a7 7 0 0 1-10 10z" /><path d="M6 21c0-4 2.5-7 6-8.5" /></svg>{t('home.ngos')}</span>
    </div>
    </div>
    </div></section>
    
    
    <section className="sec sec-lg psh"><div className="wrap">
    <div className="psh-top">
    <div className="psh-copy">
    <span className="psh-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 3v18M4 7.5l8 4.5 8-4.5" /></svg>{t('home.our-products')}</span>
    <h2>{t('home.tools-we-build')}<br />{t('home.problems-we')} <span className="g">{t('home.solve')}</span></h2>
    <p>{t('home.ai-powered-products-built-to-simplify')}</p>
    <span className="lk" data-go="products">{t('home.explore-all-products')}</span>
    </div>
    <div className="psh-stats">
    <div className="psh-stat"><span className="ib" style={{background:'#E8E7FC',color:'#4F46E5'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 3v18M4 7.5l8 4.5 8-4.5" /></svg></span><b>{t('home.5')}</b><small>{t('home.products')}</small></div>
    <span className="psh-div"></span>
    <div className="psh-stat"><span className="ib" style={{background:'#DFF3E4',color:'#16A34A'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3.4" /><path d="M2.5 20c0-3.5 2.9-6 6.5-6s6.5 2.5 6.5 6" /><circle cx="17" cy="9" r="2.6" /><path d="M15.5 14.2c2.9.4 4.9 2.5 4.9 5.8" /></svg></span><b>{t('home.10k-3')}</b><small>{t('home.users')}</small></div>
    <span className="psh-div"></span>
    <div className="psh-stat"><span className="ib" style={{background:'#FCE7D3',color:'var(--color-orange)'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 4 5.8 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.8-4-9s1.5-6.5 4-9z" /></svg></span><b>{t('home.3-2')}</b><small>{t('home.industries')}</small></div>
    </div>
    </div>
    <div className="psh-row">
    <span className="psh-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg></span>
    <div className="psh-cards">
    <div className="psh-card c1">
    <div className="shot"><ImageSlot src={t('image.psh-shot-skillship')} placeholder={t('home.graduation-cap-books-illustration')} /></div>
    <div className="hd"><span className="ic" style={{background:'#E8E7FC',color:'#4F46E5'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-5" /></svg></span><div><h3>{t('home.skillship-2')}</h3><span className="u" style={{background:'#4F46E5'}}></span></div></div>
    <p>{t('home.ai-powered-learning-and-placement-guidance-2')}</p>
    <span className="lk" data-go="work">{t('home.learn-more')}</span>
    </div>
    <div className="psh-card c2 feat">
    <div className="shot"><ImageSlot src={t('image.psh-shot-copilot')} placeholder={t('home.ai-robot-resume-illustration')} /></div>
    <div className="hd"><span className="ic" style={{background:'#FCE7D3',color:'var(--color-orange)'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 8V4M9.5 4h5" /><circle cx="9" cy="13.5" r="1.2" fill="currentColor" stroke="none" /><circle cx="15" cy="13.5" r="1.2" fill="currentColor" stroke="none" /><path d="M2.5 12v3M21.5 12v3" /></svg></span><div><h3>{t('home.ai-career-copilot-2')}</h3><span className="u" style={{background:'var(--color-orange)'}}></span></div></div>
    <p>{t('home.bilingual-career-guidance-ai-that-helps')}</p>
    <span className="lk" data-go="products">{t('home.learn-more-2')}</span>
    </div>
    <div className="psh-card c3">
    <div className="shot"><ImageSlot src={t('image.psh-shot-greenhome')} placeholder={t('home.smart-home-solar-panels-illustration')} /></div>
    <div className="hd"><span className="ic" style={{background:'#DFF3E4',color:'#16A34A'}}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7" /><path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" /><path d="M9 20v-6h6v6" /></svg></span><div><h3>{t('home.mygreenhome-3')}</h3><span className="u" style={{background:'#16A34A'}}></span></div></div>
    <p>{t('home.smart-solutions-for-energy-efficiency-sustainability')}</p>
    <span className="lk" data-go="work">{t('home.learn-more-3')}</span>
    </div>
    </div>
    <span className="psh-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg></span>
    </div>
    <div className="psh-more"><span data-go="products">{t('home.view-all-products')} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg></span></div>
    </div></section>
    
    
    <section className="sec sec-tight"><div className="wrap">
    <div className="center"><span className="eyebrow">{t('home.client-voices')}</span><h2 style={{marginTop:'16px'}}>{t('home.in-their-words')}</h2><p>{t('home.from-startups-to-enterprises-built-with')}</p></div>
    <div className="test-grid">
    <div className="test-lead"><div className="qm">&quot;</div><p>{t('home.amfire-rebuilt-our-entire-backend-with')}</p><div className="test-who"><span className="av">{t('home.sr')}</span><div><b>{t('home.sneha-rao')}</b><small>{t('home.cto-nexahealth')}</small></div></div></div>
    <div className="div"></div>
    <div className="test-side">
    <div className="test-item"><p>{t('home.they-delivered-our-construction-saas-in')}</p><div className="test-who"><span className="av">{t('home.am')}</span><div><b>{t('home.arjun-mehta')}</b><small>{t('home.ceo-clearpath')}</small></div></div></div>
    <div className="test-item"><p>{t('home.they-understood-exactly-what-we-needed')}</p><div className="test-who"><span className="av">{t('home.ps')}</span><div><b>{t('home.priya-sharma')}</b><small>{t('home.founder-eduforge')}</small></div></div></div>
    </div>
    </div>
    </div></section>
    
    
    <section className="sec alt cta-band sec-tight"><div className="wrap">
    <h2>{t('home.ready-to-automate-your-business')}</h2>
    <p>{t('home.tell-us-what-you-re-building')}</p>
    <div className="btn-row" style={{justifyContent:'center'}}><span className="btn pri" data-go="contact">{t('home.get-a-proposal')}</span><span className="btn gho">{t('home.whatsapp-us')}</span></div>
    </div></section>
    </div>
    
  );
}
