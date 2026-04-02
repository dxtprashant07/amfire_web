"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/stores/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, loading, setAuth, clearAuth, setLoading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
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
    // Reject non-CLIENT roles from the client portal
    if (!loading && user && user.role !== "CLIENT") {
      router.replace("/admin");
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "CLIENT") {
    return null;
  }

  return <>{children}</>;
}
