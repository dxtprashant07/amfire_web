# amfire Website — Complete Build Skill

> Single source of truth for building the amfire company website. Frontend theme from the existing codebase. Content, features, pages, and backend from the 83-page blueprint (v3). Nothing skipped.

---

## 1. IDENTITY & PURPOSE

**Brand:** amfire — AI-First Digital Solutions
**Tagline:** "End-to-end digital products — from the first pixel to the deployed AI agent."
**Domain:** amfire.in | contact@amfire.in

The website serves 3 purposes simultaneously:
1. **Generate leads** — every visitor guided toward contacting amfire
2. **Demonstrate capability** — the website IS a live portfolio
3. **Operate as a business tool** — CRM, client portal, admin dashboard, analytics

> This is NOT a brochure website. It is a full-stack product. Build it as you would build a SaaS platform for a client.

---

## 2. TECH STACK (Current Codebase)

### Frontend
| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.2.1 | App Router, SSG/ISR/SSR |
| React | 19.2.4 | UI components |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4 | CSS-first `@theme`, `@tailwindcss/postcss` |
| Framer Motion | 12.38.0 | Scroll reveals, animations |
| Lucide React | 1.7.0 | Icons |
| clsx + tailwind-merge | 2.1.1 / 3.5.0 | Class utilities |

### Blueprint Additions (Not Yet Installed)
| Tool | Purpose | Phase |
|------|---------|-------|
| GSAP (GreenSock) | Scrollytelling, hero animations | 3 |
| shadcn/ui | Accessible component library | 2 |
| React Hook Form | Multi-step form state | 1 |
| Zod | Schema validation (frontend + backend) | 1 |
| Zustand | Global state (theme, chatbot, navbar) | 2 |
| TanStack Query | Server state, data fetching in admin/portal | 2 |
| Sentry (@sentry/nextjs) | Error tracking frontend + backend | 1 |
| Prisma ORM | Type-safe DB queries | 1 |
| bcrypt | Password hashing (cost 12) | 1 |
| jose / jsonwebtoken | JWT auth tokens | 1 |
| Resend | Transactional + newsletter emails | 1 |
| Upstash Redis | Rate limiting, caching | 1 |
| Vitest | Unit testing | 1 |
| React Testing Library | Component testing | 2 |
| Playwright | E2E + accessibility testing | 1 |

### Infrastructure
| Service | Purpose |
|---------|---------|
| Vercel | Hosting, CDN, auto-deploy from GitHub |
| Supabase | PostgreSQL DB + file storage |
| Cloudflare | DNS, DDoS protection, CDN |
| GitHub | Code repo, CI/CD via Actions |

---

## 3. DESIGN SYSTEM (From Existing Codebase — PRIMARY)

### Color System — Orange-First
```css
/* Light mode */
:root {
  --primary: 5 77% 57%;        /* Orange-red — THE brand color */
  --accent: 25 87% 58%;        /* Warm orange */
  --background: 0 0% 100%;     /* White */
  --foreground: 0 0% 10%;      /* Near-black text */
  --card: 0 0% 100%;           /* White cards */
  --secondary: 0 0% 96%;       /* Light gray */
  --muted-foreground: 0 0% 45%; /* Gray text */
  --border: 0 0% 90%;          /* Light borders */
  --destructive: 0 84% 60%;    /* Red */
  --radius: 0.5rem;            /* 8px */
}

/* Dark mode */
.dark {
  --background: 0 0% 6%;       /* Near-black */
  --foreground: 0 0% 95%;      /* Near-white */
  --card: 0 0% 9%;             /* Dark surface */
  --secondary: 0 0% 15%;
  --muted-foreground: 0 0% 60%;
  --border: 0 0% 18%;
  /* --primary and --accent stay same */
}
```

### Blueprint Color Additions
| Role | Hex | Usage |
|------|-----|-------|
| Fire Orange (PRIMARY) | #F97316 | ALL CTAs, links, active nav, focus rings, hover highlights, icons |
| Deep Orange (hover) | #EA580C | Button/link hover states |
| Soft Orange | #FFF7ED | Badge backgrounds, pill highlights (light mode) |
| Orange Glow | rgba(249,115,22,0.15) | Card hover glow, focus rings |
| Cool Blue (AI SECONDARY) | #3B82F6 | AI chatbot, estimator, 'Powered by AI' badges ONLY |
| Soft Blue | #EFF6FF | AI-related card backgrounds ONLY |
| Success Emerald | #16A34A | Checkmarks, availability badge |
| Warning Amber | #CA8A04 | Limited availability |
| Danger Red | #DC2626 | Errors, fully booked badge |

**Color usage rule:** Orange 70% of accents. Blue 15% (AI features ONLY). Neutrals 15%.

### Gradients
| Name | CSS | Usage |
|------|-----|-------|
| gradient-text | `linear-gradient(135deg, hsl(5 77% 57%) 0%, hsl(25 87% 58%) 100%)` | Key headline words |
| gradient-bg | Same as above applied as background | CTA sections, buttons |
| gradient-border | Pseudo-element mask-composite border | Card borders |
| Hero Gradient | `from-[#F97316] via-[#FB923C] to-[#FCD34D]` | CTA section bg, hero accents |
| Card Hover Glow | `radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)` | Card hover warmth |
| AI Accent | `from-[#3B82F6] to-[#8B5CF6]` | AI chatbot/estimator header ONLY |
| Text Fire | `from-[#F97316] to-[#F59E0B]` | Hero headline fire effect |

### Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| Display / Hero | Syne or Cabinet Grotesk | 60-72px | 800 ExtraBold |
| H1 | Syne or Cabinet Grotesk | 40-48px | 700 Bold |
| H2 | Syne or Cabinet Grotesk | 28-32px | 600 SemiBold |
| H3 (Card headings) | Inter | 20-22px | 600 SemiBold |
| Body | Inter | 15-17px | 400 Regular |
| Captions / Labels | Inter | 12-13px | 400 Regular |
| Code / Tech Labels | JetBrains Mono | 13-14px | 400 Regular |

**Current codebase uses:** Inter (via `next/font/google`). Blueprint adds Syne/Cabinet Grotesk for display headings and JetBrains Mono for tech labels.

