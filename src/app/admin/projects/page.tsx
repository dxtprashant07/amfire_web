"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/stores/auth-store";
import {
  Plus,
  FolderKanban,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Clock,
  Pause,
  XCircle,
  Search,
} from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  company: string | null;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  totalValue: string | null;
  createdAt: string;
  client: Client;
  milestones: { status: string }[];
  payments: { status: string; amount: string }[];
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  DISCOVERY: { icon: Search, color: "text-blue-600", bg: "bg-blue-500/10" },
  IN_PROGRESS: { icon: Clock, color: "text-primary", bg: "bg-primary/10" },
  ON_HOLD: { icon: Pause, color: "text-yellow-600", bg: "bg-yellow-500/10" },
  COMPLETED: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-500/10" },
  CANCELLED: { icon: XCircle, color: "text-red-600", bg: "bg-red-500/10" },
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "DISCOVERY",
    startDate: "",
    endDate: "",
    totalValue: "",
  });

  async function fetchData() {
    setLoading(true);
    const [projRes, usersRes] = await Promise.all([
      authFetch("/api/admin/projects"),
      authFetch("/api/admin/users"),
    ]);
    if (projRes.ok) {
      const d = await projRes.json();
      setProjects(d.projects || []);
    }
    if (usersRes.ok) {
      const users = await usersRes.json();
      setClients(users.filter((u: { role: string }) => u.role === "CLIENT"));
    }
    setLoading(false);
  }

  useEffect(() => { fetchData(); }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    const res = await authFetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description || undefined,
        clientId: form.clientId,
        status: form.status,
        startDate: form.startDate || undefined,
        endDate: form.endDate || undefined,
        totalValue: form.totalValue ? Number(form.totalValue) : undefined,
      }),
    });

    if (res.ok) {
      setSuccess("Project created successfully");
      setForm({ name: "", description: "", clientId: "", status: "DISCOVERY", startDate: "", endDate: "", totalValue: "" });
      setShowForm(false);
      fetchData();
    } else {
      const data = await res.json();
      setError(typeof data.error === "string" ? data.error : "Failed to create project");
    }
    setSubmitting(false);
  }

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-1">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage client projects, milestones, payments & documents</p>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setError(""); setSuccess(""); }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 transition-all"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

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

      {/* Create Project Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 mb-8 rounded-xl border border-border bg-card space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Create New Project</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Project Name *</label>
              <input
                type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="E-commerce Platform Redesign"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Assign to Client *</label>
              <select
                required value={form.clientId}
                onChange={(e) => setForm({ ...form, clientId: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Select client...</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} {c.company ? `(${c.company})` : ""} — {c.email}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                rows={2} placeholder="Brief project description"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="DISCOVERY">Discovery</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Total Value (₹)</label>
              <input
                type="number" value={form.totalValue}
                onChange={(e) => setForm({ ...form, totalValue: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                placeholder="300000"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">Start Date</label>
              <input
                type="date" value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">End Date</label>
              <input
                type="date" value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" disabled={submitting}
              className="px-5 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all">
              {submitting ? "Creating..." : "Create Project"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Projects list */}
      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-secondary animate-pulse" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FolderKanban size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No projects yet. Click &quot;New Project&quot; to create one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((p) => {
            const cfg = statusConfig[p.status] || statusConfig.DISCOVERY;
            const Icon = cfg.icon;
            const done = p.milestones.filter((m) => m.status === "COMPLETED").length;
            const total = p.milestones.length;
            const paid = p.payments.filter((pm) => pm.status === "PAID").reduce((s, pm) => s + Number(pm.amount), 0);
            const totalAmt = p.payments.reduce((s, pm) => s + Number(pm.amount), 0);

            return (
              <Link
                key={p.id}
                href={`/admin/projects/${p.id}`}
                className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                  <Icon size={18} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {p.name}
                    </p>
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${cfg.bg} ${cfg.color}`}>
                      {p.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {p.client.name} {p.client.company ? `· ${p.client.company}` : ""}
                    {total > 0 && ` · ${done}/${total} milestones`}
                    {totalAmt > 0 && ` · ₹${paid.toLocaleString("en-IN")} / ₹${totalAmt.toLocaleString("en-IN")} paid`}
                  </p>
                </div>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
