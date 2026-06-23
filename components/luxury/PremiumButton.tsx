"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const motionProps = {
  whileHover: { scale: 1.04, y: -1 },
  whileTap: { scale: 0.97 },
};

export default function PremiumButton({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const cls = `premium-btn ${className}`.trim();

  if (external) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...(reduce ? {} : motionProps)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div className="inline-block" {...(reduce ? {} : motionProps)}>
      <Link href={href} className={cls}>
        {children}
      </Link>
    </motion.div>
  );
}
