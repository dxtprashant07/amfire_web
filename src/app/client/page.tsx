"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/stores/auth-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  FolderKanban,
  CreditCard,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Mail,
  Phone,
  HeadphonesIcon,
} from "lucide-react";

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

export default function ClientDashboard() {
  const { user } = useAuthStore();
  const { data: projects = [], isLoading: loading, error } = useQuery({
    queryKey: ["client-projects"],
    queryFn: async () => {
      const res = await authFetch("/api/client/projects");
      if (!res.ok) throw new Error("Failed to load projects");
      const d = await res.json();
      return (d.projects || []) as ProjectSummary[];
    },
  });

  const project = projects[0];
  const completedMilestones = project?.milestones.filter((m) => m.status === "COMPLETED").length ?? 0;
  const totalMilestones = project?.milestones.length ?? 0;
  const paidPayments = project?.payments.filter((p) => p.status === "PAID").length ?? 0;
  const totalPayments = project?.payments.length ?? 0;
  const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  // Next upcoming milestone (first non-completed, sorted by order)
  const nextMilestone = project?.milestones
    .filter((m) => m.status !== "COMPLETED")
    .sort((a, b) => a.order - b.order)[0];

  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "TBD";

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Here&apos;s your project overview.
      </p>

      {loading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
          <Skeleton className="h-48 rounded-xl" />
        </div>
      ) : error ? (
        <div className="p-6 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
          <AlertCircle size={32} className="mx-auto mb-3 text-destructive" />
          <p className="text-sm text-destructive font-medium">Failed to load your projects.</p>
          <p className="text-xs text-muted-foreground mt-1">Please try refreshing the page.</p>
        </div>
      ) : !project ? (
        <div className="p-8 rounded-xl border border-dashed border-border text-center">
          <p className="text-muted-foreground mb-4">No active projects yet.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium"
          >
            Start a Project <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <>
          {/* Project header */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-foreground">{project.name}</h2>
              <Link href="/client/project" className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
                View Details <ArrowRight size={12} />
              </Link>
            </div>
            {project.description && (
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            )}

            {/* Key info grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <p className="text-sm font-semibold text-foreground">{project.status.replace("_", " ")}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Start Date</p>
                <p className="text-sm font-semibold text-foreground">{formatDate(project.startDate)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">End Date</p>
                <p className="text-sm font-semibold text-foreground">{formatDate(project.endDate)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Next Milestone</p>
                <p className="text-sm font-semibold text-foreground">
                  {nextMilestone
                    ? nextMilestone.dueDate
                      ? formatDate(nextMilestone.dueDate)
                      : nextMilestone.title
                    : "All done!"}
                </p>
              </div>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                  <FolderKanban size={18} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Progress</span>
              </div>
              <p className="text-lg font-bold text-foreground">{progressPercent}%</p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Milestones</span>
              </div>
              <p className="text-lg font-bold text-foreground">{completedMilestones} / {totalMilestones}</p>
            </div>

            <div className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg gradient-bg flex items-center justify-center">
                  <CreditCard size={18} className="text-white" />
                </div>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Payments</span>
              </div>
              <p className="text-lg font-bold text-foreground">{paidPayments} / {totalPayments} paid</p>
            </div>
          </div>

          {/* Milestone progress bar + list */}
          <div className="p-6 rounded-xl border border-border bg-card mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Milestone Tracker</h3>
              <span className="text-xs text-muted-foreground">{progressPercent}% complete</span>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 rounded-full bg-secondary overflow-hidden mb-5">
              <div
                className="h-full gradient-bg rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Milestone list with actual titles */}
            <div className="space-y-2.5">
              {project.milestones
                .sort((a, b) => a.order - b.order)
                .map((m) => (
                  <div key={m.id} className="flex items-center gap-3 text-sm">
                    {m.status === "COMPLETED" ? (
                      <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                    ) : m.status === "IN_PROGRESS" ? (
                      <Clock size={16} className="text-primary shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-border shrink-0" />
                    )}
                    <span className={m.status === "COMPLETED" ? "text-muted-foreground line-through" : "text-foreground"}>
                      {m.title}
                    </span>
                    {m.dueDate && m.status !== "COMPLETED" && (
                      <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                        <Calendar size={12} /> {new Date(m.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    )}
                    {m.completedAt && m.status === "COMPLETED" && (
                      <span className="text-xs text-green-600 ml-auto">
                        {new Date(m.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {[
              { href: "/client/payments", label: "View Payments", icon: CreditCard },
              { href: "/client/documents", label: "Project Documents", icon: FileText },
              { href: "/client/support", label: "Get Support", icon: HeadphonesIcon },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
              >
                <link.icon size={18} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Contact card */}
          <div className="p-5 rounded-xl border border-border bg-card">
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
        </>
      )}
    </div>
  );
}
