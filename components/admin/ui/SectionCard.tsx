import type { ReactNode } from "react";

interface SectionCardProps {
  title?: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function SectionCard({
  title,
  description,
  action,
  children,
  className = "",
  noPadding = false,
}: SectionCardProps) {
  return (
    <div
      className={`admin-card overflow-hidden ${className}`}
      style={{ borderRadius: "var(--admin-radius-lg)" }}
    >
      {(title || action) && (
        <div
          className="flex items-center justify-between border-b px-6 py-4"
          style={{ borderColor: "var(--admin-border)" }}
        >
          <div>
            {title && (
              <h3
                className="text-lg font-bold tracking-tight"
                style={{ color: "var(--page-fg)" }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--admin-text-muted)" }}
              >
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className={noPadding ? "" : "p-6"}>{children}</div>
    </div>
  );
}
