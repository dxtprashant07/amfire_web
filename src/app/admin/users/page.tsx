"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@/stores/auth-store";
import { UserPlus, Shield, User as UserIcon, Building2, AlertCircle, CheckCircle2, KeyRound, X } from "lucide-react";
import { Panel, Chip, Avatar, Table, Th, Td, EmptyState } from "@/components/admin/ui";

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

const roleOptions = [
  { value: "CLIENT", label: "Client", description: "Access to client portal only" },
  { value: "ADMIN", label: "Admin", description: "Access to admin dashboard" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENT" as "CLIENT" | "ADMIN",
    company: "",
    phone: "",
  });

  // Reset-password modal state
  const [resetTarget, setResetTarget] = useState<UserRow | null>(null);
  const [resetPassword, setResetPassword] = useState("");
  const [resetSubmitting, setResetSubmitting] = useState(false);
  const [resetError, setResetError] = useState("");

  async function fetchUsers() {
    setLoading(true);
    const res = await authFetch("/api/admin/users");
    if (res.ok) setUsers(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchUsers(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const res = await authFetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        company: form.company || undefined,
        phone: form.phone || undefined,
      }),
    });

    if (res.ok) {
      const user = await res.json();
      setSuccess(`Created ${user.role} user: ${user.email}`);
      setForm({ name: "", email: "", password: "", role: "CLIENT", company: "", phone: "" });
      setShowForm(false);
      fetchUsers();
    } else {
      const data = await res.json();
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
      setSuccess(`Password reset for ${resetTarget.email}. Share the new password with them securely.`);
      setResetTarget(null);
      setResetPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      const err = data?.error;
      if (typeof err === "string") {
        setResetError(err);
      } else if (err && typeof err === "object") {
        const first = Object.values(err).flat()[0];
        setResetError(typeof first === "string" ? first : "Failed to reset password");
      } else {
        setResetError("Failed to reset password");
      }
    }
    setResetSubmitting(false);
  }

  const roleTone: Record<string, "warning" | "info" | "success"> = {
    SUPER_ADMIN: "warning",
    ADMIN: "info",
    CLIENT: "success",
  };
  const roleBadge = (role: string) => (
    <Chip tone={roleTone[role] ?? "neutral"}>
      <span className="inline-flex items-center gap-1">
        {role === "CLIENT" ? <UserIcon size={11} /> : <Shield size={11} />}
        {role.replace("_", " ")}
      </span>
    </Chip>
  );

  return (
    <div>
      <div className="mb-7 flex items-center justify-between">
        <div>
          <h1 className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">Users</h1>
          <p className="mt-1 text-[14.5px] text-[var(--fg-muted)]">Manage clients and team members</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(""); setSuccess(""); }}
          className="amfire-primary inline-flex items-center gap-2 rounded-[9px] px-4 py-2.5 text-sm font-bold transition-all"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>

      {/* Success / Error */}
      {success && (
        <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm">
          <CheckCircle2 size={16} /> {success}
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 p-3 mb-6 rounded-lg bg-destructive/10 text-destructive text-sm">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      {/* Create User Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 mb-8 rounded-xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Create New User</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Full Name *</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Email *</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Password * (min 8 chars)</label>
              <input
                type="password"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Min 8 characters"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Role *</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value as "CLIENT" | "ADMIN" })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {roleOptions.map((r) => (
                  <option key={r.value} value={r.value}>{r.label} — {r.description}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Company</label>
              <input
                type="text"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Optional"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
            >
              {submitting ? "Creating..." : "Create User"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Users Table */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <Panel>
          <EmptyState icon={<UserIcon size={32} className="text-[var(--fg-subtle)]" />} text='No users yet. Click "Add User" to create one.' />
        </Panel>
      ) : (
        <Panel className="p-0">
          <Table>
            <thead>
              <tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Company</Th>
                <Th>Joined</Th>
                <Th align="right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <Td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={u.name} size={28} />
                      <b className="font-semibold">{u.name}</b>
                    </div>
                  </Td>
                  <Td><span className="text-[var(--fg-muted)]">{u.email}</span></Td>
                  <Td>{roleBadge(u.role)}</Td>
                  <Td>
                    {u.company ? (
                      <span className="flex items-center gap-1 text-[var(--fg-muted)]"><Building2 size={12} />{u.company}</span>
                    ) : <span className="text-[var(--fg-subtle)]">—</span>}
                  </Td>
                  <Td><span className="text-[var(--fg-muted)]">{new Date(u.createdAt).toLocaleDateString()}</span></Td>
                  <Td align="right">
                    {u.role !== "SUPER_ADMIN" && (
                      <button
                        type="button"
                        onClick={() => {
                          setResetTarget(u);
                          setResetPassword("");
                          setResetError("");
                          setError("");
                          setSuccess("");
                        }}
                        className="inline-flex items-center gap-1.5 rounded-[9px] border border-[var(--border-default)] px-2.5 py-1.5 text-xs font-medium text-[var(--fg-muted)] transition-colors hover:border-[var(--color-orange)] hover:text-[var(--color-orange)]"
                        title="Reset password"
                      >
                        <KeyRound size={12} /> Reset
                      </button>
                    )}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      )}

      {/* Reset Password Modal */}
      {resetTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => !resetSubmitting && setResetTarget(null)}
        >
          <div
            className="w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <KeyRound size={18} className="text-primary" /> Reset Password
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  for <span className="font-medium text-foreground">{resetTarget.email}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setResetTarget(null)}
                disabled={resetSubmitting}
                className="p-1 rounded-lg text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                  New Password *
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  minLength={8}
                  value={resetPassword}
                  onChange={(e) => setResetPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 font-mono"
                  placeholder="Min 8 chars, 1 uppercase, 1 lowercase, 1 number"
                />
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  Must contain: 8+ characters, uppercase, lowercase, and a number. The user&apos;s existing sessions will be revoked and they&apos;ll need to log in again.
                </p>
              </div>

              {resetError && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-destructive/10 text-destructive text-xs">
                  <AlertCircle size={14} /> {resetError}
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={resetSubmitting || !resetPassword}
                  className="px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all"
                >
                  {resetSubmitting ? "Resetting..." : "Reset Password"}
                </button>
                <button
                  type="button"
                  onClick={() => setResetTarget(null)}
                  disabled={resetSubmitting}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
