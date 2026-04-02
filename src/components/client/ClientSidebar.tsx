"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/stores/auth-store";
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
    <aside className="w-64 shrink-0 border-r border-border bg-card h-[calc(100vh-5rem)] sticky top-20 hidden md:flex flex-col">
      {/* User info */}
      <div className="p-5 border-b border-border">
        <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
        <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "gradient-bg text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}
