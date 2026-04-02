import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/ui/FloatingButtons";
import { CookieBanner } from "@/components/ui/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "amfire — AI-First Digital Solutions",
    template: "%s | amfire",
  },
  description:
    "amfire builds end-to-end digital products — web apps, mobile apps, AI agents, and automation. Complete software. Real intelligence.",
  keywords: ["web development", "mobile apps", "AI agents", "automation", "software company", "India"],
  openGraph: {
    title: "amfire — AI-First Digital Solutions",
    description: "We build end-to-end digital products — from the first pixel to the deployed AI agent.",
    url: "https://amfire.in",
    siteName: "amfire",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "amfire — AI-First Digital Solutions",
    description: "We build end-to-end digital products — from the first pixel to the deployed AI agent.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on reload */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.add('dark')}}catch(e){}` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg gradient-bg text-white text-sm font-medium"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
        <CookieBanner />
      </body>
    </html>
  );
}
