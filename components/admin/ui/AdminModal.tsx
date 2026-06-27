"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";

import AdminButton from "@/components/admin/ui/AdminButton";

interface AdminModalProps {
  title: string;
  subtitle?: string;
  badge?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
}

const SANS =
  "var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif";

export default function AdminModal({
  title,
  subtitle,
  badge,
  children,
  onClose,
  footer,
}: AdminModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="admin-card admin-fade-in flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden"
        style={{ borderRadius: "var(--admin-radius-lg)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-start justify-between gap-4 border-b px-6 py-4"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2
                className="truncate text-lg font-bold leading-tight sm:text-xl"
                style={{
                  color: "var(--page-fg)",
                  fontFamily: SANS,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h2>
              {badge}
            </div>
            {subtitle && (
              <p
                className="mt-0.5 truncate text-[13px]"
                style={{ color: "var(--admin-text-muted)", fontFamily: SANS }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="admin-focus-ring flex size-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-[var(--admin-muted)]"
            style={{ color: "var(--admin-text-muted)" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div
          className="flex-1 overflow-y-auto px-6 py-5 text-sm"
          style={{ color: "var(--page-fg)" }}
        >
          {children}
        </div>

        {/* Footer */}
        <div
          className="flex flex-wrap justify-end gap-3 border-t px-6 py-4"
          style={{ borderColor: "var(--admin-border)" }}
        >
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
