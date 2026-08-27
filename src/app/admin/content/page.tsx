"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import { Save, Plus, Trash2, ChevronDown } from "lucide-react";
import { contentRegistry, type ContentKey } from "@/content/registry";
import { listFieldSpecs, heroFieldSpecs, type FieldSpec } from "@/content/field-specs";
import { iconNames } from "@/content/icon-map";
import { heroDefault } from "@/content/defaults";

type Row = Record<string, unknown>;

function FieldInput({ spec, value, onChange }: { spec: FieldSpec; value: unknown; onChange: (v: unknown) => void }) {
  const base = "w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground outline-none focus:border-primary";

  if (spec.type === "boolean") {
    return (
      <label className="flex items-center gap-2 text-sm text-foreground">
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        {spec.label}
      </label>
    );
  }
  if (spec.type === "icon") {
    return (
      <select className={base} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)}>
        {iconNames.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </select>
    );
  }
  if (spec.type === "textarea") {
    return <textarea className={`${base} min-h-[72px] resize-y`} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
  }
  if (spec.type === "stringList") {
    const text = Array.isArray(value) ? value.join("\n") : "";
    return (
      <textarea
        className={`${base} min-h-[100px] resize-y`}
        value={text}
        onChange={(e) => onChange(e.target.value.split("\n").map((l) => l.trim()).filter(Boolean))}
      />
    );
  }
  if (spec.type === "number") {
    return <input type="number" min={1} max={5} className={base} value={Number(value ?? 0)} onChange={(e) => onChange(Number(e.target.value))} />;
  }
  if (spec.type === "color") {
    return <input type="text" placeholder="#F97316 or var(--color-orange)" className={base} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
  }
  return <input type="text" className={base} value={String(value ?? "")} onChange={(e) => onChange(e.target.value)} />;
}

function ListEditor({ fields, rows, onChange }: { fields: FieldSpec[]; rows: Row[]; onChange: (rows: Row[]) => void }) {
  function updateRow(i: number, key: string, v: unknown) {
    const next = rows.slice();
    next[i] = { ...next[i], [key]: v };
    onChange(next);
  }
  function removeRow(i: number) {
    onChange(rows.filter((_, idx) => idx !== i));
  }
  function addRow() {
    const blank: Row = {};
    for (const f of fields) blank[f.key] = f.type === "stringList" ? [] : f.type === "boolean" ? false : f.type === "number" ? 5 : "";
    onChange([...rows, blank]);
  }

  return (
    <div className="space-y-4">
      {rows.map((row, i) => (
        <div key={i} className="p-4 rounded-xl border border-border bg-background space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Row {i + 1}</span>
            <button onClick={() => removeRow(i)} className="text-muted-foreground hover:text-destructive" aria-label="Remove row">
              <Trash2 size={15} />
            </button>
          </div>
          {fields.map((f) => (
            <div key={f.key}>
              {f.type !== "boolean" ? <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label> : null}
              <FieldInput spec={f} value={row[f.key]} onChange={(v) => updateRow(i, f.key, v)} />
            </div>
          ))}
        </div>
      ))}
      <button onClick={addRow} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
        <Plus size={15} /> Add row
      </button>
    </div>
  );
}

function SectionEditor({ contentKey, initialValue }: { contentKey: ContentKey; initialValue: unknown }) {
  const entry = contentRegistry[contentKey];
  const [value, setValue] = useState<unknown>(initialValue);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSave() {
    setSaving(true);
    setStatus("idle");
    try {
      const res = await authFetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: contentKey, value: JSON.stringify(value) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Save failed.");
        setStatus("error");
      } else {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2000);
      }
    } catch {
      setErrorMsg("Network error.");
      setStatus("error");
    }
    setSaving(false);
  }

  const isHero = contentKey === "home.hero";
  const rows = !isHero ? ((value as Row[]) ?? []) : [];
  const fields = listFieldSpecs[contentKey];

  return (
    <div className="p-5 rounded-2xl border border-border bg-card">
      <div className="mb-4">
        <h3 className="text-base font-bold text-foreground">{entry.label}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{entry.description}</p>
      </div>

      {isHero ? (
        <div className="space-y-3">
          {heroFieldSpecs.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-muted-foreground mb-1">{f.label}</label>
              <FieldInput
                spec={f}
                value={(value as typeof heroDefault)[f.key as keyof typeof heroDefault]}
                onChange={(v) => setValue({ ...(value as object), [f.key]: v })}
              />
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">Proof stats</label>
            <div className="grid grid-cols-2 gap-3">
              {(value as typeof heroDefault).proof.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className="w-20 px-2 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground"
                    value={p.value}
                    onChange={(e) => {
                      const proof = (value as typeof heroDefault).proof.slice();
                      proof[i] = { ...proof[i], value: e.target.value };
                      setValue({ ...(value as object), proof });
                    }}
                  />
                  <input
                    className="flex-1 px-2 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground"
                    value={p.label}
                    onChange={(e) => {
                      const proof = (value as typeof heroDefault).proof.slice();
                      proof[i] = { ...proof[i], label: e.target.value };
                      setValue({ ...(value as object), proof });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : fields ? (
        <ListEditor fields={fields} rows={rows} onChange={setValue} />
      ) : null}

      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-60"
        >
          {saving ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={15} />}
          Save section
        </button>
        {status === "saved" ? <span className="text-xs font-medium text-emerald-600">Saved — live within 5 minutes.</span> : null}
        {status === "error" ? <span className="text-xs font-medium text-destructive">{errorMsg}</span> : null}
      </div>
    </div>
  );
}

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<Partial<Record<ContentKey, unknown>>>({});
  const [openKey, setOpenKey] = useState<ContentKey | null>(null);

  useEffect(() => {
    authFetch("/api/admin/content")
      .then((r) => r.json())
      .then((d) => {
        const byKey = new Map<string, string>((d.content || []).map((c: { key: string; value: string }) => [c.key, c.value]));
        const next: Partial<Record<ContentKey, unknown>> = {};
        for (const key of Object.keys(contentRegistry) as ContentKey[]) {
          const raw = byKey.get(key);
          if (raw) {
            try {
              next[key] = JSON.parse(raw);
              continue;
            } catch {
              /* fall through to default below */
            }
          }
          next[key] = contentRegistry[key].default;
        }
        setValues(next);
      })
      .catch(() => {
        const next: Partial<Record<ContentKey, unknown>> = {};
        for (const key of Object.keys(contentRegistry) as ContentKey[]) next[key] = contentRegistry[key].default;
        setValues(next);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-2">Content Manager</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Edit homepage and pricing content directly — no code changes or redeploy needed. Changes appear on the live site within 5 minutes.
      </p>

      <div className="space-y-3">
        {(Object.keys(contentRegistry) as ContentKey[]).map((key) => (
          <div key={key}>
            <button
              onClick={() => setOpenKey(openKey === key ? null : key)}
              className="w-full flex items-center justify-between p-4 rounded-xl border border-border bg-card text-left hover:border-primary/40 transition-colors"
            >
              <div>
                <span className="text-sm font-semibold text-foreground">{contentRegistry[key].label}</span>
                <p className="text-xs text-muted-foreground mt-0.5">{contentRegistry[key].description}</p>
              </div>
              <ChevronDown size={16} className={`text-muted-foreground transition-transform shrink-0 ml-3 ${openKey === key ? "rotate-180" : ""}`} />
            </button>
            {openKey === key ? (
              <div className="mt-2">
                <SectionEditor contentKey={key} initialValue={values[key]} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
