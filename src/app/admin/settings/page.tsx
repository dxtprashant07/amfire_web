"use client";

import { ExternalLink } from "lucide-react";

const integrations = [
  {
    name: "Zoho CRM",
    description: "Lead pipeline, contacts, deals, automation",
    url: "https://crm.zoho.in",
    envVars: ["ZOHO_CLIENT_ID", "ZOHO_CLIENT_SECRET", "ZOHO_REFRESH_TOKEN"],
  },
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
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-2">Settings</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Integration status and configuration reference.
      </p>

      {/* Integrations */}
      <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Integrations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {integrations.map((int) => (
          <a
            key={int.name}
            href={int.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 rounded-xl border border-border bg-card hover:border-primary/20 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {int.name}
              </p>
              <ExternalLink size={12} className="text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">{int.description}</p>
            {int.envVars.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {int.envVars.map((v) => (
                  <span key={v} className="px-2 py-0.5 rounded text-[10px] font-mono bg-secondary text-muted-foreground">
                    {v}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>

      {/* Env vars reference */}
      <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Environment Variables Reference</h2>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-4 py-3 text-xs font-semibold text-foreground">Variable</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-foreground">Description</th>
            </tr>
          </thead>
          <tbody>
            {envVarDocs.map((v, i) => (
              <tr key={v.key} className={i < envVarDocs.length - 1 ? "border-b border-border" : ""}>
                <td className="px-4 py-3 font-mono text-xs text-primary">{v.key}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{v.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
