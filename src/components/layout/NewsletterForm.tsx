"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    // TODO: Connect this to your newsletter API
    console.log("Newsletter subscription:", email);

    setSubmitted(true);
    setEmail("");
  };

  if (submitted) {
    return (
      <p className="text-sm text-white/70">
        Thanks for subscribing!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className="min-w-0 flex-1 rounded-[9px] border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#f97316]"
      />

      <button
        type="submit"
        className="shrink-0 rounded-[9px] bg-[#f97316] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#ea580c]"
      >
        Subscribe
      </button>
    </form>
  );
}