**Rules:**
- All fonts via `next/font/google` — NEVER external CDN `<link>` tags
- Heading letter-spacing: `-0.02em` (tracking-tight) on display and H1
- Body line-height: `1.7` (leading-relaxed). Never tighter.
- Body max-width: `680px` for paragraph blocks
- Caption letter-spacing: `+0.02em` (tracking-wide) for uppercase eyebrow labels
- Minimum font size: NEVER below 15px for body text

### Spacing System — 8px Grid (Non-Negotiable)
| Token | Value | Usage |
|-------|-------|-------|
| space-xs | 8px | Inside buttons, icon-to-label gap |
| space-sm | 16px | Between related elements |
| space-md | 24px | Card grid gaps, form field gaps |
| space-lg | 32px | Between sub-sections |
| space-xl | 48px | Section heading to content |
| space-2xl | 64px | Section container padding (top/bottom) |
| space-3xl | 96px | Section-to-section gap |
| space-4xl | 128px | Hero section padding |
| space-5xl | 160px | Maximum spacer |

### Anti-Crowding Rules (Hard Constraints)
- Max content width: **1280px** (current codebase uses 1200px container)
- Section padding: minimum **96px** top and bottom (hero gets 128px)
- Card grid gap: minimum **32px** (services grid uses 48px)
- Cards per row: **NEVER more than 3** on desktop for service/industry cards
- Card internal padding: minimum **40px** all sides (service cards get 48px)
- Body text max-width: **680px** for paragraphs
- CTA buttons: never closer than **16px** apart
- Navbar height: **80px** minimum
- Navbar item gap: **32px** minimum
- Tablet: 2-column cards (NEVER 3 below 1024px)
- Mobile: single column, card padding 32px, section padding 64px
- Footer padding: 96px top, 48px bottom, 48px between columns

### Texture & Depth
- Noise/grain: subtle CSS SVG noise at 3-6% opacity site-wide
- Glassmorphism: `backdrop-filter: blur(16px)`, `bg: rgba(255,255,255,0.05)`, `border: 1px solid rgba(255,255,255,0.08)`
- Card elevation idle: `box-shadow: 0 4px 24px rgba(0,0,0,0.08)`
- Card elevation hover: `box-shadow: 0 16px 48px rgba(0,0,0,0.2)`
- Technical grid: faint dot/grid pattern on dark sections
- Card border radius: **20px** (rounded-2xl)

### Motion & Animation
| Token | Value | Usage |
|-------|-------|-------|
| transition-fast | 150ms cubic-bezier(0.16, 1, 0.3, 1) | Button hover, icon hover, link color |
| transition-base | 200ms cubic-bezier(0.16, 1, 0.3, 1) | Dropdown, tooltip, form focus |
| transition-smooth | 300ms cubic-bezier(0.16, 1, 0.3, 1) | Theme toggle, page transitions, navbar |
| transition-reveal | 600ms cubic-bezier(0.16, 1, 0.3, 1) | Scroll reveals, card entrances |

**Rules:**
- Easing: always ease-out or above cubic-bezier. NEVER linear. NEVER bouncy spring.
- All animations must be purposeful — explain, reveal, or guide. NEVER decorative only.
- Respect `prefers-reduced-motion`: reduce to simple opacity fades, disable parallax/tilt/particles, stop auto-carousels.

---

## 4. COMPLETE PAGE ARCHITECTURE

### A. Public Marketing Pages
| Page | URL | Phase | Status |
|------|-----|-------|--------|
| Homepage (10 sections) | `/` | 1 | EXISTS |
| Services Overview | `/services` | 1 | EXISTS |
| Web Development | `/services/web-development` | 2 | EXISTS |
| Mobile Apps | `/services/mobile-apps` | 2 | EXISTS |
| AI & Agents | `/services/ai-agents` | 2 | EXISTS |
| Automation | `/services/automation` | 2 | EXISTS |
| Cloud & DevOps | `/services/cloud-devops` | 2 | EXISTS |
| How We Work | `/how-we-work` | 2 | EXISTS |
| Industries Overview | `/industries` | 2 | EXISTS |
| EdTech | `/industries/edtech` | 2 | EXISTS |
| Healthcare | `/industries/healthcare` | 2 | EXISTS |
| Retail & E-Commerce | `/industries/retail` | 2 | EXISTS |
| Real Estate | `/industries/real-estate` | 2 | EXISTS |
| Finance & Fintech | `/industries/fintech` | 2 | EXISTS |
| Startups & SaaS | `/industries/saas` | 2 | EXISTS |
| Portfolio / Case Studies | `/portfolio` (blueprint) or `/work` (current) | 3 | EXISTS as `/work` |
| About Us | `/about` | 2 | EXISTS |
| Blog | `/blog` | 4 | EXISTS (static) |
| Blog Post | `/blog/[slug]` | 4 | MISSING |
| Pricing | `/pricing` | 4 | EXISTS |
| FAQ | `/faq` | 2 | EXISTS |
| Contact | `/contact` | 1 | EXISTS |
| Estimate (AI Estimator) | `/estimate` | 3 | MISSING |
| Careers | `/careers` | 2 | EXISTS |
| Changelog | `/changelog` | 4 | MISSING |
| Referral | `/referral` | 3 | MISSING |
| 404 Page | `/404` | 4 | EXISTS as `not-found.tsx` |
| Error Page | `error.tsx` | 1 | EXISTS |

### B. Legal Pages
| Page | URL | Phase | Status |
|------|-----|-------|--------|
| Privacy Policy | `/legal/privacy-policy` | 4 | MISSING |
| Terms of Service | `/legal/terms-of-service` | 4 | MISSING |
| Refund & Cancellation | `/legal/refund-policy` | 4 | MISSING |
| Cookie Policy | `/legal/cookie-policy` | 4 | MISSING |

### C. Auth Pages
| Page | URL | Phase | Status |
|------|-----|-------|--------|
| Admin Login | `/admin/login` | 1 | EXISTS (basic) |
| Client Login | `/client/login` | 2 | MISSING |
| Forgot Password | `/auth/forgot-password` | 2 | MISSING |
| Reset Password | `/auth/reset-password` | 2 | MISSING |

### D. Admin Dashboard (Private)
| Page | URL | Phase | Status |
|------|-----|-------|--------|
| Dashboard Home | `/admin` | 2 | MISSING |
| Leads | `/admin/leads` | 1 | EXISTS (basic) |
| Clients | `/admin/clients` | 2 | MISSING |
| Projects | `/admin/projects` | 2 | MISSING |
| Team | `/admin/team` | 2 | MISSING |
| Content Manager | `/admin/content` | 2 | MISSING |
| Blog Manager | `/admin/blog` | 4 | MISSING |
| Analytics | `/admin/analytics` | 2 | MISSING |
| Invoices | `/admin/invoices` | 2 | MISSING |
| Settings | `/admin/settings` | 2 | MISSING |

