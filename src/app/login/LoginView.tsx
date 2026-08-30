"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";

type Screen = "signin" | "reset";
export type LoginMode = "client" | "team";

/** Copy and side-panel differ per audience; the credentials flow is identical,
 *  and the post-login redirect still follows the account's real role. */
const COPY = {
  client: {
    eyebrow: "Client Portal",
    title: "Welcome back",
    sub: "Sign in to track milestones, review deliverables, and settle invoices — all in one place.",
    emailLabel: "Work email",
    emailHelp: "The email your amfire contact invited you with",
    switchTo: "team" as const,
    switchLabel: "amfire team member? Sign in here →",
  },
  team: {
    eyebrow: "Team access",
    title: "Admin sign-in",
    sub: "Sign in to manage projects, milestones, invoices, leads, and site content.",
    emailLabel: "Work email",
    emailHelp: "Your amfire admin account",
    switchTo: "client" as const,
    switchLabel: "← Client portal sign-in",
  },
};

export function LoginView({ initialMode = "client" }: { initialMode?: LoginMode }) {
  const [mode, setMode] = useState<LoginMode>(initialMode);
  const copy = COPY[mode];
  const [screen, setScreen] = useState<Screen>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const [resetEmail, setResetEmail] = useState("");
  const [resetState, setResetState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [resetError, setResetError] = useState("");

  const router = useRouter();
  const { user, setAuth } = useAuthStore();

  // If already logged in, redirect based on role
  useEffect(() => {
    if (user) {
      router.replace(["SUPER_ADMIN", "ADMIN"].includes(user.role) ? "/admin" : "/client");
    }
  }, [user, router]);

  function validate() {
    const e: typeof errors = {};
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 8) e.password = "Min 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Parse response body defensively — a 500 may return HTML, not JSON.
      const contentType = res.headers.get("content-type") ?? "";
      let data: { error?: string; user?: { role: string }; accessToken?: string } = {};
      if (contentType.includes("application/json")) {
        try {
          data = await res.json();
        } catch {
          /* fall through to status-based error below */
        }
      }

      if (!res.ok) {
        setErrors({ form: data.error || `Login failed (HTTP ${res.status}). The server may be misconfigured.` });
        setSubmitting(false);
        return;
      }

      if (!data.user || !data.accessToken) {
        setErrors({ form: "Unexpected response from server. Please try again." });
        setSubmitting(false);
        return;
      }

      setAuth(data.user as Parameters<typeof setAuth>[0], data.accessToken);
      router.replace(["SUPER_ADMIN", "ADMIN"].includes(data.user.role) ? "/admin" : "/client");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Network error";
      setErrors({ form: `${msg}. Please try again.` });
      setSubmitting(false);
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail)) {
      setResetError("Enter a valid email address.");
      setResetState("error");
      return;
    }
    setResetState("sending");
    setResetError("");
    try {
      const res = await fetch("/api/auth/password-reset-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: resetEmail }),
      });
      if (res.ok) {
        setResetState("sent");
      } else {
        const data = await res.json().catch(() => ({}));
        setResetError(data.error || "Could not send the request. Please try again.");
        setResetState("error");
      }
    } catch {
      setResetError("Network error. Please try again.");
      setResetState("error");
    }
  }

  return (
    <div className="ui-auth">
      <div className="split">
        <div className="pane-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <div className="brand-mark"><img src="/logo.svg" alt="amfire" /></div>
          <div className="pane-body">
            <div className="tabs">
              <button type="button" className={screen === "signin" ? "on" : ""} onClick={() => setScreen("signin")}>Sign in</button>
              <button type="button" className={screen === "reset" ? "on" : ""} onClick={() => setScreen("reset")}>Reset</button>
            </div>

            {screen === "signin" ? (
              <form className="screen on" onSubmit={handleSubmit} noValidate>
                <div className="eye">{copy.eyebrow}</div>
                <h1 className="pt">{copy.title}</h1>
                <p className="sub">{copy.sub}</p>

                {errors.form ? (
                  <div className="field err" style={{ marginBottom: "18px" }}>
                    <span className="ferr">{errors.form}</span>
                  </div>
                ) : null}

                <div className="fgroup">
                  <div className={`field${errors.email ? " err" : ""}`}>
                    <label htmlFor="login-email">{copy.emailLabel}</label>
                    <input
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined, form: undefined })); }}
                    />
                    {errors.email ? <span className="ferr">{errors.email}</span> : <span className="fhelp">{copy.emailHelp}</span>}
                  </div>
                  <div className={`field${errors.password ? " err" : ""}`}>
                    <label htmlFor="login-password">Password</label>
                    <input
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined, form: undefined })); }}
                    />
                    {errors.password ? <span className="ferr">{errors.password}</span> : null}
                  </div>
                </div>

                <div className="row">
                  <label>
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Keep me signed in
                  </label>
                  <a onClick={() => setScreen("reset")}>Forgot password?</a>
                </div>

                <button className="btn-solid" type="submit" disabled={submitting}>
                  {submitting ? "Signing in…" : "Sign in →"}
                </button>

                <div className="foot-txt">
                  <a onClick={() => setMode(copy.switchTo)}>{copy.switchLabel}</a>
                </div>
                <div className="foot-txt" style={{ marginTop: "10px" }}>
                  Need access? <a href="mailto:contact@amfire.in">contact@amfire.in</a>
                </div>
              </form>
            ) : (
              <form className="screen on" onSubmit={handleReset} noValidate>
                <div className="eye">Password reset</div>
                <h1 className="pt">Forgot your password?</h1>
                <p className="sub">
                  Enter the email on your account. Your amfire contact resets it and emails you new
                  credentials — usually within one business day.
                </p>

                {resetState === "sent" ? (
                  <p className="sub" style={{ color: "var(--color-success)" }}>
                    Request received. Watch your inbox for new credentials.
                  </p>
                ) : (
                  <>
                    <div className={`field${resetState === "error" ? " err" : ""}`}>
                      <label htmlFor="reset-email">Email</label>
                      <input
                        id="reset-email"
                        type="email"
                        placeholder="you@company.com"
                        value={resetEmail}
                        onChange={(e) => { setResetEmail(e.target.value); setResetState("idle"); }}
                      />
                      {resetState === "error" ? <span className="ferr">{resetError}</span> : <span className="fhelp">We&apos;ll only use this to verify it&apos;s you</span>}
                    </div>
                    <button className="btn-solid" style={{ marginTop: "4px" }} type="submit" disabled={resetState === "sending"}>
                      {resetState === "sending" ? "Sending…" : "Request reset"}
                    </button>
                  </>
                )}

                <div className="foot-txt"><a onClick={() => setScreen("signin")}>← Back to sign in</a></div>
              </form>
            )}
          </div>
        </div>

        <div className="pane-right">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="badge-live">{mode === "team" ? "Live admin console" : "Live client portal"}</span>
          </div>

          <div className="mini-portal">
            <div className="mp-head">
              <span className="dot"></span><span className="dot"></span><span className="dot"></span>
              <b>amfire · {mode === "team" ? "admin console" : "client portal"}</b>
            </div>
            <div className="mp-body">
              {mode === "team" ? (
                <>
                  <div className="mp-row"><h5>Pipeline &amp; delivery</h5><span style={{ color: "var(--color-success)", fontWeight: 700 }}>ON TRACK</span></div>
                  <div className="mp-row"><span>Leads, projects, invoices, content</span><span style={{ color: "var(--fg-default)", fontWeight: 600 }}>12</span></div>
                </>
              ) : (
                <>
                  <div className="mp-row"><h5>Milestone tracking</h5><span style={{ color: "var(--color-success)", fontWeight: 700 }}>ON TRACK</span></div>
                  <div className="mp-row"><span>Progress, staging links, and files</span><span style={{ color: "var(--fg-default)", fontWeight: 600 }}>72%</span></div>
                </>
              )}
              <div className="mp-prog"><i></i></div>
              <div className="mp-tiles"><div></div><div></div></div>
            </div>
          </div>

          <div style={{ maxWidth: "460px" }}>
            <div className="marquote">
              {mode === "team" ? (
                <>Every lead, project, invoice, and page of copy — run from <span>one console</span>.</>
              ) : (
                <>Every project, milestone, file, and invoice — in <span>one live portal</span>, updated as we ship.</>
              )}
            </div>
            <div className="mar-cite">
              <div className="av">AF</div>
              <div><b>amfire</b><small>AI-First Digital Solutions</small></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
