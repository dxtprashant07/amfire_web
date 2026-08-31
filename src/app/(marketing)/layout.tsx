import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/ui/FloatingButtons";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg gradient-bg text-white text-sm font-medium"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
