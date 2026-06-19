import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--page-fg)" }}
        >
          {title}
        </h2>
        {description && (
          <p
            className="mt-1 text-sm sm:text-base"
            style={{ color: "var(--admin-text-muted)" }}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
