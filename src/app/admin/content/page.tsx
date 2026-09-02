"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import { textDefaults } from "@/content/text-defaults";

/** Group id → the page an editor recognises it by, in nav order. */
const GROUPS: { key: string; label: string; hint: string }[] = [
  { key: "nav", label: "Navigation", hint: "Menu links and the header call-to-action." },
  { key: "home", label: "Home page", hint: "Hero, what we build, process, work, products, testimonials." },
  { key: "services", label: "Services page", hint: "The six capability sections." },
  { key: "products", label: "Products page", hint: "Product cards and their copy." },
  { key: "work", label: "Work page", hint: "Case-study cards, filters, and stats." },
  { key: "casestudy", label: "Case study", hint: "The Skillship deep-dive page." },
  { key: "pricing", label: "Pricing page", hint: "Plans, features, payment milestones." },
  { key: "about", label: "About page", hint: "Positioning, commitments, and stats." },
  { key: "contact", label: "Contact page", hint: "Intro copy and the enquiry options." },
  { key: "wizard", label: "Contact form", hint: "Step labels, fields, and confirmation copy." },
  { key: "newsletter", label: "Newsletter", hint: "Footer signup states." },
  { key: "footer", label: "Footer", hint: "Columns, links, and legal line." },
  { key: "image", label: "Images", hint: "Upload a picture, or paste a URL, to swap any image on the site." },
];

type Draft = Record<string, string>;

/**
 * Picture control for an `image.*` field: uploads the chosen file to the media
 * library and writes the resulting URL back into the field. The URL input above
 * stays editable, so pasting an external link still works.
 */
function ImageUpload({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(file: File) {
    setBusy(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      // No Content-Type header: fetch must set the multipart boundary itself.
      const res = await authFetch("/api/admin/media", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.error === "string" ? data.error : "Upload failed.");
      } else {
        onChange(data.media.url);
      }
    } catch {
      setError("Network error.");
    }
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="cfield-img">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void upload(file);
        }}
      />
      <div className="cfield-img-row">
        <button type="button" className="cfield-upload" disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? "Uploading…" : value ? "Replace image" : "Upload image"}
        </button>
        {value ? (
          <button type="button" className="cfield-clear" onClick={() => onChange("")}>Remove</button>
        ) : null}
        <span className="cfield-hint">
          {error ? error : "PNG, JPEG, WebP, GIF or AVIF · up to 5 MB · Save to publish"}
        </span>
      </div>
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="cfield-preview" src={value} alt="" />
      ) : null}
    </div>
  );
}

/** A page like Home has 300+ strings; render a slice and let the editor ask for more. */
const PAGE_SIZE = 40;

