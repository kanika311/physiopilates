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

  const standalone = [
    "/admin/login",
    "/admin/forgot-password",
    "/admin/reset-password",
  ];

  if (standalone.includes(pathname)) {
    return <>{children}</>;
  }

  return <AdminLayout>{children}</AdminLayout>;
}
