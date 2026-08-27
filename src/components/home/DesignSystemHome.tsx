import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CircleDollarSign,
  Code2,
  FileCode2,
  FolderKanban,
  LayoutGrid,
  MessageCircle,
  MonitorSmartphone,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";
import { TrustedBy } from "./TrustedBy";
import { TestimonialsSection } from "./TestimonialsSection";
import { Icon } from "@/content/icon-map";
import { getContent } from "@/content/get-content";

function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all duration-200 ${
        variant === "primary" ? "amfire-primary" : "amfire-ghost"
      }`}
    >
      {children}
    </Link>
  );
}

export async function DesignSystemHome() {
  const [hero, heroPillars, heroStrip, work, plans, process, products, paymentTrust, testimonials] = await Promise.all([
    getContent("home.hero"),
    getContent("home.heroPillars"),
    getContent("home.heroStrip"),
    getContent("home.work"),
    getContent("home.plans"),
    getContent("home.process"),
    getContent("home.products"),
    getContent("home.paymentTrust"),
    getContent("home.testimonials"),
  ]);

  return (
    <div className="overflow-hidden">
      <section className="relative bg-[radial-gradient(120%_90%_at_85%_-10%,#FFEEDF_0%,rgba(255,238,223,0)_55%),var(--surface-page)] py-20 md:py-28 lg:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="absolute bottom-[-10px] h-1 w-1 rounded-full bg-[#f97316]/60 blur-[1px]"
              style={{
                left: `${8 + index * 6}%`,
                animation: `amfire-rise ${8 + (index % 5)}s linear infinite`,
                animationDelay: `${index * 0.6}s`,
              }}
            />
          ))}
        </div>

        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-14 px-8 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="relative z-10">
            <span className="amfire-eyebrow">{hero.eyebrow}</span>
            <h1 className="mt-6 max-w-3xl text-[clamp(42px,6vw,76px)] font-extrabold leading-[1.01] tracking-[-0.035em] text-[var(--fg-default)]">
              {hero.headline} <span className="gradient-text">{hero.headlineAccent}</span> {hero.headlineSuffix}
            </h1>

            <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
              {heroPillars.map((item) => (
                <div key={item.title} className="rounded-[14px] border border-[var(--border-subtle)] bg-white/60 p-4 backdrop-blur-sm dark:bg-white/5">
                  <div className="mb-3 grid h-9 w-9 place-items-center rounded-[10px] bg-[var(--accent-tint)] text-[var(--color-orange)]">
                    <Icon name={item.icon} size={18} />
                  </div>
                  <b className="block text-sm text-[var(--fg-default)]">{item.title}</b>
                  <small className="mt-1 block text-xs leading-5 text-[var(--fg-muted)]">{item.text}</small>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/contact">
                Get a Custom Proposal <ArrowRight size={17} />
              </ButtonLink>
              <ButtonLink href="/login" variant="ghost">
                Explore Client Portal
              </ButtonLink>
            </div>
            <p className="mt-3 text-xs font-medium text-[var(--fg-subtle)]">Milestone-based payments. 100% IP transfer. Post-launch support.</p>

            <div className="mt-9 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {heroStrip.map((item) => (
                <div key={item.title}>
                  <div className="mb-1.5 flex items-center gap-1.5 text-[var(--fg-default)]">
                    <Icon name={item.icon} size={15} className="text-[var(--color-orange)]" />
                    <b className="text-[13px] font-bold">{item.title}</b>
                  </div>
                  <p className="text-xs leading-5 text-[var(--fg-muted)]">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-9 grid w-fit grid-cols-3 overflow-hidden rounded-2xl border border-[var(--border-default)] bg-white/55 dark:bg-white/5">
              {hero.proof.map((item) => (
                <div key={item.label} className="border-l border-[var(--border-default)] px-5 py-4 first:border-l-0 sm:px-8">
                  <span className="block text-2xl font-extrabold text-[var(--fg-default)]">{item.value}</span>
                  <small className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--fg-muted)]">{item.label}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px]">
            <div className="absolute -inset-x-6 top-4 h-80 rounded-full bg-orange-300/20 blur-3xl" aria-hidden="true" />
            <div className="relative rotate-[0.6deg] overflow-hidden rounded-[28px] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-lg),var(--shadow-glow-sm)]">
              <div className="flex items-center gap-2 border-b border-[var(--border-default)] px-5 py-4">
                <i className="h-3 w-3 rounded-full bg-[#ff6159]" />
                <i className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <i className="h-3 w-3 rounded-full bg-[#28c840]" />
                <b className="ml-2 text-xs font-semibold text-[var(--fg-muted)]">client portal</b>
              </div>
              <div className="grid grid-cols-[58px_1fr]">
                <aside className="flex flex-col items-center gap-5 bg-[#1b1b1d] py-5">
                  <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-white text-lg font-extrabold text-[#e23a2e]">a</span>
                  {[FolderKanban, CircleDollarSign, FileCode2, MessageCircle].map((SideIcon, index) => (
                    <SideIcon key={index} size={20} className={index === 0 ? "text-white" : "text-[#7a7a7d]"} />
                  ))}
                </aside>
                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-extrabold text-[var(--fg-default)]">AI SaaS launch</h2>
                      <p className="mt-1 text-xs text-[var(--fg-muted)]">Milestone 3 of 4</p>
                    </div>
                    <span className="rounded-full bg-[var(--color-success-bg)] px-3 py-1 text-[11px] font-bold text-[var(--color-success)]">On track</span>
                  </div>
                  <div className="mb-2 flex items-baseline justify-between text-xs text-[var(--fg-muted)]">
                    <span>Progress</span>
                    <b className="text-sm text-[var(--fg-default)]">72%</b>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                    <span className="block h-full w-[72%] rounded-full gradient-bg" />
                  </div>
                  <div className="relative my-7 flex justify-between">
                    <span className="absolute left-[8%] right-[8%] top-[11px] h-0.5 bg-[var(--border-default)]" />
                    <span className="absolute left-[8%] top-[11px] h-0.5 w-[42%] bg-[var(--color-orange)]" />
                    {["Scope", "Design", "AI", "Launch"].map((item, index) => (
                      <div key={item} className="relative z-10 flex flex-1 flex-col items-center gap-2 text-center">
                        <span
                          className={`grid h-6 w-6 place-items-center rounded-full border-2 bg-white ${
                            index < 2 ? "border-[var(--color-orange)] bg-[var(--color-orange)] text-white" : "border-[var(--color-orange)]"
                          }`}
                        >
                          {index < 2 ? <Check size={13} strokeWidth={3} /> : index === 2 ? <i className="h-2 w-2 rounded-full bg-[var(--color-orange)]" /> : null}
                        </span>
                        <span className="text-[11px] font-bold text-[var(--fg-default)]">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {["Design approved", "Backend on staging"].map((item, index) => (
                      <div key={item} className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-3">
                        <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[var(--accent-tint)] text-[var(--color-orange)]">
                          {index === 0 ? <Sparkles size={16} /> : <Code2 size={16} />}
                        </span>
                        <div>
                          <b className="block text-xs text-[var(--fg-default)]">{item}</b>
                          <small className="text-[10px] text-[var(--fg-subtle)]">Ready for review</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-[14px] border border-[var(--border-default)] bg-white px-4 py-3 shadow-[var(--shadow-md)] dark:bg-[var(--surface-card)]">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
                <Check size={16} strokeWidth={3} />
              </span>
              <div>
                <b className="block text-xs text-[var(--fg-default)]">Sprint shipped</b>
                <small className="text-[11px] text-[var(--fg-subtle)]">Latest build deployed</small>
              </div>
            </div>

            <div
              className="absolute -right-6 top-10 hidden h-14 w-14 place-items-center rounded-2xl border border-[var(--border-default)] bg-white/80 shadow-[var(--shadow-md)] backdrop-blur-sm xl:grid dark:bg-[var(--surface-card)]/80"
              style={{ animation: "amfire-float 6s ease-in-out infinite" }}
              aria-hidden="true"
            >
              <BarChart3 size={22} className="text-[var(--color-orange)]" />
            </div>
            <div
              className="absolute -left-8 top-1/2 hidden h-14 w-14 place-items-center rounded-2xl border border-[var(--border-default)] bg-white/80 shadow-[var(--shadow-md)] backdrop-blur-sm xl:grid dark:bg-[var(--surface-card)]/80"
              style={{ animation: "amfire-float 7s ease-in-out infinite 1s" }}
              aria-hidden="true"
            >
              <Bot size={22} className="text-[var(--color-orange)]" />
            </div>
          </div>
        </div>
      </section>

      <section className="amfire-section">
        <div className="mx-auto w-full max-w-none px-[10%]">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="amfire-eyebrow">What we build</span>
            <h2 className="mt-5 text-[clamp(30px,4vw,46px)] font-extrabold leading-tight tracking-[-0.02em]">Full-stack, AI-native, end to end.</h2>
            <p className="mt-4 text-[17px] leading-7 text-[var(--fg-muted)]">One team handles strategy, product design, engineering, AI, deployment, and handover.</p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
            {/* 01 — Web development (wide) */}
            <article className="amfire-card col-span-1 rounded-[20px] p-8 md:col-span-4">
              <div className="mb-7 grid gap-4 sm:grid-cols-[1.3fr_1fr]">
                <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[#15120F]">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-3.5 py-2.5">
                    <i className="h-2.5 w-2.5 rounded-full bg-[#ff6159]" />
                    <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <pre className="overflow-x-auto p-4 text-[11px] leading-[1.7] text-[#d8d3ca]">
                    <span className="text-[#f97316]">import</span> React <span className="text-[#f97316]">from</span> <span className="text-[#8fd19e]">&apos;react&apos;</span>
                    {"\n\n"}
                    <span className="text-[#f97316]">export default function</span> Landing() {"{"}
                    {"\n"}
                    {"  "}<span className="text-[#f97316]">return</span> (
                    {"\n"}
                    {"    "}&lt;<span className="text-[#8fd19e]">Navbar</span> /&gt;
                    {"\n"}
                    {"    "}&lt;<span className="text-[#8fd19e]">Hero</span> /&gt;
                    {"\n"}
                    {"    "}&lt;<span className="text-[#8fd19e]">Features</span> /&gt;
                    {"\n"}
                    {"  "})
                    {"\n"}
                    {"}"}
                  </pre>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--surface-page)] p-3.5">
                    <div className="mb-2 flex items-center justify-between">
                      <b className="text-[10px] font-extrabold text-[var(--fg-default)]">AMFIRE</b>
                      <span className="rounded-full gradient-bg px-2 py-0.5 text-[8px] font-bold text-white">Get Started</span>
                    </div>
                    <p className="text-[10px] font-bold leading-tight text-[var(--fg-default)]">Build faster. Launch smarter.</p>
                    <div className="mt-2 flex h-10 items-center justify-center rounded-lg bg-[var(--accent-tint)] text-[var(--color-orange)]">
                      <MonitorSmartphone size={16} />
                    </div>
                  </div>
                  <div className="flex flex-1 items-center justify-center rounded-2xl border border-[var(--border-default)] bg-[var(--surface-page)] p-3.5">
                    <Smartphone size={26} className="text-[var(--color-orange)]" />
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--fg-subtle)]">01</span>
              <h3 className="mt-2 flex flex-wrap items-center gap-2 text-xl font-bold text-[var(--fg-default)]">
                Web development
                <span className="rounded-full bg-[var(--accent-tint)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[var(--color-orange)]">Most requested</span>
              </h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-[var(--fg-muted)]">Marketing sites, SaaS platforms, admin dashboards, and client portals — pixel-perfect, fast-loading, SEO-ready.</p>
            </article>

            {/* 02 — Mobile apps */}
            <article className="amfire-card col-span-1 flex flex-col rounded-[20px] p-8 md:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--fg-subtle)]">02</span>
              <h3 className="mt-2 text-xl font-bold text-[var(--fg-default)]">Mobile apps</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">React Native iOS + Android with offline support, push notifications, and app-store delivery.</p>
              <div className="mt-3 flex gap-2">
                <span className="rounded-full border border-[var(--border-default)] px-2.5 py-1 text-[11px] font-semibold text-[var(--fg-muted)]">iOS</span>
                <span className="rounded-full border border-[var(--border-default)] px-2.5 py-1 text-[11px] font-semibold text-[var(--fg-muted)]">Android</span>
              </div>
              <div className="mt-5 grid flex-1 grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-page)] p-3">
                  <p className="mb-2 text-[10px] font-bold text-[var(--fg-subtle)]">Dashboard</p>
                  <div className="mb-1.5 flex items-baseline justify-between">
                    <span className="text-[9px] text-[var(--fg-muted)]">Clicks</span>
                    <b className="text-xs text-[var(--fg-default)]">12.4K</b>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[9px] text-[var(--fg-muted)]">Revenue</span>
                    <b className="text-xs text-[var(--fg-default)]">$32.8K</b>
                  </div>
                  <span className="mt-2 block text-[9px] font-bold text-[var(--color-success)]">+12.5%</span>
                </div>
                <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-page)] p-3">
                  <p className="mb-2 text-[10px] font-bold text-[var(--fg-subtle)]">Messages</p>
                  <div className="space-y-1.5">
                    {["Olivia R.", "Liam C.", "Ethan B."].map((name) => (
                      <div key={name} className="flex items-center gap-1.5">
                        <span className="h-3.5 w-3.5 shrink-0 rounded-full gradient-bg" />
                        <span className="text-[9px] text-[var(--fg-muted)]">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* 03 — AI agents */}
            <article className="amfire-card col-span-1 rounded-[20px] p-8 md:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--fg-subtle)]">03</span>
              <h3 className="mt-2 text-xl font-bold text-[var(--fg-default)]">AI agents</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">Autonomous agents that perform tasks, coordinate, and make decisions 24/7.</p>
              <div className="mt-6 flex items-center justify-between gap-2">
                <div className="flex flex-1 flex-col gap-1.5">
                  {["Request", "Documents", "Database"].map((node) => (
                    <span key={node} className="rounded-full border border-[var(--border-default)] px-2 py-1 text-center text-[9px] font-semibold text-[var(--fg-muted)]">{node}</span>
                  ))}
                </div>
                <div className="mx-1 h-px flex-1 bg-[var(--border-default)]" />
                <div className="flex shrink-0 flex-col items-center gap-1.5">
                  <span className="grid h-11 w-11 place-items-center rounded-full gradient-bg text-white shadow-[var(--shadow-glow-sm)]">
                    <Bot size={20} />
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-bold text-[var(--color-orange)]">
                    <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-orange)]" />
                    Running
                  </span>
                </div>
                <div className="mx-1 h-px flex-1 bg-[var(--border-default)]" />
                <div className="flex flex-1 flex-col gap-1.5">
                  {["Reasoning", "Action", "Response"].map((node) => (
                    <span key={node} className="rounded-full border border-[var(--border-default)] px-2 py-1 text-center text-[9px] font-semibold text-[var(--fg-muted)]">{node}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* 04 — Automation */}
            <article className="amfire-card col-span-1 rounded-[20px] p-8 md:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--fg-subtle)]">04</span>
              <h3 className="mt-2 text-xl font-bold text-[var(--fg-default)]">Automation</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">Kill manual workflows — data pipelines, WhatsApp, and no-code integrations.</p>
              <div className="mt-5 flex items-start gap-1">
                {[
                  { icon: Zap, label: "Trigger", live: true },
                  { icon: Sparkles, label: "Process" },
                  { icon: MessageCircle, label: "Action" },
                  { icon: Check, label: "Result" },
                ].map((step, i, arr) => (
                  <div key={step.label} className="flex flex-1 items-start">
                    <div className="flex flex-1 flex-col items-center text-center">
                      <span className={`grid h-8 w-8 place-items-center rounded-lg ${step.live ? "gradient-bg text-white" : "bg-[var(--accent-tint)] text-[var(--color-orange)]"}`}>
                        <step.icon size={14} />
                      </span>
                      <small className="mt-1.5 text-[9px] font-bold text-[var(--fg-default)]">{step.label}</small>
                    </div>
                    {i < arr.length - 1 ? <span className="mt-4 h-px flex-1 bg-[var(--border-default)]" /> : null}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-6 border-t border-[var(--border-subtle)] pt-5">
                <div>
                  <b className="block text-lg font-extrabold text-[var(--fg-default)]">12,842</b>
                  <small className="text-[10px] text-[var(--fg-muted)]">Workflows run</small>
                </div>
                <div>
                  <b className="block text-lg font-extrabold text-[var(--fg-default)]">99.7%</b>
                  <small className="text-[10px] text-[var(--fg-muted)]">Success rate</small>
                </div>
              </div>
            </article>

            {/* 05 — Cloud & DevOps */}
            <article className="amfire-card col-span-1 rounded-[20px] p-8 md:col-span-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--fg-subtle)]">05</span>
              <h3 className="mt-2 text-xl font-bold text-[var(--fg-default)]">Cloud and DevOps</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">CI/CD pipelines and containerised deploys on AWS/GCP/Hetzner with full SSL and DNS.</p>
              <div className="mt-5 flex items-center gap-1">
                {["Code", "Build", "Test", "Deploy"].map((step, i, arr) => (
                  <div key={step} className="flex flex-1 items-center">
                    <span className="flex-1 rounded-lg border border-[var(--border-default)] py-2 text-center text-[10px] font-bold text-[var(--fg-default)]">{step}</span>
                    {i < arr.length - 1 ? <span className="mx-1 h-px w-2 shrink-0 bg-[var(--border-default)]" /> : null}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex gap-6 border-t border-[var(--border-subtle)] pt-5">
                <div>
                  <b className="flex items-center gap-1.5 text-sm font-extrabold text-[var(--fg-default)]">
                    <i className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" /> Healthy
                  </b>
                  <small className="text-[10px] text-[var(--fg-muted)]">Production</small>
                </div>
                <div>
                  <b className="block text-sm font-extrabold text-[var(--fg-default)]">99.99%</b>
                  <small className="text-[10px] text-[var(--fg-muted)]">Uptime</small>
                </div>
                <div>
                  <b className="block text-sm font-extrabold text-[var(--fg-default)]">42</b>
                  <small className="text-[10px] text-[var(--fg-muted)]">Deploys/mo</small>
                </div>
              </div>
            </article>

            {/* 06 — UI/UX design (full width, dark) */}
            <article className="col-span-1 grid gap-8 rounded-[20px] border border-[#2b2621] bg-[#15120F] p-8 md:col-span-6 lg:grid-cols-[280px_1fr] lg:items-center">
              <div>
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#2A2420] text-white">
                  <MonitorSmartphone size={20} />
                </div>
                <span className="mt-4 block text-[11px] font-bold uppercase tracking-[0.1em] text-[#8A8378]">06</span>
                <h3 className="mt-2 text-xl font-bold text-white">UI/UX design</h3>
                <p className="mt-2 text-sm leading-6 text-[#A8A29B]">Figma-based, user-tested design systems — we design the product before a line of code.</p>
              </div>
              <div className="grid gap-4 rounded-2xl bg-[#1c1815] p-5 sm:grid-cols-[130px_1fr_150px]">
                <div className="hidden flex-col gap-2 text-[10px] text-[#8A8378] sm:flex">
                  <span className="mb-1 font-bold uppercase tracking-wider text-[#5c564d]">Layers</span>
                  {["Header", "Hero", "Features", "Pricing", "Footer"].map((layer) => (
                    <span key={layer} className="flex items-center gap-2">
                      <i className="h-1 w-1 rounded-full bg-[#5c564d]" />
                      {layer}
                    </span>
                  ))}
                </div>
                <div className="rounded-xl bg-[#26211d] p-4">
                  <p className="text-[10px] font-bold text-[#8A8378]">Headline</p>
                  <p className="mt-1 text-xs text-white">Medium title goes here</p>
                  <div className="mt-3 flex h-14 items-center justify-center rounded-lg bg-[#1c1815] text-[#5c564d]">
                    <LayoutGrid size={18} />
                  </div>
                  <span className="mt-3 inline-block rounded-full gradient-bg px-3 py-1.5 text-[10px] font-bold text-white">Primary Button</span>
                </div>
                <div className="hidden flex-col gap-3 text-[10px] text-[#8A8378] sm:flex">
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[#5c564d]">Design</span>
                    <div className="mt-1.5 space-y-1">
                      <div className="flex justify-between"><span>X</span><b className="text-white">24</b></div>
                      <div className="flex justify-between"><span>Y</span><b className="text-white">96</b></div>
                      <div className="flex justify-between"><span>W</span><b className="text-white">1200</b></div>
                    </div>
                  </div>
                  <div>
                    <span className="font-bold uppercase tracking-wider text-[#5c564d]">Colors</span>
                    <div className="mt-1.5 flex gap-1">
                      {["#F97316", "#4a453d", "#6b665e", "#9b968d", "#c9c4bb"].map((c) => (
                        <i key={c} className="h-3.5 w-3.5 rounded-full" style={{ background: c }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="amfire-section amfire-section-alt">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-12 px-8 lg:grid-cols-2">
          <div>
            <span className="amfire-label">Unique to amfire</span>
            <h2 className="mt-5 text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em]">Real-time project visibility</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-7 text-[var(--fg-muted)]">
              Most agencies go dark after kickoff. We give every client a live portal: milestone progress, staging links, documents, and payments — all in one place, updated as we ship.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Milestone tracker with staging previews",
                "Documents, invoices & payments in one view",
                "Feedback threads tied to each deliverable",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--fg-muted)]">
                  <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-orange)]" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/login">
                Try the Demo Portal <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>
          <div className="amfire-card rounded-[20px] p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[var(--fg-default)]">Milestones</h3>
              <span className="rounded-full bg-[var(--color-success-bg)] px-3 py-1 text-[11px] font-bold text-[var(--color-success)]">Live</span>
            </div>
            {[
              { label: "Design + Backend on staging", status: "Done", pct: 100 },
              { label: "AI Integration", status: "72%", pct: 72 },
              { label: "Production Launch", status: "—", pct: 8 },
            ].map((row) => (
              <div key={row.label} className="mb-4 last:mb-0">
                <div className="mb-1.5 flex items-center justify-between text-xs text-[var(--fg-muted)]">
                  <span>{row.label}</span>
                  <b className="text-[var(--fg-default)]">{row.status}</b>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800">
                  <span className="block h-full rounded-full gradient-bg" style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-3">
                <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[var(--accent-tint)] text-[var(--color-orange)]">
                  <FileCode2 size={16} />
                </span>
                <div>
                  <b className="block text-xs text-[var(--fg-default)]">Sprint_notes.pdf</b>
                  <small className="text-[10px] text-[var(--fg-subtle)]">Updated today</small>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)] p-3">
                <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[var(--accent-tint)] text-[var(--color-orange)]">
                  <CircleDollarSign size={16} />
                </span>
                <div>
                  <b className="block text-xs text-[var(--fg-default)]">Invoice #0032</b>
                  <small className="text-[10px] text-[var(--fg-subtle)]">Paid · ₹1.25L</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="amfire-section">
        <div className="mx-auto grid w-full max-w-[1340px] items-start gap-12 px-10 lg:grid-cols-[0.86fr_1.14fr]">
          <div>
            <span className="amfire-label">Selected work</span>
            <h2 className="mt-5 max-w-xl text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em]">Real products, not presentationware.</h2>
            <p className="mt-4 max-w-lg text-[17px] leading-7 text-[var(--fg-muted)]">
              The reference direction uses proof-led case studies and product mockups. This section carries that same quieter confidence into the app.
            </p>
            <div className="mt-8">
              <ButtonLink href="/work" variant="ghost">
                View case studies <ArrowRight size={16} />
              </ButtonLink>
            </div>
          </div>
          <div className="grid gap-5">
            {work.map((item) => (
              <article key={item.title} className="amfire-card grid gap-5 rounded-[20px] p-6 sm:grid-cols-[1fr_auto] sm:items-center">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-orange)]">{item.tag}</span>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.012em] text-[var(--fg-default)]">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--fg-muted)]">{item.text}</p>
                </div>
                <div className="rounded-2xl bg-[var(--accent-tint)] px-5 py-4 text-center text-[var(--color-orange)]">
                  <b className="block text-xl">{item.metric}</b>
                  <small className="font-bold uppercase tracking-[0.08em]">impact</small>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TrustedBy />

      <section className="amfire-section">
        <div className="mx-auto w-full max-w-[1440px] px-8">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="amfire-eyebrow">Pricing</span>
            <h2 className="mt-5 text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em]">Simple monthly AI build plans</h2>
            <p className="mt-4 text-[17px] leading-7 text-[var(--fg-muted)]">Transparent tiers with milestone-based delivery and support after launch.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {plans.map((plan) => (
              <article key={plan.name} className={`amfire-card relative flex rounded-[20px] p-7 ${plan.popular ? "border-[var(--color-orange)] shadow-[var(--shadow-glow-sm)]" : ""}`}>
                {plan.popular ? (
                  <span className="absolute -top-3 left-7 rounded-full gradient-bg px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white">Most popular</span>
                ) : null}
                <div className="flex min-h-full flex-col">
                  <h3 className="text-xl font-bold text-[var(--fg-default)]">{plan.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--fg-muted)]">{plan.desc}</p>
                  <div className="my-6">
                    <b className="text-[32px] font-extrabold tracking-[-0.03em] text-[var(--fg-default)]">{plan.price}</b>
                    {plan.price !== "Custom" ? <span className="text-sm text-[var(--fg-muted)]"> /mo</span> : null}
                  </div>
                  <ul className="mb-7 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm leading-5 text-[var(--fg-muted)]">
                        <Check size={16} className="mt-0.5 shrink-0 text-[var(--color-orange)]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-[9px] border border-[var(--border-default)] px-4 py-3 text-sm font-bold text-[var(--fg-default)] transition-all hover:border-[var(--color-orange)] hover:text-[var(--color-orange)]">
                    Start your project <ArrowRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 grid gap-3 rounded-[20px] border border-[var(--border-default)] bg-[var(--surface-card)] p-4 md:grid-cols-4">
            {paymentTrust.map((item) => (
              <div key={item.title} className="flex items-start gap-3 rounded-[14px] p-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--accent-tint)] text-[var(--color-orange)]">
                  <Icon name={item.icon} size={19} />
                </span>
                <div>
                  <b className="block text-sm text-[var(--fg-default)]">{item.title}</b>
                  <small className="mt-1 block leading-5 text-[var(--fg-muted)]">{item.text}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="amfire-section amfire-section-alt">
        <div className="mx-auto w-full max-w-[1440px] px-8">
          <div className="mb-10 max-w-2xl">
            <span className="amfire-label">Our process</span>
            <h2 className="mt-5 text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em]">7 steps, always on time.</h2>
            <p className="mt-4 text-[17px] leading-7 text-[var(--fg-muted)]">From idea to impact — a proven pipeline that keeps every stage visible, never just the end.</p>
          </div>
          <div className="flex flex-wrap items-start justify-center gap-y-10 lg:flex-nowrap lg:justify-between">
            {process.map((item, index) => (
              <div key={item.step} className="flex items-start">
                <article className="w-[150px] text-center sm:w-[128px]">
                  <div className="mx-auto mb-3 flex h-20 items-center justify-center">
                    <Image src={item.icon} alt="" width={120} height={120} className="max-h-20 w-auto object-contain drop-shadow-sm" />
                  </div>
                  <span className="inline-flex rounded-full border border-orange-300 px-3 py-1 text-xs font-bold tracking-[0.12em] text-[var(--color-orange)]">{item.step}</span>
                  <h3 className="mt-3 text-[15px] font-bold text-[var(--fg-default)]">{item.title}</h3>
                  <p className="mx-auto mt-2 max-w-[140px] text-xs leading-5 text-[var(--fg-muted)]">{item.text}</p>
                  <span className="mt-2 block text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--color-orange)]">{item.dur}</span>
                </article>
                {index < process.length - 1 ? (
                  <Image
                    src="/amfire-design/process/connector-sharp.png"
                    alt=""
                    width={28}
                    height={28}
                    className="mt-7 hidden w-6 shrink-0 object-contain opacity-70 lg:block xl:w-7"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="amfire-section">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <span className="amfire-label">About amfire</span>
            <h2 className="mt-5 text-[clamp(30px,4vw,44px)] font-extrabold leading-tight tracking-[-0.02em]">One team. Full accountability.</h2>
            <p className="mt-4 max-w-xl text-[17px] leading-7 text-[var(--fg-muted)]">
              We build AI-first digital products for Indian businesses. No handoff gaps, no vendor-blaming, no hidden ownership problem after launch.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["Real AI in production", "Full-stack ownership", "100% IP to you"].map((item) => (
              <div key={item} className="amfire-card rounded-[20px] p-6">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-xl gradient-bg text-white shadow-[var(--shadow-glow-sm)]">
                  <Check size={22} />
                </span>
                <h3 className="text-lg font-bold text-[var(--fg-default)]">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="amfire-section">
        <div className="mx-auto w-full max-w-[1440px] px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="amfire-eyebrow">Our products</span>
            <h2 className="mt-5 text-[clamp(30px,4vw,46px)] font-extrabold leading-tight tracking-[-0.02em]">
              Tools we build. Problems we <span className="gradient-text">solve.</span>
            </h2>
            <p className="mt-4 text-[17px] leading-7 text-[var(--fg-muted)]">
              AI-powered products built to simplify operations, enhance decisions, and drive real-world impact.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.name}
                className={`amfire-card rounded-[20px] p-7 ${product.featured ? "border-[var(--color-orange)] shadow-[var(--shadow-glow-sm)]" : ""}`}
              >
                <div className="mb-5 grid h-11 w-11 place-items-center rounded-xl" style={{ background: product.iconBg, color: product.iconColor }}>
                  <Icon name={product.icon} size={22} />
                </div>
                <h3 className="text-lg font-bold text-[var(--fg-default)]">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--fg-muted)]">{product.text}</p>
                <span className="mt-4 block h-[3px] w-8 rounded-full" style={{ background: product.accent }} />
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <ButtonLink href="/products" variant="ghost">
              View all products <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      <section className="amfire-section amfire-section-alt">
        <div className="amfire-wrap max-w-3xl text-center">
          <span className="amfire-eyebrow">Contact</span>
          <h2 className="mt-5 text-[clamp(34px,4.6vw,56px)] font-extrabold leading-tight tracking-[-0.03em]">Not sure which tier fits?</h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-7 text-[var(--fg-muted)]">
            Tell us what you are building. We will respond with scope, timeline, and a milestone plan.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/contact">
              Start a conversation <ArrowRight size={17} />
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
