import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Check, Cloud, MonitorSmartphone, Smartphone, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Services | amfire",
  description:
    "Full-stack development with an AI-first approach — delivered with the transparency of a live client portal. Web, mobile, AI agents, automation, cloud, and design.",
};

function Ghost({ n }: { n: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute -top-2 right-0 select-none text-[100px] font-extrabold leading-none text-[var(--color-orange)]/[0.07] sm:text-[150px]"
    >
      {n}
    </span>
  );
}

function Badge({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-[var(--border-default)] bg-[var(--surface-card)] px-3 py-1.5 text-xs font-semibold text-[var(--fg-muted)]">
      {children}
    </span>
  );
}

function ServiceText({
  index,
  title,
  tag,
  bullets,
  badges,
  linkHref,
  linkLabel,
}: {
  index: string;
  title: string;
  tag: string;
  bullets: string[];
  badges: string[];
  linkHref: string;
  linkLabel: string;
}) {
  return (
    <div className="relative z-10">
      <h3 className="text-[28px] font-extrabold tracking-[-0.02em] text-[var(--fg-default)] sm:text-[34px]">{title}</h3>
      <p className="mt-2 text-[17px] text-[var(--fg-muted)]">{tag}</p>
      <ul className="mt-6 space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2.5 text-[15px] text-[var(--fg-default)]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-orange)]" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-2">
        {badges.map((b) => <Badge key={b}>{b}</Badge>)}
      </div>
      <Link href={linkHref} className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-orange)] hover:underline">
        {linkLabel} <ArrowRight size={14} />
      </Link>
      <span className="sr-only">{index}</span>
    </div>
  );
}

function WebDevMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-lg)]">
      <div className="flex items-center gap-2 border-b border-[var(--border-default)] px-4 py-3">
        <i className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 rounded-md bg-[var(--surface-sunken)] px-3 py-1 text-[11px] text-[var(--fg-muted)]">amfire.dev/clients</span>
      </div>
      <div className="grid sm:grid-cols-[1.1fr_1fr]">
        <pre className="overflow-x-auto bg-[#15120F] p-4 text-[10.5px] leading-[1.8] text-[#d8d3ca]">
          <span className="text-[#f97316]">export default</span> Portal() {"{"}
          {"\n  "}<span className="text-[#f97316]">const</span> rows = <span className="text-[#f97316]">await</span> getClients()
          {"\n  "}<span className="text-[#f97316]">return</span> (
          {"\n    "}&lt;<span className="text-[#8fd19e]">Layout</span> nav={"{nav}"}&gt;
          {"\n      "}&lt;<span className="text-[#8fd19e]">Hero</span> /&gt;
          {"\n      "}&lt;<span className="text-[#8fd19e]">Grid</span> rows={"{rows}"} /&gt;
          {"\n    "}&lt;/<span className="text-[#8fd19e]">Layout</span>&gt;
          {"\n  "})
          {"\n}"}
        </pre>
        <div className="flex flex-col justify-center gap-3 p-4">
          <div className="flex items-center justify-between">
            <b className="text-[11px] font-extrabold text-[var(--fg-default)]">AMFIRE</b>
            <div className="flex gap-1"><i className="h-1 w-4 rounded-full bg-[var(--border-default)]" /><i className="h-1 w-4 rounded-full bg-[var(--border-default)]" /></div>
          </div>
          <h6 className="text-[13px] font-bold leading-snug text-[var(--fg-default)]">Building digital products that make impact</h6>
          <span className="w-fit rounded-full gradient-bg px-3 py-1.5 text-[11px] font-bold text-white">Get in touch</span>
          <div className="mt-1 h-16 rounded-lg bg-[var(--surface-sunken)]" />
        </div>
      </div>
    </div>
  );
}

