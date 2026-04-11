"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { caseStudies } from "@/config/home";

export function CaseStudyCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const paused = useRef(false);
  const total = caseStudies.length;

  const goTo = (idx: number) => {
    setVisible(false);
    setTimeout(() => {
      setCurrent(idx);
      setVisible(true);
    }, 300);
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) {
        setVisible(false);
        setTimeout(() => {
          setCurrent((c) => (c + 1) % total);
          setVisible(true);
        }, 300);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => goTo((current - 1 + total) % total);
  const next = () => goTo((current + 1) % total);

  const cs = caseStudies[current];

  return (
    <div
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Card */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        <div className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 min-h-[260px] lg:min-h-[240px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Text content */}
            <div className="p-5 sm:p-7 md:p-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5 md:mb-6 w-fit">
                {cs.tag}
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4 leading-tight">
                {cs.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 md:mb-8 max-w-sm">
                {cs.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5 md:mb-8">
                {cs.stack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-full bg-secondary text-foreground text-xs font-medium border border-border"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <Link
                  href={cs.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  View case study <ArrowRight size={14} />
                </Link>
                <span className="text-xs font-semibold gradient-text">{cs.metric}</span>
              </div>
            </div>

            {/* Visual placeholder */}
            <div className="relative hidden sm:flex min-h-48 lg:min-h-0 bg-secondary/50 items-center justify-center p-8">
              <div className="w-full max-w-xs space-y-3">
                {cs.visual.widths.map((w, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-bg shrink-0" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2.5 rounded-full bg-border" style={{ width: `${w}%` }} />
                      <div className="h-2 rounded-full bg-border/50" style={{ width: `${w - 20}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                {cs.visual.label}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex gap-2">
          {caseStudies.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to case study ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "gradient-bg w-5" : "bg-border w-1.5"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            aria-label="Previous case study"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            aria-label="Next case study"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
