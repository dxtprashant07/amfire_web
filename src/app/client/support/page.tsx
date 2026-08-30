"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  project: { name: string };
}

interface ProjectOption {
  id: string;
  name: string;
}

const STATUS_COLOR: Record<string, string> = {
  OPEN: "var(--color-orange)",
  IN_PROGRESS: "var(--color-orange)",
  RESOLVED: "var(--color-success)",
  CLOSED: "var(--fg-muted)",
};

export default function ClientSupportPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error: loadError } = useQuery({
    queryKey: ["client-support-data"],
    queryFn: async () => {
      const [tkRes, pjRes] = await Promise.all([
        authFetch("/api/client/support"),
        authFetch("/api/client/projects"),
      ]);
      if (!tkRes.ok || !pjRes.ok) throw new Error("Failed to load data");
      const [tk, pj] = await Promise.all([tkRes.json(), pjRes.json()]);
      const projs = (pj.projects || []).map((p: { id: string; name: string }) => ({ id: p.id, name: p.name }));
      return { tickets: (tk.tickets || []) as Ticket[], projects: projs as ProjectOption[] };
    },
  });

  const tickets = data?.tickets ?? [];
  const projects = data?.projects ?? [];

  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const selectedProject = projectId || projects[0]?.id || "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProject || !subject.trim() || message.trim().length < 10) {
      setError("Pick a project, add a subject, and describe the issue (min 10 characters).");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await authFetch("/api/client/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: selectedProject, subject, message }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Failed to submit.");
        setSubmitting(false);
        return;
      }
      setSubject("");
      setMessage("");
      setOpen(false);
      setSuccess("Ticket submitted — we reply within 4 business hours.");
      queryClient.invalidateQueries({ queryKey: ["client-support-data"] });
    } catch {
      setError("Network error.");
    }
    setSubmitting(false);
  }

  if (isLoading) {
    return (
      <div className="page on">
        <Skeleton className="h-10 w-48 mb-6" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  const openCount = tickets.filter((t) => t.status === "OPEN" || t.status === "IN_PROGRESS").length;
  const resolved = tickets.filter((t) => t.status === "RESOLVED" || t.status === "CLOSED").length;

  return (
    <div className="page on">
      <div className="welcome">
        <h1>Support</h1>
        <p>Report issues, request tweaks, and track resolution — SLA replies within 4 business hours.</p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: "20px" }}>
        <div className="kpi"><div className="top"><span className="lbl">Open tickets</span></div><div className="val">{openCount}</div></div>
        <div className="kpi"><div className="top"><span className="lbl">Resolved</span></div><div className="val">{resolved}</div></div>
      </div>

      <div className="panel">
        <div className="panel-h">
          <h2>All tickets</h2>
          <button
            type="button"
            onClick={() => { setOpen(!open); setSuccess(""); setError(""); }}
            style={{
              padding: "9px 16px",
              borderRadius: "var(--radius-sm)",
              background: "var(--gradient-fire)",
              color: "#fff",
              border: "none",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "var(--shadow-glow-sm)",
            }}
          >
            {open ? "Cancel" : "+ New ticket"}
          </button>
        </div>

        {success ? <p style={{ fontSize: "13px", color: "var(--color-success)", marginBottom: "14px" }}>{success}</p> : null}

        {open ? (
          <form onSubmit={handleSubmit} className="ticket-form">
            <select value={selectedProject} onChange={(e) => setProjectId(e.target.value)}>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <textarea rows={4} placeholder="What's happening? Include links or steps if you can." value={message} onChange={(e) => setMessage(e.target.value)} />
            {error ? <p style={{ fontSize: "12.5px", color: "var(--color-error)" }}>{error}</p> : null}
            <button
              type="submit"
              disabled={submitting}
              style={{
                alignSelf: "flex-start",
                padding: "10px 20px",
                borderRadius: "var(--radius-sm)",
                background: "var(--gradient-fire)",
                color: "#fff",
                border: "none",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {submitting ? "Submitting…" : "Submit ticket"}
            </button>
          </form>
        ) : null}

        {loadError ? (
          <p style={{ fontSize: "13px", color: "var(--color-error)" }}>Failed to load tickets. Please refresh.</p>
        ) : tickets.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No tickets yet.</p>
        ) : (
          tickets.map((t) => (
            <div className="ticket" key={t.id}>
              <div className="th">
                <div className="tt">
                  <span className="d" style={{ background: STATUS_COLOR[t.status] ?? "var(--fg-muted)" }}></span>
                  <p>{t.subject}</p>
                </div>
                <span style={{ fontSize: "11px", color: "var(--fg-muted)" }}>
                  {new Date(t.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                </span>
              </div>
              <p className="desc">{t.message}</p>
              <div className="tf">
                <span>{t.project?.name}</span>
                <b style={{ color: STATUS_COLOR[t.status] ?? "var(--fg-muted)" }}>· {t.status.replace("_", " ")}</b>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
