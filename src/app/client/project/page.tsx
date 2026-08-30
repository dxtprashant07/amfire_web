"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Milestone {
  id: string;
  title: string;
  description: string | null;
  order: number;
  status: string;
  dueDate: string | null;
  completedAt: string | null;
  notes: string | null;
}

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  totalValue?: string | null;
  milestones: Milestone[];
}

const day = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function ClientProjectPage() {
  // Captured once per mount: Date.now() is impure during render.
  const [now] = useState(() => Date.now());
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["client-projects"],
    queryFn: async () => {
      const res = await authFetch("/api/client/projects");
      if (!res.ok) throw new Error("Failed to load projects");
      const d = await res.json();
      return (d.projects || []) as Project[];
    },
  });

  if (isLoading) {
    return (
      <div className="page on">
        <Skeleton className="h-10 w-64 mb-6" />
        <Skeleton className="h-40 mb-5 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  const project = projects.find((p) => p.id === selectedId) ?? projects[0];

  if (error || !project) {
    return (
      <div className="page on">
        <div className="welcome">
          <h1>Project</h1>
          <p>{error ? "We couldn't load your project. Please refresh." : "No project has been set up yet."}</p>
        </div>
      </div>
    );
  }

  const milestones = project.milestones.slice().sort((a, b) => a.order - b.order);
  const done = milestones.filter((m) => m.status === "COMPLETED").length;
  const active = milestones.find((m) => m.status === "IN_PROGRESS");
  const percent = milestones.length ? Math.round((done / milestones.length) * 100) : 0;
  const daysLeft = project.endDate
    ? Math.max(0, Math.ceil((new Date(project.endDate).getTime() - now) / 86_400_000))
    : null;

  return (
    <div className="page on">
      <div className="welcome">
        <h1>{project.name}</h1>
        <p>
          {project.description ?? "Project overview"}
          {project.startDate ? ` · Started ${day(project.startDate)}` : ""}
        </p>
      </div>

      {projects.length > 1 ? (
        <div className="proj-switch">
          {projects.map((p) => (
            <button key={p.id} type="button" className={p.id === project.id ? "on" : ""} onClick={() => setSelectedId(p.id)}>
              {p.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="proj-hero" style={{ marginBottom: "24px" }}>
        <div className="eye">Project health</div>
        <h2>
          {project.status.replace("_", " ")}
          {active ? ` · ${active.title}` : milestones.length ? ` · ${done} of ${milestones.length} milestones` : ""}
        </h2>
        <p>{active?.description ?? project.description ?? "We'll keep this updated as we ship."}</p>
        <div className="stats">
          <div className="s"><span>{percent}%</span><small>Complete</small></div>
          {daysLeft !== null ? <div className="s"><span>{daysLeft}</span><small>Days left</small></div> : null}
          {project.totalValue ? <div className="s"><span>₹{Number(project.totalValue).toLocaleString("en-IN")}</span><small>Project value</small></div> : null}
        </div>
      </div>

      <div className="panel">
        <div className="panel-h">
          <h2>Deliverables</h2>
          <span style={{ fontSize: "12px", color: "var(--fg-muted)" }}>{milestones.length} total · {done} shipped</span>
        </div>
        {milestones.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No milestones yet.</p>
        ) : (
          milestones.map((m, i) => {
            const state = m.status === "COMPLETED" ? "done" : m.status === "IN_PROGRESS" ? "active" : "wait";
            return (
              <div className="mile" key={m.id}>
                <div className={`num ${state}`}>{state === "done" ? "✓" : i + 1}</div>
                <div className="b">
                  <div className="r1">
                    <h4>{m.title}</h4>
                    <span className={`chip ${state}`}>
                      {state === "done" ? "SHIPPED" : state === "active" ? "IN PROGRESS" : "UPCOMING"}
                    </span>
                  </div>
                  <div className="meta">
                    {m.completedAt ? `Completed · ${day(m.completedAt)}` : m.dueDate ? `Due · ${day(m.dueDate)}` : "Not scheduled"}
                  </div>
                  {m.description ? <p className="mile-desc">{m.description}</p> : null}
                  {m.notes ? <p className="mile-desc">{m.notes}</p> : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
