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
        {/* .ui-portal scopes the client-portal UI kit's stylesheet. */}
        <div className="ui-portal">
          <div className="app">
            <ClientSidebar />
            <div className="main">
              <ClientTopbar />
              <div className="content">{children}</div>
            </div>
          </div>
        </div>
        <ClientMobileNav />
      </AuthProvider>
    </QueryProvider>
  );
}
