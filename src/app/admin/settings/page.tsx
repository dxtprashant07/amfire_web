"use client";

import { ExternalLink } from "lucide-react";
import { Panel, PanelHeader } from "@/components/admin/ui";

const integrations = [
  {
    name: "Supabase",
    description: "PostgreSQL database, file storage, auth",
    url: "https://supabase.com/dashboard",
    envVars: ["DATABASE_URL"],
  },
  {
    name: "Resend",
    description: "Transactional emails (confirmations, notifications)",
    url: "https://resend.com",
    envVars: ["RESEND_API_KEY"],
  },
  {
    name: "Vercel",
    description: "Hosting, deployments, environment variables",
    url: "https://vercel.com/dashboard",
    envVars: [],
  },
];

const envVarDocs = [
  { key: "DATABASE_URL", desc: "Supabase PostgreSQL connection string" },
  { key: "JWT_ACCESS_SECRET", desc: "Secret for signing JWT access tokens" },
  { key: "JWT_REFRESH_SECRET", desc: "Secret for signing JWT refresh tokens" },
  { key: "ZOHO_CLIENT_ID", desc: "Zoho API OAuth Client ID" },
  { key: "ZOHO_CLIENT_SECRET", desc: "Zoho API OAuth Client Secret" },
  { key: "ZOHO_REFRESH_TOKEN", desc: "Zoho API OAuth Refresh Token" },
  { key: "NEXT_PUBLIC_WHATSAPP_NUMBER", desc: "WhatsApp number (country code + number)" },
  { key: "ADMIN_EMAIL", desc: "(Legacy) Admin email — use DB auth instead" },
  { key: "ADMIN_PASSWORD", desc: "(Legacy) Admin password — use DB auth instead" },
  { key: "RESEND_API_KEY", desc: "Resend API key for transactional emails" },
];

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-[26px] font-extrabold tracking-[-0.02em] text-[var(--fg-default)]">Settings</h1>
      <p className="mb-7 mt-1.5 text-[14.5px] text-[var(--fg-muted)]">
        Integration status and configuration reference.
      </p>

      <Panel className="mb-6">
        <PanelHeader title="Integrations" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {integrations.map((int) => (
            <a
              key={int.name}
              href={int.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[var(--radius-md)] border border-[var(--border-default)] p-4 transition-colors hover:border-[var(--color-orange)]"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <p className="text-[13.5px] font-bold text-[var(--fg-default)] group-hover:text-[var(--color-orange)]">
                  {int.name}
                </p>
                <ExternalLink size={12} className="text-[var(--fg-muted)]" />
              </div>
              <p className="mb-3 text-xs text-[var(--fg-muted)]">{int.description}</p>
              {int.envVars.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {int.envVars.map((v) => (
                    <span key={v} className="rounded bg-[var(--surface-sunken)] px-2 py-0.5 font-mono text-[10px] text-[var(--fg-muted)]">
                      {v}
                    </span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      </Panel>

      <Panel className="p-0">
        <div className="p-6 pb-0">
          <PanelHeader title="Environment variables reference" />
        </div>
        <table className="w-full border-collapse font-sans">
          <thead>
            <tr>
              <th className="border-b border-[var(--border-default)] px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--fg-muted)]">Variable</th>
              <th className="border-b border-[var(--border-default)] px-6 py-3 text-left text-[11px] font-bold uppercase tracking-[0.06em] text-[var(--fg-muted)]">Description</th>
            </tr>
          </thead>
          <tbody>
            {envVarDocs.map((v) => (
              <tr key={v.key}>
                <td className="border-b border-[var(--border-subtle)] px-6 py-3 font-mono text-xs text-[var(--color-orange)] last:border-b-0">{v.key}</td>
                <td className="border-b border-[var(--border-subtle)] px-6 py-3 text-xs text-[var(--fg-muted)] last:border-b-0">{v.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
