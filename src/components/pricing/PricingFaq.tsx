"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export function PricingFaq({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => {
        const expanded = open === i;
        return (
          <div key={faq.q} className="overflow-hidden rounded-xl border border-[var(--border-default)] bg-[var(--surface-card)]">
            <button
              onClick={() => setOpen(expanded ? null : i)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <h3 className="text-sm font-semibold text-[var(--fg-default)]">{faq.q}</h3>
              <Plus size={18} className={`shrink-0 text-[var(--color-orange)] transition-transform ${expanded ? "rotate-45" : ""}`} />
            </button>
            {expanded ? (
              <p className="px-5 pb-5 text-sm leading-relaxed text-[var(--fg-muted)]">{faq.a}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
