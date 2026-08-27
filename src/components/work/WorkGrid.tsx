"use client";

import { useState } from "react";

const filters = ["All", "Web", "Mobile", "AI", "Automation"];

export type Tile = {
  title: string;
  tag: string;
  caption: string;
  gradient: string;
  category: string[];
  big?: boolean;
};

function TileCard({ t }: { t: Tile }) {
  return (
    <article className={`group relative overflow-hidden rounded-2xl border border-[var(--border-default)] ${t.big ? "sm:col-span-2 sm:row-span-2" : ""}`}>
      <div className={`relative flex flex-col justify-end p-6 text-white ${t.big ? "h-full min-h-[340px]" : "h-[220px]"}`} style={{ background: t.gradient }}>
        <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.06em] backdrop-blur-sm">{t.tag}</span>
        <b className={`font-extrabold leading-tight ${t.big ? "text-2xl" : "text-lg"}`}>{t.title}</b>
        <small className="mt-1.5 text-sm text-white/75">{t.caption}</small>
      </div>
    </article>
  );
}

export function WorkGrid({ tiles }: { tiles: Tile[] }) {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? tiles : tiles.filter((t) => t.category.includes(active));

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
              active === f
                ? "border-transparent gradient-bg text-white"
                : "border-[var(--border-default)] text-[var(--fg-muted)] hover:border-[var(--color-orange)] hover:text-[var(--color-orange)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((t) => (
          <TileCard key={t.title} t={t} />
        ))}
      </div>
    </>
  );
}
