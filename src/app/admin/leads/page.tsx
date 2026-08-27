"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@/stores/auth-store";
import {
  Users, AlertCircle, CheckCircle2, Clock,
  Phone, Mail, Building2, Calendar, MessageSquare,
} from "lucide-react";
import { Panel, Chip, EmptyState } from "@/components/admin/ui";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  timeline: string | null;
  message: string;
  status: string;
  notes: string | null;
  assignedTo: string | null;
  followUpDate: string | null;
  createdAt: string;
}

const STATUSES = ["NEW", "CONTACTED", "DISCOVERY", "PROPOSAL", "NEGOTIATION", "WON", "LOST", "NURTURE"];

const statusTone: Record<string, "info" | "warning" | "success" | "error" | "neutral"> = {
  NEW: "info",
  CONTACTED: "info",
  DISCOVERY: "warning",
  PROPOSAL: "warning",
  NEGOTIATION: "warning",
  WON: "success",
  LOST: "error",
  NURTURE: "neutral",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [msg, setMsg] = useState({ type: "", text: "" });

  async function fetchLeads() {
    setLoading(true);
    const res = await authFetch("/api/admin/leads");
    if (res.ok) {
      const d = await res.json();
      setLeads(d.leads || []);
    }
    setLoading(false);
  }

  useEffect(() => { fetchLeads(); }, []);

  async function updateLead(id: string, data: Record<string, unknown>) {
    const res = await authFetch("/api/admin/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    if (res.ok) {
      setMsg({ type: "success", text: "Lead updated" });
      fetchLeads();
    } else {
      setMsg({ type: "error", text: "Failed to update" });
    }
    setTimeout(() => setMsg({ type: "", text: "" }), 2000);
  }

  const newCount = leads.filter((l) => l.status === "NEW").length;
  const activeCount = leads.filter((l) => !["WON", "LOST"].includes(l.status)).length;

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">Leads</h1>
        <p className="mt-1 text-[14.5px] text-[var(--fg-muted)]">
          {leads.length} total · {newCount} new · {activeCount} active
        </p>
      </div>

      {msg.text && (
        <div className={`flex items-center gap-2 p-3 mb-4 rounded-lg text-sm ${msg.type === "success" ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
          {msg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />} {msg.text}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <div key={i} className="h-20 rounded-xl bg-secondary animate-pulse" />)}
        </div>
      ) : leads.length === 0 ? (
        <Panel>
          <EmptyState icon={<Users size={32} className="text-[var(--fg-subtle)]" />} text="No leads yet. They'll appear here when visitors submit the contact form." />
        </Panel>
      ) : (
        <div className="space-y-2">
          {leads.map((lead) => {
            const expanded = expandedId === lead.id;

            return (
              <div key={lead.id} className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] shadow-[var(--shadow-sm)]">
                {/* Lead row */}
                <button
                  onClick={() => { setExpandedId(expanded ? null : lead.id); setEditNotes(lead.notes || ""); }}
                  className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-[var(--surface-sunken)]"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                      {lead.company && (
                        <span className="text-xs text-muted-foreground flex items-center gap-1"><Building2 size={10} />{lead.company}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Mail size={10} />{lead.email}</span>
                      {lead.phone && <span className="flex items-center gap-1"><Phone size={10} />{lead.phone}</span>}
                      {lead.service && <span>{lead.service}</span>}
                      {lead.budget && <span>{lead.budget}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] text-muted-foreground">
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                    <Chip tone={statusTone[lead.status] ?? "neutral"}>{lead.status}</Chip>
                  </div>
                </button>

                {/* Expanded detail */}
                {expanded && (
                  <div className="px-4 pb-4 border-t border-border pt-4 space-y-4">
                    {/* Message */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1 flex items-center gap-1"><MessageSquare size={12} /> Message</p>
                      <p className="text-sm text-foreground bg-secondary/30 p-3 rounded-lg">{lead.message}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Status */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">Pipeline Status</label>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLead(lead.id, { status: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>

                      {/* Follow-up date */}
                      <div>
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1"><Calendar size={12} /> Follow-up Date</label>
                        <input
                          type="date"
                          value={lead.followUpDate ? lead.followUpDate.slice(0, 10) : ""}
                          onChange={(e) => updateLead(lead.id, { followUpDate: e.target.value || undefined })}
                          className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                      </div>

                      {/* Info */}
                      <div className="text-xs text-muted-foreground space-y-1 pt-6">
                        {lead.timeline && <p>Timeline: {lead.timeline}</p>}
                        {lead.budget && <p>Budget: {lead.budget}</p>}
                        {lead.service && <p>Service: {lead.service}</p>}
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">Internal Notes</label>
                      <div className="flex gap-2">
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                          rows={2}
                          placeholder="Add internal notes about this lead..."
                        />
                        <button
                          onClick={() => updateLead(lead.id, { notes: editNotes })}
                          className="px-4 py-2 rounded-lg gradient-bg text-white text-xs font-medium hover:opacity-90 self-end"
                        >
                          Save
                        </button>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="flex gap-2">
                      <a href={`mailto:${lead.email}`} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                        <Mail size={12} /> Email
                      </a>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                          <Phone size={12} /> Call
                        </a>
                      )}
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