### E. Client Portal (Private)
| Page | URL | Phase | Status |
|------|-----|-------|--------|
| Client Home | `/client` | 2 | MISSING |
| Project Details | `/client/project` | 2 | MISSING |
| Payments | `/client/payments` | 2 | MISSING |
| Documents | `/client/documents` | 2 | MISSING |
| Feedback | `/client/feedback` | 2 | MISSING |
| Support | `/client/support` | 2 | MISSING |

---

## 5. NAVBAR SPECIFICATION

**Structure:** 5 visible items + dropdowns. Fixed, full-width, z-50.

| Position | Element | Details |
|----------|---------|---------|
| Left | Logo | SVG text: 'am' in foreground, 'fire' in gradient-text. 120px wide. |
| Center | Solutions (dropdown) | Services Overview, Web Dev, Mobile Apps, AI & Agents, Automation, Cloud & DevOps, [divider], Industries, How We Work, Pricing |
| Center | Work (dropdown) | Portfolio & Case Studies, Industries, How We Work, Pricing |
| Center | About (dropdown) | Our Story, FAQ, Careers |
| Center | Blog | Direct link |
| Center | Contact | Direct link |
| Right | Dark/Light toggle | 24px sun/moon icon with smooth morph |
| Right | "Get a Proposal" | Orange rounded-full CTA button |

**Desktop (768px+):**
- Height: 80px. Transparent on load → glassmorphism on scroll (backdrop-blur-xl + bg-black/80 dark / bg-white/80 light)
- Bottom border on scroll: 1px solid brand orange at 10% opacity
- Smart hide/reveal: hides after 200px scroll-down (translateY -80px, 300ms), reveals on scroll-up
- 3px orange scroll progress bar at very top of viewport
- Nav items: 32px gap, font-weight 500, 15px. Active: 2px orange underline
- Dropdowns: glassmorphism panel on hover (200ms delay), slides from -8px to 0 with opacity

**Mobile (<768px):**
- Hamburger icon right-side, morphs to X
- Full-screen overlay, items centered, 48px gap
- "Get a Proposal" pinned to bottom
- Solutions/About expand as accordions
- NO scroll hide/reveal — navbar always visible

**Current Status:** EXISTS with all above features implemented.

---

## 6. HOMEPAGE — 10 SECTIONS

| # | Section | Content | Key Behaviour |
|---|---------|---------|---------------|
| 1 | Navbar | See section 5 | Fixed, glassmorphism, smart hide/reveal, progress bar |
| 2 | Hero | Morphing headline + sub-headline + availability pill badge + social proof numbers + 2 CTAs: 'Start a Project' + 'See Our Work' | Animated particle/gradient mesh bg. Text morphs every 3s. Numbers embedded below headline. |
| 3 | Services Grid | 6 large cards: Web, Mobile, AI, Automation, Cloud, UI/UX. Icon + title + 2-line desc + Learn More | 3-col grid, 32px gap, 48px card padding. Lift 8px on hover + orange glow. 3D tilt on cursor (desktop). Staggered entrance (100ms/card). NO flip. |
| 4 | How We Work Strip | 7-step horizontal timeline with icons | Steps animate on scroll. Click to expand detail. Numbers count up. |
| 5 | Featured Story | Scroll-triggered client story, paragraph by paragraph. Combined Scrollytelling + Case Study Spotlight. | GSAP ScrollTrigger pins section. Paragraphs reveal on scroll. Ends with solution link. |
| 6 | Industries We Serve | 6 industry cards with icon + 2-line desc | Hover reveals use cases. Click to sub-page. 3-col desktop, 2-col tablet. |
| 7 | Why amfire | Comparison table: amfire vs Typical Agency vs Freelancer with animated checkmarks | Checkmarks animate on scroll. amfire column: orange left border. |
| 8 | Testimonials | 3 client quotes with name, company, avatar | Auto-advance 5s. Pause on hover. Swipe on mobile. Orange pill active dot. |
| 9 | CTA Section | Full-width dark/orange gradient band. Strong headline. Two buttons. | Animated grain texture bg. Orange primary CTA, outline secondary. |
| 10 | Footer | Logo, grouped links, social icons, newsletter input, legal links, PageSpeed badge | Dark bg, 96px top padding, 48px cols. WhatsApp fixed bottom-right. Back-to-top with progress ring. |

**Current homepage status:** All sections exist but some differ from blueprint (services uses carousel instead of tilt grid, case study is carousel instead of scrollytelling, "Why amfire" is cards instead of comparison table).

---

## 7. SERVICE SUB-PAGES — Standard Template

Every `/services/[service]` page must follow:
1. **Hero** — Service name, one-line description, CTA
2. **What It Is** — Plain language explanation (2 paragraphs)
3. **What We Build** — Bullet list of specific deliverables
4. **Decode the Stack** — Animated tech icons with hover tooltips explaining why each tool was chosen
5. **Case Studies** — 1-2 relevant past projects with Before/After slider
6. **FAQ** — 5 questions specific to this service
7. **CTA** — 'Discuss this service' button linking to contact form

**Current status:** All 5 service sub-pages exist with hero, features, case studies, FAQ, CTA. Missing: "Decode the Stack" animated tech icons, Before/After slider.

---

## 8. INDUSTRY SUB-PAGES — Standard Template

Each `/industries/[industry]` page covers:
- Hero with industry name and description
- Common challenges in the industry
- What amfire builds for this industry (specific deliverables)
- Case studies relevant to this industry
- FAQ specific to this industry
- CTA

**Current status:** All 6 industry sub-pages exist with this structure.

---

## 9. PORTFOLIO / CASE STUDY PAGE

Each case study must contain:
- Project title + industry tag
- Client's problem (1 paragraph, no client name — e.g. 'An EdTech startup in Pune...')
- What amfire built — solution description
- Results — measurable outcomes (time saved, users onboarded, accuracy %)
- Before vs After slider — visual comparison (draggable handle, glow effect)
- Tech stack breakdown — animated icons + hover tooltips ("Decode the Stack")
- Testimonial quote if available

