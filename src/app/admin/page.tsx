"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore, authFetch } from "@/stores/auth-store";
import {
  Users, BarChart3, FolderKanban, Inbox, Headphones, TrendingUp,
  FileText, CheckCircle2, AlertCircle,
} from "lucide-react";
import { Panel, PanelHeader, KpiCard, Chip, Table, Td, EmptyState, ProgressBar } from "@/components/admin/ui";
import { cn } from "@/lib/utils";

interface Stats {
  totalLeads: number;
  leadsThisMonth: number;
  newLeads: number;
  activeProjects: number;
  totalClients: number;
  openTickets: number;
  recentLeads: { id: string; name: string; email: string; service: string | null; status: string; createdAt: string }[];
  activeProjectsList: { id: string; name: string; client: string; status: string; progress: number }[];
  pendingTasks: { id: string; subject: string; status: string; project: { name: string } }[];
  upcomingMilestones: { id: string; title: string; dueDate: string | null; project: { name: string } }[];
  recentActivity: { id: string; action: string; entity: string; details: string | null; createdAt: string; user: { name: string } | null }[];
  outstandingPayments: { id: string; label: string; amount: string; status: string; dueDate: string | null; project: { name: string } }[];
  trends: Record<string, { sparkline: number[]; trend: { direction: "up" | "down"; text: string } }>;
}

const leadChipTone: Record<string, "info" | "success" | "neutral"> = {
  NEW: "info",
  WON: "success",
};

