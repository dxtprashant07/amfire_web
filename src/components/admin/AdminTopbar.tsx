"use client";

import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/leads": "Clients",
  "/admin/projects": "Projects",
  "/admin/users": "Users",
  "/admin/support": "Support",
  "/admin/content": "Content",
  "/admin/settings": "Settings",
};

function currentLabel(pathname: string): string {
  if (LABELS[pathname]) return LABELS[pathname];
  const match = Object.keys(LABELS)
    .filter((href) => href !== "/admin" && pathname.startsWith(href))
    .sort((a, b) => b.length - a.length)[0];
  return match ? LABELS[match] : "Admin";
}

export function AdminTopbar() {
  const pathname = usePathname();

  return (
    <div className="topbar">
      <div className="crumbs">
        <span>amfire</span>
        <span>›</span>
        <b>{currentLabel(pathname)}</b>
      </div>
      <div className="topbar-right">
        <div className="tb-btn" title="Notifications">
          <svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /></svg>
        </div>
      </div>
    </div>
  );
}