**Placeholder strategy (0-1 real projects):**
1. amfire website as Case Study 1 (legitimate — many agencies do this)
2. 1-2 concept/demo projects labelled as 'Concept Project'
3. Open source / side projects
4. LinkedIn recommendations as testimonial alternatives
5. Progressive layout: single-column if < 3 projects, then 2-col, then 3-col

---

## 10. CONTACT PAGE — Multi-Step Smart Form

**4-step wizard (NOT simple Name/Email/Message):**

| Step | Question | Type |
|------|----------|------|
| 1 | What do you want to build? | Clickable option cards (Web App / Mobile App / AI Agent / Automation / Full Product) |
| 2 | Budget range? | Clickable cards (Under ₹1L / ₹1L-3L / ₹3L-10L / ₹10L+) |
| 3 | When to start? | Clickable cards (ASAP / 1 Month / 3 Months / Just Exploring) |
| 4 | Your details + message | Name, Email, Phone, Company (optional), Message textarea |

**After submission:**
- Animated success message + orange confetti (2s)
- Auto-reply email to user via Resend
- Notification email to amfire team via Resend
- Lead saved to CRM automatically
- AI classification of inquiry (background, invisible to user)

**Current status:** EXISTS with 4 steps, option cards, progress bar. Missing: React Hook Form + Zod, Resend emails, AI classification.

---

## 11. UNIQUE & SIGNATURE FEATURES

### 11.1 AI Project Builder / Cost Estimator (`/estimate`) — Phase 3
Interactive configurator:
- Select what to build → Select industry → Select features → Select timeline
- AI generates rough estimate: timeline range + cost range + tech stack suggestion
- Output on-page (not emailed) with CTA: 'Get a detailed proposal in 48 hours'
- Powered by Claude API / GPT-4o

### 11.2 Live 'Currently Building' Feed — Phase 3
Small section/ticker on homepage showing amfire is active:
- "Currently building: AI-powered LMS for an EdTech client in Pune — Week 3 of 7"
- Updated manually by admin (30 seconds to update)
- Signals credibility and activity

### 11.3 Scrollytelling Section (Featured Story) — Phase 3
Scroll-triggered story on homepage:
- Panels: 'Imagine 200 leads...' → '...manual spreadsheet entry' → '...6 hours per campaign' → '...amfire built an agent: 4 minutes'
- GSAP ScrollTrigger pins section
- Paragraphs reveal on scroll

### 11.4 Service Comparison Table — Phase 3
Animated comparison: amfire vs Typical Agency vs Freelancer
- Rows: AI Integration Sprint, Client Portal, Post-Launch Support, Agentic Architecture, India-First, Milestone Payments, Single Contact, Full IP Transfer
- Checkmarks animate on scroll
- amfire column: orange accent border

### 11.5 'What We Won't Do' Section — Phase 2
On About page:
- No projects without signed scope
- No coding before design approval
- No vanishing after delivery
- No selling data
- No overloading capacity

### 11.6 Decode the Stack — Phase 3
On case study + service pages:
- Tech icons with entrance animation
- Hover tooltip: 'Next.js — used for server-side rendering and SEO optimisation'
- Labelled: 'Built with:'

### 11.7 Real-Time Availability Badge — Phase 3
Dynamic badge in navbar or hero:
- Green: '🟢 Accepting 2 new projects for April 2025'
- Yellow: '🟡 1 slot remaining this month'
- Red: '🔴 Fully booked — join the waitlist'
- Admin-managed

### 11.8 Before vs After Project Slider — Phase 3
Draggable left-right slider on case studies:
- Left: old/manual process screenshot
- Right: amfire-built system screenshot
- Glow handle in centre

### 11.9 Morphing/Typing Hero Text — Phase 4
Homepage headline changes every 3 seconds:
- 'We build AI Agents' → 'We build Agentic Workflows' → 'We build Intelligent Systems'
- Fade out / type in animation

### 11.10 PageSpeed Proof Badge — Phase 4
Footer badge:
- '⚡ This website scores 97 on Google PageSpeed. We build every client site the same way.'

---

## 12. BACKEND ARCHITECTURE

### API Routes Required
| Endpoint | Method | Purpose | Phase |
|----------|--------|---------|-------|
| `/api/contact` | POST | Contact form → validate (Zod) → save to DB → trigger emails | 1 |
| `/api/admin/login` | POST | Admin authentication (JWT) | 1 |
| `/api/client/login` | POST | Client authentication | 2 |
| `/api/auth/forgot-password` | POST | Password reset token via email | 2 |
| `/api/auth/reset-password` | POST | Reset with time-limited token | 2 |
| `/api/auth/refresh` | POST | Silent token refresh | 1 |
| `/api/admin/leads` | GET/PATCH | Lead CRUD + pipeline management | 1 |
| `/api/admin/clients` | GET/POST/PATCH | Client management | 2 |
| `/api/admin/projects` | GET/POST/PATCH | Project management | 2 |
| `/api/admin/team` | GET/POST/PATCH/DELETE | Team management | 2 |
| `/api/admin/content` | GET/PATCH | CMS — edit homepage, services, team, case studies | 2 |
| `/api/admin/blog` | GET/POST/PATCH/DELETE | Blog CRUD | 4 |
| `/api/admin/invoices` | GET/POST/PATCH | Invoice tracker | 2 |
| `/api/admin/settings` | GET/PATCH | Site settings (availability badge, email templates, webhooks) | 2 |
| `/api/client/project` | GET | Client's project milestones | 2 |
| `/api/client/payments` | GET | Client's invoices | 2 |
| `/api/client/documents` | GET | Client's shared files | 2 |
| `/api/client/feedback` | POST | Submit milestone feedback | 2 |
| `/api/client/support` | POST | Raise support ticket | 2 |
| `/api/newsletter/subscribe` | POST | Newsletter signup | 2 |
| `/api/newsletter/unsubscribe` | POST | One-click unsubscribe | 2 |
| `/api/ai/chat` | POST | AI chatbot endpoint | 3 |
| `/api/ai/estimate` | POST | AI project estimator | 3 |
| `/api/gdpr/export` | POST | Data export for DSAR | 3 |
| `/api/gdpr/delete` | POST | Data deletion (right to be forgotten) | 3 |
| `/api/webhook/slack` | POST (internal) | Fire-and-forget Slack notifications | 2 |