export default function AdminContentPage() {
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft>({});
  const [group, setGroup] = useState("home");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;
    authFetch("/api/admin/content")
      .then((r) => (r.ok ? r.json() : { content: [] }))
      .then((d) => {
        if (cancelled) return;
        const row = (d.content || []).find((c: { key: string }) => c.key === "site.text");
        let overrides: Draft = {};
        if (row) {
          try {
            const parsed = JSON.parse(row.value);
            if (parsed && typeof parsed === "object") overrides = parsed as Draft;
          } catch {
            /* keep defaults */
          }
        }
        setDraft({ ...textDefaults, ...overrides });
      })
      .catch(() => { if (!cancelled) setDraft({ ...textDefaults }); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Only strings the admin actually changed get persisted, so copy shipped in
  // code later still shows through for everything they left alone.
  const edited = useMemo(
    () => Object.keys(draft).filter((id) => draft[id] !== textDefaults[id]),
    [draft]
  );

  const idsByGroup = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const id of Object.keys(textDefaults)) {
      const g = id.split(".")[0];
      if (!map.has(g)) map.set(g, []);
      map.get(g)!.push(id);
    }
    return map;
  }, []);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const visible = useMemo(() => {
    const pool = searching ? Object.keys(textDefaults) : idsByGroup.get(group) ?? [];
    if (!searching) return pool;
    return pool.filter((id) => id.toLowerCase().includes(q) || (draft[id] ?? "").toLowerCase().includes(q));
  }, [searching, q, group, idsByGroup, draft]);

  async function handleSave() {
    setSaving(true);
    setStatus("idle");
    const overrides: Draft = {};
    for (const id of edited) overrides[id] = draft[id];

    try {
      const res = await authFetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "site.text", value: JSON.stringify(overrides) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(typeof data.error === "string" ? data.error : "Save failed.");
        setStatus("error");
      } else {
        setStatus("saved");
        setTimeout(() => setStatus("idle"), 2500);
      }
    } catch {
      setErrorMsg("Network error.");
      setStatus("error");
    }
    setSaving(false);
  }

  function resetOne(id: string) {
    setDraft((d) => ({ ...d, [id]: textDefaults[id] }));
  }

  if (loading) {
    return (
      <div className="page on space-y-4">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  const active = GROUPS.find((g) => g.key === group) ?? GROUPS[0];

  return (
    <div className="page on">
      <h1 className="h1">Content</h1>
      <p className="sub">Every word and image on the marketing site, editable here — no code change, no redeploy.</p>

      <div className="grid-4">
        <div className="kpi">
          <div className="lbl">Editable strings</div>
          <div className="val">{Object.keys(textDefaults).length}</div>
        </div>
        <div className="kpi">
          <div className="lbl">Changed by you</div>
          <div className="val">{edited.length}</div>
          <div className="dta up">{edited.length ? "Unsaved changes included" : "Matching the shipped copy"}</div>
        </div>
        <div className="kpi">
          <div className="lbl">Images</div>
          <div className="val">{(idsByGroup.get("image") ?? []).length}</div>
        </div>
        <div className="kpi">
          <div className="lbl">Goes live</div>
          <div className="val" style={{ fontSize: "22px" }}>≤ 5 min</div>
          <div className="dta up">Pages revalidate automatically</div>
        </div>
      </div>

      <div className="filter-bar">
        <input
          className="search"
          placeholder="Search across every page for the words you want to change…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setLimit(PAGE_SIZE); }}
        />
        {status === "saved" ? <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-success)" }}>Saved.</span> : null}
        {status === "error" ? <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--color-error)" }}>{errorMsg}</span> : null}
        <button className="btn-pri" type="button" onClick={handleSave} disabled={saving || edited.length === 0}>
          {saving ? "Saving…" : `Save${edited.length ? ` (${edited.length})` : ""}`}
        </button>
      </div>

      <div className="ophub">
        <div className="ocol">
          {GROUPS.map((g) => {
            const ids = idsByGroup.get(g.key) ?? [];
            const changed = ids.filter((id) => draft[id] !== textDefaults[id]).length;
            return (
              <div
                key={g.key}
                className={`oc-item${!searching && group === g.key ? " on" : ""}`}
                onClick={() => { setGroup(g.key); setQuery(""); setLimit(PAGE_SIZE); }}
              >
                {g.label}
                <span className="cnt">{changed ? `${changed} ✎` : ids.length}</span>
              </div>
            );
          })}
        </div>

        <div className="opane">
          <div className="opane-h">
            <div>
              <h2>{searching ? `Search results` : active.label}</h2>
              <p>
                {searching
                  ? `${visible.length} match${visible.length === 1 ? "" : "es"} across all pages`
                  : `${active.hint} · ${visible.length} field${visible.length === 1 ? "" : "s"}`}
              </p>
            </div>
          </div>

          {visible.length === 0 ? (
            <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>Nothing matches that search.</p>
          ) : (
            visible.slice(0, limit).map((id) => {
              const value = draft[id] ?? "";
              const changed = value !== textDefaults[id];
              const isImage = id.startsWith("image.") || id.includes(".img-");
              const long = !isImage && value.length > 70;
              return (
                <div className="cfield" key={id}>
                  <div className="cfield-h">
                    <label htmlFor={`f-${id}`}>{id}</label>
                    {changed ? (
                      <button type="button" onClick={() => resetOne(id)}>Reset</button>
                    ) : null}
                  </div>
                  {long ? (
                    <textarea
                      id={`f-${id}`}
                      rows={3}
                      value={value}
                      onChange={(e) => setDraft({ ...draft, [id]: e.target.value })}
                    />
                  ) : (
                    <input
                      id={`f-${id}`}
                      value={value}
                      placeholder={isImage ? "https://… or /amfire-design/…" : undefined}
                      onChange={(e) => setDraft({ ...draft, [id]: e.target.value })}
                    />
                  )}
                  {isImage ? (
                    <ImageUpload value={value} onChange={(url) => setDraft({ ...draft, [id]: url })} />
                  ) : null}
                </div>
              );
            })
          )}

          {visible.length > limit ? (
            <button className="cfield-more" type="button" onClick={() => setLimit(limit + PAGE_SIZE)}>
              Show {Math.min(PAGE_SIZE, visible.length - limit)} more of {visible.length - limit} remaining
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
