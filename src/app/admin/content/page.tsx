"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import { Save, Plus, Trash2 } from "lucide-react";

interface ContentEntry {
  id: string;
  key: string;
  value: string;
}

const defaultKeys = [
  { key: "hero_headline", label: "Hero Headline", placeholder: "Build products your users love." },
  { key: "hero_subheadline", label: "Hero Subheadline", placeholder: "We design, build, and ship..." },
  { key: "hero_cta_text", label: "Hero CTA Text", placeholder: "Start a Project" },
  { key: "stat_projects", label: "Stat: Projects", placeholder: "50+" },
  { key: "stat_clients", label: "Stat: Clients", placeholder: "30+" },
  { key: "stat_satisfaction", label: "Stat: Satisfaction", placeholder: "98%" },
  { key: "stat_team", label: "Stat: Team Members", placeholder: "15+" },
  { key: "availability_status", label: "Availability Status", placeholder: "Available for new projects" },
  { key: "availability_active", label: "Show Availability Badge", placeholder: "true" },
];

export default function AdminContentPage() {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    authFetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => {
        setEntries(d.content || []);
        const map: Record<string, string> = {};
        (d.content || []).forEach((c: ContentEntry) => { map[c.key] = c.value; });
        setDrafts(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(key: string) {
    setSaving(key);
    setSuccess(null);
    try {
      await authFetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value: drafts[key] || "" }),
      });
      setSuccess(key);
      setTimeout(() => setSuccess(null), 2000);
    } catch {}
    setSaving(null);
  }

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-20 rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-2">Content Manager</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Edit homepage content and site-wide settings. Changes take effect on next page load.
      </p>

      <div className="space-y-4">
        {defaultKeys.map((dk) => (
          <div key={dk.key} className="p-4 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">{dk.label}</label>
              <span className="text-[10px] text-muted-foreground font-mono">{dk.key}</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={drafts[dk.key] ?? ""}
                onChange={(e) => setDrafts((p) => ({ ...p, [dk.key]: e.target.value }))}
                placeholder={dk.placeholder}
                className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary"
              />
              <button
                onClick={() => handleSave(dk.key)}
                disabled={saving === dk.key}
                className="px-3 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60 shrink-0"
              >
                {saving === dk.key ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" />
                ) : success === dk.key ? (
                  "Saved"
                ) : (
                  <Save size={16} />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
