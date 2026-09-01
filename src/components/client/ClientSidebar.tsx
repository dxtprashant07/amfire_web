"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { authFetch, useAuthStore } from "@/stores/auth-store";

/** Icons are the design kit's inline SVGs, kept as-is so the sidebar matches. */
const ICONS: Record<string, React.ReactNode> = {
  dashboard: (
    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
  ),
  project: <svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>,
  payments: <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>,
  files: <svg viewBox="0 0 24 24"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M13 2v7h7" /></svg>,
  support: <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  feedback: <svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.6.8-4.9 4.5 1.3 6.4L12 16.8 6.1 20l1.3-6.4L2.5 9.1l6.6-.8z" /></svg>,
  settings: (
    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z" /></svg>
  ),
};

const LINKS = [
  { href: "/client", label: "Dashboard", icon: "dashboard" },
  { href: "/client/project", label: "Project", icon: "project" },
  { href: "/client/payments", label: "Payments", icon: "payments" },
  { href: "/client/documents", label: "Files", icon: "files" },
  { href: "/client/support", label: "Support", icon: "support" },
  { href: "/client/feedback", label: "Feedback", icon: "feedback" },
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

  // Unpaid-invoice count for the Payments badge in the design.
  const { data: due = 0 } = useQuery({
    queryKey: ["client-payments-due"],
    queryFn: async () => {
      const res = await authFetch("/api/client/payments");
      if (!res.ok) return 0;
      const d = await res.json();
      return ((d.payments || []) as { status: string }[]).filter((p) => p.status !== "PAID").length;
    },
  });

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
      </div>

      <div className="workspace">
        <div className="lbl">Workspace</div>
        <div className="name">
          {user?.company || user?.name || "Your workspace"}
          <svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6" /></svg>
        </div>
      </div>

      <div className="snav">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={pathname === link.href ? "on" : ""}>
            {ICONS[link.icon]}
            {link.label}
            {link.href === "/client/payments" && due > 0 ? <span className="bd">{due}</span> : null}
          </Link>
        ))}
        <div className="grp">Account</div>
        <Link href="/client/settings" className={pathname === "/client/settings" ? "on" : ""}>
          {ICONS.settings}
          Settings
        </Link>
        <a onClick={handleLogout}>
          <svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></svg>
          Log out
        </a>
      </div>

      <div className="side-f">
        <div className="av">{initials(user?.name)}</div>
        <div style={{ minWidth: 0 }}>
          <b>{user?.name}</b>
          <small>{user?.email}</small>
        </div>
      </div>
    </aside>
  );
}
