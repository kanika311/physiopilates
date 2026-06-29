import type { ReactNode } from "react";

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: "md" | "lg" | "xl" | "2xl" | "full";
  action?: ReactNode;
}

const maxWidthClass = {
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
  "2xl": "max-w-5xl",
  full: "max-w-full",
};

export default function FormCard({
  title,
  description,
  children,
  maxWidth = "xl",
  action,
}: FormCardProps) {
  return (
    <div className={`mx-auto w-full ${maxWidthClass[maxWidth]}`}>
      <div
        className="admin-card p-5 sm:p-6 lg:p-8"
        style={{ borderRadius: "var(--admin-radius-lg)" }}
      >
        <div className="mb-6 flex items-start justify-between gap-4 sm:mb-8">
          <div>
            <h2
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: "var(--page-fg)" }}
            >
              {title}
            </h2>
            {description && (
              <p
                className="mt-2 text-sm sm:text-base"
                style={{ color: "var(--admin-text-muted)" }}
              >
                {description}
              </p>
            )}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
