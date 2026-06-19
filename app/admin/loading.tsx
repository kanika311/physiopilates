export default function Loading() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ backgroundColor: "var(--admin-bg)" }}
    >
      <div className="flex flex-col items-center">
        <div className="relative h-12 w-12">
          <div
            className="absolute inset-0 rounded-full border-4"
            style={{ borderColor: "var(--admin-accent-softer)" }}
          />
          <div
            className="absolute inset-0 animate-spin rounded-full border-4 border-transparent"
            style={{ borderTopColor: "var(--admin-accent)" }}
          />
        </div>

        <p
          className="mt-5 text-sm font-medium"
          style={{ color: "var(--admin-text-muted)" }}
        >
          Loading...
        </p>
      </div>
    </div>
  );
}
