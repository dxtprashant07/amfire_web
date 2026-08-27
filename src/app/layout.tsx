import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeInitializer } from "@/components/providers/ThemeInitializer";

export const metadata: Metadata = {
  title: {
    default: "amfire — AI-First Digital Solutions",
    template: "%s | amfire",
  },
  description:
    "amfire builds end-to-end digital products — web apps, mobile apps, AI agents, and automation. Complete software. Real intelligence.",
  keywords: ["web development", "mobile apps", "AI agents", "automation", "software company", "India"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "amfire — AI-First Digital Solutions",
    description: "We build end-to-end digital products — from the first pixel to the deployed AI agent.",
    url: "https://amfire.in",
    siteName: "amfire",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/logo.png", width: 480, height: 480, alt: "amfire" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "amfire — AI-First Digital Solutions",
    description: "We build end-to-end digital products — from the first pixel to the deployed AI agent.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head></head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeInitializer />
        {children}
      </body>
    </html>
  );
}
