import type { Metadata } from "next";
import { AuthProvider } from "@/components/client/AuthProvider";
import { ClientSidebar } from "@/components/client/ClientSidebar";
import { ClientTopbar } from "@/components/client/ClientTopbar";
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
        <div className="flex min-h-screen">
          <ClientSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <ClientTopbar />
            <main className="mx-auto w-full max-w-[1200px] flex-1 p-8 pb-20 md:pb-8">{children}</main>
          </div>
        </div>
        <ClientMobileNav />
      </AuthProvider>
    </QueryProvider>
  );
}
