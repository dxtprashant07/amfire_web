"use client";

import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";

interface Doc {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number | null;
  createdAt: string;
  project: { name: string };
}

const ICONS: Record<string, React.ReactNode> = {
  image: <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></svg>,
  pdf: <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>,
  code: <svg viewBox="0 0 24 24"><path d="m9 8-5 4 5 4M15 8l5 4-5 4" /></svg>,
};

function icon(type: string) {
  return ICONS[type] ?? ICONS.pdf;
}

function formatSize(bytes: number | null) {
  if (!bytes) return null;
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ClientDocumentsPage() {
  const { data: docs = [], isLoading, error } = useQuery({
    queryKey: ["client-documents"],
    queryFn: async () => {
      const res = await authFetch("/api/client/documents");
      if (!res.ok) throw new Error("Failed to load documents");
      const d = await res.json();
      return (d.documents || []) as Doc[];
    },
  });

  if (isLoading) {
    return (
      <div className="page on">
        <Skeleton className="h-10 w-48 mb-6" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="page on">
      <div className="welcome">
        <h1>Files</h1>
        <p>Shared assets, deliverables, and design specs — everything we&apos;ve handed over.</p>
      </div>

      <div className="panel">
        <div className="panel-h">
          <h2>Shared with you</h2>
          <span style={{ fontSize: "12px", color: "var(--fg-muted)" }}>{docs.length} file{docs.length === 1 ? "" : "s"}</span>
        </div>

        {error ? (
          <p style={{ fontSize: "13px", color: "var(--color-error)" }}>Failed to load files. Please refresh.</p>
        ) : docs.length === 0 ? (
          <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>Nothing shared yet — deliverables show up here as we ship them.</p>
        ) : (
          docs.map((doc) => {
            const size = formatSize(doc.size);
            return (
              <div className="file-row" key={doc.id}>
                <div className="fic">{icon(doc.type)}</div>
                <div className="fmeta">
                  <p>{doc.name}</p>
                  <small>
                    <span>{doc.project?.name}</span>
                    {size ? <span>· {size}</span> : null}
                    <span>· {new Date(doc.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </small>
                </div>
                <a className="fact" href={doc.url} target="_blank" rel="noopener noreferrer">Download</a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
