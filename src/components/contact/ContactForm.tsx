"use client";

import { useState } from "react";
import {
  Globe, Smartphone, Brain, Zap, Layers,
  CheckCircle, ArrowRight, ArrowLeft, Send,
} from "lucide-react";

/* ── Step data ────────────────────────────────────────────────────────── */

const buildOptions = [
  { value: "web-app", label: "Web App", icon: Globe },
  { value: "mobile-app", label: "Mobile App", icon: Smartphone },
  { value: "ai-agent", label: "AI Agent", icon: Brain },
  { value: "automation", label: "Automation", icon: Zap },
  { value: "full-product", label: "Full Product", icon: Layers },
];

const budgetOptions = [
  { value: "under-1l", label: "Under ₹1L" },
  { value: "1l-3l", label: "₹1L – ₹3L" },
  { value: "3l-10l", label: "₹3L – ₹10L" },
  { value: "10l-plus", label: "₹10L+" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-month", label: "1 Month" },
  { value: "3-months", label: "3 Months" },
  { value: "exploring", label: "Just Exploring" },
];

/* ── Types ────────────────────────────────────────────────────────────── */

interface FormData {
  buildType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

/* ── Step progress bar ────────────────────────────────────────────────── */

function StepBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full flex-1 transition-all duration-300 ${
            i < current ? "gradient-bg" : i === current ? "gradient-bg opacity-60" : "bg-border"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground shrink-0 ml-1">
        {current + 1} / {total}
      </span>
    </div>
  );
}

/* ── Option card ──────────────────────────────────────────────────────── */

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-sm font-medium transition-all duration-150 active:scale-[0.97] ${
        selected
          ? "gradient-bg border-transparent text-white shadow-lg shadow-primary/20"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary/50"
      }`}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
          <CheckCircle size={12} className="text-white" />
        </span>
      )}
      {children}
    </button>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    buildType: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const set = (key: keyof FormData, value: string) =>
    setFormData((d) => ({ ...d, [key]: value }));

  const canNext = () => {
    if (step === 0) return !!formData.buildType;
    if (step === 1) return !!formData.budget;
    if (step === 2) return !!formData.timeline;
    return true;
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateFields = () => {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!EMAIL_RE.test(formData.email)) errs.email = "Enter a valid email address.";
    if (!formData.message.trim()) errs.message = "Project description is required.";
    else if (formData.message.trim().length < 10) errs.message = "Please write at least 10 characters.";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateFields();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Success state ────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-10 rounded-2xl border border-border bg-card min-h-[420px]">
        <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center mb-6">
          <CheckCircle size={30} className="text-white" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Message sent!</h3>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
          Thanks for reaching out. We'll review your project and get back to you within 48 hours with a detailed proposal.
        </p>
        <button
          onClick={() => { setSubmitted(false); setStep(0); setFormData({ buildType: "", budget: "", timeline: "", name: "", email: "", phone: "", company: "", message: "" }); }}
          className="mt-8 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-2xl border border-border bg-card">
      <StepBar current={step} total={4} />

      {/* ── Step 0: What to build ────────────────────────────────── */}
      {step === 0 && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">What do you want to build?</h3>
          <p className="text-sm text-muted-foreground mb-6">Select the type of product you have in mind.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {buildOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={formData.buildType === opt.value}
                onClick={() => set("buildType", opt.value)}
              >
                <opt.icon size={22} />
                <span>{opt.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 1: Budget ───────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">What is your approximate budget?</h3>
          <p className="text-sm text-muted-foreground mb-6">No commitment — this helps us tailor the proposal.</p>
          <div className="grid grid-cols-2 gap-3">
            {budgetOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={formData.budget === opt.value}
                onClick={() => set("budget", opt.value)}
              >
                <span className="text-base">{opt.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 2: Timeline ─────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">When do you want to start?</h3>
          <p className="text-sm text-muted-foreground mb-6">No pressure — we're flexible on timelines.</p>
          <div className="grid grid-cols-2 gap-3">
            {timelineOptions.map((opt) => (
              <OptionCard
                key={opt.value}
                selected={formData.timeline === opt.value}
                onClick={() => set("timeline", opt.value)}
              >
                <span className="text-base">{opt.label}</span>
              </OptionCard>
            ))}
          </div>
        </div>
      )}

      {/* ── Step 3: Details form ─────────────────────────────────── */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-bold text-foreground mb-1">Your details</h3>
          <p className="text-sm text-muted-foreground mb-5">We'll use these to send you a personalised proposal.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="block text-sm font-medium text-foreground">
                Name <span className="text-primary">*</span>
              </label>
              <input
                id="name" name="name" type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => { set("name", e.target.value); setFieldErrors((p) => ({ ...p, name: undefined })); }}
                className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors ${fieldErrors.name ? "border-destructive" : "border-border"}`}
              />
              {fieldErrors.name && <p className="text-xs text-destructive">{fieldErrors.name}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                Email <span className="text-primary">*</span>
              </label>
              <input
                id="email" name="email" type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => { set("email", e.target.value); setFieldErrors((p) => ({ ...p, email: undefined })); }}
                className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors ${fieldErrors.email ? "border-destructive" : "border-border"}`}
              />
              {fieldErrors.email && <p className="text-xs text-destructive">{fieldErrors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="phone" className="block text-sm font-medium text-foreground">Phone</label>
              <input
                id="phone" name="phone" type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => set("phone", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="company" className="block text-sm font-medium text-foreground">Company</label>
              <input
                id="company" name="company" type="text"
                placeholder="Your company (optional)"
                value={formData.company}
                onChange={(e) => set("company", e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="message" className="block text-sm font-medium text-foreground">
              Project Description <span className="text-primary">*</span>
            </label>
            <textarea
              id="message" name="message" rows={4}
              placeholder="Tell us what you're building or the problem you're trying to solve..."
              value={formData.message}
              onChange={(e) => { set("message", e.target.value); setFieldErrors((p) => ({ ...p, message: undefined })); }}
              className={`w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-colors resize-none ${fieldErrors.message ? "border-destructive" : "border-border"}`}
            />
            {fieldErrors.message && <p className="text-xs text-destructive">{fieldErrors.message}</p>}
          </div>

          {formError && <p className="text-sm text-destructive">{formError}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white font-medium hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending…" : (<>Send Message <Send size={16} /></>)}
          </button>
        </form>
      )}

      {/* ── Navigation (steps 0-2) ────────────────────────────────── */}
      {step < 3 && (
        <div className="flex items-center justify-between mt-8">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext()}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next <ArrowRight size={15} />
          </button>
        </div>
      )}

      {/* Back button on step 3 */}
      {step === 3 && (
        <button
          type="button"
          onClick={() => setStep(2)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft size={15} /> Back
        </button>
      )}
    </div>
  );
}
