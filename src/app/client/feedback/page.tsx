"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface FeedbackItem {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  project: { name: string };
}

interface ProjectOption {
  id: string;
  name: string;
}

const day = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

function Stars({ value }: { value: number }) {
  return (
    <span className="stars-read" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= value ? "on" : ""}>★</span>
      ))}
    </span>
  );
}

export default function ClientFeedbackPage() {
  const queryClient = useQueryClient();

  const { data, isLoading, error: loadError } = useQuery({
    queryKey: ["client-feedback-data"],
    queryFn: async () => {
      const [fbRes, pjRes] = await Promise.all([
        authFetch("/api/client/feedback"),
        authFetch("/api/client/projects"),
      ]);
      if (!fbRes.ok || !pjRes.ok) throw new Error("Failed to load data");
      const [fb, pj] = await Promise.all([fbRes.json(), pjRes.json()]);
      const projs = (pj.projects || []).map((p: { id: string; name: string }) => ({ id: p.id, name: p.name }));
      return { feedback: (fb.feedback || []) as FeedbackItem[], projects: projs as ProjectOption[] };
    },
  });

  const feedback = data?.feedback ?? [];
  const projects = data?.projects ?? [];

  const [projectId, setProjectId] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const selectedProject = projectId || projects[0]?.id || "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProject || rating === 0) {
      setError("Pick a project and a rating.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await authFetch("/api/client/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: selectedProject, rating, comment: comment || undefined }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(typeof d.error === "string" ? d.error : "Failed to submit.");
        setSubmitting(false);
        return;
      }
      setRating(0);
      setComment("");
      setSuccess("Thanks — the team sees this straight away.");
      queryClient.invalidateQueries({ queryKey: ["client-feedback-data"] });
    } catch {
      setError("Network error.");
    }
    setSubmitting(false);
  }

  if (isLoading) {
    return (
      <div className="page on">
        <Skeleton className="h-10 w-48 mb-6" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>
    );
  }

  const average = feedback.length
    ? (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1)
    : "—";

  return (
    <div className="page on">
      <div className="welcome">
        <h1>Feedback</h1>
        <p>Rate a milestone or tell us what to change — it goes straight to the people building your project.</p>
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="kpi"><div className="top"><span className="lbl">Reviews left</span></div><div className="val">{feedback.length}</div></div>
        <div className="kpi"><div className="top"><span className="lbl">Average rating</span></div><div className="val">{average}</div></div>
      </div>

      <div className="panel">
        <div className="panel-h"><h2>Leave feedback</h2></div>
        <form className="ticket-form" onSubmit={handleSubmit}>
          <select value={selectedProject} onChange={(e) => setProjectId(e.target.value)}>
            {projects.length === 0 ? <option value="">No projects yet</option> : null}
            {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <div className="stars-pick">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={n <= (hover || rating) ? "on" : ""}
                onClick={() => { setRating(n); setError(""); }}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
              >
                ★
              </button>
            ))}
            <span className="stars-hint">{rating ? `${rating} of 5` : "Tap to rate"}</span>
          </div>

          <textarea rows={4} placeholder="What worked, what didn't, what you'd change." value={comment} onChange={(e) => setComment(e.target.value)} />

          {error ? <p style={{ fontSize: "12.5px", color: "var(--color-error)" }}>{error}</p> : null}
          {success ? <p style={{ fontSize: "12.5px", color: "var(--color-success)" }}>{success}</p> : null}

          <button
            type="submit"
            disabled={submitting || projects.length === 0}
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
              boxShadow: "var(--shadow-glow-sm)",
            }}
          >
            {submitting ? "Sending…" : "Send feedback"}
          </button>
        </form>
      </div>

      <div className="panel">
        <div className="panel-h">
          <h2>Your past feedback</h2>
          <span style={{ fontSize: "12px", color: "var(--fg-muted)" }}>{feedback.length} entr{feedback.length === 1 ? "y" : "ies"}</span>
        </div>
        {loadError ? (
          <p style={{ fontSize: "13px", color: "var(--color-error)" }}>Couldn&apos;t load your feedback. Please refresh.</p>
        ) : feedback.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>Nothing yet — the form above is the fastest way to reach us.</p>
        ) : (
          feedback.map((f) => (
            <div className="ticket" key={f.id}>
              <div className="th">
                <div className="tt"><Stars value={f.rating} /><p>{f.project?.name}</p></div>
                <span style={{ fontSize: "11px", color: "var(--fg-muted)" }}>{day(f.createdAt)}</span>
              </div>
              {f.comment ? <p className="desc">{f.comment}</p> : null}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
