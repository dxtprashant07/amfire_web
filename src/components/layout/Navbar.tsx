"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Sun, Moon, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/stores/auth-store";

const solutionsLinks = [
  { label: "Services Overview", href: "/services" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "Mobile Apps", href: "/services/mobile-apps" },
  { label: "AI & Agents", href: "/services/ai-agents" },
  { label: "Automation", href: "/services/automation" },
  { label: "Cloud & DevOps", href: "/services/cloud-devops" },
  { label: "UI / UX Design", href: "/services/ui-ux-design" },
];

const workLinks = [
  { label: "Portfolio & Case Studies", href: "/work" },
  { label: "Industries We Serve", href: "/industries" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Pricing", href: "/pricing" },
];

const aboutLinks = [
  { label: "Our Story", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
];

export function Navbar() {
  const pathname = usePathname();
  const { user, clearAuth } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileWorkOpen, setMobileWorkOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const solutionsTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const workTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const aboutTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lastScrollY = useRef(0);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    return () => {
      clearTimeout(solutionsTimer.current);
      clearTimeout(workTimer.current);
      clearTimeout(aboutTimer.current);
    };
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (y / docH) * 100 : 0);
      setScrolled(y > 10);
      if (y > 200) {
        setHidden(y > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(e.target as Node)) setSolutionsOpen(false);
      if (workRef.current && !workRef.current.contains(e.target as Node)) setWorkOpen(false);
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) setAboutOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
    setWorkOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  const isActive = (hrefs: string[]) => hrefs.some((h) => pathname === h || pathname.startsWith(h + "/"));

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[3px] gradient-bg transition-[width] duration-100"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent",
          hidden ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="container mx-auto flex items-center justify-between h-20 px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight shrink-0">
            <span className="text-foreground">am</span>
            <span className="gradient-text">fire</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {/* Solutions dropdown */}
            <div
              ref={solutionsRef}
              className="relative"
              onMouseEnter={() => { clearTimeout(solutionsTimer.current); clearTimeout(workTimer.current); clearTimeout(aboutTimer.current); setSolutionsOpen(true); setWorkOpen(false); setAboutOpen(false); }}
              onMouseLeave={() => { solutionsTimer.current = setTimeout(() => setSolutionsOpen(false), 200); }}
            >
              <button
                onClick={() => { setSolutionsOpen((v) => !v); setWorkOpen(false); setAboutOpen(false); }}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  isActive(["/services"]) ? "text-primary" : "text-muted-foreground"
                )}
              >
                Solutions
                <ChevronDown size={14} className={cn("transition-transform duration-200", solutionsOpen && "rotate-180")} />
              </button>
              {solutionsOpen && (
                <div className="absolute top-full left-0 mt-2 w-60 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  {solutionsLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Work dropdown */}
            <div
              ref={workRef}
              className="relative"
              onMouseEnter={() => { clearTimeout(workTimer.current); clearTimeout(solutionsTimer.current); clearTimeout(aboutTimer.current); setWorkOpen(true); setSolutionsOpen(false); setAboutOpen(false); }}
              onMouseLeave={() => { workTimer.current = setTimeout(() => setWorkOpen(false), 200); }}
            >
              <button
                onClick={() => { setWorkOpen((v) => !v); setSolutionsOpen(false); setAboutOpen(false); }}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  isActive(["/work", "/industries", "/how-we-work", "/pricing"]) ? "text-primary" : "text-muted-foreground"
                )}
              >
                Work
                <ChevronDown size={14} className={cn("transition-transform duration-200", workOpen && "rotate-180")} />
              </button>
              {workOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  {workLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About dropdown */}
            <div
              ref={aboutRef}
              className="relative"
              onMouseEnter={() => { clearTimeout(aboutTimer.current); clearTimeout(solutionsTimer.current); clearTimeout(workTimer.current); setAboutOpen(true); setSolutionsOpen(false); setWorkOpen(false); }}
              onMouseLeave={() => { aboutTimer.current = setTimeout(() => setAboutOpen(false), 200); }}
            >
              <button
                onClick={() => { setAboutOpen((v) => !v); setSolutionsOpen(false); setWorkOpen(false); }}
                className={cn(
                  "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary",
                  isActive(["/about", "/faq", "/careers"]) ? "text-primary" : "text-muted-foreground"
                )}
              >
                About
                <ChevronDown size={14} className={cn("transition-transform duration-200", aboutOpen && "rotate-180")} />
              </button>
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-lg py-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  {aboutLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Blog */}
            <Link
              href="/blog"
              className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/blog" ? "text-primary" : "text-muted-foreground")}
            >
              Blog
            </Link>

            {/* Contact */}
            <Link
              href="/contact"
              className={cn("text-sm font-medium transition-colors hover:text-primary", pathname === "/contact" ? "text-primary" : "text-muted-foreground")}
            >
              Contact
            </Link>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={user.role === "CLIENT" ? "/client" : "/admin"}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    clearAuth();
                  }}
                  className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Login
              </Link>
            )}

            {/* CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2 rounded-full gradient-bg text-white text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all"
            >
              Get a Proposal
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-background border-b border-border px-6 pb-6">
            {/* Solutions accordion */}
            <button
              onClick={() => setMobileSolutionsOpen((v) => !v)}
              className="w-full flex items-center justify-between py-3 text-base font-medium text-muted-foreground"
            >
              Solutions
              <ChevronDown size={16} className={cn("transition-transform duration-200", mobileSolutionsOpen && "rotate-180")} />
            </button>
            {mobileSolutionsOpen && (
              <div className="pl-4 pb-2 space-y-1">
                {solutionsLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Work accordion */}
            <button
              onClick={() => setMobileWorkOpen((v) => !v)}
              className="w-full flex items-center justify-between py-3 text-base font-medium text-muted-foreground"
            >
              Work
              <ChevronDown size={16} className={cn("transition-transform duration-200", mobileWorkOpen && "rotate-180")} />
            </button>
            {mobileWorkOpen && (
              <div className="pl-4 pb-2 space-y-1">
                {workLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            {/* About accordion */}
            <button
              onClick={() => setMobileAboutOpen((v) => !v)}
              className="w-full flex items-center justify-between py-3 text-base font-medium text-muted-foreground"
            >
              About
              <ChevronDown size={16} className={cn("transition-transform duration-200", mobileAboutOpen && "rotate-180")} />
            </button>
            {mobileAboutOpen && (
              <div className="pl-4 pb-2 space-y-1">
                {aboutLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}

            <Link href="/blog" className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>

            {user ? (
              <>
                <Link
                  href={user.role === "CLIENT" ? "/client" : "/admin"}
                  className="flex items-center gap-2 py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    clearAuth();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 py-3 text-base font-medium text-muted-foreground hover:text-destructive transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-3 text-base font-medium text-muted-foreground hover:text-primary transition-colors">
                Login
              </Link>
            )}

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                {isDark ? "Light mode" : "Dark mode"}
              </button>
              <Link
                href="/contact"
                className="block w-full text-center py-3 rounded-full gradient-bg text-white font-medium hover:opacity-90 active:scale-[0.97] transition-all"
              >
                Get a Proposal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
