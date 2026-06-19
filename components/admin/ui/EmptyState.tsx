import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="admin-card p-8 text-center sm:p-10"
      style={{ borderRadius: "var(--admin-radius-lg)" }}
    >
      <h3
        className="text-xl font-bold sm:text-2xl"
        style={{ color: "var(--page-fg)" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="mt-2 text-sm sm:text-base"
          style={{ color: "var(--admin-text-muted)" }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
