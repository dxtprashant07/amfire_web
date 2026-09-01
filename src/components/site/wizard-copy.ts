import type { T } from "@/content/get-text";

/** Text ids the contact wizard needs, resolved on the server and handed to the client component. */
export const wizardKeys = [
  "contact.web-app", "contact.mobile-app", "contact.ai-agent", "contact.automation",
  "contact.full-product", "contact.something-else", "contact.20k", "contact.50k", "contact.75k",
  "contact.what-are-you-looking-to-build", "contact.pick-the-closest-we-ll-tailor",
  "contact.approximate-budget", "contact.back", "contact.next",
  "wizard.step", "wizard.timeline-title", "wizard.timeline-sub",
  "wizard.timeline-1", "wizard.timeline-2", "wizard.timeline-3",
  "wizard.details-title", "wizard.details-sub", "wizard.details-placeholder",
  "wizard.contact-title", "wizard.contact-sub",
  "wizard.name", "wizard.email", "wizard.phone", "wizard.company",
  "wizard.send", "wizard.sending", "wizard.sent-title", "wizard.sent-text",
  "wizard.err-message", "wizard.err-contact", "wizard.err-send",
  "newsletter.sending", "newsletter.done", "newsletter.error",
];

export function wizardCopy(t: T): Record<string, string> {
  return Object.fromEntries(wizardKeys.map((k) => [k, t(k)]));
}
