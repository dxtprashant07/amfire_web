"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authFetch, useAuthStore } from "@/stores/auth-store";

/** Inline SVGs lifted from the admin UI kit so the sidebar matches it exactly. */
const ICONS: Record<string, React.ReactNode> = {
  dashboard: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  clients: <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M22 12h-4l-2 5-3-10-2 5H9" /></svg>,
  projects: <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
  users: <svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6M23 11h-6" /></svg>,
  support: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  content: <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>,
  settings: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1" /></svg>,
  logout: <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></svg>,
};

type BadgeKey = "activeProjects" | "newLeads" | "openTickets";

const MAIN = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" as const },
  { href: "/admin/leads", label: "Clients", icon: "clients" as const, badge: "newLeads" as BadgeKey },
  { href: "/admin/projects", label: "Projects", icon: "projects" as const, badge: "activeProjects" as BadgeKey },
  { href: "/admin/users", label: "Users", icon: "users" as const },
];

function initials(name?: string) {
  if (!name) return "A";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "A";
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await authFetch("/api/admin/stats");
      if (!res.ok) return null;
      return (await res.json()) as Record<BadgeKey, number>;
    },
  });

  const isActive = (href: string) => (href === "/admin" ? pathname === "/admin" : pathname.startsWith(href));

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    clearAuth();
    router.replace("/login");
  }

  return (
    <aside className="side">
      <div className="side-h">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Link href="/"><img src="/logo.svg" alt="amfire" /></Link>
        <span className="rl">ADMIN</span>
      </div>

      <div className="snav">
        {MAIN.map((link) => {
          const count = link.badge ? stats?.[link.badge] : undefined;
          return (
            <Link key={link.href} href={link.href} className={isActive(link.href) ? "on" : ""}>
              {ICONS[link.icon]}
              {link.label}
              {count ? <span className="bd">{count}</span> : null}
            </Link>
          );
        })}

        <div className="grp">Team</div>
        <Link href="/admin/support" className={isActive("/admin/support") ? "on" : ""}>
          {ICONS.support}
          Support
          {stats?.openTickets ? <span className="bd">{stats.openTickets}</span> : null}
        </Link>

        <div className="grp">System</div>
        <Link href="/admin/content" className={isActive("/admin/content") ? "on" : ""}>
          {ICONS.content}
          Content
        </Link>
        <Link href="/admin/settings" className={isActive("/admin/settings") ? "on" : ""}>
          {ICONS.settings}
          Settings
        </Link>
        <a onClick={handleLogout}>{ICONS.logout}Log out</a>
      </div>

      <div className="side-f">
        <div className="av">{initials(user?.name)}</div>
        <div style={{ minWidth: 0 }}>
          <b>{user?.name}</b>
          <small>{user?.role?.replace("_", " ")}</small>
        </div>
      </div>
    </aside>
  );
}