### Database Schema — 14 Tables
```
users            — id, name, email, password_hash, role (super_admin/admin/sales/developer), created_at
clients          — id, name, email, phone, company, created_at
leads            — id, name, email, phone, service_interest, budget, timeline, message, status (new/contacted/discovery/proposal/negotiation/won/lost/nurture), assigned_to, source, utm_params, notes, follow_up_date, created_at
projects         — id, client_id, title, service_type, status, start_date, deadline
milestones       — id, project_id, title, description, percentage, status, due_date, completed_at
payments         — id, project_id, milestone_id, amount, status, due_date, paid_at
documents        — id, project_id, name, file_url, uploaded_by, created_at
blog_posts       — id, title, slug, content, author, tags, published_at, status
testimonials     — id, client_name, company, quote, rating, created_at
settings         — key, value (availability badge, email templates, webhook URLs)
subscribers      — id, email, name, source (footer/blog/exit_popup), status (active/unsubscribed), subscribed_at, unsubscribed_at
audit_log        — id, user_id, action, entity_type, entity_id, old_value (JSON), new_value (JSON), ip_address, created_at (WRITE-ONLY)
changelog_entries — id, title, description, category (feature/fix/update), published_at, created_by
career_positions — id, title, type (full-time/contract/internship), location, description, is_active, created_at, updated_at
```

---

## 13. AUTHENTICATION SYSTEM

### Two Portals
1. **Admin Portal** (`/admin/login`) — amfire team
2. **Client Portal** (`/client/login`) — signed clients with active projects

### Roles & Permissions
| Role | Access | Can Do | Cannot Do |
|------|--------|--------|-----------|
| Super Admin | Full | Everything | Nothing restricted |
| Admin | High | View/edit leads, manage projects/clients, publish blog, edit content | Cannot delete Super Admin, cannot access billing |
| Sales Staff | Limited | View/update leads, add notes, assign leads | Cannot edit content, cannot see financial data |
| Developer Staff | Limited | View milestones, update status, upload docs | Cannot see leads or financial data |
| Client | Portal only | Own project, milestones, invoices, docs, feedback | Cannot see other clients or admin data |

### Auth Flow
1. User visits `/admin/login` or `/client/login`
2. Enters email + password
3. Backend verifies (bcrypt comparison, cost factor 12)
4. Issues JWT access token (15 min) + refresh token (7 days, httpOnly cookie)
5. Access token in memory (NOT localStorage)
6. Every API request: Authorization header
7. Silent refresh when access token expires
8. Logout: invalidate refresh token, clear cookie

### Security
- Min 8 char passwords (frontend + backend enforced)
- Lock account after 5 failed attempts for 15 min
- Password reset: time-limited token via email (1 hour expiry)
- All admin/client routes protected by middleware
- 2FA (TOTP) recommended for Super Admin

---

## 14. CRM — Lead Management

### Pipeline Stages
New → Contacted → Discovery Call Done → Proposal Sent → Negotiation → Won / Lost / Nurture

### Lead Record Fields
- Contact: name, email, phone, company
- From form: service interest, budget, timeline, message
- Tracking: source (google/linkedin/referral/direct), UTM parameters
- Internal: assigned_to, status, notes, activity log, follow-up date

### Automated Actions on New Lead
1. Save to database
2. Auto-reply email to visitor: "We received your inquiry. You will hear from us within 48 hours."
3. Notification email to admin/sales team
4. Lead appears in `/admin/leads` as "New" with badge
5. Slack webhook notification (if configured)

---

## 15. CLIENT PORTAL

> amfire's single biggest differentiator from other Indian agencies. Eliminates 'WhatsApp update requests' entirely.

### Features
| Feature | What Client Sees |
|---------|-----------------|
| Project Overview | Name, start date, status, team contacts, next milestone date |
| Milestone Tracker | Visual progress bar + 7 milestones (green/blue/grey) |
| Milestone Details | Deliverables, completion date, notes from amfire |
| Payments Tab | 4 payment milestones: amount, due date, paid date, download invoice PDF |
| Documents Tab | Proposal, contract, design files, handover docs + download |
| Feedback Tab | Rating + text comment on completed milestones |
| Support Tab | Raise support ticket (post-launch) |
| Contact Card | Direct email + WhatsApp link for project contact |

### Payment Milestones
| Milestone | % | Trigger |
|-----------|---|---------|
| 01 | 20% | Project kickoff + contract signed |
| 02 | 30% | UI + core backend on staging |
| 03 | 25% | AI integration complete + tested |
| 04 | 25% | Production launch + handover |

---

## 16. ADMIN DASHBOARD

### Dashboard Home Stats
- Total Leads (This Month)
- Conversion Rate
- Active Projects
- Revenue This Month
- Website Visitors Today
- Pending Follow-ups

### Content Manager (Edit Without Code)
- Homepage: hero headline, subheadline, stats, CTA text
- Availability badge: status + message
- Services: descriptions, features, pricing ranges
- Team members: add/remove profiles, photos, bios
- Case studies: add/edit problem/solution/result/tech stack
- Testimonials: add, edit, approve, remove
- Blog: full rich text editor — create, edit, publish, schedule, delete
- FAQ: add, edit, reorder
- Currently Building feed: update active project status

---

## 17. AI FEATURES

### 17.1 Ask amfire AI — Chatbot (Phase 3)
- Floating chat button bottom-right on all pages
- Pre-trained on: company profile, services, process, pricing, FAQ
- Lead capture: asks for email when user inquires about projects
- Implementation: Claude API with RAG over company docs + system prompt
- Fallback: "I do not have that information — would you like to speak with our team?"
- Cost: ~$10-30/month (Claude Sonnet)

### 17.2 AI Project Estimator (Phase 3)
- On `/estimate` or homepage
- User selects: what to build → industry → features → timeline
- AI generates: timeline range + cost range + tech stack suggestion
- CTA: 'Get a detailed proposal in 48 hours' → contact form pre-filled
- Cost: ~$2-5/month (Claude Haiku)

### 17.3 Smart Form Intelligence (Phase 3)
- As user types Step 4 message, AI silently classifies: service type, urgency, budget tier, industry
- Classification appended to lead record (invisible to user)
- Cost: ~$1-3/month (Claude Haiku)

---

## 18. NEWSLETTER & EMAIL CAPTURE

