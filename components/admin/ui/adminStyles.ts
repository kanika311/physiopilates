export const adminInputClass =
  "admin-focus-ring h-11 w-full rounded-[12px] border px-4 text-sm outline-none transition-all duration-200 sm:h-12 sm:text-base";

export const adminInputStyle = {
  borderColor: "var(--admin-border)",
  backgroundColor: "var(--admin-muted)",
  color: "var(--page-fg)",
} as const;

export const adminTextareaClass =
  "admin-focus-ring w-full rounded-[12px] border p-4 text-sm outline-none transition-all duration-200 sm:text-base";

export const adminSelectClass = adminInputClass;
