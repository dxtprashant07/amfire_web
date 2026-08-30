import type { T } from "@/content/get-text";

export function ServicesPageView({ t }: { t: T }) {
  return (
    <div className="page active" id="services">
    <section className="hero hero-sub"><div className="wrap" style={{textAlign:'center',maxWidth:'720px'}}>
    <span className="eyebrow">{t('services.what-we-do')}</span>
    <h1 className="h-lg">{t('services.capabilities')} <span className="fire-text">{t('services.not-verticals')}</span></h1>
    <p className="lede" style={{margin:'0 auto'}}>{t('services.full-stack-development-with-an-ai')}</p>
    </div></section>
    <div className="wrap">
    <div className="svc"><div className="ghost">{t('services.01')}</div>
    
    <div className="sv sv-web">
    <div className="sv-frame">
    <div className="sv-chrome"><i></i><i></i><i></i><span className="u">{t('services.amfire-dev-clients')}</span></div>
    <div className="sv-split">
    <div className="sv-code"><div><span className="k">{t('services.export')}</span> <span className="t">{t('services.default')}</span> {t('services.portal')}</div><div>{t('services.text')}<span className="t">{t('services.const')}</span> {t('services.rows')} <span className="k">{t('services.await')}</span></div><div>{t('services.getclients')}</div><div>{t('services.text-2')}<span className="t">{t('services.return')}</span> (</div><div className="tw" style={{animationDelay:'.1s'}}>{t('services.text-3')}<span className="k">{t('services.layout')}</span> {t('services.nav')}<span className="s">{t('services.nav-2')}</span>{t('services.text-4')}</div><div className="tw" style={{animationDelay:'.5s'}}>{t('services.text-5')}<span className="k">{t('services.hero')}</span> {t('services.text-6')}</div><div className="tw" style={{animationDelay:'.9s'}}>{t('services.text-7')}<span className="k">{t('services.grid')}</span> {t('services.rows-rows')}</div><div className="tw" style={{animationDelay:'1.3s'}}>{t('services.text-8')}<span className="k">{t('services.layout-2')}</span>{t('services.text-9')}<span className="car"></span></div><div>{t('services.text-10')}</div><div>{t('services.text-11')}</div></div>
    <div className="sv-live">
    <div className="nv"><b>{t('services.amfire')}</b><span><em></em><em></em><em></em><em></em></span></div>
    <h6>{t('services.building-digital-products-that-make-impact')}</h6>
    <div className="btn">{t('services.get-in-touch')}</div>
    <div className="ph"></div>
    </div>
    </div></div>
    <div className="sv-bp"><span className="on"><svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="13" rx="2" /><path d="M8 21h8" /></svg></span><span><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" /></svg></span><span><svg viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2.5" /></svg></span></div>
    </div>
    <div className="txt"><h3>{t('services.web-development')}</h3><p className="tag">{t('services.platforms-that-run-your-business')}</p><ul><li>{t('services.saas-platforms-with-admin-dashboards')}</li><li>{t('services.client-portals-with-real-time-updates')}</li><li>{t('services.enterprise-web-applications')}</li></ul><div className="badges"><span>{t('services.react')}</span><span>{t('services.next-js')}</span><span>{t('services.typescript')}</span><span>{t('services.postgresql')}</span></div><span className="link" data-go="work">{t('services.view-skillship')}</span></div>
    </div>
    <div className="svc rev"><div className="ghost">{t('services.02')}</div>
    <div className="txt"><h3>{t('services.mobile-apps')}</h3><p className="tag">{t('services.native-cross-platform-offline-ready')}</p><ul><li>{t('services.react-native-apps-ios-android')}</li><li>{t('services.progressive-web-apps')}</li><li>{t('services.offline-capable-applications')}</li></ul><div className="badges"><span>{t('services.react-native')}</span><span>{t('services.expo')}</span><span>{t('services.pwa')}</span></div><span className="link" data-go="work">{t('services.view-mygreenhome')}</span></div>
    
    <div className="sv sv-mob">
    <div className="sv-ph l"><div className="s"><div className="vw"><div className="sv-hd">{t('services.messages')}</div><div className="sv-row"><span className="av"></span><span className="ln"><u style={{width:'70%'}}></u><u style={{width:'44%'}}></u></span></div><div className="sv-row"><span className="av"></span><span className="ln"><u style={{width:'56%'}}></u><u style={{width:'66%'}}></u></span></div><div className="sv-row"><span className="av"></span><span className="ln"><u style={{width:'74%'}}></u><u style={{width:'38%'}}></u></span></div><div className="sv-row"><span className="av"></span><span className="ln"><u style={{width:'50%'}}></u><u style={{width:'60%'}}></u></span></div></div></div></div>
    <div className="sv-ph r"><div className="s"><div className="vw"><div className="sv-hd">{t('services.reports')}</div><div className="sv-mini"><span className="mut">{t('services.this-week')}</span><div className="big">{t('services.18-240')}</div></div><div className="sv-bars"><i style={{height:'36%'}}></i><i style={{height:'54%'}}></i><i style={{height:'40%'}}></i><i style={{height:'70%'}}></i><i style={{height:'58%'}}></i><i className="on" style={{height:'92%'}}></i></div></div></div></div>
    <div className="sv-ph c"><div className="s">
    <div className="vw v1"><div className="sv-hd">{t('services.dashboard')}<span className="mut">{t('services.today')}</span></div><div className="sv-mini"><span className="mut">{t('services.active-users')}</span><div className="big">{t('services.24-6k')}</div></div><div className="sv-mini"><span className="mut">{t('services.engagement')}</span><div className="big">{t('services.68-4')}</div><div className="sv-bars" style={{height:'26px',marginTop:'6px'}}><i style={{height:'40%'}}></i><i style={{height:'62%'}}></i><i style={{height:'48%'}}></i><i className="on" style={{height:'88%'}}></i><i style={{height:'66%'}}></i></div></div></div>
    <div className="vw v2"><div className="sv-hd">{t('services.overview')}<span className="mut">{t('services.live')}</span></div><div className="sv-mini"><span className="mut">{t('services.revenue')}</span><div className="big">{t('services.42-8k')}</div></div><div className="sv-row"><span className="av"></span><span className="ln"><u style={{width:'66%'}}></u><u style={{width:'40%'}}></u></span></div><div className="sv-row"><span className="av"></span><span className="ln"><u style={{width:'52%'}}></u><u style={{width:'58%'}}></u></span></div></div>
    <div className="sv-tab"><i className="on"></i><i></i><i></i><i></i></div>
    </div></div>
    </div>
    </div>
    <div className="svc"><div className="ghost">{t('services.03')}</div>
    
    <div className="sv sv-ai">
    <div className="top">
    <div className="sv-io"><div className="t">{t('services.request')}</div><p>{t('services.review-last-week-s-signups-and')}</p></div>
    <div className="sv-arr"></div>
    <div className="sv-agent"><div className="sv-orb"><svg viewBox="0 0 24 24"><path d="M12 3v4M12 17v4M3 12h4M17 12h4" /><rect x="7" y="7" width="10" height="10" rx="3" /></svg></div><div className="n" style={{fontSize:'11px'}}>{t('services.agent')}</div><div className="st"><i></i>{t('services.reasoning')}</div></div>
    <div className="sv-arr"></div>
    <div className="sv-io"><div className="t">{t('services.action-plan')}</div><div className="sv-ck done"><b><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg></b>{t('services.pull-funnel-data')}</div><div className="sv-ck done"><b><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg></b>{t('services.find-the-drop-off')}</div><div className="sv-ck"><b></b>{t('services.draft-the-fix')}</div></div>
    </div>
    <div className="sv-rail"></div>
    <div className="sv-tools">
    <div className="sv-tool"><span className="stem"></span><span className="bx"><svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg></span><span>{t('services.analytics')}</span></div>
    <div className="sv-tool"><span className="stem"></span><span className="bx"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg></span><span>{t('services.warehouse')}</span></div>
    <div className="sv-tool"><span className="stem"></span><span className="bx"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M7 12h7" /></svg></span><span>{t('services.crm')}</span></div>
    <div className="sv-tool"><span className="stem"></span><span className="bx"><svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" /></svg></span><span>{t('services.slack')}</span></div>
    </div>
    </div>
    <div className="txt"><h3>{t('services.ai-agents')}</h3><p className="tag">{t('services.intelligence-that-works-24-7')}</p><ul><li>{t('services.llm-integration-gpt-gemini-claude')}</li><li>{t('services.multi-agent-orchestration-systems')}</li><li>{t('services.rag-systems-for-document-intelligence')}</li></ul><div className="badges"><span>{t('services.langchain')}</span><span>{t('services.langgraph')}</span><span>{t('services.chromadb')}</span></div><span className="link" data-go="products">{t('services.view-ai-career-copilot')}</span></div>
    </div>
    <div className="svc rev"><div className="ghost">{t('services.04')}</div>
    <div className="txt"><h3>{t('services.automation')}</h3><p className="tag">{t('services.build-once-automate-forever')}</p><ul><li>{t('services.whatsapp-business-automation')}</li><li>{t('services.crm-erp-integrations')}</li><li>{t('services.workflow-automation-engines')}</li></ul><div className="badges"><span>{t('services.n8n')}</span><span>{t('services.fastapi')}</span><span>{t('services.rest-graphql')}</span></div><span className="link">{t('services.see-how-it-works')}</span></div>
    
    <div className="sv sv-auto">
    <div className="sv-pipe">
    <div className="sv-nd live" style={{animationDelay:'0s'}}><span className="sv-ic"><svg viewBox="0 0 24 24"><path d="M8 5l11 7-11 7z" /></svg></span><div className="t">{t('services.trigger')}</div><p>{t('services.new-form-submission')}</p></div>
    <span className="sv-link"><i></i></span>
    <div className="sv-nd" style={{animationDelay:'.6s'}}><span className="sv-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg></span><div className="t">{t('services.process')}</div><p>{t('services.validate-enrich')}</p></div>
    <span className="sv-link"><i style={{animationDelay:'.6s'}}></i></span>
    <div className="sv-nd" style={{animationDelay:'1.2s'}}><span className="sv-ic"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5L12 13l8.5-6.5" /></svg></span><div className="t">{t('services.action')}</div><p>{t('services.notify-the-owner')}</p></div>
    <span className="sv-link"><i style={{animationDelay:'1.2s'}}></i></span>
    <div className="sv-nd" style={{animationDelay:'1.8s'}}><span className="sv-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.8 2.8L16 10" /></svg></span><div className="t">{t('services.result')}</div><p>{t('services.crm-updated')}</p></div>
    </div>
    <div className="sv-log">
    <div className="hd"><span><span className="mut">{t('services.runs')}</span> <b>{t('services.1-245')}</b></span><span><span className="mut">{t('services.success')}</span> <b>{t('services.98-6')}</b></span><span><span className="mut">{t('services.manual-steps')}</span> <b>0</b></span></div>
    <svg className="sv-spark" viewBox="0 0 300 46" preserveAspectRatio="none"><path className="f" d="M0 40 L30 36 L60 38 L90 28 L120 30 L150 20 L180 23 L210 13 L240 15 L270 7 L300 4 L300 46 L0 46 Z" /><path d="M0 40 L30 36 L60 38 L90 28 L120 30 L150 20 L180 23 L210 13 L240 15 L270 7 L300 4" strokeWidth="1.8" /></svg>
    </div>
    </div>
    </div>
    <div className="svc"><div className="ghost">{t('services.05')}</div>
    
    <div className="sv sv-cloud">
    <div className="sv-stages">
    <span className="sv-stg ok"><svg viewBox="0 0 24 24"><path d="M9 6l-5 6 5 6M15 6l5 6-5 6" /></svg>{t('services.code')}</span>
    <span className="sv-stg ok"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg>{t('services.build')}</span>
    <span className="sv-stg ok"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" /></svg>{t('services.test')}</span>
    <span className="sv-stg now"><svg viewBox="0 0 24 24"><path d="M12 3c3.4 2.6 5 6 5 9l-5 4-5-4c0-3 1.6-6.4 5-9z" /><path d="M9 18l-1.5 3M15 18l1.5 3" /></svg>{t('services.deploy')}</span>
    <span className="sv-stg"><svg viewBox="0 0 24 24"><path d="M3 15l4-6 4 4 4-8 6 10" /></svg>{t('services.monitor')}</span>
    </div>
    <div className="sv-region"><span className="rl">{t('services.eu-central-production')}</span>
    <div className="sv-svcs">
    <div className="sv-svc"><span className="sv-ic"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="7" rx="2" /><rect x="3" y="13" width="18" height="7" rx="2" /><path d="M7 7.5h.01M7 16.5h.01" /></svg></span><b>{t('services.api')}</b><small>{t('services.3-replicas')}</small><span className="rep"><i></i><i></i><i></i></span></div>
    <div className="sv-svc"><span className="sv-ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></svg></span><b>{t('services.workers')}</b><small>{t('services.2-replicas')}</small><span className="rep"><i></i><i></i></span></div>
    <div className="sv-svc"><span className="sv-ic"><svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg></span><b>{t('services.postgres')}</b><small>{t('services.primary-read')}</small><span className="rep"><i></i><i></i></span></div>
    </div></div>
    <div className="sv-metrics"><div><b>{t('services.99-99')}</b><small>{t('services.uptime-90-days')}</small></div><div><b>{t('services.120ms')}</b><small>{t('services.p95-response')}</small></div><div><b>{t('services.42')}</b><small>{t('services.deploys-this-month')}</small></div></div>
    </div>
    <div className="txt"><h3>{t('services.cloud-devops')}</h3><p className="tag">{t('services.infrastructure-that-scales-with-you')}</p><ul><li>{t('services.aws-gcp-hetzner-architecture')}</li><li>{t('services.ci-cd-pipelines')}</li><li>{t('services.docker-containerisation-ssl-dns')}</li></ul><div className="badges"><span>{t('services.aws')}</span><span>{t('services.docker')}</span><span>{t('services.github-actions')}</span></div><span className="link">{t('services.read-our-approach')}</span></div>
    </div>
    <div className="svc rev"><div className="ghost">{t('services.06')}</div>
    <div className="txt"><h3>{t('services.ui-ux-design')}</h3><p className="tag">{t('services.interfaces-users-actually-enjoy')}</p><ul><li>{t('services.user-research-wireframing')}</li><li>{t('services.figma-design-systems')}</li><li>{t('services.component-libraries')}</li></ul><div className="badges"><span>{t('services.figma')}</span><span>{t('services.tailwind')}</span><span>{t('services.framer-motion')}</span></div><span className="link">{t('services.see-a-design-system')}</span></div>
    
    <div className="sv">
    <div className="sv-canvas">
    <div className="sv-tools2"><svg className="on" viewBox="0 0 24 24"><path d="M5 3l14 9-6 1.6L10.5 20z" /></svg><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /></svg><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h10M4 17h13" /></svg><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" /></svg></div>
    <div className="sv-work">
    <div className="sv-layers"><span className="g">{t('services.pages')}</span><span className="it"><i></i>{t('services.web-app')}</span><span className="it"><i></i>{t('services.mobile')}</span><span className="g" style={{marginTop:'4px'}}>{t('services.components')}</span><span className="it sel"><i></i>{t('services.card')}</span><span className="it"><i></i>{t('services.button')}</span><span className="it"><i></i>{t('services.input')}</span></div>
    <div className="sv-art"><div className="sv-sel"><span className="hdl tl"></span><span className="hdl tr"></span><span className="hdl bl"></span><span className="hdl br"></span><h6>{t('services.headline')}</h6><p>{t('services.supporting-line-goes-here')}</p><span className="b">{t('services.primary-action')}</span></div><span className="sv-dim">{t('services.186-96')}</span></div>
    <div className="sv-insp">
    <div><div className="g">{t('services.color')}</div><div className="sv-sw"><i style={{background:'var(--color-red)'}}></i><i style={{background:'var(--color-orange)'}}></i><i style={{background:'var(--color-amber)'}}></i><i style={{background:'var(--fg-default)'}}></i></div></div>
    <div><div className="g">{t('services.type')}</div><div className="tr"><b>{t('services.aa')}</b>{t('services.display')}</div><div className="tr"><b style={{fontWeight:'400'}}>{t('services.aa-2')}</b>{t('services.body')}</div></div>
    <div><div className="g">{t('services.spacing')}</div><div className="sv-sp"><i style={{width:'8px',height:'8px'}}></i><i style={{width:'12px',height:'12px'}}></i><i style={{width:'16px',height:'16px'}}></i><i style={{width:'22px',height:'22px'}}></i></div></div>
    </div>
    </div></div>
    </div>
    </div>
    </div>
    <section className="sec alt" style={{textAlign:'center'}}><div className="wrap" style={{maxWidth:'720px'}}>
    <span className="eyebrow">{t('services.industry-agnostic-by-design')}</span>
    <h2 className="h-md">{t('services.we-specialise-in-capabilities-not-verticals')}</h2>
    <p style={{color:'var(--fg-muted)',fontSize:'17px'}}>{t('services.edtech-iot-hospitality-or-something-brand')}</p>
    <div className="btn-row" style={{justifyContent:'center'}}><span className="btn pri" data-go="contact">{t('services.start-a-conversation')}</span></div>
    </div></section>
    </div>
    
  );
}
