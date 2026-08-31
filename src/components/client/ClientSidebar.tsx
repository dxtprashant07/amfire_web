"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  FolderKanban,
  CreditCard,
  FileText,
  MessageSquare,
  HeadphonesIcon,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/client", label: "Dashboard", icon: LayoutDashboard },
  { href: "/client/project", label: "Project", icon: FolderKanban },
  { href: "/client/payments", label: "Payments", icon: CreditCard },
  { href: "/client/documents", label: "Documents", icon: FileText },
  { href: "/client/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/client/support", label: "Support", icon: HeadphonesIcon },
];

function initials(name?: string) {
  if (!name) return "C";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "C";
}

export function ClientSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    clearAuth();
    router.replace("/login");
  }

  return (
    <aside className="w-[260px] shrink-0 border-r border-[var(--border-default)] bg-[var(--surface-card)] h-screen sticky top-0 hidden md:flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-[22px] border-b border-[var(--border-default)]">
        <Link href="/" className="text-lg font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">
          am<span className="text-[var(--color-orange)]">fire</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3.5">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-[9px] px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "gradient-bg font-semibold text-white shadow-[var(--shadow-glow-sm)]"
                  : "text-[var(--fg-muted)] hover:bg-[var(--surface-sunken)] hover:text-[var(--fg-default)]"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="flex items-center gap-2.5 border-t border-[var(--border-default)] px-4 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-bg text-[13px] font-bold text-white">
            {initials(user?.name)}
          </span>
          <div className="min-w-0">
            <b className="block truncate text-[13px] text-[var(--fg-default)]">{user?.name}</b>
            <small className="block truncate text-[11px] text-[var(--fg-muted)]">{user?.email}</small>
          </div>
        </div>
        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-[var(--fg-muted)] transition-colors hover:bg-red-500/10 hover:text-red-500"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
