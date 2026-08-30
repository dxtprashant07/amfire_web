"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: string;
  notes: string | null;
  assignedTo: string | null;
  followUpDate: string | null;
  createdAt: string;
}

const STATUSES = ["NEW", "CONTACTED", "DISCOVERY", "PROPOSAL", "NEGOTIATION", "WON", "LOST", "NURTURE"];

/** The kit's four-column pipeline; the remaining statuses fold into a column. */
const COLUMNS: { title: string; statuses: string[] }[] = [
  { title: "New", statuses: ["NEW"] },
  { title: "Contacted", statuses: ["CONTACTED", "DISCOVERY"] },
  { title: "Proposal sent", statuses: ["PROPOSAL", "NEGOTIATION"] },
  { title: "Won", statuses: ["WON"] },
];

export default function AdminLeadsPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  const { data: leads = [], isLoading: loading, refetch } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const res = await authFetch("/api/admin/leads");
      if (!res.ok) throw new Error("Failed to load leads");
      const d = await res.json();
      return (d.leads || []) as Lead[];
    },
  });

  async function updateLead(id: string, data: Record<string, unknown>) {
    const res = await authFetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    if (res.ok) {
      setMsg({ type: "success", text: "Lead updated." });
      refetch();
    } else {
      setMsg({ type: "error", text: "Failed to update." });
    }
  }

  const open = leads.find((l) => l.id === openId) ?? null;
  const won = leads.filter((l) => l.status === "WON").length;

  return (
    <div className="page on">
      <h1 className="h1">Clients</h1>
      <p className="sub">
        {leads.length} lead{leads.length === 1 ? "" : "s"} in the pipeline · {won} won.
      </p>

      {msg.text ? (
        <p style={{ fontSize: "13px", marginBottom: "12px", color: msg.type === "error" ? "var(--color-error)" : "var(--color-success)" }}>
          {msg.text}
        </p>
      ) : null}

      {loading ? (
        <Skeleton className="h-64 rounded-2xl" />
      ) : (
        <>
          <div className="kanban">
            {COLUMNS.map((col) => {
              const items = leads.filter((l) => col.statuses.includes(l.status));
              return (
                <div className="kcol" key={col.title}>
                  <h3>{col.title} <span>{items.length}</span></h3>
                  {items.map((l) => (
                    <div
                      className="kcard"
                      key={l.id}
                      onClick={() => { setOpenId(l.id === openId ? null : l.id); setNotes(l.notes ?? ""); }}
                      style={l.status === "WON" ? { borderColor: "var(--color-success)" } : undefined}
                    >
                      <b>{l.service || "New enquiry"}</b>
                      <div className="cn">{l.company || l.name} · {l.email}</div>
                      <div className="kf">
                        <span className="tg">{l.status}</span>
                        {l.budget ? <span className="vl">{l.budget}</span> : null}
                      </div>
                    </div>
                  ))}
                  {items.length === 0 ? <div className="cn" style={{ padding: "6px 2px" }}>Nothing here yet.</div> : null}
                </div>
              );
            })}
          </div>

          {open ? (
            <div className="panel" style={{ marginTop: "24px" }}>
              <div className="panel-h">
                <h2>{open.name} · {open.company || "—"}</h2>
                <button className="btn-pri" type="button" onClick={() => setOpenId(null)}>Close</button>
              </div>
              <div className="lead-detail">
                <div>
                  <div className="lbl">Email</div><p>{open.email}</p>
                  <div className="lbl">Phone</div><p>{open.phone || "—"}</p>
                  <div className="lbl">Service · budget · timeline</div>
                  <p>{[open.service, open.budget, open.timeline].filter(Boolean).join(" · ") || "—"}</p>
                  <div className="lbl">Message</div><p>{open.message}</p>
                </div>
                <div>
                  <div className="lbl">Status</div>
                  <select value={open.status} onChange={(e) => updateLead(open.id, { status: e.target.value })}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="lbl">Internal notes</div>
                  <textarea rows={5} value={notes} onChange={(e) => setNotes(e.target.value)} />
                  <button className="btn-pri" type="button" onClick={() => updateLead(open.id, { notes })}>Save notes</button>
                </div>
              </div>
            </div>
          ) : null}

          <div className="panel" style={{ marginTop: "24px" }}>
            <div className="panel-h"><h2>All leads</h2></div>
            {leads.length === 0 ? (
              <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No leads yet.</p>
            ) : (
              <table className="tbl">
                <thead>
                  <tr><th>Lead</th><th>Company</th><th>Service</th><th>Budget</th><th>Received</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} onClick={() => { setOpenId(l.id); setNotes(l.notes ?? ""); }} style={{ cursor: "pointer" }}>
                      <td>
                        <div className="cli">
                          <div className="av">{l.name.slice(0, 2).toUpperCase()}</div>
                          <div><b>{l.name}</b><small>{l.email}</small></div>
                        </div>
                      </td>
                      <td>{l.company || "—"}</td>
                      <td>{l.service || "—"}</td>
                      <td>{l.budget || "—"}</td>
                      <td>{new Date(l.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</td>
                      <td><span className={`chip ${l.status === "WON" ? "chip-active" : l.status === "LOST" ? "chip-blocked" : "chip-review"}`}>{l.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
}
