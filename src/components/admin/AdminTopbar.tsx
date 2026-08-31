"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";

const labels: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/projects": "Projects",
  "/admin/users": "Users",
  "/admin/leads": "Leads",
  "/admin/support": "Support",
  "/admin/content": "Content",
  "/admin/settings": "Settings",
};

function currentLabel(pathname: string): string {
  if (labels[pathname]) return labels[pathname];
  const match = Object.keys(labels)
    .filter((href) => href !== "/admin" && pathname.startsWith(href))
    .sort((a, b) => b.length - a.length)[0];
  return match ? labels[match] : "Admin";
}

export function AdminTopbar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-[5] flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-overlay)] px-8 py-4 backdrop-blur-[14px]">
      <div className="flex items-center gap-2 text-[13px] text-[var(--fg-muted)]">
        <span>amfire</span>
        <span>›</span>
        <b className="font-semibold text-[var(--fg-default)]">{currentLabel(pathname)}</b>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="relative hidden sm:block">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--fg-subtle)]" />
          <input
            type="search"
            placeholder="Search clients, projects, invoices…"
            className="w-[280px] rounded-[9px] border border-[var(--border-default)] bg-[var(--surface-card)] py-2.5 pl-10 pr-3.5 text-[13px] outline-none placeholder:text-[var(--fg-subtle)] focus:border-[var(--color-orange)]"
          />
        </div>
        <button
          aria-label="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-[9px] border border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--fg-muted)] transition-colors hover:text-[var(--color-orange)]"
        >
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--color-orange)] shadow-[0_0_0_2px_var(--surface-overlay)]" />
        </button>
      </div>
    </div>
  );
}
