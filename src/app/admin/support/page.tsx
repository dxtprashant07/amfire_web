"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  user: { id: string; name: string; email: string };
  project: { id: string; name: string };
}

const STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

const STATUS_CHIP: Record<string, string> = {
  OPEN: "chip-review",
  IN_PROGRESS: "chip-planning",
  RESOLVED: "chip-active",
  CLOSED: "chip-blocked",
};

export default function AdminSupportPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  const { data: tickets = [], isLoading: loading, refetch } = useQuery({
    queryKey: ["admin-tickets"],
    queryFn: async () => {
      const res = await authFetch("/api/admin/support");
      if (!res.ok) throw new Error("Failed to load tickets");
      const d = await res.json();
      return (d.tickets || []) as Ticket[];
    },
  });

  async function updateStatus(id: string, status: string) {
    await authFetch("/api/admin/support", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    refetch();
  }

  const count = (s: string) => tickets.filter((t) => t.status === s).length;
  const open = tickets.find((t) => t.id === openId) ?? null;

  return (
    <div className="page on">
      <h1 className="h1">Support inbox</h1>
      <p className="sub">{count("OPEN")} open across all clients · {tickets.length} total.</p>

      <div className="grid-4">
        <div className="kpi"><div className="lbl">Open</div><div className="val">{count("OPEN")}</div></div>
        <div className="kpi"><div className="lbl">In progress</div><div className="val">{count("IN_PROGRESS")}</div></div>
        <div className="kpi"><div className="lbl">Resolved</div><div className="val">{count("RESOLVED")}</div></div>
        <div className="kpi"><div className="lbl">Closed</div><div className="val">{count("CLOSED")}</div></div>
      </div>

      {open ? (
        <div className="panel" style={{ marginBottom: "24px" }}>
          <div className="panel-h">
            <h2>{open.subject}</h2>
            <button className="btn-ghost" type="button" onClick={() => setOpenId(null)}>Close</button>
          </div>
          <div className="lead-detail">
            <div>
              <div className="lbl">From</div>
              <p>{open.user?.name} · {open.user?.email}</p>
              <div className="lbl">Project</div>
              <p>{open.project?.name}</p>
              <div className="lbl">Message</div>
              <p>{open.message}</p>
            </div>
            <div>
              <div className="lbl">Status</div>
              <select value={open.status} onChange={(e) => updateStatus(open.id, e.target.value)}>
                {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
          </div>
        </div>
      ) : null}

      <div className="panel">
        {loading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : tickets.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No tickets yet.</p>
        ) : (
          <table className="tbl">
            <thead>
              <tr><th>Ticket</th><th>Client</th><th>Project</th><th>Opened</th><th>Status</th></tr>
            </thead>
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} onClick={() => setOpenId(t.id === openId ? null : t.id)} style={{ cursor: "pointer" }}>
                  <td><b style={{ fontWeight: 700 }}>{t.subject}</b></td>
                  <td>{t.user?.name}</td>
                  <td>{t.project?.name}</td>
                  <td>{new Date(t.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                  <td><span className={`chip ${STATUS_CHIP[t.status] ?? "chip-planning"}`}>{t.status.replace("_", " ")}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
