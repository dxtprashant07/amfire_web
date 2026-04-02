"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import { Star, Send, AlertCircle } from "lucide-react";

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

export default function ClientFeedbackPage() {
  const queryClient = useQueryClient();

  const { data: feedbackData, isLoading: loading, error: loadError } = useQuery({
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

  const feedback = feedbackData?.feedback || [];
  const projects = feedbackData?.projects || [];

  // Form state
  const [selectedProject, setSelectedProject] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Set default project when data loads
  if (projects.length > 0 && !selectedProject) {
    setSelectedProject(projects[0].id);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProject || rating === 0) {
      setError("Please select a project and rating.");
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
        const data = await res.json();
        setError(data.error || "Failed to submit.");
        setSubmitting(false);
        return;
      }

      setRating(0);
      setComment("");
      setSuccess("Feedback submitted. Thank you!");
      queryClient.invalidateQueries({ queryKey: ["client-feedback-data"] });
    } catch {
      setError("Network error.");
    }
    setSubmitting(false);
  }

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-24 rounded-xl" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="max-w-3xl p-6 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
        <AlertCircle size={32} className="mx-auto mb-3 text-destructive" />
        <p className="text-sm text-destructive font-medium">Failed to load feedback.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Feedback</h1>

      {/* Submit form */}
      {projects.length > 0 && (
        <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-border bg-card mb-8">
          <h2 className="text-sm font-semibold text-foreground mb-4">Rate a completed milestone</h2>

          {projects.length > 1 && (
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full mb-4 px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}

          {/* Star rating */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-0.5"
              >
                <Star
                  size={24}
                  className={`transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-primary text-primary"
                      : "text-border"
                  }`}
                />
              </button>
            ))}
            {rating > 0 && <span className="text-xs text-muted-foreground ml-2">{rating}/5</span>}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Optional comment..."
            rows={3}
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
                <Send size={14} /> Submit Feedback
              </>
            )}
          </button>
        </form>
      )}

      {/* Past feedback */}
      {feedback.length > 0 && (
        <>
          <h2 className="text-sm font-semibold text-foreground mb-4">Your feedback history</h2>
          <div className="space-y-3">
            {feedback.map((f) => (
              <div key={f.id} className="p-4 rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{f.project.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(f.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= f.rating ? "fill-primary text-primary" : "text-border"}
                    />
                  ))}
                </div>
                {f.comment && <p className="text-sm text-muted-foreground">{f.comment}</p>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
