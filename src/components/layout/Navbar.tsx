"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogIn, LogOut, Menu, Moon, Sun, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

const themeListeners = new Set<() => void>();
const subscribeTheme = (cb: () => void) => {
  themeListeners.add(cb);
  return () => themeListeners.delete(cb);
};
const getTheme = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");
const getServerTheme = () => "light" as const;
const notifyTheme = () => themeListeners.forEach((cb) => cb());

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const isDark = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (y / docH) * 100 : 0);
      setScrolled(y > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    notifyTheme();
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <div className="fixed left-0 top-0 z-[60] h-[3px] gradient-bg transition-[width] duration-100" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-[var(--border-subtle)] bg-[var(--surface-overlay)] shadow-[0_1px_0_rgba(20,17,15,0.02)] backdrop-blur-[14px]"
            : "border-transparent bg-transparent"
        )}
      >
        <div className={cn("amfire-wrap flex items-center justify-between transition-[height] duration-300", scrolled ? "h-14" : "h-[70px]")}>
          <Link href="/" aria-label="amfire home" className="text-[21px] font-extrabold tracking-[-0.03em] text-[var(--fg-default)]">
            am<span className="gradient-text">fire</span>
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-2 text-[13.5px] font-medium text-[var(--fg-muted)] transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[var(--color-orange)] after:transition-transform hover:text-[var(--fg-default)] hover:after:scale-x-100",
                  isActive(link.href) && "font-semibold text-[var(--fg-default)] after:scale-x-100"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="grid h-9 w-9 place-items-center rounded-[9px] text-[var(--fg-muted)] transition-colors hover:bg-[var(--accent-tint)] hover:text-[var(--color-orange)]"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                <Link href={user.role === "CLIENT" ? "/client" : "/admin"} className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--fg-muted)] transition-colors hover:text-[var(--color-orange)]">
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button
                  onClick={async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    clearAuth();
                  }}
                  className="grid h-8 w-8 place-items-center rounded-[9px] text-[var(--fg-muted)] transition-colors hover:bg-red-50 hover:text-red-600"
                  aria-label="Logout"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link href="/login" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--fg-muted)] transition-colors hover:text-[var(--color-orange)]">
                <LogIn size={14} />
                Login
              </Link>
            )}

            <Link href="/contact" className="amfire-primary inline-flex items-center gap-2 rounded-[9px] px-[18px] py-2.5 text-[13.5px] font-bold transition-all">
              Get a Proposal
            </Link>
          </div>

          <button className="grid h-10 w-10 place-items-center rounded-[9px] text-[var(--fg-default)] md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-[var(--border-default)] bg-[var(--surface-overlay)] px-5 pb-6 pt-3 backdrop-blur-[14px] md:hidden">
            <div className="mx-auto flex max-w-[520px] flex-col">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={cn("rounded-[9px] px-3 py-3 text-base font-semibold text-[var(--fg-muted)]", isActive(link.href) && "bg-[var(--accent-tint)] text-[var(--color-orange)]")}>
                  {link.label}
                </Link>
              ))}
              <button onClick={toggleTheme} className="flex items-center gap-2 rounded-[9px] px-3 py-3 text-base font-semibold text-[var(--fg-muted)]">
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
                {isDark ? "Light mode" : "Dark mode"}
              </button>
              {user ? (
                <Link href={user.role === "CLIENT" ? "/client" : "/admin"} className="flex items-center gap-2 rounded-[9px] px-3 py-3 text-base font-semibold text-[var(--fg-muted)]">
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              ) : (
                <Link href="/login" className="flex items-center gap-2 rounded-[9px] px-3 py-3 text-base font-semibold text-[var(--fg-muted)]">
                  <LogIn size={16} />
                  Login
                </Link>
              )}
              <Link href="/contact" className="amfire-primary mt-3 inline-flex justify-center rounded-[9px] px-5 py-3 text-sm font-bold transition-all">
                Get a Proposal
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
}
