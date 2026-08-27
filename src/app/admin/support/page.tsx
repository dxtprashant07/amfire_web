"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@/stores/auth-store";
import {
  HeadphonesIcon, AlertCircle, CheckCircle2, Clock, XCircle,
  MessageSquare, User as UserIcon,
} from "lucide-react";
import { Panel, Chip, EmptyState } from "@/components/admin/ui";

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  user: { id: string; name: string; email: string };
  project: { id: string; name: string };
}

const STATUSES = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

const statusConfig: Record<string, { icon: typeof Clock; tone: "info" | "warning" | "success" | "neutral" }> = {
  OPEN: { icon: AlertCircle, tone: "info" },
  IN_PROGRESS: { icon: Clock, tone: "warning" },
  RESOLVED: { icon: CheckCircle2, tone: "success" },
  CLOSED: { icon: XCircle, tone: "neutral" },
};
const toneIconBg: Record<string, string> = {
  info: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
  warning: "bg-[var(--accent-tint)] text-[var(--color-orange)]",
  success: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  neutral: "bg-[var(--surface-sunken)] text-[var(--fg-muted)]",
};

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function fetchTickets() {
    setLoading(true);
    const res = await authFetch("/api/admin/support");
    if (res.ok) {
      const d = await res.json();
      setTickets(d.tickets || []);
    }
    setLoading(false);
  }

  useEffect(() => { fetchTickets(); }, []);

  async function updateStatus(id: string, status: string) {
    await authFetch("/api/admin/support", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchTickets();
  }

  const openCount = tickets.filter((t) => t.status === "OPEN").length;

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">Support Tickets</h1>
        <p className="mt-1 text-[14.5px] text-[var(--fg-muted)]">
          {tickets.length} total · {openCount} open
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-[var(--surface-sunken)] animate-pulse" />)}
        </div>
      ) : tickets.length === 0 ? (
        <Panel>
          <EmptyState icon={<HeadphonesIcon size={32} className="text-[var(--fg-subtle)]" />} text="No support tickets yet." />
        </Panel>
      ) : (
        <div className="space-y-2">
          {tickets.map((t) => {
            const cfg = statusConfig[t.status] || statusConfig.OPEN;
            const Icon = cfg.icon;
            const expanded = expandedId === t.id;

            return (
              <div key={t.id} className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-sm)]">
                <button
                  onClick={() => setExpandedId(expanded ? null : t.id)}
                  className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-[var(--surface-sunken)]"
                >
                  <div className={`grid h-9 w-9 shrink-0 place-items-center rounded-[9px] ${toneIconBg[cfg.tone]}`}>
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-bold text-[var(--fg-default)]">{t.subject}</p>
                    <p className="flex items-center gap-2 text-xs text-[var(--fg-muted)]">
                      <UserIcon size={10} /> {t.user.name} · {t.project.name} · {new Date(t.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <Chip tone={cfg.tone}>{t.status.replace("_", " ")}</Chip>
                </button>

                {expanded && (
                  <div className="px-4 pb-4 border-t border-border pt-3 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><MessageSquare size={12} /> Message</p>
                      <p className="text-sm text-foreground bg-secondary/30 p-3 rounded-lg">{t.message}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-xs font-medium text-muted-foreground">Update Status:</label>
                      <select
                        value={t.status}
                        onChange={(e) => updateStatus(t.id, e.target.value)}
                        className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                      </select>
                      <a href={`mailto:${t.user.email}?subject=Re: ${t.subject}`}
                        className="ml-auto px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                        Reply via Email
                      </a>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
