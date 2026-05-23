"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Soft fade-up when section enters view — skips animation if user prefers reduced motion. */
export default function RevealOnScroll({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setRevealed(true);
          io.disconnect();
        });
      },
      { threshold: 0.04, rootMargin: "0px 0px -4% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  return (
    <div ref={ref} className={`reveal-on-scroll w-full ${revealed ? "reveal-on-scroll--visible" : ""} ${className}`.trim()}>
      {children}
    </div>
  );
}
