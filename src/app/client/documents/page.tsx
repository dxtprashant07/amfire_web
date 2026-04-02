"use client";

import { useQuery } from "@tanstack/react-query";
import { authFetch } from "@/lib/stores/auth-store";
import { Skeleton } from "@/components/ui/Skeleton";
import { FileText, Download, File, Image, FileCode, AlertCircle } from "lucide-react";

interface Doc {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number | null;
  createdAt: string;
  project: { name: string };
}

const typeIcons: Record<string, typeof FileText> = {
  pdf: FileText,
  image: Image,
  code: FileCode,
};

function getIcon(type: string) {
  return typeIcons[type] || File;
}

function formatSize(bytes: number | null) {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function ClientDocumentsPage() {
  const { data: docs = [], isLoading: loading, error } = useQuery({
    queryKey: ["client-documents"],
    queryFn: async () => {
      const res = await authFetch("/api/client/documents");
      if (!res.ok) throw new Error("Failed to load documents");
      const d = await res.json();
      return (d.documents || []) as Doc[];
    },
  });

  if (loading) {
    return (
      <div className="max-w-3xl space-y-4">
        <Skeleton className="h-8 w-48" />
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl p-6 rounded-xl border border-destructive/20 bg-destructive/5 text-center">
        <AlertCircle size={32} className="mx-auto mb-3 text-destructive" />
        <p className="text-sm text-destructive font-medium">Failed to load documents.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground mb-6">Documents</h1>

      {docs.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-border text-center">
          <p className="text-muted-foreground">No documents uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {docs.map((doc) => {
            const Icon = getIcon(doc.type);
            return (
              <div key={doc.id} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{doc.project.name}</span>
                    {doc.size && <span>· {formatSize(doc.size)}</span>}
                    <span>· {new Date(doc.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span>
                  </div>
                </div>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
                  title="Download"
                >
                  <Download size={16} />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
