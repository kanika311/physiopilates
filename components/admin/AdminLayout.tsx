"use client";

import type { ReactNode } from "react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { AdminPageProvider, useAdminPageTitle } from "@/components/admin/AdminPageContext";

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const title = useAdminPageTitle();

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "var(--admin-bg)" }}
    >
      <AdminSidebar />

      <div className="min-w-0 flex-1 lg:ml-72">
        <AdminHeader title={title} />

        <main className="admin-fade-in space-y-6 p-4 pt-20 sm:space-y-8 sm:p-6 sm:pt-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminPageProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminPageProvider>
  );
}
