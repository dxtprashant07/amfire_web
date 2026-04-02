import type { Metadata } from "next";
import { AuthProvider } from "@/components/client/AuthProvider";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { ClientMobileNav } from "@/components/client/ClientMobileNav";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Client Portal | amfire",
  robots: "noindex, nofollow",
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <div className="flex min-h-[calc(100vh-5rem)]">
          <ClientSidebar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">{children}</main>
        </div>
        <ClientMobileNav />
      </AuthProvider>
    </QueryProvider>
  );
}
