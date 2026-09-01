import type { Metadata } from "next";
import { AdminAuthProvider } from "@/components/admin/AdminAuthProvider";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { QueryProvider } from "@/components/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Admin | amfire",
  robots: "noindex, nofollow",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AdminAuthProvider>
        {/* .ui-admin scopes the admin UI kit's stylesheet. */}
        <div className="ui-admin">
          <div className="app">
            <AdminSidebar />
            <div className="main">
              <AdminTopbar />
              <div className="content">{children}</div>
            </div>
          </div>
        </div>
      </AdminAuthProvider>
    </QueryProvider>
  );
}
