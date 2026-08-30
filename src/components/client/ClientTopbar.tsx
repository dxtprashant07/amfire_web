"use client";

import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

const LABELS: Record<string, string> = {
  "/client": "Dashboard",
  "/client/project": "Project",
  "/client/payments": "Payments",
  "/client/documents": "Files",
  "/client/support": "Support",
  "/client/feedback": "Feedback",
  "/client/settings": "Settings",
};

function currentLabel(pathname: string): string {
  if (LABELS[pathname]) return LABELS[pathname];
  const match = Object.keys(LABELS)
    .filter((href) => href !== "/client" && pathname.startsWith(href))
    .sort((a, b) => b.length - a.length)[0];
  return match ? LABELS[match] : "Client Portal";
}

export function ClientTopbar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div className="topbar">
      <div className="crumbs">
        <span>{user?.company || "amfire"}</span>
        <span>›</span>
        <b>{currentLabel(pathname)}</b>
      </div>
      <div className="topbar-right">
        <div className="tb-btn" title="Notifications">
          <svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
        </div>
        <a className="tb-btn" href="mailto:contact@amfire.in" title="Get help">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 17v.01" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /></svg>
        </a>
      </div>
    </div>
  );
}
