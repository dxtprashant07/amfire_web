"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch } from "@/lib/stores/auth-store";
import {
  ArrowLeft, CheckCircle2, Clock, Plus, Trash2, AlertCircle,
  FileText, CreditCard, Upload, Download, Save,
} from "lucide-react";

interface Milestone {
  id: string; title: string; description: string | null; order: number;
  status: string; dueDate: string | null; completedAt: string | null; notes: string | null;
}
interface Payment {
  id: string; label: string; amount: string; percent: number;
  status: string; dueDate: string | null; paidDate: string | null; invoiceUrl: string | null;
}
interface Document {
  id: string; name: string; type: string; url: string; size: number | null; createdAt: string;
}
interface Project {
  id: string; name: string; description: string | null; status: string;
  startDate: string | null; endDate: string | null; totalValue: string | null;
  client: { id: string; name: string; email: string; company: string | null };
  milestones: Milestone[]; payments: Payment[]; documents: Document[];
}

const STATUS_OPTIONS = ["DISCOVERY", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"];
const MS_STATUS = ["PENDING", "IN_PROGRESS", "COMPLETED"];
const PAY_STATUS = ["PENDING", "PAID", "OVERDUE"];

export default function AdminProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Edit state for project fields
  const [editStatus, setEditStatus] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editStart, setEditStart] = useState("");
  const [editEnd, setEditEnd] = useState("");

  // New milestone form
  const [showMsForm, setShowMsForm] = useState(false);
  const [msForm, setMsForm] = useState({ title: "", description: "", dueDate: "", notes: "" });

  // New payment form
  const [showPayForm, setShowPayForm] = useState(false);
  const [payForm, setPayForm] = useState({ label: "", amount: "", percent: "", dueDate: "" });

  // New document form
  const [showDocForm, setShowDocForm] = useState(false);
  const [docForm, setDocForm] = useState({ name: "", type: "pdf", url: "" });

  const fetchProject = useCallback(async () => {
    const res = await authFetch(`/api/admin/projects/${id}`);
    if (res.ok) {
      const d = await res.json();
      const p = d.project;
      if (p) {
        setProject(p);
        setEditStatus(p.status);
        setEditDesc(p.description || "");
        setEditStart(p.startDate ? p.startDate.slice(0, 10) : "");
        setEditEnd(p.endDate ? p.endDate.slice(0, 10) : "");
      }
    }
    setLoading(false);
  }, [id]);

  useEffect(() => { fetchProject(); }, [fetchProject]);

  function flash(type: string, text: string) {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: "", text: "" }), 3000);
  }

  // Update project details
  async function handleSaveProject() {
    setSaving(true);
    const res = await authFetch("/api/admin/projects", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        status: editStatus,
        description: editDesc || undefined,
        startDate: editStart || undefined,
        endDate: editEnd || undefined,
      }),
    });
    if (res.ok) { flash("success", "Project updated"); fetchProject(); }
    else flash("error", "Failed to update");
    setSaving(false);
  }

  // Add milestone
  async function handleAddMilestone(e: React.FormEvent) {
    e.preventDefault();
    const order = (project?.milestones.length || 0) + 1;
    const res = await authFetch(`/api/admin/projects/${id}/milestones`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...msForm, order, description: msForm.description || undefined, dueDate: msForm.dueDate || undefined, notes: msForm.notes || undefined }),
    });
    if (res.ok) {
      setShowMsForm(false);
      setMsForm({ title: "", description: "", dueDate: "", notes: "" });
      flash("success", "Milestone added");
      fetchProject();
    } else flash("error", "Failed to add milestone");
  }

  // Update milestone status
  async function updateMilestoneStatus(milestoneId: string, status: string) {
    await authFetch(`/api/admin/projects/${id}/milestones`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ milestoneId, status }),
    });
    fetchProject();
  }

  // Add payment
  async function handleAddPayment(e: React.FormEvent) {
    e.preventDefault();
    const res = await authFetch(`/api/admin/projects/${id}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: payForm.label, amount: Number(payForm.amount), percent: Number(payForm.percent), dueDate: payForm.dueDate || undefined }),
    });
    if (res.ok) {
      setShowPayForm(false);
      setPayForm({ label: "", amount: "", percent: "", dueDate: "" });
      flash("success", "Payment milestone added");
      fetchProject();
    } else flash("error", "Failed to add payment");
  }

  // Update payment status
  async function updatePaymentStatus(paymentId: string, status: string) {
    await authFetch(`/api/admin/projects/${id}/payments`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, status }),
    });
    fetchProject();
  }

  // Add document
  async function handleAddDoc(e: React.FormEvent) {
    e.preventDefault();
    const res = await authFetch(`/api/admin/projects/${id}/documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: docForm.name, type: docForm.type, url: docForm.url }),
    });
    if (res.ok) {
      setShowDocForm(false);
      setDocForm({ name: "", type: "pdf", url: "" });
      flash("success", "Document added");
      fetchProject();
    } else flash("error", "Failed to add document");
  }

  // Delete document
  async function deleteDoc(documentId: string) {
    await authFetch(`/api/admin/projects/${id}/documents`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId }),
    });
    fetchProject();
  }

  if (loading) {
    return (
      <div className="max-w-4xl space-y-4">
        <div className="h-8 w-48 bg-secondary animate-pulse rounded-lg" />
        <div className="h-48 bg-secondary animate-pulse rounded-xl" />
        <div className="h-64 bg-secondary animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl text-center py-16">
        <AlertCircle size={40} className="mx-auto mb-3 text-muted-foreground opacity-40" />
        <p className="text-muted-foreground">Project not found.</p>
        <Link href="/admin/projects" className="text-primary text-sm hover:underline mt-2 inline-block">Back to Projects</Link>
      </div>
    );
  }

  const inputCls = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30";
  const labelCls = "block text-xs font-medium text-muted-foreground mb-1.5";

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <button onClick={() => router.push("/admin/projects")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft size={16} /> Back to Projects
      </button>

      {msg.text && (
        <div className={`flex items-center gap-2 p-3 mb-4 rounded-lg text-sm ${msg.type === "success" ? "bg-green-500/10 text-green-600" : "bg-destructive/10 text-destructive"}`}>
          {msg.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />} {msg.text}
        </div>
      )}

      {/* Project Info Card */}
      <div className="p-6 rounded-xl border border-border bg-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-foreground">{project.name}</h1>
            <p className="text-sm text-muted-foreground">{project.client.name} {project.client.company ? `· ${project.client.company}` : ""} · {project.client.email}</p>
          </div>
          <button onClick={handleSaveProject} disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-all">
            <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className={labelCls}>Status</label>
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)} className={inputCls}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
            </select>
          </div>
          <div>
            <label className={labelCls}>Start Date</label>
            <input type="date" value={editStart} onChange={(e) => setEditStart(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>End Date</label>
            <input type="date" value={editEnd} onChange={(e) => setEditEnd(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Total Value</label>
            <p className="text-sm font-semibold text-foreground py-2">
              {project.totalValue ? `₹${Number(project.totalValue).toLocaleString("en-IN")}` : "—"}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <label className={labelCls}>Description</label>
          <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className={`${inputCls} resize-none`} rows={2} />
        </div>
      </div>

      {/* ─── MILESTONES ─── */}
      <div className="p-6 rounded-xl border border-border bg-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Clock size={18} className="text-primary" /> Milestones ({project.milestones.length})
          </h2>
          <button onClick={() => setShowMsForm(!showMsForm)}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <Plus size={14} /> Add Milestone
          </button>
        </div>

        {showMsForm && (
          <form onSubmit={handleAddMilestone} className="p-4 mb-4 rounded-lg border border-border bg-secondary/30 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Title *</label>
                <input type="text" required value={msForm.title} onChange={(e) => setMsForm({ ...msForm, title: e.target.value })} className={inputCls} placeholder="UI Design Approval" />
              </div>
              <div>
                <label className={labelCls}>Due Date</label>
                <input type="date" value={msForm.dueDate} onChange={(e) => setMsForm({ ...msForm, dueDate: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <input type="text" value={msForm.description} onChange={(e) => setMsForm({ ...msForm, description: e.target.value })} className={inputCls} placeholder="Deliver wireframes & mockups" />
            </div>
            <div>
              <label className={labelCls}>Notes (visible to client)</label>
              <input type="text" value={msForm.notes} onChange={(e) => setMsForm({ ...msForm, notes: e.target.value })} className={inputCls} placeholder="Optional note for the client" />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-1.5 rounded-lg gradient-bg text-white text-xs font-medium">Add</button>
              <button type="button" onClick={() => setShowMsForm(false)} className="px-4 py-1.5 rounded-lg border border-border text-xs text-muted-foreground">Cancel</button>
            </div>
          </form>
        )}

        {project.milestones.length === 0 ? (
          <p className="text-sm text-muted-foreground">No milestones yet. Add milestones so clients can track progress.</p>
        ) : (
          <div className="space-y-2">
            {project.milestones.sort((a, b) => a.order - b.order).map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <span className="text-xs font-bold text-muted-foreground w-6 text-center">{m.order}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{m.title}</p>
                  {m.description && <p className="text-xs text-muted-foreground">{m.description}</p>}
                  <div className="flex gap-3 mt-1 text-[11px] text-muted-foreground">
                    {m.dueDate && <span>Due: {new Date(m.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                    {m.completedAt && <span className="text-green-600">Done: {new Date(m.completedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                    {m.notes && <span>Note: {m.notes}</span>}
                  </div>
                </div>
                <select
                  value={m.status}
                  onChange={(e) => updateMilestoneStatus(m.id, e.target.value)}
                  className={`text-xs px-2 py-1 rounded-lg border border-border bg-background ${
                    m.status === "COMPLETED" ? "text-green-600" : m.status === "IN_PROGRESS" ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {MS_STATUS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── PAYMENTS ─── */}
      <div className="p-6 rounded-xl border border-border bg-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <CreditCard size={18} className="text-primary" /> Payments ({project.payments.length})
          </h2>
          <button onClick={() => setShowPayForm(!showPayForm)}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <Plus size={14} /> Add Payment
          </button>
        </div>

        {showPayForm && (
          <form onSubmit={handleAddPayment} className="p-4 mb-4 rounded-lg border border-border bg-secondary/30 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className={labelCls}>Label *</label>
                <input type="text" required value={payForm.label} onChange={(e) => setPayForm({ ...payForm, label: e.target.value })} className={inputCls} placeholder="Milestone 01 — Kickoff" />
              </div>
              <div>
                <label className={labelCls}>Amount (₹) *</label>
                <input type="number" required value={payForm.amount} onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })} className={inputCls} placeholder="60000" />
              </div>
              <div>
                <label className={labelCls}>Percentage *</label>
                <input type="number" required min={1} max={100} value={payForm.percent} onChange={(e) => setPayForm({ ...payForm, percent: e.target.value })} className={inputCls} placeholder="20" />
              </div>
              <div>
                <label className={labelCls}>Due Date</label>
                <input type="date" value={payForm.dueDate} onChange={(e) => setPayForm({ ...payForm, dueDate: e.target.value })} className={inputCls} />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-1.5 rounded-lg gradient-bg text-white text-xs font-medium">Add</button>
              <button type="button" onClick={() => setShowPayForm(false)} className="px-4 py-1.5 rounded-lg border border-border text-xs text-muted-foreground">Cancel</button>
            </div>
          </form>
        )}

        {project.payments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payment milestones yet. Blueprint: 20% kickoff, 30% staging, 25% AI complete, 25% launch.</p>
        ) : (
          <div className="space-y-2">
            {project.payments.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{p.label}</p>
                    <span className="text-xs text-muted-foreground">({p.percent}%)</span>
                  </div>
                  <div className="flex gap-3 mt-1 text-[11px] text-muted-foreground">
                    <span className="font-semibold text-foreground">₹{Number(p.amount).toLocaleString("en-IN")}</span>
                    {p.dueDate && <span>Due: {new Date(p.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                    {p.paidDate && <span className="text-green-600">Paid: {new Date(p.paidDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>}
                    {p.invoiceUrl && <a href={p.invoiceUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-0.5"><Download size={10} /> Invoice</a>}
                  </div>
                </div>
                <select
                  value={p.status}
                  onChange={(e) => updatePaymentStatus(p.id, e.target.value)}
                  className={`text-xs px-2 py-1 rounded-lg border border-border bg-background ${
                    p.status === "PAID" ? "text-green-600" : p.status === "OVERDUE" ? "text-red-600" : "text-muted-foreground"
                  }`}
                >
                  {PAY_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── DOCUMENTS ─── */}
      <div className="p-6 rounded-xl border border-border bg-card mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-foreground flex items-center gap-2">
            <FileText size={18} className="text-primary" /> Documents ({project.documents.length})
          </h2>
          <button onClick={() => setShowDocForm(!showDocForm)}
            className="text-xs text-primary font-medium hover:underline flex items-center gap-1">
            <Upload size={14} /> Add Document
          </button>
        </div>

        {showDocForm && (
          <form onSubmit={handleAddDoc} className="p-4 mb-4 rounded-lg border border-border bg-secondary/30 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className={labelCls}>Name *</label>
                <input type="text" required value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} className={inputCls} placeholder="Project Proposal.pdf" />
              </div>
              <div>
                <label className={labelCls}>Type</label>
                <select value={docForm.type} onChange={(e) => setDocForm({ ...docForm, type: e.target.value })} className={inputCls}>
                  <option value="pdf">PDF</option>
                  <option value="image">Image</option>
                  <option value="code">Code / Archive</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>URL *</label>
                <input type="url" required value={docForm.url} onChange={(e) => setDocForm({ ...docForm, url: e.target.value })} className={inputCls} placeholder="https://drive.google.com/..." />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-1.5 rounded-lg gradient-bg text-white text-xs font-medium">Add</button>
              <button type="button" onClick={() => setShowDocForm(false)} className="px-4 py-1.5 rounded-lg border border-border text-xs text-muted-foreground">Cancel</button>
            </div>
          </form>
        )}

        {project.documents.length === 0 ? (
          <p className="text-sm text-muted-foreground">No documents yet. Share proposals, contracts, designs or handover docs here.</p>
        ) : (
          <div className="space-y-2">
            {project.documents.map((d) => (
              <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <FileText size={16} className="text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                  <p className="text-[11px] text-muted-foreground">{d.type} · {new Date(d.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                </div>
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-xs flex items-center gap-1">
                  <Download size={12} /> Open
                </a>
                <button onClick={() => deleteDoc(d.id)} className="text-muted-foreground hover:text-destructive transition-colors" title="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