function MobileMock() {
  return (
    <div className="relative flex items-center justify-center gap-3 py-4">
      <div className="w-[110px] rounded-[20px] border-2 border-[var(--fg-default)] bg-[var(--surface-card)] p-2.5 shadow-[var(--shadow-md)]">
        <p className="mb-2 text-[9px] font-bold text-[var(--fg-default)]">Messages</p>
        {["70%", "56%", "74%"].map((w, i) => (
          <div key={i} className="mb-2 flex items-center gap-1.5">
            <span className="h-4 w-4 shrink-0 rounded-full gradient-bg" />
            <span className="h-1 rounded-full bg-[var(--border-default)]" style={{ width: w }} />
          </div>
        ))}
      </div>
      <div className="z-10 w-[130px] rounded-[22px] border-2 border-[var(--fg-default)] bg-[var(--surface-card)] p-3 shadow-[var(--shadow-lg)]">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-[9px] font-bold text-[var(--fg-default)]">Overview</p>
          <span className="text-[8px] font-bold text-[var(--color-success)]">Live</span>
        </div>
        <p className="text-[9px] text-[var(--fg-muted)]">Revenue</p>
        <p className="text-[17px] font-extrabold text-[var(--fg-default)]">$42.8K</p>
      </div>
      <div className="w-[110px] rounded-[20px] border-2 border-[var(--fg-default)] bg-[var(--surface-card)] p-2.5 shadow-[var(--shadow-md)]">
        <p className="mb-2 text-[9px] font-bold text-[var(--fg-default)]">Reports</p>
        <p className="mb-1.5 text-[14px] font-extrabold text-[var(--fg-default)]">18,240</p>
        <div className="flex items-end gap-1 h-8">
          {[36, 54, 40, 70, 58, 92].map((h, i) => (
            <span key={i} className={`w-1.5 rounded-sm ${i === 5 ? "gradient-bg" : "bg-[var(--border-default)]"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AiAgentMock() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-sm)]">
      <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="rounded-xl border border-[var(--border-default)] p-3">
          <p className="text-[10px] font-bold uppercase text-[var(--fg-subtle)]">Request</p>
          <p className="mt-1 text-[11.5px] text-[var(--fg-default)]">Review last week&apos;s signups and tell me where we&apos;re losing people.</p>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="grid h-12 w-12 place-items-center rounded-full gradient-bg text-white shadow-[var(--shadow-glow-sm)]">
            <Bot size={22} />
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-orange)]">
            <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-orange)]" /> Reasoning
          </span>
        </div>
        <div className="rounded-xl border border-[var(--border-default)] p-3">
          <p className="text-[10px] font-bold uppercase text-[var(--fg-subtle)]">Action plan</p>
          {["Pull funnel data", "Find the drop-off", "Draft the fix"].map((t, i) => (
            <div key={t} className="mt-1.5 flex items-center gap-1.5 text-[11.5px]">
              <span className={`grid h-3.5 w-3.5 shrink-0 place-items-center rounded ${i < 2 ? "bg-[var(--color-success)] text-white" : "border border-[var(--border-default)]"}`}>
                {i < 2 ? <Check size={9} strokeWidth={3} /> : null}
              </span>
              <span className={i < 2 ? "text-[var(--fg-default)]" : "text-[var(--fg-muted)]"}>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {["Analytics", "Warehouse", "CRM", "Slack"].map((t) => (
          <span key={t} className="rounded-full border border-[var(--border-default)] px-3 py-1.5 text-[10.5px] font-semibold text-[var(--fg-muted)]">{t}</span>
        ))}
      </div>
    </div>
  );
}

function AutomationMock() {
  const steps = [
    { label: "Trigger", text: "New form submission" },
    { label: "Process", text: "Validate & enrich" },
    { label: "Action", text: "Notify the owner" },
    { label: "Result", text: "CRM updated" },
  ];
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-sm)]">
      <div className="flex items-start gap-1">
        {steps.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-start">
            <div className="flex-1 rounded-xl border border-[var(--border-default)] p-2.5 text-center">
              <p className="text-[10px] font-bold text-[var(--fg-default)]">{s.label}</p>
              <p className="mt-1 text-[10px] leading-tight text-[var(--fg-muted)]">{s.text}</p>
            </div>
            {i < steps.length - 1 ? <span className="mt-5 h-px flex-1 bg-[var(--border-default)]" /> : null}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-[12px]">
        <span><span className="text-[var(--fg-muted)]">Runs</span> <b className="text-[var(--fg-default)]">1,245</b></span>
        <span><span className="text-[var(--fg-muted)]">Success</span> <b className="text-[var(--fg-default)]">98.6%</b></span>
        <span><span className="text-[var(--fg-muted)]">Manual steps</span> <b className="text-[var(--fg-default)]">0</b></span>
      </div>
    </div>
  );
}

function CloudMock() {
  const stages = ["Code", "Build", "Test", "Deploy", "Monitor"];
  return (
    <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-sm)]">
      <div className="mb-5 flex flex-wrap gap-2">
        {stages.map((s, i) => (
          <span
            key={s}
            className={`rounded-full px-3 py-1.5 text-[11px] font-bold ${
              i < 3 ? "bg-[var(--color-success-bg)] text-[var(--color-success)]" : i === 3 ? "bg-[var(--accent-tint)] text-[var(--color-orange)]" : "bg-[var(--surface-sunken)] text-[var(--fg-muted)]"
            }`}
          >
            {s}
          </span>
        ))}
      </div>
      <p className="mb-2 text-[11px] font-bold text-[var(--fg-subtle)]">eu-central · production</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {[
          { icon: <Cloud size={15} />, label: "API", sub: "3 replicas" },
          { icon: <Sparkles size={15} />, label: "Workers", sub: "2 replicas" },
          { icon: <MonitorSmartphone size={15} />, label: "Postgres", sub: "Primary + read" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 rounded-lg border border-[var(--border-default)] p-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[var(--accent-tint)] text-[var(--color-orange)]">{s.icon}</span>
            <div>
              <b className="block text-[11px] text-[var(--fg-default)]">{s.label}</b>
              <small className="text-[10px] text-[var(--fg-muted)]">{s.sub}</small>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 flex justify-between border-t border-[var(--border-subtle)] pt-4 text-center">
        {[["99.99%", "Uptime, 90 days"], ["120ms", "p95 response"], ["42", "Deploys this month"]].map(([v, l]) => (
          <div key={l}>
            <b className="block text-sm font-extrabold text-[var(--fg-default)]">{v}</b>
            <small className="text-[10px] text-[var(--fg-muted)]">{l}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesignMock() {
  return (
    <div className="grid gap-3 rounded-2xl border border-[var(--border-default)] bg-[var(--surface-card)] p-5 shadow-[var(--shadow-sm)] sm:grid-cols-[110px_1fr_100px]">
      <div className="hidden flex-col gap-2 text-[10px] text-[var(--fg-muted)] sm:flex">
        <span className="font-bold uppercase tracking-wider text-[var(--fg-subtle)]">Pages</span>
        <span>Web app</span>
        <span>Mobile</span>
        <span className="mt-1 font-bold uppercase tracking-wider text-[var(--fg-subtle)]">Components</span>
        <span className="font-bold text-[var(--color-orange)]">Card</span>
        <span>Button</span>
        <span>Input</span>
      </div>
      <div className="relative rounded-xl border-2 border-dashed border-[var(--border-default)] p-6">
        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--surface-page)] p-4 shadow-[var(--shadow-sm)]">
          <h6 className="text-[13px] font-bold text-[var(--fg-default)]">Headline</h6>
          <p className="mt-1 text-[11px] text-[var(--fg-muted)]">Supporting line goes here</p>
          <span className="mt-2 inline-block rounded-full gradient-bg px-3 py-1.5 text-[10px] font-bold text-white">Primary action</span>
        </div>
        <span className="absolute bottom-2 right-2 rounded-full bg-[var(--fg-default)] px-2 py-0.5 text-[9px] font-bold text-white">186 × 96</span>
      </div>
      <div className="hidden flex-col gap-3 text-[10px] text-[var(--fg-muted)] sm:flex">
        <div>
          <p className="font-bold uppercase tracking-wider text-[var(--fg-subtle)]">Color</p>
          <div className="mt-1.5 flex gap-1">
            {["var(--color-red)", "var(--color-orange)", "var(--color-amber)", "var(--fg-default)"].map((c) => (
              <i key={c} className="h-3.5 w-3.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
        </div>
        <div>
          <p className="font-bold uppercase tracking-wider text-[var(--fg-subtle)]">Type</p>
          <p className="mt-1 font-bold text-[var(--fg-default)]">Aa <span className="font-normal">Display</span></p>
          <p className="text-[var(--fg-default)]">Aa <span className="font-normal">Body</span></p>
        </div>
      </div>
    </div>
  );
}

const services = [
  {
    n: "01", index: "01", title: "Web Development", tag: "Platforms that run your business.",
    bullets: ["SaaS platforms with admin dashboards", "Client portals with real-time updates", "Enterprise web applications"],
    badges: ["React", "Next.js", "TypeScript", "PostgreSQL"],
    linkHref: "/services/web-development", linkLabel: "Explore web development",
    mock: <WebDevMock />, reverse: false,
  },
  {
    n: "02", index: "02", title: "Mobile Apps", tag: "Native & cross-platform, offline-ready.",
    bullets: ["React Native apps (iOS + Android)", "Progressive Web Apps", "Offline-capable applications"],
    badges: ["React Native", "Expo", "PWA"],
    linkHref: "/services/mobile-apps", linkLabel: "Explore mobile apps",
    mock: <MobileMock />, reverse: true,
  },
  {
    n: "03", index: "03", title: "AI Agents", tag: "Intelligence that works 24/7.",
    bullets: ["LLM integration (GPT, Gemini, Claude)", "Multi-agent orchestration systems", "RAG systems for document intelligence"],
    badges: ["LangChain", "LangGraph", "ChromaDB"],
    linkHref: "/services/ai-agents", linkLabel: "Explore AI agents",
    mock: <AiAgentMock />, reverse: false,
  },
  {
    n: "04", index: "04", title: "Automation", tag: "Build once, automate forever.",
    bullets: ["WhatsApp Business automation", "CRM & ERP integrations", "Workflow automation engines"],
    badges: ["n8n", "FastAPI", "REST / GraphQL"],
    linkHref: "/services/automation", linkLabel: "See how it works",
    mock: <AutomationMock />, reverse: true,
  },
  {
    n: "05", index: "05", title: "Cloud & DevOps", tag: "Infrastructure that scales with you.",
    bullets: ["AWS / GCP / Hetzner architecture", "CI/CD pipelines", "Docker containerisation, SSL + DNS"],
    badges: ["AWS", "Docker", "GitHub Actions"],
    linkHref: "/services/cloud-devops", linkLabel: "Read our approach",
    mock: <CloudMock />, reverse: false,
  },
  {
    n: "06", index: "06", title: "UI / UX Design", tag: "Interfaces users actually enjoy.",
    bullets: ["User research & wireframing", "Figma design systems", "Component libraries"],
    badges: ["Figma", "Tailwind", "Framer Motion"],
    linkHref: "/services/ui-ux-design", linkLabel: "See a design system",
    mock: <DesignMock />, reverse: true,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[radial-gradient(120%_90%_at_85%_-10%,#FFEEDF_0%,rgba(255,238,223,0)_55%),var(--surface-page)] py-16 text-center md:py-20">
        <div className="mx-auto max-w-[720px] px-6">
          <span className="amfire-eyebrow">What We Do</span>
          <h1 className="mt-6 text-[clamp(38px,5.5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--fg-default)]">
            Capabilities, <span className="gradient-text">not verticals</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.7] text-[var(--fg-muted)]">
            Full-stack development with an AI-first approach — delivered with the transparency of a live client portal. Whatever you&apos;re building, our process adapts.
          </p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1340px] px-8">
        {services.map((s) => (
          <section key={s.n} className="relative border-t border-[var(--border-subtle)] py-10 md:py-12">
            <Ghost n={s.n} />
            <div className={`relative grid items-center gap-8 md:grid-cols-2 md:gap-12 ${s.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div>{s.mock}</div>
              <ServiceText index={s.index} title={s.title} tag={s.tag} bullets={s.bullets} badges={s.badges} linkHref={s.linkHref} linkLabel={s.linkLabel} />
            </div>
          </section>
        ))}
      </div>

      <section className="amfire-section amfire-section-alt text-center">
        <div className="mx-auto max-w-[720px] px-6">
          <span className="amfire-eyebrow">Industry-Agnostic by Design</span>
          <h2 className="mt-5 text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em]">We specialise in capabilities, not verticals</h2>
          <p className="mt-4 text-[17px] leading-7 text-[var(--fg-muted)]">
            EdTech, IoT, hospitality, or something brand new — the process adapts to your problem, not the other way around.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="amfire-primary inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
              Start a conversation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
