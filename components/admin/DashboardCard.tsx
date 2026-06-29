import { ReactNode } from "react";
import { TrendingUp } from "lucide-react";

type CardVariant = "sage" | "teal" | "gold" | "sageMuted";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  variant?: CardVariant;
  trend?: string;
}

const variantStyles: Record<
  CardVariant,
  { iconBg: string; iconColor: string; accent: string; trendColor: string }
> = {
  sage: {
    iconBg: "var(--admin-accent-soft)",
    iconColor: "var(--admin-accent)",
    accent:
      "linear-gradient(135deg, rgb(15 118 110 / 0.06) 0%, transparent 60%)",
    trendColor: "var(--admin-accent)",
  },
  teal: {
    iconBg: "var(--admin-teal-soft)",
    iconColor: "var(--admin-teal)",
    accent:
      "linear-gradient(135deg, rgb(20 184 166 / 0.08) 0%, transparent 60%)",
    trendColor: "var(--admin-teal)",
  },
  gold: {
    iconBg: "var(--admin-gold-soft)",
    iconColor: "var(--admin-gold)",
    accent:
      "linear-gradient(135deg, rgb(15 118 110 / 0.07) 0%, transparent 60%)",
    trendColor: "var(--admin-gold)",
  },
  sageMuted: {
    iconBg: "rgb(20 184 166 / 0.12)",
    iconColor: "var(--admin-accent-muted)",
    accent:
      "linear-gradient(135deg, rgb(20 184 166 / 0.06) 0%, transparent 60%)",
    trendColor: "var(--admin-accent-muted)",
  },
};

export default function DashboardCard({
  title,
  value,
  icon,
  description,
  variant = "sage",
  trend,
}: DashboardCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className="admin-card admin-card-hover group relative overflow-hidden p-5 md:p-6"
      style={{ borderRadius: "var(--admin-radius-lg)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: styles.accent }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.08em] md:text-xs"
            style={{ color: "var(--admin-text-muted)" }}
          >
            {title}
          </p>

          <div className="mt-2 flex flex-wrap items-end gap-2">
            <h3
              className="text-2xl font-bold tracking-tight sm:text-3xl"
              style={{ color: "var(--page-fg)" }}
            >
              {value}
            </h3>

            {trend && (
              <span
                className="mb-1 inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{
                  backgroundColor: styles.iconBg,
                  color: styles.trendColor,
                }}
              >
                <TrendingUp size={11} />
                {trend}
              </span>
            )}
          </div>

          {description && (
            <p
              className="mt-2 line-clamp-2 text-xs md:text-sm"
              style={{ color: "var(--admin-text-muted)" }}
            >
              {description}
            </p>
          )}
        </div>

        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] transition-transform duration-300 group-hover:scale-105"
          style={{
            backgroundColor: styles.iconBg,
            color: styles.iconColor,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
