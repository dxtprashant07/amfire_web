"use client";

import { motion, useReducedMotion } from "framer-motion";
import { stats, services, processSteps } from "@/config/home";

// Apple-style cubic-bezier — natural deceleration used throughout iOS / apple.com
const APPLE_EASE = [0.22, 0.61, 0.36, 1] as const;

// Real tech tags from the services we offer
const techTags = ["Next.js", "FastAPI", "GPT-4o", "AWS", "React Native", "PostgreSQL"];

// Real recent projects
const recentProjects = [
  { name: "Clearpath", tag: "SaaS + AI", color: "text-blue-500" },
  { name: "Skillship", tag: "EdTech",    color: "text-green-500" },
  { name: "FieldForce", tag: "Mobile",   color: "text-orange-500" },
];

// Cards reference real company data
const cards = [
  // ── Column 0 (leftmost) ──
  {
    x: 0, y: 0,
    float: { y: [0, -8], duration: 14 },
    content: (
      <div className="space-y-2.5">
        <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider">By the numbers</div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-secondary/70 rounded-lg p-2">
              <div className="text-sm font-bold gradient-text">{value}</div>
              <div className="text-[8px] text-muted-foreground leading-tight mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    x: 0, y: 200,
    float: { y: [0, 7], duration: 16 },
    content: (
      <div className="space-y-2">
        <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider mb-2">Recent Work</div>
        {recentProjects.map((p) => (
          <div key={p.name} className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0" />
            <span className="text-[10px] font-semibold text-foreground flex-1">{p.name}</span>
            <span className={`text-[8px] font-medium ${p.color}`}>{p.tag}</span>
          </div>
        ))}
      </div>
    ),
  },

  // ── Column 1 (middle) ──
  {
    x: 192, y: 50,
    float: { y: [0, -6], duration: 15 },
    content: (
      <div className="space-y-2.5">
        <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider">What We Build</div>
        <div className="space-y-1.5 mt-1">
          {services.slice(0, 4).map((s) => (
            <div key={s.title} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded gradient-bg flex items-center justify-center shrink-0">
                <s.icon size={9} className="text-white" />
              </div>
              <span className="text-[9px] text-foreground font-medium">{s.title}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    x: 192, y: 246,
    float: { y: [0, 9], duration: 18 },
    content: (
      <div className="space-y-2">
        <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider mb-2">Our Process</div>
        {processSteps.slice(0, 4).map((p, i) => (
          <div key={p.step} className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full shrink-0 ${i <= 1 ? "bg-green-500" : i === 2 ? "gradient-bg animate-pulse" : "bg-border"}`} />
            <span className="text-[9px] text-muted-foreground flex-1">{p.title}</span>
            <span className={`text-[8px] font-semibold ${i <= 1 ? "text-green-500" : i === 2 ? "text-primary" : "text-muted-foreground/40"}`}>
              {i <= 1 ? "✓" : i === 2 ? "…" : "—"}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    x: 192, y: 430,
    float: { y: [0, -5], duration: 13 },
    content: (
      <div className="space-y-2">
        <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider mb-1">AI Assistant</div>
        <div className="space-y-2">
          <div className="flex justify-end">
            <div className="bg-primary/20 text-primary text-[9px] rounded-xl rounded-br-sm px-3 py-1.5 max-w-[85%] leading-relaxed">
              Summarise this contract
            </div>
          </div>
          <div className="flex">
            <div className="bg-secondary text-foreground text-[9px] rounded-xl rounded-bl-sm px-3 py-1.5 max-w-[92%] leading-relaxed">
              Found 3 key clauses — penalty on delay, IP ownership, and termination rights.
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ── Column 2 (rightmost) ──
  {
    x: 382, y: 20,
    float: { y: [0, -10], duration: 17 },
    content: (
      <div className="space-y-2.5">
        <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider">Tech Stack</div>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {techTags.map((t) => (
            <span key={t} className="px-2 py-1 rounded-md bg-secondary border border-border/60 text-[9px] text-foreground font-medium">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    x: 382, y: 194,
    float: { y: [0, 7], duration: 16 },
    content: (
      <div className="space-y-2.5">
        <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider">Mobile App</div>
        <div className="flex gap-3 items-center mt-1">
          <div className="w-11 rounded-xl border border-border bg-secondary/60 flex flex-col items-center justify-center gap-1.5 shrink-0 p-2 py-3">
            <div className="w-7 h-2 rounded-full gradient-bg" />
            <div className="w-6 h-1.5 rounded-full bg-border" />
            <div className="w-7 h-1.5 rounded-full bg-border" />
            <div className="w-5 h-4 rounded-md gradient-bg mt-1 opacity-60" />
          </div>
          <div className="space-y-1">
            <div className="text-[9px] text-muted-foreground">iOS + Android</div>
            <div className="text-[11px] font-bold text-foreground">React Native</div>
            <div className="text-[9px] text-green-500 font-medium">Offline-ready</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    x: 382, y: 375,
    float: { y: [0, -8], duration: 19 },
    content: (
      <div className="space-y-2">
        <div className="text-[9px] font-semibold text-foreground/60 uppercase tracking-wider mb-2">Delivery Phases</div>
        {processSteps.slice(0, 4).map((p, i) => (
          <div key={p.step}>
            <div className="flex justify-between mb-1">
              <span className="text-[9px] text-muted-foreground">{p.title}</span>
              <span className="text-[9px] text-muted-foreground font-medium">
                {i === 0 ? "100%" : i === 1 ? "100%" : i === 2 ? "65%" : "0%"}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full rounded-full gradient-bg"
                style={{ width: i === 0 ? "100%" : i === 1 ? "100%" : i === 2 ? "65%" : "0%" }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* ── Ambient blobs (static on mobile, animated on desktop) ── */}
      <div
        className="absolute rounded-full md:hidden"
        style={{
          width: 500, height: 500,
          top: "-20%", right: "-20%",
          background: "radial-gradient(circle, hsl(5 77% 57% / 0.10) 0%, transparent 70%)",
        }}
      />
      {/* Blobs: translate-only (GPU-free). Scale causes re-blur every frame — avoided. */}
      <motion.div
        className="absolute rounded-full hidden md:block"
        style={{
          width: 700, height: 700,
          top: "-25%", right: "-18%",
          background: "radial-gradient(circle, hsl(5 77% 57% / 0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
          willChange: "transform",
        }}
        animate={prefersReducedMotion ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 24, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full hidden md:block"
        style={{
          width: 450, height: 450,
          top: "30%", left: "-8%",
          background: "radial-gradient(circle, hsl(25 87% 58% / 0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
          willChange: "transform",
        }}
        animate={prefersReducedMotion ? undefined : { x: [0, 25, 0], y: [0, 30, 0] }}
        transition={{ duration: 28, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full hidden md:block"
        style={{
          width: 380, height: 380,
          bottom: "5%", right: "15%",
          background: "radial-gradient(circle, hsl(217 91% 60% / 0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
          willChange: "transform",
        }}
        animate={prefersReducedMotion ? undefined : { x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: 5 }}
      />

      {/* ── Floating cards — desktop only ──
          Single-gradient mask (cheap) instead of two composited masks.
          Cards use opaque bg (no backdrop-blur per card — would re-blur every frame).
          Every animated element has willChange+translateZ to stay on GPU. */}
      <div className="absolute inset-0 hidden lg:block">
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 38%, black 68%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 38%, black 68%)",
          }}
        >
          <div className="absolute right-8 top-0 bottom-0" style={{ width: 574 }}>
            {cards.map((card, idx) => (
              // Outer: spring entrance (opacity + slide up). GPU-promoted.
              <motion.div
                key={idx}
                className="absolute"
                style={{
                  width: 172,
                  left: card.x,
                  top: card.y,
                  willChange: "transform, opacity",
                  transform: "translateZ(0)",
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  opacity: { duration: 0.7, delay: 0.25 + idx * 0.07, ease: APPLE_EASE },
                  y: { duration: 0.9, delay: 0.25 + idx * 0.07, ease: APPLE_EASE },
                }}
              >
                {/* Inner: continuous gentle float. Mirror = smooth reverse, no snap. */}
                <motion.div
                  className="rounded-2xl border border-border/50 bg-card shadow-xl p-4"
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                  }}
                  animate={prefersReducedMotion ? undefined : { y: card.float.y }}
                  transition={{
                    y: {
                      duration: card.float.duration,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: idx * 0.6,
                    },
                  }}
                >
                  {card.content}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