### Three Touchpoints
| # | Location | Copy | Source |
|---|----------|------|--------|
| 1 | Footer (every page) | "Get AI insights and amfire updates. No spam, unsubscribe anytime." | `footer` |
| 2 | Blog post bottom | "Enjoyed this? Get our latest articles delivered to your inbox." | `blog` |
| 3 | Exit intent popup (desktop only) | "Before you go — want our free guide to choosing the right tech stack?" | `exit_popup` |

### Flow
- Submit → API saves to `subscribers` table with source
- Auto-reply via Resend: "Welcome — you are now subscribed."
- Every email has one-click unsubscribe (CAN-SPAM/GDPR)
- Exit popup: once per session (sessionStorage flag)

---

## 19. CAREERS PAGE (`/careers`)

### Sections
1. **Hero** — "Build the future of AI with us." + culture/mission text
2. **Company Values** — 3-4 large cards with icon: 'Ship fast, learn faster', 'AI-first thinking', 'Ownership over tasks'
3. **Open Positions** — Cards: title, type, location, description, Apply button (mailto: with pre-filled subject)
4. **No Openings State** — "We don't have open positions right now, but we're always looking for exceptional people. Send your portfolio to careers@amfire.in"
5. **Why amfire** — Benefits: early equity, remote-first, fast learning, real client work, AI-first culture

Positions managed from Admin Content Manager (no code changes).

---

## 20. COMPREHENSIVE INTERACTIVITY DESIGN SYSTEM

