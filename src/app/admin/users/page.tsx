"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface UserRow {
  id: string;
  email: string;
  name: string;
  role: string;
  company: string | null;
  phone: string | null;
  active: boolean;
  createdAt: string;
}

const ROLE_CHIP: Record<string, string> = {
  SUPER_ADMIN: "chip-review",
  ADMIN: "chip-planning",
  CLIENT: "chip-active",
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

export default function AdminUsersPage() {
  const { data: users = [], isLoading: loading, refetch } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await authFetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      return (Array.isArray(data) ? data : data.users ?? []) as UserRow[];
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENT" as "CLIENT" | "ADMIN",
    company: "",
    phone: "",
  });

  const [resetTarget, setResetTarget] = useState<UserRow | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetError, setResetError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const res = await authFetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, company: form.company || undefined, phone: form.phone || undefined }),
    });

    if (res.ok) {
      const user = await res.json();
      setSuccess(`Created ${user.role} user: ${user.email}`);
      setForm({ name: "", email: "", password: "", role: "CLIENT", company: "", phone: "" });
      setShowForm(false);
      refetch();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(typeof data.error === "string" ? data.error : "Failed to create user");
    }
    setSubmitting(false);
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (!resetTarget) return;
    setResetError("");
    setResetSubmitting(true);

    const res = await authFetch(`/api/admin/users/${resetTarget.id}/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: resetPassword }),
    });

    if (res.ok) {
      setSuccess(`Password reset for ${resetTarget.email}. Share it with them securely.`);
      setResetTarget(null);
      setResetPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      const err = data?.error;
      if (typeof err === "string") setResetError(err);
      else if (err && typeof err === "object") {
        const first = Object.values(err).flat()[0];
        setResetError(typeof first === "string" ? first : "Failed to reset password");
      } else setResetError("Failed to reset password");
    }
    setResetSubmitting(false);
  }

  const visible = users.filter((u) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.company ?? "").toLowerCase().includes(q);
    return matchesQuery && (!roleFilter || u.role === roleFilter);
  });

  const clients = users.filter((u) => u.role === "CLIENT").length;
  const admins = users.length - clients;

  return (
    <div className="page on">
      <h1 className="h1">Users</h1>
      <p className="sub">{clients} client user{clients === 1 ? "" : "s"} · {admins} internal admin{admins === 1 ? "" : "s"}.</p>

      <div className="filter-bar">
        <input className="search" placeholder="Search users…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="">All roles</option>
          <option value="SUPER_ADMIN">Super admin</option>
          <option value="ADMIN">Admin</option>
          <option value="CLIENT">Client</option>
        </select>
        <button className="btn-pri" type="button" onClick={() => { setShowForm(!showForm); setError(""); setSuccess(""); }}>
          {showForm ? "Cancel" : "+ Invite user"}
        </button>
      </div>

      {success ? <p style={{ fontSize: "13px", color: "var(--color-success)", marginBottom: "12px" }}>{success}</p> : null}

      {showForm ? (
        <div className="panel" style={{ marginBottom: "24px" }}>
          <div className="panel-h"><h2>New user</h2></div>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              <input type="password" placeholder="Temporary password (min 8 chars)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as "CLIENT" | "ADMIN" })}>
                <option value="CLIENT">Client — portal access</option>
                <option value="ADMIN">Admin — dashboard access</option>
              </select>
              <input placeholder="Company (optional)" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              <input placeholder="Phone (optional)" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            {error ? <p style={{ fontSize: "12.5px", color: "var(--color-error)", marginBottom: "10px" }}>{error}</p> : null}
            <button className="btn-pri" type="submit" disabled={submitting}>{submitting ? "Creating…" : "Create user"}</button>
          </form>
        </div>
      ) : null}

      {resetTarget ? (
        <div className="panel" style={{ marginBottom: "24px" }}>
          <div className="panel-h">
            <h2>Reset password · {resetTarget.name}</h2>
            <button className="btn-ghost" type="button" onClick={() => { setResetTarget(null); setResetError(""); }}>Cancel</button>
          </div>
          <form onSubmit={handleResetPassword}>
            <div className="form-grid">
              <input type="password" placeholder="New password (min 8 chars)" value={resetPassword} onChange={(e) => setResetPassword(e.target.value)} required />
            </div>
            {resetError ? <p style={{ fontSize: "12.5px", color: "var(--color-error)", marginBottom: "10px" }}>{resetError}</p> : null}
            <button className="btn-pri" type="submit" disabled={resetSubmitting}>{resetSubmitting ? "Resetting…" : "Set password"}</button>
          </form>
        </div>
      ) : null}

      <div className="panel">
        {loading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : visible.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No users match this filter.</p>
        ) : (
          <table className="tbl">
            <thead>
              <tr><th>User</th><th>Company</th><th>Role</th><th>Joined</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {visible.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="cli">
                      <div className="av">{initials(u.name)}</div>
                      <div><b>{u.name}</b><small>{u.email}</small></div>
                    </div>
                  </td>
                  <td>{u.company || "—"}</td>
                  <td><span className={`chip ${ROLE_CHIP[u.role] ?? "chip-planning"}`}>{u.role.replace("_", " ")}</span></td>
                  <td>{new Date(u.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td><span className={`chip ${u.active ? "chip-active" : "chip-blocked"}`}>{u.active ? "ACTIVE" : "SUSPENDED"}</span></td>
                  <td style={{ textAlign: "right" }}>
                    <button
                      type="button"
                      className="btn-ghost"
                      onClick={() => { setResetTarget(u); setResetPassword(""); setResetError(""); }}
                    >
                      Reset password
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
