"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@/lib/stores/auth-store";
import {
  HeadphonesIcon, AlertCircle, CheckCircle2, Clock, XCircle,
  MessageSquare, User as UserIcon,
} from "lucide-react";

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

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  OPEN: { icon: AlertCircle, color: "text-blue-600", bg: "bg-blue-500/10" },
  IN_PROGRESS: { icon: Clock, color: "text-primary", bg: "bg-primary/10" },
  RESOLVED: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-500/10" },
  CLOSED: { icon: XCircle, color: "text-muted-foreground", bg: "bg-secondary" },
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
        <h1 className="text-2xl font-bold text-foreground mb-1">Support Tickets</h1>
        <p className="text-sm text-muted-foreground">
          {tickets.length} total · {openCount} open
        </p>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-secondary animate-pulse" />)}
        </div>
      ) : tickets.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <HeadphonesIcon size={40} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm">No support tickets yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {tickets.map((t) => {
            const cfg = statusConfig[t.status] || statusConfig.OPEN;
            const Icon = cfg.icon;
            const expanded = expandedId === t.id;

            return (
              <div key={t.id} className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setExpandedId(expanded ? null : t.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-secondary/30 transition-colors"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                    <Icon size={16} className={cfg.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{t.subject}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <UserIcon size={10} /> {t.user.name} · {t.project.name} · {new Date(t.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${cfg.bg} ${cfg.color}`}>
                    {t.status.replace("_", " ")}
                  </span>
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
