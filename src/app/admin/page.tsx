"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore, authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

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

const STATUS_CHIP: Record<string, string> = {
  IN_PROGRESS: "chip-active",
  DISCOVERY: "chip-planning",
  ON_HOLD: "chip-blocked",
  COMPLETED: "chip-active",
  CANCELLED: "chip-blocked",
};

const money = (v: string | number) => `₹${Number(v ?? 0).toLocaleString("en-IN")}`;
const day = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "—";

/** Renders the kit's sparkline shape from a small series of counts. */
function Spark({ series, color }: { series?: number[]; color: string }) {
  if (!series || series.length < 2) return null;
  const max = Math.max(...series, 1);
  const step = 100 / (series.length - 1);
  const d = series.map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)} ${(26 - (v / max) * 22).toFixed(1)}`).join(" ");
  return (
    <svg className="spark" viewBox="0 0 100 28" width="100%" height="28" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    authFetch("/api/admin/stats")
      .then(async (res) => {
        if (res.ok) setStats(await res.json());
        else setFailed(true);
      })
      .catch(() => setFailed(true));
  }, []);

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" });
  const firstName = user?.name?.split(" ")[0] || "there";

  const kpis = stats
    ? [
        { key: "leadsThisMonth", label: "Leads (this month)", value: stats.leadsThisMonth, tint: "var(--accent-tint)", stroke: "var(--color-orange)" },
        { key: "activeProjects", label: "Active projects", value: stats.activeProjects, tint: "var(--color-success-bg)", stroke: "var(--color-success)" },
        { key: "totalClients", label: "Clients", value: stats.totalClients, tint: "var(--accent-tint)", stroke: "var(--color-orange)" },
        { key: "openTickets", label: "Open tickets", value: stats.openTickets, tint: "var(--color-error-bg)", stroke: "var(--color-error)" },
      ]
    : [];

  const outstandingTotal = (stats?.outstandingPayments ?? []).reduce((sum, p) => sum + Number(p.amount ?? 0), 0);

  return (
    <div className="page on">
      <h1 className="h1">
        Hi {firstName} — <span className="fire-text">here&apos;s what&apos;s moving</span>
      </h1>
      <p className="sub">{today}</p>

      {failed ? (
        <div className="panel"><p style={{ fontSize: "13px", color: "var(--color-error)" }}>Couldn&apos;t load dashboard stats. Check the database connection.</p></div>
      ) : !stats ? (
        <>
          <Skeleton className="h-28 mb-5 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
        </>
      ) : (
        <>
          <div className="grid-4">
            {kpis.map((k) => (
              <div className="kpi" key={k.key}>
                <div className="kpi-head">
                  <div className="lbl">{k.label}</div>
                  <div className="kpi-ic" style={{ background: k.tint }}>
                    <svg viewBox="0 0 24 24" style={{ stroke: k.stroke }}><path d="M12 19V5M5 12l7-7 7 7" /></svg>
                  </div>
                </div>
                <div className="val">{k.value}</div>
                <Spark series={stats.trends?.[k.key]?.sparkline} color={k.stroke} />
                <div className={`dta ${stats.trends?.[k.key]?.trend?.direction === "down" ? "dn" : "up"}`}>
                  {stats.trends?.[k.key]?.trend?.text ?? ""}
                </div>
              </div>
            ))}
          </div>

          <div className="two-col">
            <div className="panel">
              <div className="panel-h">
                <h2>Active projects</h2>
                <Link href="/admin/projects" style={{ fontSize: "13px", color: "var(--color-orange)", fontWeight: 600 }}>View all →</Link>
              </div>
              {stats.activeProjectsList.length === 0 ? (
                <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No active projects.</p>
              ) : (
                <table className="tbl">
                  <tbody>
                    {stats.activeProjectsList.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <b style={{ fontWeight: 700 }}>{p.name}</b>
                          <div style={{ fontSize: "11.5px", color: "var(--fg-muted)" }}>{p.client}</div>
                        </td>
                        <td>
                          <div className="pr">
                            <div className="bar"><i style={{ width: `${p.progress}%` }} /></div>
                            {p.progress}%
                          </div>
                        </td>
                        <td><span className={`chip ${STATUS_CHIP[p.status] ?? "chip-planning"}`}>{p.status.replace("_", " ")}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="panel">
                <div className="panel-h"><h2>Open tickets</h2></div>
                {stats.pendingTasks.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>Nothing open.</p>
                ) : (
                  stats.pendingTasks.map((t) => (
                    <div className="task-item" key={t.id}>
                      <span>{t.subject}</span>
                      <span className="due">{t.project?.name}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="panel">
                <div className="panel-h"><h2>Upcoming milestones</h2></div>
                {stats.upcomingMilestones.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>Nothing scheduled.</p>
                ) : (
                  stats.upcomingMilestones.map((m) => {
                    const d = m.dueDate ? new Date(m.dueDate) : null;
                    return (
                      <div className="mile-item" key={m.id}>
                        <div className="dd">
                          <b>{d ? d.getDate() : "—"}</b>
                          <small>{d ? d.toLocaleDateString("en-IN", { month: "short" }).toUpperCase() : ""}</small>
                        </div>
                        <div className="mm"><b>{m.title}</b><small>{m.project?.name}</small></div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="two-col">
            <div className="panel">
              <div className="panel-h"><h2>Recent activity</h2></div>
              <div className="activity">
                {stats.recentActivity.length === 0 ? (
                  <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No activity yet.</p>
                ) : (
                  stats.recentActivity.map((a) => (
                    <div className="act-item" key={a.id}>
                      <span className="act-ic" style={{ background: "var(--color-orange)" }}>
                        <svg viewBox="0 0 24 24"><path d="M6 2h9l5 5v15H6z" /><path d="M15 2v5h5" /></svg>
                      </span>
                      <div>
                        <b style={{ fontWeight: 600 }}>{a.details ?? `${a.action} ${a.entity}`}</b>
                        <small>
                          {new Date(a.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                          {a.user?.name ? ` · ${a.user.name}` : ""}
                        </small>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="panel">
              <div className="panel-h">
                <h2>Outstanding invoices</h2>
                <span style={{ fontSize: "13px", fontWeight: 700 }}>{money(outstandingTotal)}</span>
              </div>
              {stats.outstandingPayments.length === 0 ? (
                <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>Everything is settled.</p>
              ) : (
                <table className="tbl">
                  <tbody>
                    {stats.outstandingPayments.map((p) => (
                      <tr key={p.id}>
                        <td>
                          <b style={{ fontWeight: 700 }}>{p.label}</b>
                          <div style={{ fontSize: "11.5px", color: "var(--fg-muted)" }}>{p.project?.name}</div>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <b style={{ fontWeight: 700 }}>{money(p.amount)}</b>
                          <div style={{ fontSize: "11.5px", color: p.status === "OVERDUE" ? "var(--color-error)" : "var(--fg-muted)" }}>
                            {p.status === "OVERDUE" ? "Overdue" : `Due ${day(p.dueDate)}`}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
