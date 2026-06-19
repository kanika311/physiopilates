type BadgeVariant = "success" | "warning" | "neutral" | "accent";

interface AdminBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, React.CSSProperties> = {
  success: {
    backgroundColor: "var(--admin-accent-soft)",
    color: "var(--admin-accent)",
  },
  warning: {
    backgroundColor: "var(--admin-gold-soft)",
    color: "var(--admin-gold)",
  },
  neutral: {
    backgroundColor: "var(--admin-muted)",
    color: "var(--admin-text-muted)",
  },
  accent: {
    backgroundColor: "var(--admin-teal-soft)",
    color: "var(--admin-teal)",
  },
};

export default function AdminBadge({
  children,
  variant = "neutral",
}: AdminBadgeProps) {
  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
      style={variants[variant]}
    >
      {children}
    </span>
  );
}
