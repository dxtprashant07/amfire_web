"use client";

import { useState } from "react";

type Copy = Record<string, string>;

const STEPS = 4;

/**
 * The design's contact wizard, made to actually submit. Markup and class names
 * are the design's; the copy comes from the CMS text map (passed in already
 * resolved, since this runs on the client).
 */
export function ContactWizard({ copy }: { copy: Copy }) {
  const [step, setStep] = useState(2);
  const [service, setService] = useState(copy["contact.web-app"]);
  const [budget, setBudget] = useState(copy["contact.50k"]);
  const [timeline, setTimeline] = useState(copy["wizard.timeline-1"]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const services = [
    copy["contact.web-app"], copy["contact.mobile-app"], copy["contact.ai-agent"],
    copy["contact.automation"], copy["contact.full-product"], copy["contact.something-else"],
  ];
  const budgets = [copy["contact.20k"], copy["contact.50k"], copy["contact.75k"]];
  const timelines = [copy["wizard.timeline-1"], copy["wizard.timeline-2"], copy["wizard.timeline-3"]];

  function set<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function next() {
    setError("");
    if (step === 3 && form.message.trim().length < 10) {
      setError(copy["wizard.err-message"]);
      return;
    }
    setStep((s) => Math.min(STEPS, s + 1));
  }

  async function submit() {
    setError("");
    if (form.name.trim().length < 2 || !/^\S+@\S+\.\S+$/.test(form.email)) {
      setError(copy["wizard.err-contact"]);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, service, budget, timeline }),
      });
      if (res.ok) setDone(true);
      else setError((await res.json().catch(() => ({}))).error || copy["wizard.err-send"]);
    } catch {
      setError(copy["wizard.err-send"]);
    }
    setSending(false);
  }

  if (done) {
    return (
      <div className="wizard">
        <h3 style={{ fontWeight: "700", margin: "8px 0 6px", fontSize: "20px" }}>{copy["wizard.sent-title"]}</h3>
        <p style={{ fontSize: "13px", color: "var(--fg-muted)" }}>{copy["wizard.sent-text"]}</p>
      </div>
    );
  }

  return (
    <div className="wizard">
      <div className="pbar">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div key={i} className={i < step ? "on" : ""}></div>
        ))}
      </div>
      <span style={{ fontSize: "12px", color: "var(--fg-muted)", fontWeight: "600" }}>
        {copy["wizard.step"].replace("{n}", String(step)).replace("{total}", String(STEPS))}
      </span>

      {step === 1 ? (
        <>
          <h3 style={{ fontWeight: "700", margin: "8px 0 4px", fontSize: "20px" }}>{copy["wizard.timeline-title"]}</h3>
          <p style={{ fontSize: "13px", color: "var(--fg-muted)", marginBottom: "18px" }}>{copy["wizard.timeline-sub"]}</p>
          <div className="opts" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
            {timelines.map((o) => (
              <div key={o} className={`opt${timeline === o ? " sel" : ""}`} onClick={() => setTimeline(o)}>{o}</div>
            ))}
          </div>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <h3 style={{ fontWeight: "700", margin: "8px 0 4px", fontSize: "20px" }}>{copy["contact.what-are-you-looking-to-build"]}</h3>
          <p style={{ fontSize: "13px", color: "var(--fg-muted)", marginBottom: "18px" }}>{copy["contact.pick-the-closest-we-ll-tailor"]}</p>
          <div className="opts">
            {services.map((o) => (
              <div key={o} className={`opt${service === o ? " sel" : ""}`} onClick={() => setService(o)}>{o}</div>
            ))}
          </div>
          <div style={{ margin: "22px 0 6px" }}>
            <label style={{ fontSize: "12px", color: "var(--fg-muted)", fontWeight: "600" }}>{copy["contact.approximate-budget"]}</label>
            <div className="opts" style={{ gridTemplateColumns: "1fr 1fr 1fr", marginTop: "8px" }}>
              {budgets.map((o) => (
                <div key={o} className={`opt${budget === o ? " sel" : ""}`} onClick={() => setBudget(o)}>{o}</div>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {step === 3 ? (
        <>
          <h3 style={{ fontWeight: "700", margin: "8px 0 4px", fontSize: "20px" }}>{copy["wizard.details-title"]}</h3>
          <p style={{ fontSize: "13px", color: "var(--fg-muted)", marginBottom: "18px" }}>{copy["wizard.details-sub"]}</p>
          <textarea
            className="fin"
            rows={6}
            placeholder={copy["wizard.details-placeholder"]}
            value={form.message}
            onChange={(e) => set("message", e.target.value)}
          />
        </>
      ) : null}

      {step === 4 ? (
        <>
          <h3 style={{ fontWeight: "700", margin: "8px 0 4px", fontSize: "20px" }}>{copy["wizard.contact-title"]}</h3>
          <p style={{ fontSize: "13px", color: "var(--fg-muted)", marginBottom: "18px" }}>{copy["wizard.contact-sub"]}</p>
          <div className="fgrid">
            <input className="fin" placeholder={copy["wizard.name"]} value={form.name} onChange={(e) => set("name", e.target.value)} />
            <input className="fin" type="email" placeholder={copy["wizard.email"]} value={form.email} onChange={(e) => set("email", e.target.value)} />
            <input className="fin" placeholder={copy["wizard.phone"]} value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            <input className="fin" placeholder={copy["wizard.company"]} value={form.company} onChange={(e) => set("company", e.target.value)} />
          </div>
        </>
      ) : null}

      {error ? <p style={{ marginTop: "14px", fontSize: "13px", color: "var(--color-red)" }}>{error}</p> : null}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "26px" }}>
        <span
          style={{ fontSize: "13px", color: "var(--fg-muted)", cursor: step > 1 ? "pointer" : "default", opacity: step > 1 ? 1 : 0.4 }}
          onClick={() => step > 1 && setStep(step - 1)}
        >
          {copy["contact.back"]}
        </span>
        <span className="btn pri" style={{ padding: "11px 24px" }} onClick={() => (step === STEPS ? submit() : next())}>
          {step === STEPS ? (sending ? copy["wizard.sending"] : copy["wizard.send"]) : copy["contact.next"]}
        </span>
      </div>
    </div>
  );
}
