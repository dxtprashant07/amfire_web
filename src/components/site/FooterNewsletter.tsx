"use client";

import { useState } from "react";

/** The footer's newsletter row from the design, wired to /api/newsletter/subscribe. */
export function FooterNewsletter({ placeholder, copy }: { placeholder: string; copy: Record<string, string> }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit() {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setState("error");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") return <p className="desc">{copy["newsletter.done"]}</p>;

  return (
    <>
      <div className="news">
        <input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
        />
        <button type="button" onClick={submit} aria-label="Subscribe">
          {state === "sending" ? copy["newsletter.sending"] : "→"}
        </button>
      </div>
      {state === "error" ? <p className="desc">{copy["newsletter.error"]}</p> : null}
    </>
  );
}
