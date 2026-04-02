"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore, authFetch } from "@/lib/stores/auth-store";
import {
  Users, FileEdit, Settings, ExternalLink, BarChart3,
  FolderKanban, CreditCard, ArrowRight, Inbox, Headphones, TrendingUp,
} from "lucide-react";

interface Stats {
  totalLeads: number;
  leadsThisMonth: number;
  newLeads: number;
  activeProjects: number;
  totalClients: number;
  openTickets: number;
  recentLeads: { id: string; name: string; email: string; service: string | null; status: string; createdAt: string }[];
}

const quickLinks = [
  { href: "/admin/leads", label: "Leads", description: "View and manage website leads", icon: Inbox },
  { href: "/admin/projects", label: "Projects", description: "Manage client projects", icon: FolderKanban },
  { href: "/admin/users", label: "Users", description: "Manage admin and client users", icon: Users },
  { href: "/admin/support", label: "Support", description: "View support tickets", icon: Headphones },
  { href: "/admin/content", label: "Content", description: "Edit site content", icon: FileEdit },
  { href: "/admin/settings", label: "Settings", description: "Configure integrations", icon: Settings },
];

const zohoLinks = [
  { href: "https://crm.zoho.in", label: "Zoho CRM", description: "Leads, contacts, deals", icon: Users },
  { href: "https://projects.zoho.in", label: "Zoho Projects", description: "Tasks and project management", icon: FolderKanban },
  { href: "https://books.zoho.in", label: "Zoho Books", description: "Invoices and accounting", icon: CreditCard },
  { href: "https://analytics.zoho.in", label: "Zoho Analytics", description: "Reports and dashboards", icon: BarChart3 },
];

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    authFetch("/api/admin/stats").then(async (res) => {
      if (res.ok) setStats(await res.json());
    }).catch(() => {});
  }, []);

  const statCards = stats ? [
    { label: "Leads This Month", value: stats.leadsThisMonth, icon: TrendingUp },
    { label: "New / Uncontacted", value: stats.newLeads, icon: Inbox },
    { label: "Active Projects", value: stats.activeProjects, icon: FolderKanban },
    { label: "Clients", value: stats.totalClients, icon: Users },
    { label: "Open Tickets", value: stats.openTickets, icon: Headphones },
    { label: "Total Leads", value: stats.totalLeads, icon: BarChart3 },
  ] : [];

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold text-foreground mb-1">Admin Dashboard</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Welcome back, {user?.name?.split(" ")[0] || user?.name}.
      </p>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {statCards.map((s) => (
            <div key={s.label} className="p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-2">
                <s.icon size={14} className="text-primary" />
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Leads */}
      {stats?.recentLeads && stats.recentLeads.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">Recent Leads</h2>
            <Link href="/admin/leads" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="border border-border rounded-xl overflow-hidden bg-card">
            {stats.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-foreground">{lead.name}</p>
                  <p className="text-xs text-muted-foreground">{lead.email}{lead.service ? ` · ${lead.service}` : ""}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  lead.status === "NEW" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                  lead.status === "WON" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                  "bg-secondary text-muted-foreground"
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick actions */}
      <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group p-5 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mb-3">
              <link.icon size={18} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
              {link.label}
            </p>
            <p className="text-xs text-muted-foreground">{link.description}</p>
          </Link>
        ))}
      </div>

      {/* Zoho links */}
      <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Zoho CRM Suite</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {zohoLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <link.icon size={18} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                {link.label} <ExternalLink size={12} />
              </p>
              <p className="text-xs text-muted-foreground">{link.description}</p>
            </div>
            <ArrowRight size={14} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
