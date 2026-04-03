"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const initialized = useAuthStore((s) => s.initialized);
  const initialize = useAuthStore((s) => s.initialize);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => { initialize(); }, [initialize]);

  useEffect(() => {
    if (!initialized) return;
    if (!user) router.replace("/login");
    else if (!["SUPER_ADMIN", "ADMIN"].includes(user.role)) router.replace("/login");
  }, [initialized, user, pathname, router]);

  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !["SUPER_ADMIN", "ADMIN"].includes(user.role)) return null;

  return <>{children}</>;
}
