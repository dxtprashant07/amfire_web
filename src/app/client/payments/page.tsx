"use client";

import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Payment {
  id: string;
  label: string;
  amount: string;
  percent: number;
  status: string;
  dueDate: string | null;
  paidDate: string | null;
  invoiceUrl: string | null;
  project: { name: string };
}

const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const day = (d: string | null) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function ClientPaymentsPage() {
  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: ["client-payments"],
    queryFn: async () => {
      const res = await authFetch("/api/client/payments");
      if (!res.ok) throw new Error("Failed to load payments");
      const d = await res.json();
      return (d.payments || []) as Payment[];
    },
  });

  if (isLoading) {
    return (
      <div className="page on">
        <Skeleton className="h-10 w-56 mb-6" />
        <Skeleton className="h-28 mb-5 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page on">
        <div className="welcome"><h1>Payments</h1><p>We couldn&apos;t load your invoices. Please refresh, or email contact@amfire.in.</p></div>
      </div>
    );
  }

  const unpaid = payments.filter((p) => p.status !== "PAID");
  const outstanding = unpaid.reduce((sum, p) => sum + Number(p.amount ?? 0), 0);
  const nextDue = unpaid.filter((p) => p.dueDate).sort((a, b) => (a.dueDate! < b.dueDate! ? -1 : 1))[0];

  return (
    <div className="page on">
      <div className="welcome">
        <h1>Payments</h1>
        <p>Milestone-based invoicing. Pay only after each stage is signed off.</p>
      </div>

      <div className="pay-hero">
        <div>
          <div className="lbl">Outstanding balance</div>
          <div className="val">{money(outstanding)}</div>
          <div className="sub">
            {unpaid.length
              ? `${unpaid.length} invoice${unpaid.length > 1 ? "s" : ""} due${nextDue ? ` · next ${day(nextDue.dueDate)}` : ""}`
              : "Everything is settled — thank you."}
          </div>
        </div>
        <div>
          <a
            href="mailto:contact@amfire.in?subject=Payment%20query"
            style={{
              display: "inline-block",
              padding: "12px 22px",
              borderRadius: "var(--radius-sm)",
              background: "var(--gradient-fire)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "14px",
              border: "none",
              boxShadow: "var(--shadow-glow)",
            }}
          >
            Contact accounts →
          </a>
        </div>
      </div>

      <div className="pay-grid">
        {payments.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>No invoices yet.</p>
        ) : (
          payments.map((p) => {
            const due = p.status !== "PAID";
            return (
              <div className={`pcard${due ? " due" : ""}`} key={p.id}>
                <div className="r">
                  <div>
                    <h4>{p.label}</h4>
                    <div className="meta">{p.project?.name} · {p.percent}% of project</div>
                  </div>
                  <span className={`chip ${p.status === "PAID" ? "chip-paid" : "chip-due"}`}>{p.status}</span>
                </div>
                <div className="amt">{money(Number(p.amount ?? 0))}</div>
                <div className="f">
                  <span>{p.status === "PAID" ? `Paid ${day(p.paidDate)}` : `Due ${day(p.dueDate)}`}</span>
                  {p.invoiceUrl ? (
                    <a href={p.invoiceUrl} target="_blank" rel="noreferrer" style={{ color: "var(--color-orange)", fontWeight: 600, fontSize: "12.5px" }}>
                      Download →
                    </a>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
