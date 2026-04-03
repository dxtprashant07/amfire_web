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
  /** True once the initial refresh has completed (success or failure) */
  initialized: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  setLoading: (v: boolean) => void;
  /** Call once on app mount to restore session from refresh cookie */
  initialize: () => Promise<void>;
}

let _initPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  loading: true,
  initialized: false,
  setAuth: (user, accessToken) => set({ user, accessToken, loading: false, initialized: true }),
  clearAuth: () => set({ user: null, accessToken: null, loading: false, initialized: true }),
  setLoading: (loading) => set({ loading }),

  initialize: () => {
    // Deduplicate: if already initialized or in-flight, reuse the same promise
    if (get().initialized) {
      set({ loading: false });
      return Promise.resolve();
    }
    if (_initPromise) return _initPromise;

    _initPromise = (async () => {
      try {
        const res = await fetch("/api/auth/refresh", { method: "POST" });
        if (res.ok) {
          const data = await res.json();
          get().setAuth(data.user, data.accessToken);
        } else {
          get().clearAuth();
        }
      } catch {
        get().clearAuth();
      }
    })();

    return _initPromise;
  },
}));

/** Fetch wrapper that auto-attaches the access token and handles 401 refresh */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const { accessToken } = useAuthStore.getState();

  const headers = new Headers(options.headers);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let res = await fetch(url, { ...options, headers });

  // If 401, try refreshing once
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
