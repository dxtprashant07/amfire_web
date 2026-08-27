import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Products | amfire",
  description:
    "AI Career Copilot — a bilingual career roadmap generator for Indian students, built end-to-end by amfire.",
};

const stats = [
  { value: "1,400+", label: "Career paths" },
  { value: "12+", label: "Skill domains" },
  { value: "<2.5s", label: "Response" },
  { value: "92%", label: "Accuracy" },
];

const chat = [
  { me: false, text: "Hi! What class are you in?" },
  { me: true, text: "Class 11, PCM 🙂" },
  { me: false, text: "Interested in AI or core engineering?" },
  { me: true, text: "AI, definitely" },
  { me: false, text: "Here's a roadmap → B.Tech CSE (AI) · 3 target colleges · 2 skill tracks 🔥", wide: true },
  { me: true, text: "Amazing, thank you!" },
];

export default function ProductsPage() {
  return (
    <>
      <section className="pt-16 text-center md:pt-20">
        <div className="amfire-wrap mx-auto max-w-[760px]">
          <ScrollReveal>
            <h1 className="text-[clamp(34px,5vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-[var(--fg-default)]">
              We don&apos;t just build for clients.<br />
              <span className="gradient-text">We build for the world.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-5 inline-block rounded-full border border-[var(--border-default)] bg-[var(--surface-card)] px-5 py-2.5 text-sm text-[var(--fg-muted)] shadow-[var(--shadow-sm)]">
              Services build custom solutions for your business. Products solve common problems for everyone.{" "}
              <Link href="/services" className="font-semibold text-[var(--color-orange)] hover:underline">
                View Services →
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="amfire-section">
        <div className="amfire-wrap grid items-center gap-14 lg:grid-cols-2">
          <ScrollReveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-success-bg)] px-3 py-1.5 text-[11px] font-bold text-[var(--color-success)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" /> Live
            </span>
            <h2 className="mt-5 text-[clamp(28px,3.6vw,40px)] font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">AI Career Copilot</h2>
            <p className="mt-4 max-w-lg text-lg leading-[1.7] text-[var(--fg-muted)]">
              AI-powered career roadmap generator for Indian students — chat, roadmaps, and college matching in English
              or Hindi. Built end-to-end by amfire, live inside Skillship.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact" className="amfire-primary inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
                Try the beta →
              </Link>
              <Link href="/work" className="amfire-ghost inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
                Watch demo
              </Link>
            </div>
            <div className="mt-9 grid grid-cols-4 gap-3">
              {stats.map((s) => (
                <div key={s.label}>
                  <b className="block text-xl font-extrabold text-[var(--fg-default)]">{s.value}</b>
                  <small className="text-[11px] text-[var(--fg-muted)]">{s.label}</small>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[36px] border-4 border-[var(--fg-default)] bg-[var(--surface-card)] shadow-[var(--shadow-lg)]">
              <div className="flex flex-col gap-2.5 p-4">
                {chat.map((c, i) => (
                  <div
                    key={i}
                    className={`rounded-2xl px-3.5 py-2.5 text-[13px] leading-snug ${
                      c.me ? "self-end gradient-bg text-white" : "self-start bg-[var(--surface-sunken)] text-[var(--fg-default)]"
                    } ${c.wide ? "max-w-[88%]" : "max-w-[75%]"}`}
                  >
                    {c.text}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="amfire-section amfire-section-alt text-center">
        <div className="amfire-wrap max-w-[680px]">
          <h3 className="text-xl font-extrabold text-[var(--fg-default)]">More products in the works</h3>
          <p className="mt-2 text-[var(--fg-muted)]">
            We&apos;re turning the problems we solve for clients into products anyone can use. Want early access?
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="amfire-ghost inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
              Join the waitlist
            </Link>
            <Link href="/contact" className="amfire-primary inline-flex items-center gap-2 rounded-[9px] px-6 py-3 text-sm font-bold transition-all">
              Talk white-label / custom
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
