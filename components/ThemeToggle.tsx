"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <span
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-transparent"
        aria-hidden
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="mi-hover inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-800 shadow-sm transition-colors hover:bg-neutral-50 dark:border-slate-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <FiSun className="mi-svg size-[1.35rem]" aria-hidden /> : <FiMoon className="mi-svg size-[1.35rem]" aria-hidden />}
    </button>
  );
}
