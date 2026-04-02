import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Smartphone, CheckCircle2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { SubpageCaseStudyCarousel } from "@/components/home/SubpageCaseStudyCarousel";

export const metadata: Metadata = {
  title: "Mobile Apps",
  description: "Cross-platform and native mobile apps for iOS and Android — from MVPs to production-grade consumer apps.",
};

const deliverables = [
  "Cross-platform apps with React Native (iOS + Android from one codebase)",
  "Native iOS apps (Swift) for performance-critical use cases",
  "Native Android apps (Kotlin) with Material You design",
  "Offline-first apps with local data sync",
  "Push notifications, deep linking, and in-app messaging",
  "Biometric auth, device sensors, camera, and GPS integration",
  "App Store and Play Store submission and optimisation",
  "Backend APIs and admin panels for your mobile app",
];

const stack = [
  { name: "React Native", color: "#61DAFB" },
  { name: "Expo", color: "#000020" },
  { name: "Swift", color: "#F05138" },
  { name: "Kotlin", color: "#7F52FF" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Firebase", color: "#FFCA28" },
  { name: "Node.js", color: "#339933" },
  { name: "FastAPI", color: "#009688" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "Redux Toolkit", color: "#764ABC" },
  { name: "Reanimated", color: "#FF6B6B" },
  { name: "Fastlane", color: "#E8302A" },
];

const caseStudies = [
  {
    title: "Skillship Mobile — EdTech App",
    desc: "Cross-platform React Native app for a cohort-based learning platform. Students can attend live sessions, submit assignments, track progress, and receive mentor feedback — all offline-ready.",
    tags: ["React Native", "Expo", "Firebase", "Node.js"],
  },
  {
    title: "FieldForce — Field Service Management",
    desc: "Mobile app for field technicians with GPS tracking, job scheduling, photo capture, offline job forms, and real-time sync with an admin web dashboard.",
    tags: ["React Native", "PostgreSQL", "AWS", "Maps SDK"],
  },
];

const faqs = [
  {
    q: "Should I build cross-platform or native?",
    a: "For most startups and businesses, React Native (cross-platform) is the right call — one codebase, both platforms, 80–90% the performance of native at a fraction of the cost. We recommend native Swift/Kotlin only when you need deep device integrations like AR, complex animations, or hardware-level Bluetooth.",
  },
  {
    q: "How long does it take to build a mobile app?",
    a: "A focused MVP with 4–6 screens takes 4–8 weeks. A full consumer app with auth, payments, notifications, and a backend typically takes 10–16 weeks.",
  },
  {
    q: "Do you handle App Store and Play Store submission?",
    a: "Yes. We handle the entire publishing process — developer account setup, build signing, metadata, screenshots, and submission. We also handle rejection responses if Apple or Google raises issues.",
  },
  {
    q: "Can you add a mobile app to my existing web product?",
    a: "Absolutely. We can build a mobile app that connects to your existing backend/API, or extend a new API layer alongside your web app for mobile consumption.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A rough scope of the screens and user flows you need, any existing design assets or brand guidelines, and access to the backend/API if one already exists. We can work from a napkin sketch or a detailed Figma file.",
  },
];

export default function MobileAppsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary border border-border text-xs font-medium text-muted-foreground mb-5">
                <Smartphone size={12} className="text-primary" />
                Mobile Apps
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.08] tracking-tight text-foreground mb-5 md:mb-7">
                Apps users{" "}
                <span className="gradient-text">open every day</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-7 md:mb-10">
                iOS and Android apps built for performance, usability, and real-world conditions — offline support, push notifications, payments, and smooth 60fps interactions included.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all">
                  Discuss Your App <ArrowRight size={15} />
                </Link>
                <Link href="/work" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-secondary/50 hover:border-primary/30 active:scale-[0.97] transition-all">
                  See Our Work
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" aria-hidden="true" />
      </section>

      {/* What It Is */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">What It Is</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">Mobile development, start to ship</h2>
          </ScrollReveal>
          <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
            <ScrollReveal delay={0.05}>
              <p>
                Mobile app development at amfire covers the complete journey — from architecture and UX flows to App Store submission and post-launch crash monitoring. We build with React Native for cross-platform projects and native Swift or Kotlin when your use case demands it.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p>
                Every app we ship is designed for real users on real devices: slow networks, low storage, background interruptions, and all. We bake in offline support, optimistic UI updates, and graceful error states from the start — because these are the things that define whether users keep your app or delete it.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">What We Build</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Deliverables</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deliverables.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/25 hover:bg-card/80 transition-all">
                  <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Decode the Stack */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">Decode the Stack</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Technologies we use</h2>
            <p className="text-sm text-muted-foreground mb-8">The tools that power your mobile product.</p>
          </ScrollReveal>
          <div className="flex flex-wrap gap-3">
            {stack.map((tech, i) => (
              <ScrollReveal key={tech.name} delay={i * 0.03}>
                <span className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card text-sm font-medium text-foreground hover:border-primary/40 hover:bg-secondary/50 transition-all cursor-default">
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
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Mobile apps we've shipped</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.title} delay={i * 0.08}>
                <div className="p-6 rounded-2xl border border-border bg-card hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all h-full flex flex-col">
                  <h3 className="text-base font-semibold text-foreground mb-2">{cs.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{cs.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {cs.tags.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-secondary border border-border text-xs font-medium text-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={0.15}>
            <div className="mt-6 text-center">
              <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                See all case studies <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          <ScrollReveal>
            <p className="text-xs font-semibold text-primary tracking-wider uppercase mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8">Common questions</h2>
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
              Ready to ship your mobile app?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto">
              Share your idea and we'll outline the screens, timeline, and budget within 48 hours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97] transition-all"
            >
              Discuss This Service <ArrowRight size={15} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </>
  );
}