const projectStatusTone: Record<string, "success" | "warning" | "info"> = {
  IN_PROGRESS: "success",
  DISCOVERY: "info",
  ON_HOLD: "warning",
};

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    authFetch("/api/admin/stats").then(async (res) => {
      if (res.ok) setStats(await res.json());
    }).catch(() => {});
  }, []);

  const statCards = stats ? [
    { key: "leadsThisMonth", label: "Leads this month", value: stats.leadsThisMonth, icon: <TrendingUp size={15} />, tone: "success" as const },
    { key: "newLeads", label: "New / uncontacted", value: stats.newLeads, icon: <Inbox size={15} />, tone: "info" as const },
    { key: "activeProjects", label: "Active projects", value: stats.activeProjects, icon: <FolderKanban size={15} />, tone: "warning" as const },
    { key: "totalClients", label: "Clients", value: stats.totalClients, icon: <Users size={15} />, tone: "warning" as const },
    { key: "openTickets", label: "Open tickets", value: stats.openTickets, icon: <Headphones size={15} />, tone: "error" as const },
    { key: "totalLeads", label: "Total leads", value: stats.totalLeads, icon: <BarChart3 size={15} />, tone: "neutral" as const },
  ] : [];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });
  const firstName = user?.name?.split(" ")[0] || user?.name;

  return (
    <div>
      <h1 className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">
        Hi {firstName} — <span className="gradient-text">here&apos;s what&apos;s moving</span>
      </h1>
      <p className="mb-7 mt-1.5 text-[14.5px] text-[var(--fg-muted)]">{today} — here&apos;s what&apos;s moving today.</p>

      {stats ? (
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {statCards.map((s) => (
            <KpiCard
              key={s.label}
              label={s.label}
              value={s.value}
              icon={s.icon}
              tone={s.tone}
              sparkline={stats?.trends?.[s.key]?.sparkline}
              trend={stats?.trends?.[s.key]?.trend}
            />
          ))}
        </div>
      ) : null}

      {/* Active projects + Tasks/Milestones */}
      <div className="mb-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelHeader title="Active projects" action={<Link href="/admin/projects" className="text-[13px] font-semibold text-[var(--color-orange)]">View all →</Link>} />
          {stats?.activeProjectsList && stats.activeProjectsList.length > 0 ? (
            <Table>
              <tbody>
                {stats.activeProjectsList.map((p) => (
                  <tr key={p.id}>
                    <Td>
                      <b className="font-semibold">{p.name}</b>
                      <div className="mt-0.5 text-[11.5px] text-[var(--fg-muted)]">{p.client}</div>
                    </Td>
                    <Td><ProgressBar percent={p.progress} /></Td>
                    <Td align="right"><Chip tone={projectStatusTone[p.status] ?? "neutral"}>{p.status.replace("_", " ")}</Chip></Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState icon={<FolderKanban size={28} className="text-[var(--fg-subtle)]" />} text="No active projects yet." />
          )}
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel>
            <PanelHeader title="Pending tasks" />
            {stats?.pendingTasks && stats.pendingTasks.length > 0 ? (
              <div className="-mx-1">
                {stats.pendingTasks.map((t) => {
                  const done = t.status === "IN_PROGRESS";
                  return (
                    <div key={t.id} className="flex items-center gap-2.5 border-b border-[var(--border-subtle)] px-1 py-2.5 text-[13px] last:border-b-0">
                      <input type="checkbox" readOnly checked={done} className="h-4 w-4 shrink-0 accent-[var(--color-orange)]" />
                      <span className={cn("min-w-0 flex-1 truncate", done ? "text-[var(--fg-muted)] line-through" : "text-[var(--fg-default)]")}>{t.subject}</span>
                      <span className="ml-auto shrink-0 text-[11.5px] text-[var(--fg-muted)]">{t.project.name}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState icon={<CheckCircle2 size={24} className="text-[var(--fg-subtle)]" />} text="No open tickets." />
            )}
          </Panel>

          <Panel>
            <PanelHeader title="Upcoming milestones" />
            {stats?.upcomingMilestones && stats.upcomingMilestones.length > 0 ? (
              <div className="-mx-1">
                {stats.upcomingMilestones.map((m) => {
                  const d = m.dueDate ? new Date(m.dueDate) : null;
                  return (
                    <div key={m.id} className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-1 py-2.5 last:border-b-0">
                      <div className="grid h-10 w-10 shrink-0 flex-col place-items-center rounded-[9px] bg-[var(--surface-sunken)]">
                        <b className="text-sm font-extrabold leading-none text-[var(--fg-default)]">{d ? d.getDate() : "—"}</b>
                        <small className="text-[8.5px] font-bold uppercase text-[var(--fg-muted)]">{d ? d.toLocaleDateString("en-US", { month: "short" }) : ""}</small>
                      </div>
                      <div className="min-w-0 flex-1">
                        <b className="block truncate text-[13px] text-[var(--fg-default)]">{m.title}</b>
                        <small className="text-[11.5px] text-[var(--fg-muted)]">{m.project.name}</small>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState icon={<CheckCircle2 size={24} className="text-[var(--fg-subtle)]" />} text="No upcoming milestones." />
            )}
          </Panel>
        </div>
      </div>

      {/* Recent activity + Outstanding payments */}
      <div className="mb-6 grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Recent activity" />
          {stats?.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="flex flex-col gap-1">
              {stats.recentActivity.map((a) => (
                <div key={a.id} className="-mx-1 flex items-start gap-3 rounded-[9px] px-1 py-2 text-[13px]">
                  <span className="mt-1 grid h-6.5 w-6.5 shrink-0 place-items-center rounded-full bg-[var(--accent-tint)] text-[var(--color-orange)]">
                    <FileText size={13} />
                  </span>
                  <div>
                    <b className="font-semibold text-[var(--fg-default)]">{a.details || `${a.action} · ${a.entity}`}</b>
                    <small className="mt-0.5 block text-[11.5px] text-[var(--fg-muted)]">
                      {a.user?.name ? `${a.user.name} · ` : ""}
                      {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon={<AlertCircle size={24} className="text-[var(--fg-subtle)]" />} text="No activity recorded yet." />
          )}
        </Panel>

        <Panel>
          <PanelHeader title="Outstanding payments" action={<Link href="/admin/projects" className="text-[13px] font-semibold text-[var(--color-orange)]">View all →</Link>} />
          {stats?.outstandingPayments && stats.outstandingPayments.length > 0 ? (
            <Table>
              <tbody>
                {stats.outstandingPayments.map((p) => (
                  <tr key={p.id}>
                    <Td>
                      <b className="font-semibold">{p.label}</b>
                      <div className="mt-0.5 text-[11.5px] text-[var(--fg-muted)]">{p.project.name}</div>
                    </Td>
                    <Td align="right">
                      <b className="font-bold">₹{Number(p.amount).toLocaleString("en-IN")}</b>
                      <div className={`mt-0.5 text-[11.5px] ${p.status === "OVERDUE" ? "text-[var(--color-error)]" : "text-[var(--fg-muted)]"}`}>
                        {p.status === "OVERDUE" ? "Overdue" : p.dueDate ? `Due ${new Date(p.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}` : "Due date TBD"}
                      </div>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState icon={<CheckCircle2 size={24} className="text-[var(--fg-subtle)]" />} text="No outstanding payments." />
          )}
        </Panel>
      </div>

      {/* Recent leads */}
      <Panel>
        <PanelHeader title="Recent leads" action={<Link href="/admin/leads" className="text-[13px] font-semibold text-[var(--color-orange)]">View all →</Link>} />
        {stats?.recentLeads && stats.recentLeads.length > 0 ? (
          <Table>
            <tbody>
              {stats.recentLeads.map((lead) => (
                <tr key={lead.id}>
                  <Td>
                    <b className="font-semibold">{lead.name}</b>
                    <div className="mt-0.5 text-[11.5px] text-[var(--fg-muted)]">{lead.email}{lead.service ? ` · ${lead.service}` : ""}</div>
                  </Td>
                  <Td align="right"><Chip tone={leadChipTone[lead.status] ?? "neutral"}>{lead.status}</Chip></Td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState icon={<Inbox size={28} className="text-[var(--fg-subtle)]" />} text="No leads yet. They'll appear here when visitors submit the contact form." />
        )}
      </Panel>
    </div>
  );
}
