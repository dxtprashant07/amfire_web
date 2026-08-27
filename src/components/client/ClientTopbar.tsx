"use client";

import { usePathname } from "next/navigation";
import { Bell, HelpCircle } from "lucide-react";

const labels: Record<string, string> = {
  "/client": "Dashboard",
  "/client/project": "Project",
  "/client/payments": "Payments",
  "/client/documents": "Documents",
  "/client/feedback": "Feedback",
  "/client/support": "Support",
};

function currentLabel(pathname: string): string {
  if (labels[pathname]) return labels[pathname];
  const match = Object.keys(labels)
    .filter((href) => href !== "/client" && pathname.startsWith(href))
    .sort((a, b) => b.length - a.length)[0];
  return match ? labels[match] : "Client Portal";
}

export function ClientTopbar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-[5] flex items-center justify-between border-b border-[var(--border-default)] bg-[var(--surface-overlay)] px-8 py-4 backdrop-blur-[14px]">
      <div className="flex items-center gap-2 text-[13px] text-[var(--fg-muted)]">
        <b className="font-semibold text-[var(--fg-default)]">{currentLabel(pathname)}</b>
      </div>
      <div className="flex items-center gap-2.5">
        <button
          aria-label="Notifications"
          className="grid h-9 w-9 place-items-center rounded-[9px] border border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--fg-muted)] transition-colors hover:text-[var(--color-orange)]"
        >
          <Bell size={17} />
        </button>
        <button
          aria-label="Help"
          className="grid h-9 w-9 place-items-center rounded-[9px] border border-[var(--border-default)] bg-[var(--surface-card)] text-[var(--fg-muted)] transition-colors hover:text-[var(--color-orange)]"
        >
          <HelpCircle size={17} />
        </button>
      </div>
    </div>
  );
}
