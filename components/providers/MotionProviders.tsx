"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { rippleAtPoint } from "@/lib/ripple";

/** Capture-phase ripples for native buttons and opt-in anchors (avoid double ripple on role=tab pills). */
function useGlobalInteractiveRipples() {
  useEffect(() => {
    function onPointerDown(ev: PointerEvent) {
      if (ev.button !== 0) return;

      const t = ev.target;
      if (!(t instanceof Element)) return;

      const root = t.closest(
        [
          'button:not([disabled]):not([aria-busy="true"]):not(.no-interactive-motion):not([role="tab"]):not([data-static-button])',
          'input[type="submit"]:not(:disabled):not(.no-interactive-motion)',
          'input[type="button"]:not(:disabled):not(.no-interactive-motion)',
          "a.ripple-parent",
        ].join(","),
      );

      if (!root || !(root instanceof HTMLElement)) return;
      if (root.closest("[data-no-ripple]")) return;

      rippleAtPoint(root, ev.clientX, ev.clientY);
    }

    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, []);
}

function RouteProgressBar() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "busy" | "done">("idle");

  useEffect(() => {
    setPhase("busy");
    const a = window.setTimeout(() => setPhase("done"), 70);
    const b = window.setTimeout(() => setPhase("idle"), 520);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[600] h-[3px] overflow-hidden bg-teal-500/25"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-hidden
    >
      <motion.div
        className="h-full rounded-r-full shadow-[0_0_16px_rgba(72,207,203,0.55)]"
        style={{ backgroundColor: "rgba(72,207,203,0.95)" }}
        initial={{ width: "0%", opacity: 1 }}
        animate={
          phase === "busy"
            ? { width: "78%", opacity: 1 }
            : { width: "100%", opacity: 0, transition: { duration: 0.22, ease: "easeOut" } }
        }
        transition={
          phase === "busy"
            ? { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.22 }
        }
      />
    </div>
  );
}

export default function MotionProviders({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  useGlobalInteractiveRipples();

  return (
    <MotionConfig reducedMotion="user">
      <>
        <RouteProgressBar />
        {/* No AnimatePresence here: wrapping the entire page tree can briefly stack two routes
            (presence + keyed remount) and looks like the site duplicated. Route change still
            remounts via unique `key`. */}
        <motion.div
          key={pathname}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="motion-page-root min-h-[50vh]"
        >
          {children}
        </motion.div>
      </>
    </MotionConfig>
  );
}
