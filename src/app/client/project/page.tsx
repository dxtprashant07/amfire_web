"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import { CheckCircle2, Clock, Circle, Mail, Phone, AlertCircle, ChevronDown } from "lucide-react";

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
  milestones: Milestone[];
}

const statusColors: Record<string, string> = {
  DISCOVERY: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  IN_PROGRESS: "bg-primary/10 text-primary",
  ON_HOLD: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400",
  COMPLETED: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400",
};

export default function ClientProjectPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const { data: projects = [], isLoading: loading, error } = useQuery({
    queryKey: ["client-projects"],
    queryFn: async () => {
      const res = await authFetch("/api/client/projects");
      if (!res.ok) throw new Error("Failed to load projects");
      const d = await res.json();
      return (d.projects || []) as Project[];
    },
  });

  const project = projects[selectedIdx] || projects[0];

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 rounded-xl" />
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl p-6 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
        <AlertCircle size={32} className="mx-auto mb-3 text-destructive" />
        <p className="text-sm text-destructive font-medium">Failed to load project details.</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold text-foreground mb-4">Project</h1>
        <div className="p-8 rounded-xl border border-dashed border-border text-center">
          <p className="text-muted-foreground">No active project found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      {/* Project selector (only if multiple projects) */}
      {projects.length > 1 && (
        <div className="mb-6">
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Select Project</label>
          <div className="relative">
            <select
              value={selectedIdx}
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-card text-sm font-medium text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 pr-8"
            >
              {projects.map((p, i) => (
                <option key={p.id} value={i}>{p.name} — {p.status.replace("_", " ")}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-foreground mb-1">{project.name}</h1>
      {project.description && (
        <p className="text-sm text-muted-foreground mb-6">{project.description}</p>
      )}

      {/* Project info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Status</p>
          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status] || "bg-secondary text-foreground"}`}>
            {project.status.replace("_", " ")}
          </span>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Start Date</p>
          <p className="text-sm font-medium text-foreground">
            {project.startDate ? new Date(project.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "TBD"}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-xs text-muted-foreground mb-1">End Date</p>
          <p className="text-sm font-medium text-foreground">
            {project.endDate ? new Date(project.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "TBD"}
          </p>
        </div>
        <div className="p-4 rounded-xl border border-border bg-card">
          <p className="text-xs text-muted-foreground mb-1">Milestones</p>
          <p className="text-sm font-medium text-foreground">
            {project.milestones.filter((m) => m.status === "COMPLETED").length} / {project.milestones.length}
          </p>
        </div>
      </div>

      {/* Milestone tracker */}
      <h2 className="text-lg font-semibold text-foreground mb-4">Milestone Tracker</h2>
      {project.milestones.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-border text-center">
          <p className="text-sm text-muted-foreground">Milestones will appear here once your project kicks off.</p>
        </div>
      ) : (
        <div className="space-y-0">
          {project.milestones.sort((a, b) => a.order - b.order).map((m, i) => {
            const isCompleted = m.status === "COMPLETED";
            const isActive = m.status === "IN_PROGRESS";
            const isLast = i === project.milestones.length - 1;

            return (
              <div key={m.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isCompleted ? "bg-green-500 text-white" :
                    isActive ? "gradient-bg text-white" :
                    "bg-secondary text-muted-foreground border border-border"
                  }`}>
                    {isCompleted ? <CheckCircle2 size={16} /> :
                     isActive ? <Clock size={16} /> :
                     <Circle size={16} />}
                  </div>
                  {!isLast && (
                    <div className={`w-0.5 flex-1 min-h-[2rem] ${isCompleted ? "bg-green-500" : "bg-border"}`} />
                  )}
                </div>
                <div className="pb-6">
                  <h3 className={`text-sm font-semibold ${isCompleted ? "text-muted-foreground" : "text-foreground"}`}>
                    {m.title}
                  </h3>
                  {m.description && (
                    <p className="text-xs text-muted-foreground mt-1">{m.description}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    {m.dueDate && <span>Due: {new Date(m.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                    {m.completedAt && <span className="text-green-600">Completed: {new Date(m.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                  </div>
                  {m.notes && (
                    <div className="mt-2 p-3 rounded-lg bg-secondary/50 text-xs text-muted-foreground">
                      {m.notes}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Contact card */}
      <div className="mt-8 p-5 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">Project Contact</h3>
        <div className="flex flex-wrap gap-4">
          <a href="mailto:contact@amfire.in" className="flex items-center gap-2 text-sm text-primary hover:underline">
            <Mail size={14} /> contact@amfire.in
          </a>
          {process.env.NEXT_PUBLIC_WHATSAPP_NUMBER && (
            <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary hover:underline">
              <Phone size={14} /> WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
