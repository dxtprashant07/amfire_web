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
        <div className="flex min-h-screen">
          <AdminSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AdminTopbar />
            <main className="mx-auto w-full max-w-[1300px] flex-1 p-8">{children}</main>
          </div>
        </div>
      </AdminAuthProvider>
    </QueryProvider>
  );
}
