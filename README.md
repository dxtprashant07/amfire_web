# amfire — Website

Marketing website for **amfire** — an AI-First digital solutions agency.

Built with Next.js 16, React 19, Tailwind CSS v4, and Framer Motion.

---

## Tech stack

| Tool | Version | Purpose |
|---|---|---|
| Next.js | 16.2.1 | Framework (App Router) |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | v4 | Styling (CSS-first, no config file) |
| Framer Motion | 12 | Scroll animations, hero blobs |
| Lucide React | latest | Icons |
| clsx + tailwind-merge | latest | Conditional class merging (`cn()`) |
| Zod | 4 | Form validation (ready to wire up) |

---

## Teammate local setup

Follow these steps on a fresh clone to run `amfire` locally with the fewest setup issues.

### 1. Install required software

- Git
- Node.js LTS 20 or newer
- npm
- Access to the real `.env.local` values from the project owner

Check versions if needed:

```bash
node -v
npm -v
```

### 2. Clone the repo and install dependencies

```bash
git clone <repo-url>
cd amfire
npm install
```

If `npm install` is interrupted or looks broken, delete `node_modules` and run `npm install` again.

### 3. Create `.env.local`

Copy `.env.example` to `.env.local`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS / Linux:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in the real values.

Required for the app and database:

- `DATABASE_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`

Required for Zoho CRM integration:

- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REFRESH_TOKEN`
- `ZOHO_API_DOMAIN`
- `ZOHO_ACCOUNTS_URL`

Required for email integration:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` if you want a custom sender address

Public or environment-specific values:

- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_SITE_URL`

Important:

- Set `NEXT_PUBLIC_APP_URL=http://localhost:3000` for local development.
- Until the env naming is fully unified, set both `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_SITE_URL` to the same local value to avoid confusion.
- Never commit `.env.local`.

### 4. Generate Prisma client

This project imports the generated Prisma client from `src/generated/prisma`, so run:

```bash
npx prisma generate
```

If this step is skipped, the app may fail because the generated Prisma client will be missing.

### 5. Apply database migrations

Make sure `DATABASE_URL` points to a valid PostgreSQL / Supabase database, then run:

```bash
npx prisma migrate deploy
```

This will apply the committed migrations to the database.

### 6. Optional: seed an admin user

Only do this if you need initial admin login data in the database.

The seed file is `prisma/seed.ts`. If your machine does not already have a TypeScript runner available, install one first:

```bash
npm install -D tsx
npx tsx prisma/seed.ts
```

Seed-related env vars if you want custom admin credentials:

- `SEED_ADMIN_EMAIL`
- `SEED_ADMIN_PASSWORD`
- `SEED_ADMIN_NAME`

If these are not set, the seed script uses its own defaults.

### 7. Start the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### 8. Optional validation commands

After the app starts, you can also run:

```bash
npm run build
npm run lint
```

### 9. Common issues and fixes

`DATABASE_URL environment variable is not set`

- Check that `.env.local` exists in the repo root.
- Check that `DATABASE_URL` is filled in correctly.
- Restart the terminal after updating env values if needed.

`Cannot find module '@/generated/prisma/client'` or Prisma client import errors

- Run `npx prisma generate` again.

Prisma migration or connection errors

- Re-check the `DATABASE_URL`.
- Make sure the database is reachable from your machine.
- Make sure the database user has permission to apply migrations.

Zoho or email features are not working

- Confirm the related env vars are present in `.env.local`.
- These integrations require real credentials; the app can start without them, but those features will fail.

Port `3000` is already in use

- Run the dev server on another port:

```bash
npm run dev -- --port 3001
```

If dependencies look corrupted

- Delete `node_modules`
- Run `npm install` again

### 10. Recommended teammate run order

Use this exact order on a fresh clone:

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

If you also need seed data:

```bash
npm install -D tsx
npx tsx prisma/seed.ts
```

---

## Project structure

```
src/
├── app/                    # Next.js App Router — pages & global config
│   ├── globals.css         # Design tokens (colors, fonts, theme), Tailwind setup
│   ├── layout.tsx          # Root layout: Navbar, metadata, dark-mode script
│   └── page.tsx            # Homepage — assembles sections, imports from data/
│
├── components/
│   ├── layout/             # Site-wide layout pieces
│   │   ├── Navbar.tsx      # Top nav: dropdowns, mobile menu, dark/light toggle
│   │   └── Footer.tsx      # Footer: newsletter, social links, nav columns
│   │
│   ├── ui/                 # Reusable utility components (used across any page)
│   │   ├── ScrollReveal.tsx    # Framer Motion scroll-aware fade-in wrapper
│   │   └── FloatingButtons.tsx # WhatsApp + back-to-top floating buttons
│   │
│   └── home/               # Homepage section components
│       ├── AnimatedTagline.tsx     # Cycling hero tagline phrases
│       ├── HeroBackground.tsx      # Animated gradient mesh behind hero
│       ├── ServiceCard.tsx         # Single service card with 3D tilt effect
│       ├── ServicesCarousel.tsx    # Mobile-only auto-sliding services carousel
│       ├── WhyAmfireCards.tsx      # Auto-rotating "Why amfire" cards (3 at a time)
│       ├── IndustryCard.tsx        # Industry card with hover/tap tooltip
│       ├── TestimonialsCarousel.tsx # Client testimonials with auto-advance + controls
│       ├── TrustedBy.tsx           # Auto-scrolling logo marquee
│       └── NewsletterForm.tsx      # Email signup form (stub — wire to API)
│
├── data/
│   └── home.ts             # ← ALL homepage content lives here
│                           #   Edit to update stats, services, testimonials, etc.
│
├── constants/
│   └── navigation.ts       # ← Nav links and footer links
│
├── types/
│   └── index.ts            # Shared TypeScript interfaces
│
└── lib/
    └── utils.ts            # cn() utility for merging Tailwind classes
```

---

## Common tasks

### Edit homepage content
All copy, icons, and data for the homepage lives in **`src/data/home.ts`**.
No component changes needed — just edit the arrays in that file.

### Edit nav / footer links
Edit **`src/constants/navigation.ts`**.

### Add a new page
Create `src/app/your-page/page.tsx`. Navbar and Footer appear automatically from the root layout.

### Change brand colors
Edit CSS variables in **`src/app/globals.css`** under `:root` (light) and `.dark` (dark mode).

### Add a new homepage section
1. Create `src/components/home/MySection.tsx`
2. Add any data it needs to `src/data/home.ts`
3. Import and place it in `src/app/page.tsx`

### Add environment variables
Copy `.env.example` to `.env.local` and fill in values. Never commit `.env.local`.

---

## Important notes for contributors

- **Tailwind v4** is CSS-first — no `tailwind.config.ts`. Theme tokens live in `globals.css` inside `@theme inline {}`.
- **Server vs Client components**: Components with `useState`, event handlers, or browser APIs need `"use client"` at the top. Icons passed from Server → Client must be pre-rendered JSX (`<Icon size={20} />`), not component references.
- **Dark mode**: Toggled by adding/removing the `dark` class on `<html>`. Persisted in `localStorage`. An inline `<script>` in `layout.tsx` prevents flash on reload.
- **Path alias**: `@/` maps to `src/`. Always use `@/` imports, not relative paths like `../../`.