### Buttons — All States
| State | Behaviour |
|-------|-----------|
| Idle | Orange bg (#F97316), white text, rounded-full, shadow-sm |
| Hover | Bg darkens to #EA580C, translateY(-2px), shadow grows, 150ms |
| Active/Click | translateY(0), shadow reduces, ripple from click point (orange 20%, 400ms) |
| Focus | 3px orange outline ring, 2px offset |
| Loading | Text → 20px white spinner, fixed width |
| Disabled | Opacity 50%, no hover, cursor not-allowed |
| Secondary | Transparent bg, 1px orange border, orange text. Hover: orange fill, white text |
| Ghost | No border, orange text. Hover: soft orange bg (rgba(249,115,22,0.08)) |

### Links
| State | Behaviour |
|-------|-----------|
| Default | Orange color, no underline |
| Hover | Underline slides in from left (200ms). Darkens to Deep Orange. |
| Active | Underline stays. scale(0.98) on click. |
| External | Small arrow icon appears on hover (12px inline) |
| Visited | Blue (#3B82F6) — one of blue's few uses |

### Cards — All Types
| State | Behaviour |
|-------|-----------|
| Idle | Surface bg, subtle border, rounded-2xl (20px), shadow-sm |
| Hover | translateY(-8px), orange glow border (rgba(249,115,22,0.2)), shadow deepens, 400ms |
| Tilt (desktop) | 3D perspective following cursor. Max 4 deg. 60fps. Disabled on mobile + reduced motion. |
| Click | scale(0.98) briefly then navigate |
| Entrance | fade-up: translateY(40px) to 0 + opacity 0 to 1. 600ms. Stagger 100ms/card. |
| NEVER | Card flip animation. Flipping hides content and feels gimmicky. |

### Form Fields
| State | Behaviour |
|-------|-----------|
| Idle | Surface bg, 1px border, rounded-xl (16px), 48px height, 16px h-padding. Floating label. |
| Focus | Orange border + orange glow (3px, 0.1 opacity). Label floats up to 12px. |
| Valid | Green checkmark animates in right side (200ms) |
| Error | Red border. Error message slides below (200ms). 2px shake, 3 cycles. Inline, NEVER alert box. |
| Textarea | Auto-grows. Smooth height transition (150ms). |

### Navigation Dropdown
- Open: translateY(-8px) to 0 + opacity 0 to 1, 200ms
- Close: reverse, 150ms
- Glassmorphism panel, 16px padding, 8px gap, rounded-xl
- Items: hover = soft orange bg fill. Active = orange left border (3px)

### Scroll Interactions
- Section reveal: IntersectionObserver 0.15. translateY(40px) to 0 + opacity. 600ms. Stagger 100ms.
- Parallax: hero bg at 0.5x, decorative at 0.3x. Disabled on mobile.
- Counter animations: 0 to target over 1.5s, easeOut, triggered on viewport entry
- NO snap scrolling
- Back-to-top: 48px circle, above WhatsApp, appears after 400px, progress ring, smooth-scroll 600ms

### Page Transitions
- Route change: current fades out (200ms), new fades in (300ms)
- Logo/navbar persist — no transition
- Orange NProgress bar at top during transitions
- Dark/light toggle: all colors cross-fade 300ms. No flash. System preference detected. localStorage.

### Fixed UI Stack Order
| Element | Z-Index | Position |
|---------|---------|----------|
| Cookie banner | z-40 | Fixed bottom, full-width |
| WhatsApp button | z-50 | Fixed bottom-right, 24px from edges. 56px green circle. Pulse every 5s. |
| Back-to-top | z-50 | Above WhatsApp. 48px. Progress ring. |
| AI Chatbot | z-60 | Above WhatsApp. Blue gradient. Slide up + scale 0.8. |
| Modals | z-70 | Backdrop blur. Escape + backdrop click close. |
| Toast notifications | z-80 | Top-right or bottom-center. Auto-dismiss 4s. Orange/red/amber. |
| Navbar | z-90 | Highest persistent. |

---

## 21. ACCESSIBILITY (WCAG 2.1 AA — Non-Negotiable)

- Semantic HTML: `nav`, `main`, `section`, `article`, `aside`, `footer`. Proper heading hierarchy (h1→h2→h3, no skipping).
- Skip-to-content link first focusable element on every page
- All interactive elements Tab-reachable in logical order
- Focus rings: 3px orange outline, 2px offset
- All images: descriptive alt text
- All icon-only buttons: `aria-label`
- All form fields: associated `<label>`
- Dynamic content: `aria-live` regions
- Color contrast: minimum 4.5:1 body text, 3:1 large text / interactive
- Touch targets: minimum 44x44px on mobile
- `prefers-reduced-motion`: disable parallax, tilt, particles, auto-carousels
- `autocomplete` on name, email, phone fields
- Test with axe-core via Playwright in CI

---

## 22. LOADING & ERROR STATES

### Skeleton Loading
| Section | Pattern |
|---------|---------|
| Blog list | Card skeletons: header bar, image rect, 3 text lines, tag bar |
| Case studies | Image rect + 3 text lines |
| Admin dashboard | 4 stat card skeletons + table row skeletons (3-col, 10 rows) |
| Admin leads | Table: header + 8 rows with 4-column shimmer |
| Client milestones | Vertical list: circle + 2 text bars per milestone |
| AI chatbot | Three-dot wave animation typing indicator |
| AI estimator | Full result card skeleton with shimmer |

### Error States
| Scenario | Treatment |
|----------|-----------|
| API failure | Inline error + retry button. Data preserved. |
| Form validation | Per-field error messages (NEVER alert boxes). Red border + shake. |
| Network offline | Amber banner top of page. Dismissible. |
| Session expired | Centered modal: "Session expired" + "Go to Login" button. |
| Empty state | Illustration + message + action button |
| 404 | Branded page with logo, large 404, friendly message, 3 nav buttons |
| 500 | Branded page. "Something went wrong. We've been notified." Sentry auto-captures. |
| AI chatbot failure | "Having trouble connecting. Try again or contact us at contact@amfire.in" + retry |

---

## 23. SEO STRATEGY

### Technical SEO (Every Page)
- Unique title (50-60 chars) with keyword
- Meta description (150-160 chars) with keyword + CTA
- Open Graph: og:title, og:description, og:image
- Canonical URL per page
- JSON-LD: Organisation, Service, BlogPosting schemas
- XML sitemap (auto-generated, submitted to Search Console)
- robots.txt: exclude `/admin`, `/client`
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Image Optimization
- ALL images via `next/image` — NEVER raw `<img>` tags
- `placeholder="blur"` + `blurDataURL` on above-fold images
- `priority` prop on hero/LCP images
- Responsive `sizes` attribute on every image
- Max dimensions: hero 1920px, cards 800px, thumbnails 400px
- Files in `/public/images/` with descriptive snake_case names

### Rendering Strategy
| Page | Strategy | Cache |
|------|----------|-------|
| Homepage | SSG + ISR (revalidate: 3600) | CDN, hourly refresh |
| Service pages | SSG | CDN, rebuild on deploy |
| Industry pages | SSG | CDN |
| Blog list | ISR (revalidate: 60) | CDN + 1-min |
| Blog post | SSG (generateStaticParams) | CDN per slug |
| Portfolio | ISR (revalidate: 3600) | CDN + hourly |
| Contact | SSG (form is client-side API) | CDN |
| Estimate | SSG (AI call is client-side) | CDN |
| Admin | SSR (no cache) | Always fresh |
| Client portal | SSR (no cache) | Always fresh |
| Legal pages | SSG | CDN |
| Careers | ISR (revalidate: 3600) | CDN + hourly |
| Changelog | ISR (revalidate: 3600) | CDN + hourly |

---

## 24. COOKIE CONSENT

- Fixed bottom, full-width, glassmorphism, z-40
- "Accept All" (orange primary) + "Manage Preferences" (ghost link)
- Manage modal: 3 toggles — Essential (always on), Analytics, Marketing
- Default: only essential cookies until user accepts
- localStorage: `{ accepted, analytics, timestamp }`. Hides 6 months.
- Analytics script does NOT load without consent. Plausible is cookie-free.

---

## 25. SECURITY CHECKLIST

- HTTPS/SSL (auto by Vercel)
- Passwords: bcrypt hash, cost 12
- JWT: access in memory, refresh in httpOnly cookie
- Rate limiting: Upstash Redis on `/api/contact` and `/api/auth`
- CORS: only allow own domain
- Environment variables: `.env` files, never in Git, Vercel env vars
- Input validation: Zod on all API inputs
- reCAPTCHA v3 on contact form
- CSP headers via Next.js middleware
- Login lockout: 15 min after 5 failures
- Database: server-only access, never exposed to frontend
- npm audit regularly, Dependabot on GitHub

---

## 26. TESTING STRATEGY

| Type | Tool | What | When |
|------|------|------|------|
| Unit | Vitest | Utils, Zod schemas, API validators, formatters | Every save + PR |
| Component | React Testing Library + Vitest | Multi-step form, nav dropdown, carousel, skeletons | Every PR |
| E2E | Playwright | Contact form, admin login, client portal, blog, newsletter | Every PR + nightly |
| Accessibility | axe-core via Playwright | WCAG 2.1 AA on all public pages | Every PR |
| Visual regression | Playwright screenshots | Homepage, contact, services baseline comparison | Every PR |
| Performance | Lighthouse CI (GitHub Actions) | PageSpeed 90+, Core Web Vitals | Every PR (fail if < 90) |

---

## 27. INTEGRATIONS

| Integration | Tool | Cost |
|-------------|------|------|
| Email | Resend.com | Free up to 3,000/month |
| Booking | Cal.com (free cloud tier) | Free |
| WhatsApp | wa.me link | Free |
| Analytics | Plausible or Google Analytics 4 | Free (GA4) |
| AI Chatbot | Claude API (Anthropic) | ~$10-30/month |
| File Storage | Supabase Storage | Free tier |
| Maps | Google Maps Embed API | Free |
| Social share | Native share URLs | Free |
| Search Console | Google | Free |
| Uptime | UptimeRobot | Free tier |
| Error tracking | Sentry | Free 5,000 errors/month |
| Slack webhooks | Slack Incoming Webhook | Free |

---

## 28. SOCIAL MEDIA

| Platform | URL | Priority |
|----------|-----|----------|
| LinkedIn | linkedin.com/company/amfire | HIGH — primary B2B |
| GitHub | github.com/amfire-in | HIGH — technical credibility |
| Twitter/X | twitter.com/amfirein | MEDIUM — brand awareness |
| Instagram | instagram.com/amfire.in | LOW — employer brand |

---

## 29. GDPR / DATA PRIVACY

- DSAR Export: `POST /api/gdpr/export` — returns JSON of all data for email
- Data Deletion: `POST /api/gdpr/delete` — anonymise/delete across all tables
- Data retention: leads 3 years, clients 7 years, subscribers until unsubscribed, audit logs 2 years
- Privacy email: privacy@amfire.in — acknowledge within 3 days, fulfill within 30

---

## 30. REFERRAL PROGRAM

- `/referral` page explaining program + reward
- Reward: 5% credit on next project / free month of maintenance / public shout-out
- Manual tracking: 'Referred by' field in lead record
- Optional form field: "How did you hear about us?" (Google / LinkedIn / Referral / Other)
- Client Portal CTA: "Know a business that could benefit? Refer them."

---

## 31. DATABASE BACKUP

### Free Tier (Before Revenue)
- Manual dump before every production deployment (minimum weekly)
- `supabase db dump -f backup_YYYY-MM-DD.sql`
- Store in Google Drive: `amfire-backups/database/`
- Keep last 4 weekly backups

### Pro Tier (After Revenue)
- Automatic daily backups (7-day retention)
- Point-in-time recovery (PITR)
- Still keep weekly manual exports as secondary

---

## 32. BUILD PHASES

### Phase 1 — Go Live (Weeks 1-3)
- Spacing system + orange-first colors in Tailwind
- next/font for ALL fonts, next/image for ALL images
- Navbar with dropdowns, progress bar, smart hide/reveal
- Homepage 10 sections with proper spacing
- Services Overview page
- Contact page with multi-step form (React Hook Form + Zod)
- Backend: contact API + lead storage + email notifications
- Admin login + basic leads view
- SSL, domain, Vercel deployment
- SEO: titles, meta, robots.txt, sitemap
- WhatsApp button + back-to-top
- Cookie consent banner
- Skeleton loading states
- Semantic HTML, accessibility basics
- Sentry error tracking
- Basic E2E test for contact form
- SSG for all marketing pages

### Phase 2 — Core Business (Weeks 4-6)
- All 5 service sub-pages
- All 6 industry pages
- About, How We Work, FAQ, Careers pages
- Admin dashboard: leads pipeline, projects, content manager (TanStack Query)
- Client portal: milestones, payments, documents (TanStack Query)
- Staff roles + permissions
- Invoice tracker (4-milestone model)
- Audit log
- Newsletter signup (footer)
- Loading skeletons for admin/client portal
- Error states for all forms
- ISR for blog/portfolio, SSR for admin/client
- Login lockout

### Phase 3 — Differentiation (Weeks 7-9)
- Portfolio page with Before/After slider
- AI chatbot (Ask amfire AI)
- AI Project Estimator
- Scrollytelling section
- Comparison table
- Live 'Currently Building' feed
- Availability badge (admin-managed)
- Decode the Stack
- GDPR endpoints

### Phase 4 — Growth & Content (Weeks 10-12)
- Blog with full CMS + 5 posts
- Pricing page
- All legal pages
- Changelog page
- Exit intent popup
- Blog bottom newsletter CTA
- Performance optimization (95+ PageSpeed)
- PageSpeed badge in footer
- Morphing hero text
- Custom cursor + particle trail
- Magnetic buttons
- Noise/grain texture site-wide
- Full dark/light toggle + system preference
- Full Playwright E2E suite
- Lighthouse CI in GitHub Actions
- Accessibility audit (axe-core)
- Visual regression tests

---

## 33. COST BREAKDOWN (INR)

### Day-One Launch: ~₹67/month
- Vercel Free, Supabase Free, Resend Free, Zoho Mail Free, Gemini Flash API Free, Upstash Free, GA4 Free, UptimeRobot Free, Cal.com Free, GitHub Free
- Only cost: .in domain ~₹67/month

### Full Production Stack: ~₹7,997/month
- Vercel Pro ₹1,660 + Supabase Pro ₹2,075 + Domains ₹167 + Google Workspace ₹360 + Claude API ₹1,660-2,490 + Plausible ₹830 + Figma ₹1,245

---

## 34. EXISTING COMPONENT INVENTORY

### Layout
- `Navbar.tsx` — Full desktop/mobile nav with dropdowns, theme toggle, scroll progress, smart hide
- `Footer.tsx` — 4-column, newsletter, social links, legal

### UI
- `ScrollReveal.tsx` — Framer Motion scroll-triggered animations (4 directions)
- `FloatingButtons.tsx` — WhatsApp + back-to-top
- `CookieBanner.tsx` — Cookie consent

### Home
- `AnimatedTagline.tsx` — 4 rotating phrases, 2.8s cycle
- `HeroBackground.tsx` — 3 ambient blobs + 7 floating cards (desktop)
- `CaseStudyCarousel.tsx` — 1-card fade carousel
- `SubpageCaseStudyCarousel.tsx` — Generic carousel for sub-pages
- `TestimonialsCarousel.tsx` — Auto-rotate, 1 mobile / 2 desktop
- `ServicesCarousel.tsx` — Mobile 1-card carousel
- `ServicesCarouselDesktop.tsx` — Desktop 3-card sliding carousel
- `SimpleCardsCarouselDesktop.tsx` — Generic 3-card carousel
- `TrustedBy.tsx` — Client logos
- `WhyAmfireCards.tsx` — Differentiator grid
- `IndustryCard.tsx` — Industry card
- `ServiceCard.tsx` — Service card
- `NewsletterForm.tsx` — Email subscription

### Contact
- `ContactForm.tsx` — 4-step wizard form

### Data
- `src/data/home.ts` — stats, services, differentiators, processSteps, industries, caseStudies, testimonials
- `src/constants/navigation.ts` — nav links, footer links
- `src/types/index.ts` — TypeScript interfaces
- `src/lib/utils.ts` — cn() class merge utility

---

## 35. WEBHOOK SYSTEM

| Event | Trigger | Target |
|-------|---------|--------|
| New lead | Contact form saved to DB | Slack #leads |
| Lead status changed | Admin moves pipeline stage | Slack or Zapier |
| New client signed | Lead marked Won + account created | Slack #wins |
| Milestone completed | Admin marks milestone complete | Email to client |

Webhook URLs stored in `settings` table. Admin configures in `/admin/settings`. Fire-and-forget POST with `{ event, timestamp, data }`. Log in `webhooks_log` table.

---

## 36. CHANGELOG PAGE (`/changelog`)

Company updates, new capabilities, milestones. Categories: feature / fix / update. Higher signal than blog. Managed from Admin Content Manager. ISR revalidate: 3600.

---

## 37. DISASTER RECOVERY

| Scenario | Steps | Time |
|----------|-------|------|
| Accidental record deletion | Check audit_log, re-insert via pgAdmin | 15-30 min |
| Table truncation | Maintenance page → restore from backup SQL | 1-3 hours |
| Supabase project deleted | New project → Prisma migrate → restore data → update env vars | 2-4 hours |
| Vercel broken | Roll back to previous deployment (one click) | 5-15 min |
| Domain/DNS failure | Renew + restore DNS in Cloudflare | 1-6 hours |

All credentials in secure password manager (Bitwarden).
