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
  { href: "/client", label: "Home", icon: LayoutDashboard },
  { href: "/client/project", label: "Project", icon: FolderKanban },
  { href: "/client/payments", label: "Pay", icon: CreditCard },
  { href: "/client/documents", label: "Docs", icon: FileText },
  { href: "/client/feedback", label: "Feedback", icon: MessageSquare },
  { href: "/client/support", label: "Support", icon: HeadphonesIcon },
];

export function ClientMobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    clearAuth();
    router.replace("/login");
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
      <div className="flex items-center justify-around py-2">
        {links.slice(0, 5).map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground"
              )}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] font-medium text-muted-foreground"
        >
          <LogOut size={18} />
          Out
        </button>
      </div>
    </nav>
  );
}
