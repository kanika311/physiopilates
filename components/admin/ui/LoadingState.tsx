interface LoadingStateProps {
  message?: string;
  className?: string;
}

export default function LoadingState({
  message = "Loading...",
  className = "",
}: LoadingStateProps) {
  return (
    <div
      className={`admin-card flex items-center justify-center p-10 ${className}`}
      style={{ borderRadius: "var(--admin-radius-lg)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-10 w-10">
          <div
            className="absolute inset-0 rounded-full border-[3px]"
            style={{ borderColor: "var(--admin-accent-softer)" }}
          />
          <div
            className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent"
            style={{ borderTopColor: "var(--admin-accent)" }}
          />
        </div>
        <p
          className="text-sm font-medium"
          style={{ color: "var(--admin-text-muted)" }}
        >
          {message}
        </p>
      </div>
    </div>
  );
}
