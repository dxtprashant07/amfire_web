import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { NewsletterForm } from "@/components/home/NewsletterForm";

export const revalidate = 60; // ISR: revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Blog | amfire",
  description:
    "Technical articles, AI insights, and amfire updates — insights from India's AI-first software engineering team.",
};

const categories = ["All", "AI & Agents", "Web Dev", "Mobile", "Automation", "Cloud", "Business"];

const posts = [
  {
    slug: "ai-agent-development-india",
    title: "AI Agent Development in India: What Businesses Need to Know in 2025",
    excerpt:
      "Autonomous AI agents are no longer a future concept — they are running in production for Indian businesses today. Here's what you need to know before commissioning one.",
    category: "AI & Agents",
    readTime: "8 min read",
    date: "Mar 2025",
  },
  {
    slug: "langchain-vs-custom-ai-agents",
    title: "LangChain vs Custom AI Agents — Which Is Right for Your Startup?",
    excerpt:
      "Both approaches can build intelligent workflows. But the right choice depends on your scale, team, and budget. We break it down honestly.",
    category: "AI & Agents",
    readTime: "6 min read",
    date: "Feb 2025",
  },
  {
    slug: "cost-saas-india-2025",
    title: "What Does It Actually Cost to Build a SaaS Product in India?",
    excerpt:
      "Honest numbers, honest scope. We walk through the real cost of a SaaS MVP — frontend, backend, AI, deployment — without the fluff.",
    category: "Business",
    readTime: "10 min read",
    date: "Feb 2025",
  },
  {
    slug: "whatsapp-business-automation",
    title: "WhatsApp Business API Automation for Indian Businesses in 2025",
    excerpt:
      "WhatsApp is where Indian business happens. Here's how to automate lead follow-ups, order updates, and customer support without a human in the loop.",
    category: "Automation",
    readTime: "7 min read",
    date: "Jan 2025",
  },
  {
    slug: "edtech-platform-tech-stack",
    title: "Best Tech Stack for an EdTech Platform in India (2025 Guide)",
    excerpt:
      "From LMS platforms to AI tutors — the architecture decisions that make or break an EdTech product at scale in the Indian market.",
    category: "Web Dev",
    readTime: "9 min read",
    date: "Jan 2025",
  },
];

export default function BlogPage() {
  return (
    <>
      {/* ── Header ───────────────────────────────────────────────── */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <p className="text-sm font-medium text-primary tracking-wider uppercase mb-4">
              Blog
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
              Insights from the <span className="gradient-text">build floor.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg leading-relaxed">
              Technical articles, AI deep-dives, and honest business perspectives from amfire's engineering team.
            </p>
          </ScrollReveal>

          {/* Categories */}
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-2 mt-10">
              {categories.map((cat, i) => (
                <button
                  key={cat}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    i === 0
                      ? "gradient-bg text-white border-transparent"
                      : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Posts grid ───────────────────────────────────────────── */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 0.07}>
                <article className="group flex flex-col p-7 rounded-xl border border-border bg-card hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground border border-border">
                      <Tag size={11} />
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={11} />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-base font-semibold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-5 pt-5 border-t border-border">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Read <ArrowRight size={12} />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          {/* Coming soon note */}
          <ScrollReveal delay={0.3}>
            <div className="mt-12 p-6 rounded-xl border border-dashed border-border text-center">
              <p className="text-sm text-muted-foreground">
                More articles coming soon. Publishing minimum 2 posts per month.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Newsletter CTA ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">
              Get new posts in your inbox
            </h2>
            <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
              No spam. Just high-signal articles on AI engineering and product building.
            </p>
            <div className="max-w-md mx-auto">
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
