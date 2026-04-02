"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, setAuth, clearAuth, setLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip refresh if user is already authenticated (e.g. just logged in)
    const { user: currentUser, accessToken } = useAuthStore.getState();
    if (currentUser && accessToken) {
      setLoading(false);
      return;
    }

    async function init() {
      try {
        const res = await fetch("/api/auth/refresh", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          setAuth(data.user, data.accessToken);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      }
    }
    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!loading && !user && pathname !== "/login") {
      router.replace("/login");
    }
    // Redirect non-admins
    if (!loading && user && !["SUPER_ADMIN", "ADMIN"].includes(user.role) && pathname !== "/login") {
      router.replace("/login");
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user && pathname !== "/login") return null;
  if (user && !["SUPER_ADMIN", "ADMIN"].includes(user.role) && pathname !== "/login") return null;

  return <>{children}</>;
}
