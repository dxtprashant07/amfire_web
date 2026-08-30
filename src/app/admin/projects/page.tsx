"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

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

const STATUS_CHIP: Record<string, string> = {
  DISCOVERY: "chip-planning",
  IN_PROGRESS: "chip-active",
  ON_HOLD: "chip-review",
  COMPLETED: "chip-active",
  CANCELLED: "chip-blocked",
};

const money = (v: string | number | null) => (v ? `₹${Number(v).toLocaleString("en-IN")}` : "—");

function progressOf(p: Project) {
  if (!p.milestones.length) return 0;
  return Math.round((p.milestones.filter((m) => m.status === "COMPLETED").length / p.milestones.length) * 100);
}

export default function AdminProjectsPage() {
  const { data, isLoading: loading, refetch } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const [projRes, usersRes] = await Promise.all([
        authFetch("/api/admin/projects"),
        authFetch("/api/admin/users"),
      ]);
      const projects = projRes.ok ? (((await projRes.json()).projects || []) as Project[]) : [];
      const users = usersRes.ok ? await usersRes.json() : { users: [] };
      const list = (Array.isArray(users) ? users : users.users ?? []) as (Client & { role: string })[];
      return { projects, clients: list.filter((u) => u.role === "CLIENT") };
    },
  });
  const projects = data?.projects ?? [];
  const clients = data?.clients ?? [];
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "DISCOVERY",
    startDate: "",
    endDate: "",
    totalValue: "",
  });

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
      setSuccess("Project created.");
      setForm({ name: "", description: "", clientId: "", status: "DISCOVERY", startDate: "", endDate: "", totalValue: "" });
      setShowForm(false);
      refetch();
    } else {
      const data = await res.json().catch(() => ({}));
      setError(typeof data.error === "string" ? data.error : "Failed to create project");
    }
    setSubmitting(false);
  }

  const visible = projects.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || p.name.toLowerCase().includes(q) || (p.client?.company ?? p.client?.name ?? "").toLowerCase().includes(q);
    return matchesQuery && (!statusFilter || p.status === statusFilter);
  });

  const inFlight = projects
    .filter((p) => p.status === "DISCOVERY" || p.status === "IN_PROGRESS")
    .reduce((sum, p) => sum + Number(p.totalValue ?? 0), 0);

  return (
    <div className="page on">
      <h1 className="h1">Projects</h1>
      <p className="sub">
        {projects.length} engagement{projects.length === 1 ? "" : "s"}
        {inFlight ? ` · ${money(inFlight)} in-flight value` : ""}
      </p>

      <div className="filter-bar">
        <input className="search" placeholder="Search projects, clients…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="DISCOVERY">Discovery</option>
          <option value="IN_PROGRESS">In progress</option>
          <option value="ON_HOLD">On hold</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <button className="btn-pri" type="button" onClick={() => { setShowForm(!showForm); setSuccess(""); setError(""); }}>
          {showForm ? "Cancel" : "+ New project"}
        </button>
      </div>

      {success ? <p style={{ fontSize: "13px", color: "var(--color-success)", marginBottom: "12px" }}>{success}</p> : null}

      {showForm ? (
        <div className="panel" style={{ marginBottom: "24px" }}>
          <div className="panel-h"><h2>New project</h2></div>
          <form className="ticket-form" onSubmit={handleSubmit}>
            <input placeholder="Project name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <select value={form.clientId} onChange={(e) => setForm({ ...form, clientId: e.target.value })} required>
              <option value="">Select client…</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.company ? `${c.name} · ${c.company}` : c.name}</option>)}
            </select>
            <textarea rows={3} placeholder="Short description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="DISCOVERY">Discovery</option>
              <option value="IN_PROGRESS">In progress</option>
              <option value="ON_HOLD">On hold</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            <input type="number" placeholder="Total value (₹)" value={form.totalValue} onChange={(e) => setForm({ ...form, totalValue: e.target.value })} />
            {error ? <p style={{ fontSize: "12.5px", color: "var(--color-error)" }}>{error}</p> : null}
            <button className="btn-pri" type="submit" disabled={submitting} style={{ alignSelf: "flex-start" }}>
              {submitting ? "Creating…" : "Create project"}
            </button>
          </form>
        </div>
      ) : null}

      <div className="panel">
        {loading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : visible.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No projects match this filter.</p>
        ) : (
          <table className="tbl">
            <thead>
              <tr><th>Project</th><th>Client</th><th>Progress</th><th>Value</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {visible.map((p) => {
                const progress = progressOf(p);
                return (
                  <tr key={p.id}>
                    <td>
                      <b style={{ fontWeight: 700 }}>{p.name}</b>
                      {p.description ? <div style={{ fontSize: "11.5px", color: "var(--fg-muted)" }}>{p.description}</div> : null}
                    </td>
                    <td>{p.client?.company || p.client?.name || "—"}</td>
                    <td>
                      <div className="pr">
                        <div className="bar"><i style={{ width: `${progress}%` }} /></div>
                        {progress}%
                      </div>
                    </td>
                    <td>{money(p.totalValue)}</td>
                    <td><span className={`chip ${STATUS_CHIP[p.status] ?? "chip-planning"}`}>{p.status.replace("_", " ")}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <Link href={`/admin/projects/${p.id}`} style={{ color: "var(--color-orange)", fontWeight: 600, fontSize: "12.5px" }}>Open →</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
