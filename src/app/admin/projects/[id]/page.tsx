"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

const money = (v: string | number | null) => (v ? "₹" + Number(v).toLocaleString("en-IN") : "—");
const day = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

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
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const { data: project = null, isLoading: loading, refetch } = useQuery({
    queryKey: ["admin-project", id],
    queryFn: async () => {
      const res = await authFetch(`/api/admin/projects/${id}`);
      if (!res.ok) throw new Error("Failed to load project");
      return ((await res.json()).project ?? null) as Project | null;
    },
  });

  // Edits overlay the fetched project, so nothing has to be copied into state
  // when the query resolves.
  const [edits, setEdits] = useState<Partial<Record<"status" | "description" | "startDate" | "endDate", string>>>({});
  const editStatus = edits.status ?? project?.status ?? "";
  const editDesc = edits.description ?? project?.description ?? "";
  const editStart = edits.startDate ?? project?.startDate?.slice(0, 10) ?? "";
  const editEnd = edits.endDate ?? project?.endDate?.slice(0, 10) ?? "";
  const setEditStatus = (v: string) => setEdits((e) => ({ ...e, status: v }));
  const setEditDesc = (v: string) => setEdits((e) => ({ ...e, description: v }));
  const setEditStart = (v: string) => setEdits((e) => ({ ...e, startDate: v }));
  const setEditEnd = (v: string) => setEdits((e) => ({ ...e, endDate: v }));

  // New milestone form
  const [showMsForm, setShowMsForm] = useState(false);
  const [msForm, setMsForm] = useState({ title: "", description: "", dueDate: "", notes: "" });

  // New payment form
  const [showPayForm, setShowPayForm] = useState(false);
  const [payForm, setPayForm] = useState({ label: "", amount: "", percent: "", dueDate: "" });

  // New document form
  const [showDocForm, setShowDocForm] = useState(false);
  const [docForm, setDocForm] = useState({ name: "", type: "pdf", url: "" });

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
    if (res.ok) { flash("success", "Project updated"); setEdits({}); refetch(); }
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
      refetch();
    } else flash("error", "Failed to add milestone");
  }

  // Update milestone status
  async function updateMilestoneStatus(milestoneId: string, status: string) {
    await authFetch(`/api/admin/projects/${id}/milestones`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ milestoneId, status }),
    });
    refetch();
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
      refetch();
    } else flash("error", "Failed to add payment");
  }

  // Update payment status
  async function updatePaymentStatus(paymentId: string, status: string) {
    await authFetch(`/api/admin/projects/${id}/payments`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, status }),
    });
    refetch();
  }

  // Delete payment
  async function deletePayment(paymentId: string, label: string) {
    if (!confirm(`Delete payment "${label}"? This cannot be undone.`)) return;
    const res = await authFetch(`/api/admin/projects/${id}/payments`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId }),
    });
    if (res.ok) {
      flash("success", "Payment deleted");
      refetch();
    } else {
      flash("error", "Failed to delete payment");
    }
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
      refetch();
    } else flash("error", "Failed to add document");
  }

  // Delete document
  async function deleteDoc(documentId: string) {
    await authFetch(`/api/admin/projects/${id}/documents`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ documentId }),
    });
    refetch();
  }
  if (loading) {
    return (
      <div className="page on space-y-4">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-28 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="page on">
        <h1 className="h1">Project not found</h1>
        <p className="sub">It may have been deleted.</p>
        <Link className="btn-pri" href="/admin/projects" style={{ display: "inline-block", textDecoration: "none" }}>
          ← Back to projects
        </Link>
      </div>
    );
  }

  const done = project.milestones.filter((m) => m.status === "COMPLETED").length;
  const progress = project.milestones.length ? Math.round((done / project.milestones.length) * 100) : 0;
  const paid = project.payments.filter((p) => p.status === "PAID").reduce((s, p) => s + Number(p.amount ?? 0), 0);
  const outstanding = project.payments.filter((p) => p.status !== "PAID").reduce((s, p) => s + Number(p.amount ?? 0), 0);

  return (
    <div className="page on">
      <button className="crumb-back" type="button" onClick={() => router.push("/admin/projects")}>
        ← All projects
      </button>

      <h1 className="h1">{project.name}</h1>
      <p className="sub">
        {project.client.name}
        {project.client.company ? ` · ${project.client.company}` : ""} · {project.client.email}
      </p>

      {msg.text ? (
        <p style={{ fontSize: "13px", fontWeight: 600, marginBottom: "14px", color: msg.type === "error" ? "var(--color-error)" : "var(--color-success)" }}>
          {msg.text}
        </p>
      ) : null}

      <div className="grid-4">
        <div className="kpi">
          <div className="lbl">Progress</div>
          <div className="val">{progress}%</div>
          <div className="dta up">{done} of {project.milestones.length} milestones</div>
        </div>
        <div className="kpi">
          <div className="lbl">Project value</div>
          <div className="val">{money(project.totalValue)}</div>
        </div>
        <div className="kpi">
          <div className="lbl">Collected</div>
          <div className="val">{money(paid)}</div>
        </div>
        <div className="kpi">
          <div className="lbl">Outstanding</div>
          <div className="val">{money(outstanding)}</div>
          <div className={outstanding ? "dta dn" : "dta up"}>
            {outstanding ? `${project.payments.filter((p) => p.status !== "PAID").length} unpaid` : "Fully settled"}
          </div>
        </div>
      </div>

      {/* Project details */}
      <div className="panel">
        <div className="panel-h">
          <h2>Project details</h2>
          <button className="btn-pri" type="button" onClick={handleSaveProject} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
        <div className="form-grid">
          <label className="fl">
            Status
            <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
              {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
            </select>
          </label>
          <label className="fl">
            Start date
            <input type="date" value={editStart} onChange={(e) => setEditStart(e.target.value)} />
          </label>
          <label className="fl">
            Target end date
            <input type="date" value={editEnd} onChange={(e) => setEditEnd(e.target.value)} />
          </label>
        </div>
        <label className="fl">
          Description
          <textarea rows={3} value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
        </label>
      </div>

      {/* Milestones */}
      <div className="panel">
        <div className="panel-h">
          <h2>Milestones <span className="ct">{project.milestones.length}</span></h2>
          <button className="btn-ghost" type="button" onClick={() => setShowMsForm(!showMsForm)}>
            {showMsForm ? "Cancel" : "+ Add milestone"}
          </button>
        </div>

        {showMsForm ? (
          <form className="ticket-form" onSubmit={handleAddMilestone}>
            <input placeholder="Milestone title" value={msForm.title} onChange={(e) => setMsForm({ ...msForm, title: e.target.value })} required />
            <textarea rows={2} placeholder="What ships in this milestone?" value={msForm.description} onChange={(e) => setMsForm({ ...msForm, description: e.target.value })} />
            <input type="date" value={msForm.dueDate} onChange={(e) => setMsForm({ ...msForm, dueDate: e.target.value })} />
            <input placeholder="Internal notes (optional)" value={msForm.notes} onChange={(e) => setMsForm({ ...msForm, notes: e.target.value })} />
            <button className="btn-pri" type="submit" style={{ alignSelf: "flex-start" }}>Add milestone</button>
          </form>
        ) : null}

        {project.milestones.length === 0 ? (
          <p className="empty">No milestones yet.</p>
        ) : (
          <table className="tbl">
            <thead>
              <tr><th>Milestone</th><th>Due</th><th>Completed</th><th>Status</th></tr>
            </thead>
            <tbody>
              {project.milestones.slice().sort((a, b) => a.order - b.order).map((m) => (
                <tr key={m.id}>
                  <td>
                    <b style={{ fontWeight: 700 }}>{m.title}</b>
                    {m.description ? <div style={{ fontSize: "11.5px", color: "var(--fg-muted)" }}>{m.description}</div> : null}
                  </td>
                  <td>{day(m.dueDate)}</td>
                  <td>{day(m.completedAt)}</td>
                  <td>
                    <select className="cell-select" value={m.status} onChange={(e) => updateMilestoneStatus(m.id, e.target.value)}>
                      {MS_STATUS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Payments */}
      <div className="panel">
        <div className="panel-h">
          <h2>Payments <span className="ct">{project.payments.length}</span></h2>
          <button className="btn-ghost" type="button" onClick={() => setShowPayForm(!showPayForm)}>
            {showPayForm ? "Cancel" : "+ Add invoice"}
          </button>
        </div>

        {showPayForm ? (
          <form className="ticket-form" onSubmit={handleAddPayment}>
            <input placeholder="Label — e.g. Milestone 2 · Design" value={payForm.label} onChange={(e) => setPayForm({ ...payForm, label: e.target.value })} required />
            <input type="number" placeholder="Amount (₹)" value={payForm.amount} onChange={(e) => setPayForm({ ...payForm, amount: e.target.value })} required />
            <input type="number" placeholder="Percent of project" value={payForm.percent} onChange={(e) => setPayForm({ ...payForm, percent: e.target.value })} required />
            <input type="date" value={payForm.dueDate} onChange={(e) => setPayForm({ ...payForm, dueDate: e.target.value })} />
            <button className="btn-pri" type="submit" style={{ alignSelf: "flex-start" }}>Add invoice</button>
          </form>
        ) : null}

        {project.payments.length === 0 ? (
          <p className="empty">No invoices yet.</p>
        ) : (
          <table className="tbl">
            <thead>
              <tr><th>Invoice</th><th>Amount</th><th>Due</th><th>Paid</th><th>Status</th><th></th></tr>
            </thead>
            <tbody>
              {project.payments.map((p) => (
                <tr key={p.id}>
                  <td>
                    <b style={{ fontWeight: 700 }}>{p.label}</b>
                    <div style={{ fontSize: "11.5px", color: "var(--fg-muted)" }}>{p.percent}% of project</div>
                  </td>
                  <td>{money(p.amount)}</td>
                  <td>{day(p.dueDate)}</td>
                  <td>{day(p.paidDate)}</td>
                  <td>
                    <select className="cell-select" value={p.status} onChange={(e) => updatePaymentStatus(p.id, e.target.value)}>
                      {PAY_STATUS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn-danger" type="button" onClick={() => deletePayment(p.id, p.label)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Documents */}
      <div className="panel">
        <div className="panel-h">
          <h2>Documents <span className="ct">{project.documents.length}</span></h2>
          <button className="btn-ghost" type="button" onClick={() => setShowDocForm(!showDocForm)}>
            {showDocForm ? "Cancel" : "+ Share a file"}
          </button>
        </div>

        {showDocForm ? (
          <form className="ticket-form" onSubmit={handleAddDoc}>
            <input placeholder="File name shown to the client" value={docForm.name} onChange={(e) => setDocForm({ ...docForm, name: e.target.value })} required />
            <select value={docForm.type} onChange={(e) => setDocForm({ ...docForm, type: e.target.value })}>
              <option value="pdf">PDF / document</option>
              <option value="image">Image</option>
              <option value="code">Code / archive</option>
            </select>
            <input placeholder="https://… link the client can open" value={docForm.url} onChange={(e) => setDocForm({ ...docForm, url: e.target.value })} required />
            <button className="btn-pri" type="submit" style={{ alignSelf: "flex-start" }}>Share file</button>
          </form>
        ) : null}

        {project.documents.length === 0 ? (
          <p className="empty">Nothing shared with this client yet.</p>
        ) : (
          <table className="tbl">
            <thead>
              <tr><th>File</th><th>Type</th><th>Shared</th><th></th></tr>
            </thead>
            <tbody>
              {project.documents.map((d) => (
                <tr key={d.id}>
                  <td>
                    <a href={d.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: "var(--color-orange)" }}>{d.name}</a>
                  </td>
                  <td>{d.type}</td>
                  <td>{day(d.createdAt)}</td>
                  <td style={{ textAlign: "right" }}>
                    <button className="btn-danger" type="button" onClick={() => deleteDoc(d.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
