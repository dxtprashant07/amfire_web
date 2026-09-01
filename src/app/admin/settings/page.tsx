"use client";

import { ExternalLink } from "lucide-react";

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
    <div className="page on">
      <h1 className="h1">Settings</h1>
      <p className="sub">Integration status and configuration reference.</p>

      <div className="panel" style={{ marginBottom: "24px" }}>
        <div className="panel-h"><h2>Integrations</h2></div>
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
      </div>

      <div className="panel">
        <div className="panel-h"><h2>Environment variables</h2></div>
        <table className="tbl">
          <thead>
            <tr><th>Variable</th><th>Description</th></tr>
          </thead>
          <tbody>
            {envVarDocs.map((v) => (
              <tr key={v.key}>
                <td style={{ fontFamily: "monospace", fontSize: "12px", color: "var(--color-orange)" }}>{v.key}</td>
                <td style={{ fontSize: "12.5px", color: "var(--fg-muted)" }}>{v.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
