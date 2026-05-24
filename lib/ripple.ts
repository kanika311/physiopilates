import type { PointerEvent as ReactPointerEvent } from "react";

/** Click-point ripple burst. Works on any clickable box with `position:relative; overflow:hidden` (see `.ripple-parent` or global button styles). */
export function rippleAtPoint(root: HTMLElement, clientX: number, clientY: number): void {
  if (!root.matches) return;

  const mqReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (mqReduced) return;

  const r = root.getBoundingClientRect();
  const burst = document.createElement("span");
  burst.className = "ripple-burst";
  burst.setAttribute("aria-hidden", "true");
  burst.style.left = `${clientX - r.left}px`;
  burst.style.top = `${clientY - r.top}px`;
  burst.style.width = burst.style.height = `${Math.max(r.width, r.height) * 2}px`;
  root.appendChild(burst);
  burst.addEventListener(
    "animationend",
    () => {
      burst.remove();
    },
    { once: true },
  );
}

/** Opt-in ripple for anchors / custom surfaces already marked `.ripple-parent`. */
export function ripplePointerDown<T extends HTMLElement>(e: ReactPointerEvent<T>): void {
  const root = e.currentTarget;
  if (!root.matches?.(".ripple-parent")) return;
  rippleAtPoint(root, e.clientX, e.clientY);
}
