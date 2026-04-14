"use client";

import { motion } from "framer-motion";
import { stats, services, processSteps } from "@/config/home";

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
    float: { y: [0, -10, 0], duration: 7 },
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
    float: { y: [0, 9, 0], duration: 9 },
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
    float: { y: [0, -8, 4, 0], duration: 8 },
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
    float: { y: [0, 11, 0], duration: 10 },
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
    float: { y: [0, -7, 0], duration: 6 },
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
    float: { y: [0, -12, 0], duration: 9 },
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
    float: { y: [0, 8, -4, 0], duration: 8 },
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
    float: { y: [0, -9, 3, 0], duration: 11 },
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
      <motion.div
        className="absolute rounded-full hidden md:block"
        style={{
          width: 700, height: 700,
          top: "-25%", right: "-18%",
          background: "radial-gradient(circle, hsl(5 77% 57% / 0.10) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ scale: [1, 1.12, 0.94, 1], x: [0, 40, -20, 0], y: [0, -30, 25, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full hidden md:block"
        style={{
          width: 450, height: 450,
          top: "30%", left: "-8%",
          background: "radial-gradient(circle, hsl(25 87% 58% / 0.07) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
        animate={{ scale: [1, 1.2, 0.9, 1], x: [0, 30, -15, 0], y: [0, 40, -25, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute rounded-full hidden md:block"
        style={{
          width: 380, height: 380,
          bottom: "5%", right: "15%",
          background: "radial-gradient(circle, hsl(217 91% 60% / 0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{ scale: [1, 1.15, 0.92, 1], x: [0, -25, 15, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      {/* ── Floating cards — desktop only ── */}
      <div className="absolute inset-0 hidden lg:block">
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, transparent 35%, rgba(0,0,0,0.3) 46%, rgba(0,0,0,0.8) 58%, black 70%), " +
              "linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, transparent 35%, rgba(0,0,0,0.3) 46%, rgba(0,0,0,0.8) 58%, black 70%), " +
              "linear-gradient(to bottom, transparent 0%, black 10%, black 88%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        >
          <div className="absolute right-8 top-0 bottom-0" style={{ width: 574 }}>
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className="absolute rounded-2xl border border-border/50 bg-card/85 backdrop-blur-sm shadow-xl p-4"
                style={{ width: 172, left: card.x, top: card.y }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: card.float.y }}
                transition={{
                  opacity: { duration: 0.6, delay: idx * 0.12 },
                  y: { duration: card.float.duration, repeat: Infinity, ease: "easeInOut", delay: idx * 0.3 },
                }}
              >
                {card.content}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
