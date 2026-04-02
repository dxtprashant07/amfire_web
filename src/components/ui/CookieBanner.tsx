"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("amfire_cookie_consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("amfire_cookie_consent", JSON.stringify({ accepted: true, analytics: true, marketing: false, timestamp: Date.now() }));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("amfire_cookie_consent", JSON.stringify({ accepted: false, analytics: false, marketing: false, timestamp: Date.now() }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-sm z-50 p-5 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-xl">
      <button
        onClick={decline}
        aria-label="Close"
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
      >
        <X size={14} />
      </button>

      <p className="text-sm font-semibold text-foreground mb-1.5">We use cookies</p>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
        We use cookies to improve your experience and analyse site usage.{" "}
        <Link href="/privacy-policy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>

      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 px-4 py-2 rounded-lg gradient-bg text-white text-xs font-medium hover:opacity-90 active:scale-[0.97] transition-all"
        >
          Accept All
        </button>
        <button
          onClick={decline}
          className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground text-xs font-medium hover:bg-secondary/50 active:scale-[0.97] transition-all"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
