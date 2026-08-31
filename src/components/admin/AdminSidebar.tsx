"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore, authFetch } from "@/stores/auth-store";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FolderKanban,
  HeadphonesIcon,
  FileEdit,
  Settings,
  LogOut,
} from "lucide-react";

const mainLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban, badgeKey: "activeProjects" as const },
  { href: "/admin/users", label: "Users", icon: UserPlus },
  { href: "/admin/leads", label: "Leads", icon: Users, badgeKey: "newLeads" as const },
];

const teamLinks = [{ href: "/admin/support", label: "Support", icon: HeadphonesIcon, badgeKey: "openTickets" as const }];
const systemLinks = [
  { href: "/admin/content", label: "Content", icon: FileEdit },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

function initials(name?: string) {
  if (!name) return "A";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "A";
}

function NavLink({
  href,
  label,
  icon: Icon,
  badge,
  active,
}: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-[9px] px-3.5 py-2.5 text-sm font-medium transition-colors",
        active
          ? "gradient-bg font-semibold text-white shadow-[var(--shadow-glow-sm)]"
          : "text-[#98A2AD] hover:bg-white/5 hover:text-[#F1F3F5]"
      )}
    >
      <Icon size={18} />
      {label}
      {badge ? (
        <span
          className={cn(
            "ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold",
            active ? "bg-white/25 text-white" : "bg-[rgba(251,146,60,0.18)] text-[#FB923C]"
          )}
        >
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  const [badges, setBadges] = useState<Record<string, number>>({});

  useEffect(() => {
    authFetch("/api/admin/stats")
      .then(async (res) => {
        if (!res.ok) return;
        const d = await res.json();
        setBadges({ activeProjects: d.activeProjects, newLeads: d.newLeads, openTickets: d.openTickets });
      })
      .catch(() => {});
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    clearAuth();
    router.replace("/login");
  }

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  return (
    <aside className="w-[250px] shrink-0 bg-[var(--fg-default)] text-[#DEE2E6] h-screen sticky top-0 hidden md:flex flex-col">
      {/* Logo + role pill */}
      <div className="flex items-center justify-between gap-2 px-5 py-[22px] border-b border-white/[0.08]">
        <Link href="/" className="text-lg font-extrabold tracking-[-0.02em] text-white">
          am<span className="text-[var(--color-orange)]">fire</span>
        </Link>
        <span className="rounded-md border border-[rgba(251,146,60,0.35)] bg-[rgba(251,146,60,0.14)] px-2 py-1 text-[9px] font-extrabold tracking-[0.16em] text-[#FB923C]">
          {user?.role === "SUPER_ADMIN" ? "SUPER ADMIN" : "ADMIN"}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3.5">
        {mainLinks.map((link) => (
          <NavLink key={link.href} {...link} badge={link.badgeKey ? badges[link.badgeKey] : undefined} active={isActive(link.href)} />
        ))}

        <div className="mb-1 mt-4 px-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B7480]">Team</div>
        {teamLinks.map((link) => (
          <NavLink key={link.href} {...link} badge={link.badgeKey ? badges[link.badgeKey] : undefined} active={isActive(link.href)} />
        ))}

        <div className="mb-1 mt-4 px-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#6B7480]">System</div>
        {systemLinks.map((link) => (
          <NavLink key={link.href} {...link} active={isActive(link.href)} />
        ))}
      </nav>

      {/* User footer */}
      <div className="flex items-center gap-2.5 border-t border-white/[0.08] px-5 py-4">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full gradient-bg text-[13px] font-bold text-white">
            {initials(user?.name)}
          </span>
          <div className="min-w-0">
            <b className="block truncate text-[13px] text-[#F1F3F5]">{user?.name ?? "Admin"}</b>
            <small className="block text-[10.5px] font-bold uppercase tracking-[0.1em] text-[#6B7480]">
              {user?.role?.replace("_", " ") ?? "Admin"}
            </small>
          </div>
        </div>
        <button
          onClick={handleLogout}
          aria-label="Log out"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-[#98A2AD] transition-colors hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
}
