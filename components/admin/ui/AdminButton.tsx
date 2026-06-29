import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost" | "outline";

interface AdminButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<
  ButtonVariant,
  { className: string; style: React.CSSProperties }
> = {
  primary: {
    className: "text-white hover:opacity-90",
    style: {
      background:
        "linear-gradient(135deg, var(--admin-accent) 0%, var(--admin-accent-muted) 100%)",
      boxShadow: "0 4px 16px rgb(15 118 110 / 0.28)",
    },
  },
  secondary: {
    className: "hover:opacity-90",
    style: {
      backgroundColor: "var(--admin-surface)",
      color: "var(--page-fg)",
      border: "1px solid var(--admin-border)",
    },
  },
  danger: {
    className: "text-red-600 hover:bg-red-100",
    style: {
      backgroundColor: "rgb(254 242 242)",
      border: "1px solid rgb(254 202 202)",
    },
  },
  ghost: {
    className: "hover:bg-[var(--admin-muted)]",
    style: {
      backgroundColor: "transparent",
      color: "var(--admin-text-muted)",
    },
  },
  outline: {
    className: "hover:bg-[var(--admin-muted)]",
    style: {
      backgroundColor: "var(--admin-surface)",
      color: "var(--page-fg)",
      border: "1px solid var(--admin-border)",
    },
  },
};

const baseClass =
  "admin-focus-ring inline-flex items-center justify-center gap-2 rounded-[12px] px-4 py-2.5 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

export default function AdminButton({
  variant = "primary",
  href,
  children,
  fullWidth,
  className = "",
  style,
  ...props
}: AdminButtonProps) {
  const v = variantStyles[variant];
  const classes = `${baseClass} ${v.className} ${fullWidth ? "w-full" : ""} ${className}`;

  const mergedStyle = { ...v.style, ...style };

  if (href) {
    return (
      <Link href={href} className={classes} style={mergedStyle}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} style={mergedStyle} {...props}>
      {children}
    </button>
  );
}
