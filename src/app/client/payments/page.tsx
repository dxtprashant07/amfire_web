"use client";

import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import { CheckCircle2, Clock, AlertTriangle, Download, AlertCircle } from "lucide-react";

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

export default function ClientPaymentsPage() {
  const { data: payments = [], isLoading: loading, error } = useQuery({
    queryKey: ["client-payments"],
    queryFn: async () => {
      const res = await authFetch("/api/client/payments");
      if (!res.ok) throw new Error("Failed to load payments");
      const d = await res.json();
      return (d.payments || []) as Payment[];
    },
  });

  const statusConfig: Record<string, { icon: typeof CheckCircle2; color: string; bg: string }> = {
    PAID: { icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100 dark:bg-green-500/20" },
    PENDING: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100 dark:bg-yellow-500/20" },
    OVERDUE: { icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100 dark:bg-red-500/20" },
  };

  const formatCurrency = (amount: string) =>
    `₹${Number(amount).toLocaleString("en-IN")}`;

  const totalPaid = payments.filter((p) => p.status === "PAID").reduce((sum, p) => sum + Number(p.amount), 0);
  const totalDue = payments.filter((p) => p.status !== "PAID").reduce((sum, p) => sum + Number(p.amount), 0);

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl p-6 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
        <AlertCircle size={32} className="mx-auto mb-3 text-destructive" />
        <p className="text-sm text-destructive font-medium">Failed to load payments.</p>
        <p className="text-xs text-muted-foreground mt-1">Please try refreshing the page.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Payments</h1>

      {payments.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-border text-center">
          <p className="text-muted-foreground">No payment records yet.</p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
              <p className="text-xl font-bold text-green-600">{formatCurrency(String(totalPaid))}</p>
            </div>
            <div className="p-5 rounded-xl border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-1">Remaining</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(String(totalDue))}</p>
            </div>
          </div>

          {/* Payment milestones */}
          <div className="space-y-3">
            {payments.map((p) => {
              const config = statusConfig[p.status] || statusConfig.PENDING;
              const Icon = config.icon;

              return (
                <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${config.bg}`}>
                    <Icon size={18} className={config.color} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{p.label}</p>
                      <span className="text-xs text-muted-foreground">({p.percent}%)</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {p.status === "PAID" && p.paidDate
                        ? `Paid on ${new Date(p.paidDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
                        : p.dueDate
                        ? `Due: ${new Date(p.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`
                        : p.status}
                    </p>
                  </div>

                  <p className="text-sm font-bold text-foreground">{formatCurrency(p.amount)}</p>

                  {p.invoiceUrl && (
                    <a
                      href={p.invoiceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                      title="Download Invoice"
                    >
                      <Download size={16} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
