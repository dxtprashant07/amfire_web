"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

/** data-go targets in the design map 1:1 onto routes. */
const ROUTES: Record<string, string> = {
  home: "/",
  services: "/services",
  products: "/products",
  work: "/work",
  casestudy: "/work/skillship",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
};

/** Open/close the mobile nav drawer. Body scroll is locked while it is open. */
function setNav(open: boolean) {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  nav.classList.toggle("open", open);
  document.body.classList.toggle("nav-locked", open);
  nav.querySelector("#nav-burger")?.setAttribute("aria-expanded", String(open));
}

/**
 * Ports the standalone design's inline scripts: [data-go] navigation (now real
 * routing), filter chips, the scrolled navbar state, section reveal-on-scroll,
 * and the process row's scale-to-fit.
 */
export function SiteBehaviors() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const current = Object.entries(ROUTES).find(([, href]) => href === pathname)?.[0];
    document
      .querySelectorAll<HTMLElement>(".nlinks a")
      .forEach((a) => a.classList.toggle("on", a.dataset.go === current));
    setNav(false);
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;

      // Mobile drawer. The desktop nav has no toggle, so this is a no-op there.
      if (target?.closest("#nav-burger")) {
        setNav(!document.getElementById("navbar")?.classList.contains("open"));
        return;
      }
      if (!target?.closest("#navbar")) setNav(false);

      const go = target?.closest<HTMLElement>("[data-go]");
      if (go) {
        setNav(false);
        const href = ROUTES[go.dataset.go ?? ""];
        if (href) router.push(href);
        return;
      }
      if (target?.closest(".nlinks a")) setNav(false);
      const chip = target?.closest<HTMLElement>(".filter .p");
      if (chip) {
        chip.parentElement?.querySelectorAll(".p").forEach((x) => x.classList.remove("on"));
        chip.classList.add("on");
      }
    }

    function onScroll() {
      document.getElementById("navbar")?.classList.toggle("scrolled", window.scrollY > 8);
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNav(false);
    }

    // The drawer only exists below 920px; rotating past it must not leave the
    // body scroll-locked.
    function onResize() {
      fitProcess();
      if (window.innerWidth > 920) setNav(false);
    }

    function fitProcess() {
      const wrap = document.querySelector<HTMLElement>(".process .prow-fit");
      const row = document.querySelector<HTMLElement>(".process .prow");
      if (!wrap || !row) return;
      row.style.transform = "none";
      const rowRect = row.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      const scale = Math.min(1, wrapRect.width / rowRect.width);
      const offsetX = (wrapRect.width - rowRect.width * scale) / 2;
      row.style.transformOrigin = "0 0";
      row.style.transform = `translateX(${offsetX}px) scale(${scale})`;
      wrap.style.height = `${rowRect.height * scale}px`;
    }

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("in-view");
            reveal.unobserve(en.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".sec").forEach((el) => reveal.observe(el));

    document.querySelectorAll<HTMLImageElement>(".process img").forEach((img) => {
      if (img.complete) fitProcess();
      else img.addEventListener("load", fitProcess);
    });
    fitProcess();
    const t1 = setTimeout(fitProcess, 300);
    const t2 = setTimeout(fitProcess, 1000);

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScroll();

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      setNav(false);
      reveal.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [router, pathname]);

  return null;
}
