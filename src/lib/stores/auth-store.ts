import { create } from "zustand";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  setLoading: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  loading: true,
  setAuth: (user, accessToken) => set({ user, accessToken, loading: false }),
  clearAuth: () => set({ user: null, accessToken: null, loading: false }),
  setLoading: (loading) => set({ loading }),
}));

/** Fetch wrapper that auto-attaches the access token and handles 401 refresh */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const { accessToken } = useAuthStore.getState();

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let res = await fetch(url, { ...options, headers });

  // If 401, try refreshing
  if (res.status === 401) {
    const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });
    if (refreshRes.ok) {
      const data = await refreshRes.json();
      useAuthStore.getState().setAuth(data.user, data.accessToken);
      headers.set("Authorization", `Bearer ${data.accessToken}`);
      res = await fetch(url, { ...options, headers });
    } else {
      useAuthStore.getState().clearAuth();
    }
  }

  return res;
}
