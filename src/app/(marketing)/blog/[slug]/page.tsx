import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Tag } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { notFound } from "next/navigation";

/* ── Blog post data ─────────────────────────────────────────────────── */

const posts: Record<string, {
  title: string;
  category: string;
  readTime: string;
  date: string;
  excerpt: string;
  sections: { heading: string; body: string }[];
}> = {
  "ai-agent-development-india": {
    title: "AI Agent Development in India: What Businesses Need to Know in 2025",
    category: "AI & Agents",
    readTime: "8 min read",
    date: "Mar 2025",
    excerpt: "Autonomous AI agents are no longer a future concept — they are running in production for Indian businesses today.",
    sections: [
      {
        heading: "The Rise of AI Agents in India",
        body: "In 2025, AI agents have moved from experimental pilots to production systems across Indian enterprises. Unlike simple chatbots, these agents can autonomously perform multi-step tasks — from processing insurance claims to managing inventory replenishment cycles — without human intervention. The Indian market is uniquely positioned: a massive digital-first population, growing API infrastructure, and a strong engineering talent pool make it one of the fastest-growing markets for agentic AI adoption.",
      },
      {
        heading: "What Makes an AI Agent Different from a Chatbot?",
        body: "A chatbot responds to prompts. An AI agent acts on goals. The distinction is critical: agents maintain state, use tools (APIs, databases, file systems), make decisions based on context, and can coordinate with other agents. Think of it as the difference between a customer service rep who answers questions and a project manager who plans, delegates, and follows up autonomously. For Indian businesses, this means automating entire workflows — not just individual interactions.",
      },
      {
        heading: "Common Use Cases We're Building",
        body: "At amfire, the most common agent deployments we're building for Indian businesses include: document processing agents that read contracts and flag compliance risks, sales follow-up agents that manage leads across WhatsApp and email, operations agents that coordinate field teams and generate daily reports, and finance agents that reconcile invoices and flag anomalies. Each of these replaces 10-15 hours of manual work per week per team.",
      },
      {
        heading: "The Tech Stack Behind Production Agents",
        body: "Production-grade agents require more than an LLM API call. Our typical stack includes: an orchestration layer (LangChain or custom), a vector database for memory (pgvector or Pinecone), tool integrations via APIs, a state management system, and robust error handling with human-in-the-loop fallbacks. The LLM itself (Claude, GPT-4o, or Gemini) is just one component in a much larger system.",
      },
      {
        heading: "What to Consider Before Commissioning an Agent",
        body: "Before investing in AI agent development, businesses should evaluate: Is the workflow repetitive and rule-based enough to automate? What's the cost of errors (high-stakes workflows need human oversight)? Do you have clean, structured data to feed the agent? What's the expected ROI timeline? At amfire, we run a 2-week discovery sprint to answer these questions before writing any agent code.",
      },
    ],
  },
  "langchain-vs-custom-ai-agents": {
    title: "LangChain vs Custom AI Agents — Which Is Right for Your Startup?",
    category: "AI & Agents",
    readTime: "6 min read",
    date: "Feb 2025",
    excerpt: "Both approaches can build intelligent workflows. But the right choice depends on your scale, team, and budget.",
    sections: [
      {
        heading: "The Framework vs Custom Debate",
        body: "Every startup building AI features faces this decision: use LangChain (or similar frameworks like CrewAI, AutoGen) or build custom agent logic from scratch. There's no universal right answer — it depends on your team's expertise, your timeline, and how much control you need over agent behaviour. At amfire, we've shipped projects using both approaches, and the deciding factors are always practical, not theoretical.",
      },
      {
        heading: "When LangChain Makes Sense",
        body: "LangChain excels when you need rapid prototyping, your agent workflows are relatively standard (RAG, tool use, chain-of-thought), and your team wants to leverage a large ecosystem of pre-built integrations. For MVPs and proof-of-concept agents, LangChain can cut development time by 40-60%. It's also a good choice when you're exploring multiple LLM providers and want easy switching between them.",
      },
      {
        heading: "When Custom Agents Win",
        body: "Custom agents become the better choice when you need fine-grained control over execution flow, your workflow has complex branching logic that doesn't fit neatly into chains, you need to optimise for latency and cost at scale, or you want to avoid framework lock-in. For production systems processing thousands of requests daily, custom agents often deliver 2-3x better performance at lower LLM costs because you control exactly what gets sent to the model.",
      },
      {
        heading: "Our Recommendation",
        body: "Start with LangChain for your MVP. Validate the agent concept with real users. Once you've proven product-market fit and understand your workflow patterns deeply, migrate critical paths to custom logic while keeping LangChain for non-critical flows. This hybrid approach gives you speed-to-market without sacrificing long-term scalability.",
      },
    ],
  },
  "cost-saas-india-2025": {
    title: "What Does It Actually Cost to Build a SaaS Product in India?",
    category: "Business",
    readTime: "10 min read",
    date: "Feb 2025",
    excerpt: "Honest numbers, honest scope. We walk through the real cost of a SaaS MVP — frontend, backend, AI, deployment — without the fluff.",
    sections: [
      {
        heading: "Why Most Cost Estimates Are Wrong",
        body: "If you've searched 'cost to build a SaaS product in India,' you've probably seen numbers ranging from ₹2L to ₹50L with no real explanation. That's because most estimates ignore the biggest cost driver: scope. A SaaS product with 5 screens and basic auth is fundamentally different from one with multi-tenant architecture, role-based access, billing integration, and AI features. We're going to give you honest, specific numbers.",
      },
      {
        heading: "The MVP Tier: ₹1L – ₹3L",
        body: "A true MVP — 5-8 core screens, basic authentication, one primary workflow, a simple admin panel, and deployment — typically costs ₹1L to ₹3L when built by a competent team. This assumes: Next.js frontend, Node.js or FastAPI backend, PostgreSQL database, basic role-based access, and deployment on Vercel or Railway. Timeline: 3-6 weeks. This gets you something you can put in front of users and validate.",
      },
      {
        heading: "The Growth Tier: ₹3L – ₹10L",
        body: "Once you've validated your MVP, the growth tier adds: multi-tenant architecture, subscription billing (Razorpay/Stripe), advanced role-based access control, email notifications, analytics dashboard, API documentation, and comprehensive testing. If you're adding AI features (a chatbot, document processing, or recommendation engine), add ₹1L-₹3L depending on complexity. Timeline: 8-16 weeks.",
      },
      {
        heading: "The Enterprise Tier: ₹10L+",
        body: "Enterprise SaaS products include: white-labeling, SSO/SAML integration, audit logging, data export/import, advanced analytics, API rate limiting, SLA monitoring, compliance features (GDPR, SOC2 readiness), and dedicated infrastructure. These projects are typically ₹10L-₹30L+ and take 4-8 months. The cost isn't just in building — it's in the architecture decisions that allow the product to scale to thousands of tenants.",
      },
      {
        heading: "Hidden Costs Most Agencies Don't Mention",
        body: "Beyond development, budget for: domain and hosting (₹5K-₹20K/year), transactional email service (₹500-₹5K/month), error monitoring (Sentry — free tier usually sufficient), analytics (free with Plausible/PostHog), SSL certificates (free with Let's Encrypt), and ongoing maintenance (typically 10-15% of build cost annually). At amfire, we include 60 days of post-launch support in every project to cover the transition period.",
      },
    ],
  },
  "whatsapp-business-automation": {
    title: "WhatsApp Business API Automation for Indian Businesses in 2025",
    category: "Automation",
    readTime: "7 min read",
    date: "Jan 2025",
    excerpt: "WhatsApp is where Indian business happens. Here's how to automate lead follow-ups, order updates, and customer support.",
    sections: [
      {
        heading: "Why WhatsApp Automation Matters in India",
        body: "India has over 500 million WhatsApp users. For most Indian businesses — from D2C brands to B2B service providers — WhatsApp is the primary customer communication channel. Yet most businesses still manage WhatsApp manually: copy-pasting responses, forgetting follow-ups, and losing leads in cluttered chat threads. Automation changes this entirely.",
      },
      {
        heading: "What You Can Automate",
        body: "With the WhatsApp Business API and the right automation layer, you can automate: instant lead acknowledgment and qualification, order confirmation and shipping updates, appointment booking and reminders, customer support with AI-powered responses, payment reminders and invoice delivery, feedback collection and NPS surveys, and drip campaigns for nurturing leads. Each of these workflows runs 24/7 without human intervention.",
      },
      {
        heading: "The Technical Architecture",
        body: "A typical WhatsApp automation stack includes: a WhatsApp Business API provider (Twilio, Gupshup, or the official Meta API), a workflow orchestration layer (n8n, custom Node.js, or Python), a CRM or database for contact management, optional AI layer for intelligent responses (Claude or GPT for understanding customer intent), and webhook integrations for triggering workflows from external events (new order, payment received, form submitted).",
      },
      {
        heading: "Real Results We've Delivered",
        body: "For a field services company, we built a WhatsApp automation layer that handles job dispatch, timesheet capture, and invoice generation. The result: 15+ hours saved per team per week. For an EdTech client, we automated student enrollment confirmations, class reminders, and assignment notifications — reducing support tickets by 60%. These aren't hypothetical — they're running in production today.",
      },
    ],
  },
  "edtech-platform-tech-stack": {
    title: "Best Tech Stack for an EdTech Platform in India (2025 Guide)",
    category: "Web Dev",
    readTime: "9 min read",
    date: "Jan 2025",
    excerpt: "From LMS platforms to AI tutors — the architecture decisions that make or break an EdTech product at scale.",
    sections: [
      {
        heading: "The Indian EdTech Landscape in 2025",
        body: "Post the initial boom-and-correction cycle, Indian EdTech is maturing. The survivors aren't the ones with the most features — they're the ones with the best learning outcomes. This means the tech stack isn't just about building features; it's about enabling personalised, adaptive learning experiences at scale. The right architecture decisions made today will determine whether your platform can serve 100 users or 100,000.",
      },
      {
        heading: "Frontend: Next.js + React",
        body: "For EdTech platforms, we recommend Next.js with React. Server-side rendering ensures fast initial loads (critical for users on slow mobile connections in tier 2-3 cities), the App Router simplifies complex layouts (student dashboard, instructor panel, admin), and React's component model makes it easy to build reusable UI patterns like course cards, progress trackers, and assessment interfaces. Tailwind CSS for styling — it's fast to develop with and produces small CSS bundles.",
      },
      {
        heading: "Backend: Node.js or FastAPI",
        body: "Choose Node.js if your team is JavaScript-heavy and you want a unified language across the stack. Choose FastAPI (Python) if you're building AI features — Python's ML ecosystem is unmatched. For most EdTech platforms, we recommend FastAPI for the core API and AI services, with Next.js API routes handling simple CRUD operations. Database: PostgreSQL with pgvector for AI features, Redis for session management and caching.",
      },
      {
        heading: "AI Features That Actually Matter",
        body: "Skip the AI gimmicks. The AI features that genuinely improve learning outcomes are: adaptive assessments that adjust difficulty based on student performance, AI tutoring assistants that answer questions in context of the course material (RAG-based), automated content summarisation for revision, and intelligent progress analytics that identify at-risk students early. These features don't need custom ML models — they can be built with LLM APIs and good prompt engineering.",
      },
      {
        heading: "Infrastructure for Indian Scale",
        body: "Indian EdTech platforms face unique infrastructure challenges: variable internet speeds, mobile-first users, and price-sensitive audiences. Our recommendations: deploy on AWS Mumbai or GCP Mumbai for low latency, use a CDN (CloudFront or Cloudflare) for static assets and video content, implement progressive loading and offline-capable PWA features, compress video aggressively (HLS with adaptive bitrate), and keep hosting costs under control with serverless where possible (Vercel, Railway, or AWS Lambda).",
      },
    ],
  },
};

