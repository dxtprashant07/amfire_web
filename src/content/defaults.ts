import type { HeroContent, IconCards, Plans, ProcessSteps, Products, WorkItems } from "./schema";

// These are the values the site renders when the matching SiteContent row
// doesn't exist yet (fresh install) or fails validation (bad admin edit) —
// the site must never go blank because of a CMS row.

export const heroDefault: HeroContent = {
  eyebrow: "Now open for new projects",
  headline: "We build",
  headlineAccent: "automation",
  headlineSuffix: "that never sleeps",
  proof: [
    { value: "50+", label: "Projects shipped" },
    { value: "10w", label: "Typical MVP sprint" },
    { value: "100%", label: "IP transferred" },
  ],
};

export const heroPillarsDefault: IconCards = [
  { icon: "Zap", title: "Built for speed", text: "Ship faster with AI at every step." },
  { icon: "Target", title: "Built for clarity", text: "Full transparency, zero surprises." },
  { icon: "ShieldCheck", title: "Built for impact", text: "Smart solutions that drive real results." },
];

export const heroStripDefault: IconCards = [
  { icon: "Sparkles", title: "AI-Powered", text: "Intelligent automation built to adapt" },
  { icon: "LayoutGrid", title: "End-to-End", text: "From idea to deployment, we handle it all" },
  { icon: "Clock", title: "Always On", text: "Real-time updates, anytime, anywhere" },
  { icon: "ShieldCheck", title: "Secure & Reliable", text: "Enterprise-grade security you can trust" },
];

export const workDefault: WorkItems = [
  {
    tag: "SaaS platform",
    title: "Construction OS with AI document processing",
    text: "A multi-tenant project platform that reads permit files, flags risks, and keeps operations moving.",
    metric: "10 weeks",
  },
  {
    tag: "EdTech",
    title: "Adaptive learning platform with AI tutoring",
    text: "Personalized learning paths, assessments, and tutor flows for high-intent professional learners.",
    metric: "78% completion",
  },
  {
    tag: "Operations",
    title: "Field team app with WhatsApp automation",
    text: "Dispatch, timesheets, invoicing, and manager dashboards wrapped in a mobile-first workflow.",
    metric: "15 hrs saved/wk",
  },
];

export const plansDefault: Plans = [
  {
    name: "Starter",
    price: "Rs. 20,000",
    desc: "For lean launches and first automation wins.",
    features: ["5 AI agents", "5 workflow automations", "WhatsApp / website chatbot", "CRM setup + training call", "30-day free support"],
  },
  {
    name: "Growth",
    price: "Rs. 49,999",
    desc: "For growing businesses ready to automate and scale.",
    features: ["10 AI agents", "10 custom automations", "AI-powered SaaS website", "Performance dashboard", "60-day free support"],
  },
  {
    name: "Scale",
    price: "Rs. 74,999",
    desc: "For teams scaling AI across operations.",
    features: ["15 custom automations", "AI voice receptionist", "Advanced analytics", "AI-enhanced CRM", "60-day premium support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For organizations needing a tailored AI operating system.",
    features: ["Multi-lingual generative SaaS", "15-25 AI agents", "20+ automations", "Dedicated AI account manager", "90-day premium support"],
  },
];

export const processDefault: ProcessSteps = [
  { icon: "/amfire-design/process/search-sharp.png", step: "01", title: "Discovery", text: "Understand your goals and uncover opportunities.", dur: "3–5 days" },
  { icon: "/amfire-design/process/cubes-sharp.png", step: "02", title: "Architecture", text: "Design a robust, scalable blueprint.", dur: "2–3 days" },
  { icon: "/amfire-design/process/browser-sharp.png", step: "03", title: "UI/UX", text: "Craft intuitive experiences users love.", dur: "4–6 days" },
  { icon: "/amfire-design/process/frontend-sharp.png", step: "04", title: "Frontend", text: "Build fast, responsive, modern interfaces.", dur: "5–7 days" },
  { icon: "/amfire-design/process/servers-sharp.png", step: "05", title: "Backend", text: "Power the product with secure APIs.", dur: "4–6 days" },
  { icon: "/amfire-design/process/brain-sharp.png", step: "06", title: "AI Integration", text: "Integrate intelligent capabilities.", dur: "3–5 days" },
  { icon: "/amfire-design/process/rocket-sharp.png", step: "07", title: "Deploy", text: "Launch smoothly with continuous delivery.", dur: "1–2 days" },
];

export const productsDefault: Products = [
  {
    icon: "GraduationCap",
    iconBg: "#E8E7FC",
    iconColor: "#4F46E5",
    accent: "#4F46E5",
    name: "SkillShip",
    text: "AI-powered learning and placement guidance platform for students.",
  },
  {
    icon: "Bot",
    iconBg: "var(--accent-tint)",
    iconColor: "var(--color-orange)",
    accent: "var(--color-orange)",
    name: "AI Career Copilot",
    text: "Bilingual career guidance AI that helps students discover paths, prepare, and succeed.",
    featured: true,
  },
  {
    icon: "HomeIcon",
    iconBg: "#DFF3E4",
    iconColor: "#16A34A",
    accent: "#16A34A",
    name: "MyGreenHome",
    text: "Smart solutions for energy efficiency, sustainability, and greener living.",
  },
];

export const paymentTrustDefault: IconCards = [
  { icon: "ShieldCheck", title: "No long-term contracts", text: "Cancel anytime, no questions asked." },
  { icon: "Zap", title: "Onboard in 48 hours", text: "Quick setup, fast results." },
  { icon: "Lock", title: "Bank-level security", text: "Your data is encrypted and protected." },
  { icon: "Headphones", title: "Human support", text: "Talk to real people who care." },
];
