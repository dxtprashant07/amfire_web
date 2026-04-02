"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const lastScrollY = useRef(0);
  const [scrollingDown, setScrollingDown] = useState(true);
  const [entering, setEntering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollingDown(y >= lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track enter vs exit to apply different transitions
  useEffect(() => {
    setEntering(isInView);
  }, [isInView]);

  const getOffset = () => {
    if (direction === "left") return { x: 20, y: 0 };
    if (direction === "right") return { x: -20, y: 0 };
    if (direction === "up") return scrollingDown ? { y: 20, x: 0 } : { y: -20, x: 0 };
    return scrollingDown ? { y: -20, x: 0 } : { y: 20, x: 0 };
  };

  const offset = getOffset();

  // Enter: full duration + stagger delay; Exit: quick fade, no delay
  const transition = entering
    ? { duration: 0.55, delay: scrollingDown ? delay : 0, ease: [0.16, 1, 0.3, 1] as const }
    : { duration: 0.25, delay: 0, ease: [0.4, 0, 1, 1] as const };

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
          : { opacity: 0, ...offset, filter: "blur(4px)" }
      }
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
