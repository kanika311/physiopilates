"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
