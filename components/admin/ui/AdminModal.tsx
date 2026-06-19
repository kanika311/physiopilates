import type { ReactNode } from "react";

import AdminButton from "@/components/admin/ui/AdminButton";

interface AdminModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
}

export default function AdminModal({
  title,
  children,
  onClose,
  footer,
}: AdminModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div
        className="admin-card w-full max-w-2xl p-6"
        style={{ borderRadius: "var(--admin-radius-lg)" }}
      >
        <h2
          className="mb-4 text-xl font-bold tracking-tight sm:text-2xl"
          style={{ color: "var(--page-fg)" }}
        >
          {title}
        </h2>

        <div className="space-y-3 text-sm" style={{ color: "var(--page-fg)" }}>
          {children}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          {footer ?? (
            <AdminButton variant="primary" onClick={onClose}>
              Close
            </AdminButton>
          )}
        </div>
      </div>
    </div>
  );
}
