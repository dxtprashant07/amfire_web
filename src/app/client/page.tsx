"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFetch, useAuthStore } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Milestone {
  id: string;
  title: string;
  status: string;
  dueDate: string | null;
  completedAt: string | null;
  order: number;
}

interface Payment {
  status: string;
  amount: string;
  dueDate: string | null;
}

interface ProjectSummary {
  id: string;
  name: string;
  description: string | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  milestones: Milestone[];
  payments: Payment[];
}

interface Doc {
  id: string;
  name: string;
  createdAt: string;
  project: { name: string };
}

const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const day = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—";

function firstName(name?: string) {
  return name?.trim().split(/\s+/)[0] ?? "there";
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "?";
}

export default function ClientDashboard() {
  // Captured once per mount: Date.now() is impure during render.
  const [now] = useState(() => Date.now());
  const { user } = useAuthStore();

  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ["client-projects"],
    queryFn: async () => {
      const res = await authFetch("/api/client/projects");
      if (!res.ok) throw new Error("Failed to load projects");
      const d = await res.json();
      return (d.projects || []) as ProjectSummary[];
    },
  });

  const { data: docs = [] } = useQuery({
    queryKey: ["client-documents"],
    queryFn: async () => {
      const res = await authFetch("/api/client/documents");
      if (!res.ok) return [];
      const d = await res.json();
      return (d.documents || []) as Doc[];
    },
  });

  if (isLoading) {
    return (
      <div className="page on">
        <Skeleton className="h-10 w-72 mb-6" />
        <Skeleton className="h-28 mb-5 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page on">
        <div className="welcome"><h1>Something went wrong</h1><p>We couldn&apos;t load your projects. Please refresh, or email contact@amfire.in.</p></div>
      </div>
    );
  }

  const project = projects[0];
  const milestones = project?.milestones ?? [];
  const done = milestones.filter((m) => m.status === "COMPLETED").length;
  const active = milestones.find((m) => m.status === "IN_PROGRESS");
  const percent = milestones.length ? Math.round((done / milestones.length) * 100) : 0;

  const allPayments = projects.flatMap((p) => p.payments ?? []);
  const outstanding = allPayments
    .filter((p) => p.status !== "PAID")
    .reduce((sum, p) => sum + Number(p.amount ?? 0), 0);
  const nextDue = allPayments
    .filter((p) => p.status !== "PAID" && p.dueDate)
    .sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : 1))[0];

  const daysLeft = project?.endDate
    ? Math.max(0, Math.ceil((new Date(project.endDate).getTime() - now) / 86_400_000))
    : null;

  return (
    <div className="page on">
      <div className="welcome">
        <h1>
          Welcome back,{" "}
          <span style={{ background: "var(--gradient-fire)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
            {firstName(user?.name)}
          </span>
        </h1>
        <p>
          {project
            ? active
              ? `${active.title} is in progress — ${done} of ${milestones.length} milestones complete.`
              : `${done} of ${milestones.length} milestones complete.`
            : "No active project yet — your amfire contact will set one up shortly."}
        </p>
      </div>

      <div className="grid-3">
        <div className="kpi">
          <div className="top">
            <span className="lbl">Active Projects</span>
            <div className="ic"><svg viewBox="0 0 24 24"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5" /><path d="M22 5H10L8 8H2" /></svg></div>
          </div>
          <div className="val">{projects.length}</div>
          <div className="dta">{project?.status?.replace("_", " ") ?? "—"}</div>
        </div>
        <div className="kpi">
          <div className="top">
            <span className="lbl">Milestones Done</span>
            <div className="ic"><svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" /></svg></div>
          </div>
          <div className="val">{done} <span style={{ fontSize: "16px", color: "var(--fg-muted)", fontWeight: 600 }}>/ {milestones.length}</span></div>
          <div className="dta">{percent}% complete</div>
        </div>
        <div className="kpi">
          <div className="top">
            <span className="lbl">Outstanding</span>
            <div className="ic"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg></div>
          </div>
          <div className="val">{money(outstanding)}</div>
          <div className="dta" style={{ color: "var(--color-orange)" }}>
            {nextDue
              ? `· Due ${day(nextDue.dueDate)}`
              : outstanding > 0
                ? "· Awaiting due date"
                : "· Nothing due"}
          </div>
        </div>
      </div>

      <div className="grid-hero">
        <div className="panel">
          <div className="panel-h">
            <h2>Project timeline{project ? ` · ${project.name}` : ""}</h2>
            <Link href="/client/project">View project →</Link>
          </div>
          {milestones.length === 0 ? (
            <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No milestones yet.</p>
          ) : (
            milestones
              .slice()
              .sort((a, b) => a.order - b.order)
              .map((m, i) => {
                const state = m.status === "COMPLETED" ? "done" : m.status === "IN_PROGRESS" ? "active" : "wait";
                return (
                  <div className="mile" key={m.id}>
                    <div className={`num ${state}`}>{state === "done" ? "✓" : i + 1}</div>
                    <div className="b">
                      <div className="r1">
                        <h4>{m.title}</h4>
                        <span className={`chip ${state}`}>
                          {state === "done" ? "DONE" : state === "active" ? "IN PROGRESS" : "UPCOMING"}
                        </span>
                      </div>
                      <div className="meta">
                        {m.completedAt ? `Completed · ${day(m.completedAt)}` : m.dueDate ? `Due · ${day(m.dueDate)}` : "Not scheduled"}
                      </div>
                    </div>
                  </div>
                );
              })
          )}
        </div>

        <div className="proj-hero">
          <div className="eye">Live Project</div>
          <h2>{project?.name ?? "No project yet"}</h2>
          <p>{project?.description ?? "Your amfire contact will share the scope here."}</p>
          <div className="stats">
            <div className="s"><span>{percent}%</span><small>Complete</small></div>
            {daysLeft !== null ? <div className="s"><span>{daysLeft}</span><small>Days left</small></div> : null}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-h">
          <h2>Recent files</h2>
          <Link href="/client/documents">View all</Link>
        </div>
        {docs.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>Nothing shared yet.</p>
        ) : (
          docs.slice(0, 4).map((d) => (
            <div className="act" key={d.id}>
              <div className="av">{initials(d.project?.name || "amfire")}</div>
              <div>
                <p><b>{d.name}</b> was shared in <b>{d.project?.name}</b></p>
                <small>{new Date(d.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
