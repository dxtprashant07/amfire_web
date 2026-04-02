"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import { Send, AlertCircle, Clock, CheckCircle2, XCircle } from "lucide-react";

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

export default function ClientSupportPage() {
  const queryClient = useQueryClient();

  const { data: supportData, isLoading: loading, error: loadError } = useQuery({
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

  const tickets = supportData?.tickets || [];
  const projects = supportData?.projects || [];

  // Form state
  const [selectedProject, setSelectedProject] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Set default project when data loads
  if (projects.length > 0 && !selectedProject) {
    setSelectedProject(projects[0].id);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProject || !subject.trim() || message.length < 10) {
      setError("Please fill in all fields (message min 10 chars).");
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
        const data = await res.json();
        setError(data.error || "Failed to submit.");
        setSubmitting(false);
        return;
      }

      setSubject("");
      setMessage("");
      setSuccess("Ticket submitted. We'll respond within 24 hours.");
      queryClient.invalidateQueries({ queryKey: ["client-support-data"] });
    } catch {
      setError("Network error.");
    }
    setSubmitting(false);
  }

  const statusConfig: Record<string, { icon: typeof AlertCircle; color: string }> = {
    OPEN: { icon: AlertCircle, color: "text-yellow-600" },
    IN_PROGRESS: { icon: Clock, color: "text-primary" },
    RESOLVED: { icon: CheckCircle2, color: "text-green-600" },
    CLOSED: { icon: XCircle, color: "text-muted-foreground" },
  };

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-56 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="max-w-3xl p-6 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
        <AlertCircle size={32} className="mx-auto mb-3 text-destructive" />
        <p className="text-sm text-destructive font-medium">Failed to load support data.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Support</h1>

      {/* New ticket form */}
      {projects.length > 0 && (
        <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-border bg-card mb-8">
          <h2 className="text-sm font-semibold text-foreground mb-4">Raise a support ticket</h2>

          {projects.length > 1 && (
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full mb-3 px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="w-full mb-3 px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the issue..."
            rows={4}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary resize-none mb-4"
          />

          {error && <p className="text-xs text-destructive mb-3">{error}</p>}
          {success && <p className="text-xs text-green-600 mb-3">{success}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
          >
            {submitting ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send size={14} /> Submit Ticket
              </>
            )}
          </button>
        </form>
      )}

      {/* Tickets list */}
      {tickets.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-foreground mb-4">Your tickets</h2>
          <div className="space-y-3">
            {tickets.map((t) => {
              const config = statusConfig[t.status] || statusConfig.OPEN;
              const Icon = config.icon;
              return (
                <div key={t.id} className="p-4 rounded-xl border border-border bg-card">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Icon size={16} className={config.color} />
                      <p className="text-sm font-medium text-foreground">{t.subject}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(t.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{t.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">{t.project.name}</span>
                    <span className="text-xs font-medium text-muted-foreground">· {t.status.replace("_", " ")}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {tickets.length === 0 && projects.length === 0 && (
        <div className="p-8 rounded-xl border border-dashed border-border text-center">
          <p className="text-muted-foreground">No active projects. Support is available once your project starts.</p>
        </div>
      )}
    </div>
  );
}