const slugs = Object.keys(posts);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = posts[slug];
    if (!post) return { title: "Post Not Found" };
    return {
      title: `${post.title} | amfire Blog`,
      description: post.excerpt,
    };
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const currentIndex = slugs.indexOf(slug);
  const prevSlug = currentIndex > 0 ? slugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < slugs.length - 1 ? slugs[currentIndex + 1] : null;

  return (
    <>
      <article className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
          {/* Back link */}
          <ScrollReveal>
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft size={14} /> Back to Blog
            </Link>
          </ScrollReveal>

          {/* Header */}
          <ScrollReveal delay={0.05}>
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground border border-border">
                <Tag size={11} />
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock size={11} />
                {post.readTime}
              </span>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-[1.15] mb-6">
              {post.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 pb-8 border-b border-border">
              {post.excerpt}
            </p>
          </ScrollReveal>

          {/* Sections */}
          <div className="space-y-8">
            {post.sections.map((section, i) => (
              <ScrollReveal key={i} delay={0.05 * i}>
                <section>
                  <h2 className="text-lg md:text-xl font-semibold text-foreground mb-3">{section.heading}</h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{section.body}</p>
                </section>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 p-8 rounded-2xl border border-border bg-card text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">Want to discuss this topic?</h3>
              <p className="text-sm text-muted-foreground mb-5">We&apos;d love to hear about your project and how we can help.</p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg gradient-bg text-white text-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all">
                Get in Touch <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>

          {/* Prev / Next */}
          <div className="mt-10 pt-8 border-t border-border flex items-center justify-between">
            {prevSlug ? (
              <Link href={`/blog/${prevSlug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={14} /> Previous
              </Link>
            ) : <span />}
            {nextSlug ? (
              <Link href={`/blog/${nextSlug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Next <ArrowRight size={14} />
              </Link>
            ) : <span />}
          </div>
        </div>
      </article>

    </>
  );
}
