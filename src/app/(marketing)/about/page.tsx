import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About | amfire",
  description:
    "One team, full accountability. We are an AI engineering team that builds intelligent digital products end-to-end.",
};

const commitments = [
  {
    n: "01",
    title: "Real AI, not a dashboard",
    text: "Adaptive engines and autonomous agents running in production — not a static graph relabelled \"AI Insights\".",
  },
  {
    n: "02",
    title: "Full-stack ownership",
    text: "Frontend, backend, AI, deployment. One team, one point of contact — no vendor-blaming, no handoff gaps.",
  },
  {
    n: "03",
    title: "India-first engineering",
    text: "Built for Indian workflows, hierarchies, and infrastructure — not a Western SaaS forced into local context.",
  },
  {
    n: "04",
    title: "Transparent scope",
    text: "What's in the proposal is what gets built. Changes are quoted before they're billed. No hidden charges.",
  },
  {
    n: "05",
    title: "Agentic architecture",
    text: "Multi-agent systems that coordinate autonomously, 24/7 — the way modern software should run.",
  },
  {
    n: "06",
    title: "Post-launch partnership",
    text: "Dedicated support after delivery. We stay behind the work until it succeeds.",
  },
];

const engagement = [
  {
    k: "Payment",
    text: "Milestone-based — 20% at kickoff, scaling to full payment at launch. You pay as value ships, never upfront in full.",
  },
  {
    k: "Scope",
    text: "Agreed in writing before we start. Any change is quoted before it's billed — never after.",
  },
  {
    k: "Ownership",
    text: "100% of the IP transfers to you on final payment. The code is yours.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-10 pt-[72px]">
        <div className="amfire-wrap grid items-center gap-[72px] lg:grid-cols-[1.18fr_1fr]">
          <div>
            <span className="amfire-eyebrow">About Us</span>
            <h1 className="mt-6 text-[clamp(38px,5vw,58px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--fg-default)]">
              One team. Full <span className="gradient-text">accountability</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-[1.7] text-[var(--fg-muted)]">
              We&apos;re an AI engineering team building intelligent digital products end-to-end — in production, for
              Indian businesses. No founder bios, no team photos. The platforms we&apos;ve shipped speak for us.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/work" className="amfire-primary inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
                See our work
              </Link>
              <Link href="/contact" className="amfire-ghost inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
                Start a conversation
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="absolute top-5 bottom-[-22px] left-[22px] right-[-22px] -rotate-[1.6deg] rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-sunken)]" aria-hidden="true" />
            <div className="relative rotate-[0.6deg] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-lg),var(--shadow-glow-sm)]">
              <div className="flex items-center gap-1.5 border-b border-[var(--border-default)] px-[18px] py-3.5">
                <i className="h-[11px] w-[11px] rounded-full bg-[#FF6159]" />
                <i className="h-[11px] w-[11px] rounded-full bg-[#FEBC2E]" />
                <i className="h-[11px] w-[11px] rounded-full bg-[#28C840]" />
                <b className="ml-2.5 text-xs font-semibold text-[var(--fg-muted)]">what we stand for</b>
              </div>
              <div className="p-[22px]">
                {["Real AI in production", "Full-stack ownership", "100% IP to you"].map((row) => (
                  <div key={row} className="mb-3.5 flex items-center justify-between">
                    <h5 className="text-[15px] font-bold text-[var(--fg-default)]">{row}</h5>
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--color-success-bg)] text-[var(--color-success)]">
                      <Check size={13} strokeWidth={3} />
                    </span>
                  </div>
                ))}
                <div className="mt-2 flex gap-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="h-1.5 flex-1 rounded-full gradient-bg" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why amfire */}
      <section className="amfire-section">
        <div className="mx-auto max-w-[920px] px-6">
          <div className="mb-[52px] max-w-[660px]">
            <span className="amfire-label">Why amfire</span>
            <h2 className="mt-5 text-[clamp(28px,3.6vw,38px)] font-extrabold leading-tight tracking-[-0.02em]">Six commitments that shape every engagement</h2>
          </div>
          <div className="grid gap-x-[60px] sm:grid-cols-2">
            {commitments.map((c) => (
              <div key={c.n} className="border-t border-[var(--border-default)] py-[34px]">
                <span className="text-[13px] font-bold tracking-[0.16em] text-[var(--color-orange)]">{c.n}</span>
                <h3 className="mt-3 mb-2 text-[22px] font-bold text-[var(--fg-default)]">{c.title}</h3>
                <p className="text-[15px] leading-[1.65] text-[var(--gray-700)]">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we engage */}
      <section className="amfire-section amfire-section-alt">
        <div className="amfire-wrap grid items-center gap-14 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="text-[clamp(26px,3.2vw,34px)] font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">How we engage</h2>
            <p className="mb-3.5 mt-2 text-[var(--fg-muted)]">Simple, written, and fair — the same way on every project.</p>
            {engagement.map((e) => (
              <div key={e.k} className="border-t border-[var(--border-default)] py-[18px]">
                <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--color-orange)]">{e.k}</div>
                <p className="text-[14.5px] leading-[1.6] text-[var(--gray-700)]">{e.text}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-[26px] font-bold leading-[1.3] tracking-[-0.012em] text-[var(--fg-default)]">
              <span className="text-[var(--color-orange)]">&quot;</span>We stay behind the work, not in front of it.&quot;
            </p>
            <div className="mt-[26px] flex justify-center">
              <Link href="/contact" className="amfire-primary inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
                Start a conversation <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
