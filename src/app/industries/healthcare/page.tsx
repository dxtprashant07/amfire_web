import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartPulse, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Healthcare & MedTech",
  description: "Patient portals, teleconsult apps, appointment booking systems, and AI-assisted diagnostics built with healthcare-grade security.",
};

const painPoints = [
  { title: "Paper-based patient records", desc: "Manual records mean slow access, duplication errors, and data that can't be analysed or shared across care teams." },
  { title: "No-show and scheduling chaos", desc: "Phone-based booking is slow and prone to errors. No-shows have no automated follow-up and cost revenue daily." },
  { title: "Disconnected care teams", desc: "Doctors, labs, pharmacies, and patients operate in silos. There's no single source of truth for a patient's care journey." },
  { title: "Data security concerns", desc: "Healthcare data is highly sensitive. Most off-the-shelf tools aren't built with the access controls and audit trails that clinical data requires." },
];

const deliverables = [
  "Patient management portals with medical history and records",
  "Teleconsultation apps with video, chat, and prescription tools",
  "Appointment booking and automated reminder systems",
  "Doctor and clinic CRM with patient relationship tracking",
  "Lab result digitisation and patient notification pipelines",
  "AI-assisted symptom checkers and triage tools",
  "Pharmacy and prescription management modules",
  "Role-based access control for clinicians, admins, and patients",
];

const stack = [
  { name: "Next.js", color: "#000" },
  { name: "React Native", color: "#61DAFB" },
  { name: "FastAPI", color: "#009688" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "OpenAI", color: "#412991" },
  { name: "Daily.co", color: "#6B2DFC" },
  { name: "AWS", color: "#FF9900" },
  { name: "Redis", color: "#DC382D" },
  { name: "Twilio", color: "#F22F46" },
  { name: "Razorpay", color: "#02042B" },
];

const caseStudies = [
  {
    title: "NexaHealth — Teleconsultation Platform",
    desc: "Built a full teleconsult platform connecting patients with doctors via video, with in-app prescriptions, appointment scheduling, and an AI assistant that pre-triages patient symptoms before the consultation.",
    tags: ["Next.js", "Daily.co", "FastAPI", "OpenAI", "PostgreSQL"],
    result: "3x reduction in average consultation prep time",
  },
  {
    title: "CareSync — Clinic Management System",
    desc: "End-to-end clinic management platform for a multi-specialty hospital — patient registration, appointment scheduling, EMR, lab results, billing, and an admin dashboard with daily operations reporting.",
    tags: ["React Native", "Node.js", "PostgreSQL", "AWS", "Twilio"],
    result: "65% reduction in administrative overhead",
  },
];

const faqs = [
  {
    q: "Do you build HIPAA-compliant applications?",
    a: "We build with HIPAA-aligned practices — encrypted data at rest and in transit, strict role-based access control, audit logging, and minimum-privilege service accounts. For clients requiring formal HIPAA compliance, we structure the architecture and recommend the appropriate BAAs.",
  },
  {
    q: "Can you integrate with existing hospital systems (HIS/EMR)?",
    a: "Yes. We work with HL7, FHIR, and custom APIs to integrate with existing HIS and EMR systems. We can connect to systems like Epic, Cerner, or custom hospital software via API or database-level integration.",
  },
  {
    q: "How do you handle video consultations?",
    a: "We use Daily.co or Whereby for HIPAA-eligible video infrastructure, with waiting rooms, recording (where permitted), and in-session chat. All video data is end-to-end encrypted.",
  },
  {
    q: "Can patients access the platform on mobile?",
    a: "Always. Every healthcare product we build ships with a mobile app (iOS + Android) or a fully responsive PWA — because patients access healthcare on their phones first.",
  },
  {
    q: "How long does a healthcare platform take to build?",
    a: "A focused patient portal or appointment booking system takes 6–10 weeks. A full clinical management platform with EMR, billing, and teleconsult takes 12–20 weeks.",
  },
];

export default function HealthcarePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <HeartPulse size={12} className="text-primary" />
                Healthcare & MedTech
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Digital health that{" "}
                <span className="gradient-text">clinicians and patients trust</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                We build healthcare software with the security, access control, and reliability that patient data demands — without the 18-month enterprise procurement cycle.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Build Your Health Product <ArrowRight size={15} />
                </Link>
                <Link href="/work" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                  See Case Studies
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* Pain Points */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Challenges we solve</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">What healthcare companies struggle with</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {painPoints.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.06}>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-1.5">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">What We Build</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Healthcare deliverables</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deliverables.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/25 transition-all">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Tech Stack</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Technologies we use in Healthcare</h2>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech, i) => (
              <ScrollReveal key={tech.name} delay={i * 0.03}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-secondary/50 transition-all cursor-default">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tech.color }} />
                  {tech.name}
                </span>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Case Studies</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Healthcare products we've shipped</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all h-full flex flex-col">
                  <h3 className="text-base font-semibold text-foreground mb-2">{cs.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{cs.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {cs.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-foreground">{t}</span>
                    ))}
                  </div>
                  <p className="text-xs font-semibold text-primary">{cs.result}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Healthcare questions answered</h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="p-5 rounded-xl border border-border bg-card">
                  <h3 className="text-sm font-semibold text-foreground mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to digitise your healthcare product?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Tell us your clinical workflow — we'll design the right digital solution and send a proposal within 48 hours.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
              Start the Conversation <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
