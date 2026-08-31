import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Shared visual primitives matching AMFIRE Design System's admin kit
 * (ui_kits/admin/index.html: .panel, .kpi, .chip-*, .tbl .cli .av). */

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[var(--radius-lg)] border border-[var(--border-default)] bg-[var(--surface-card)] p-6 shadow-[var(--shadow-sm)]", className)}>
      {children}
    </div>
  );
}

export function PanelHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-base font-bold tracking-[-0.012em] text-[var(--fg-default)]">{title}</h2>
      {action}
    </div>
  );
}

const chipStyles: Record<string, string> = {
  success: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
  warning: "bg-[var(--accent-tint)] text-[var(--color-orange)]",
  info: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
  error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
  neutral: "bg-[var(--surface-sunken)] text-[var(--fg-muted)]",
};

export function Chip({ tone = "neutral", children }: { tone?: keyof typeof chipStyles; children: ReactNode }) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-bold tracking-[0.02em]", chipStyles[tone])}>
      {children}
    </span>
  );
}

export function Avatar({ name, size = 32 }: { name?: string; size?: number }) {
  const initials = name
    ? name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase()
    : "?";
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full gradient-bg font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials}
    </span>
  );
}

/** Inline sparkline matching the reference's <svg class="spark"> — takes a
 * short series of numbers (any scale) and draws a normalized polyline. */
export function Sparkline({ points, tone = "success" }: { points: number[]; tone?: "success" | "error" }) {
  if (points.length < 2) return null;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const step = 100 / (points.length - 1);
  const d = points.map((v, i) => `${i === 0 ? "M" : "L"}${i * step} ${28 - ((v - min) / range) * 24 - 2}`).join(" ");
  return (
    <svg className="my-2.5 block" viewBox="0 0 100 28" width="100%" height="28" preserveAspectRatio="none">
      <path d={d} fill="none" stroke={tone === "success" ? "var(--color-success)" : "var(--color-error)"} strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

export function KpiCard({
  label,
  value,
  icon,
  tone = "warning",
  trend,
  sparkline,
}: {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  tone?: keyof typeof chipStyles;
  trend?: { direction: "up" | "down"; text: string };
  sparkline?: number[];
}) {
  const iconBg: Record<string, string> = {
    success: "bg-[var(--color-success-bg)] text-[var(--color-success)]",
    warning: "bg-[var(--accent-tint)] text-[var(--color-orange)]",
    info: "bg-[var(--color-info-bg)] text-[var(--color-info)]",
    error: "bg-[var(--color-error-bg)] text-[var(--color-error)]",
    neutral: "bg-[var(--surface-sunken)] text-[var(--fg-muted)]",
  };
  return (
    <Panel className="p-5 transition-transform hover:-translate-y-[3px] hover:shadow-[var(--shadow-md)]">
      <div className="mb-3.5 flex items-start justify-between">
        <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--fg-muted)]">{label}</span>
        <span className={cn("grid h-[30px] w-[30px] shrink-0 place-items-center rounded-[9px]", iconBg[tone])}>{icon}</span>
      </div>
      <span className="block text-[28px] font-extrabold leading-none tracking-[-0.02em] text-[var(--fg-default)]">{value}</span>
      {sparkline ? <Sparkline points={sparkline} tone={trend?.direction === "down" ? "error" : "success"} /> : null}
      {trend ? (
        <div className={cn("mt-1 flex items-center gap-1 text-[12.5px] font-semibold", trend.direction === "up" ? "text-[var(--color-success)]" : "text-[var(--color-error)]")}>
          {trend.direction === "up" ? "↑" : "↓"} {trend.text}
        </div>
      ) : null}
    </Panel>
  );
}

/** Matches the reference's `.pr .bar i` mini progress bar used inside table rows. */
export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-[var(--gray-100)]">
        <span className="block h-full gradient-bg" style={{ width: `${percent}%` }} />
      </div>
      {percent}%
    </div>
  );
}

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse font-sans">{children}</table>
    </div>
  );
}

export function Th({ children, align }: { children: ReactNode; align?: "right" }) {
  return (
    <th
      className={cn(
        "border-b border-[var(--border-default)] px-3.5 py-3 text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--fg-muted)]",
        align === "right" ? "text-right" : "text-left"
      )}
    >
      {children}
    </th>
  );
}

export function Td({ children, align }: { children: ReactNode; align?: "right" }) {
  return (
    <td className={cn("border-b border-[var(--border-subtle)] px-3.5 py-3.5 text-[13.5px] text-[var(--fg-default)]", align === "right" ? "text-right" : "text-left")}>
      {children}
    </td>
  );
}

export function EmptyState({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex flex-col items-center gap-3 px-5 py-16 text-center text-[13.5px] text-[var(--fg-muted)]">
      {icon}
      {text}
    </div>
  );
}
