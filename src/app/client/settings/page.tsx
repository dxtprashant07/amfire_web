"use client";

import { useEffect, useState } from "react";
import { authFetch, useAuthStore } from "@/stores/auth-store";

type Tab = "profile" | "security";

function initials(name?: string) {
  if (!name) return "C";
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "C";
}

export default function ClientSettingsPage() {
  const { user, setUser } = useAuthStore();
  const [tab, setTab] = useState<Tab>("profile");

  const [name, setName] = useState(user?.name ?? "");
  const [company, setCompany] = useState(user?.company ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  // company/phone aren't in the JWT, so read the full profile once on mount.
  useEffect(() => {
    let cancelled = false;
    authFetch("/api/auth/profile")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d?.user) return;
        setName(d.user.name ?? "");
        setCompany(d.user.company ?? "");
        setPhone(d.user.phone ?? "");
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");
  const [profileErr, setProfileErr] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [savingPw, setSavingPw] = useState(false);
  const [pwMsg, setPwMsg] = useState("");
  const [pwErr, setPwErr] = useState("");

  async function saveProfile() {
    setSavingProfile(true);
    setProfileMsg("");
    setProfileErr("");
    try {
      const res = await authFetch("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company: company || null, phone: phone || null }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setProfileErr(typeof d.error === "string" ? d.error : "Could not save your profile.");
      } else {
        if (d.user) setUser(d.user);
        setProfileMsg("Saved.");
      }
    } catch {
      setProfileErr("Network error.");
    }
    setSavingProfile(false);
  }

  async function savePassword() {
    setSavingPw(true);
    setPwMsg("");
    setPwErr("");
    try {
      const res = await authFetch("/api/auth/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPwErr(typeof d.error === "string" ? d.error : "Could not change your password.");
      } else {
        setCurrentPassword("");
        setNewPassword("");
        setPwMsg("Password updated.");
      }
    } catch {
      setPwErr("Network error.");
    }
    setSavingPw(false);
  }

  const saveBtn = {
    padding: "11px 22px",
    borderRadius: "var(--radius-sm)",
    background: "var(--gradient-fire)",
    color: "#fff",
    fontSize: "14px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    boxShadow: "var(--shadow-glow-sm)",
  } as const;

  return (
    <div className="page on">
      <div className="welcome">
        <h1>Settings</h1>
        <p>Manage your profile and sign-in details.</p>
      </div>

      <div className="set-grid">
        <div className="set-nav">
          <a className={tab === "profile" ? "on" : ""} onClick={() => setTab("profile")}>Profile</a>
          <a className={tab === "security" ? "on" : ""} onClick={() => setTab("security")}>Security</a>
        </div>

        {tab === "profile" ? (
          <div className="set-panel">
            <h3>Profile</h3>
            <div className="sd">This is how your amfire team sees you on the workspace.</div>

            <div className="set-row">
              <div>
                <div className="lb">Avatar</div>
                <div className="desc">Initials are generated from your name.</div>
              </div>
              <div className="avset"><div className="av">{initials(user?.name)}</div></div>
            </div>

            <div className="set-row">
              <div><div className="lb">Full name</div></div>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="set-row">
              <div>
                <div className="lb">Email address</div>
                <div className="desc">Used for sign-in and invoices. Contact us to change it.</div>
              </div>
              <input type="email" value={user?.email ?? ""} disabled />
            </div>

            <div className="set-row">
              <div><div className="lb">Company</div></div>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>

            <div className="set-row">
              <div><div className="lb">Phone</div></div>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px", paddingTop: "22px" }}>
              {profileErr ? <span style={{ fontSize: "13px", color: "var(--color-error)" }}>{profileErr}</span> : null}
              {profileMsg ? <span style={{ fontSize: "13px", color: "var(--color-success)" }}>{profileMsg}</span> : null}
              <button type="button" style={saveBtn} onClick={saveProfile} disabled={savingProfile}>
                {savingProfile ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        ) : (
          <div className="set-panel">
            <h3>Security</h3>
            <div className="sd">Change the password you use to sign in.</div>

            <div className="set-row">
              <div><div className="lb">Current password</div></div>
              <input type="password" autoComplete="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
            </div>

            <div className="set-row">
              <div>
                <div className="lb">New password</div>
                <div className="desc">At least 8 characters.</div>
              </div>
              <input type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "12px", paddingTop: "22px" }}>
              {pwErr ? <span style={{ fontSize: "13px", color: "var(--color-error)" }}>{pwErr}</span> : null}
              {pwMsg ? <span style={{ fontSize: "13px", color: "var(--color-success)" }}>{pwMsg}</span> : null}
              <button type="button" style={saveBtn} onClick={savePassword} disabled={savingPw}>
                {savingPw ? "Updating…" : "Update password"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
