"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/config/home";

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="flex flex-col p-5 sm:p-6 md:p-7 rounded-xl border border-border bg-card h-full">
      <div className="flex gap-1 mb-3 md:mb-4">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} size={13} className="fill-primary text-primary" />
        ))}
      </div>
      <blockquote className="text-sm md:text-base text-foreground leading-relaxed flex-1 mb-4 md:mb-6">
        "{t.quote}"
      </blockquote>
      <div>
        <p className="text-sm font-semibold text-foreground">{t.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{t.role}</p>
      </div>
    </div>
  );
}

export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;
  const paused = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused.current) setCurrent((c) => (c + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const second = (current + 1) % total;

  return (
    <div
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Cards — 1 on mobile, 2 on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        <TestimonialCard t={testimonials[current]} />
        <div className="hidden md:block">
          <TestimonialCard t={testimonials[second]} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? "gradient-bg w-5" : "bg-border w-1.5"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
