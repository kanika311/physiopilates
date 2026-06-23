"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function SiteChrome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const reduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-[200] h-[3px] origin-left"
        style={{
          scaleX: reduce ? 1 : scaleX,
          background: "linear-gradient(90deg, #0F6D6D, #D4B06A)",
        }}
        aria-hidden
      />
      {showTop ? (
        <motion.button
          type="button"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="premium-btn fixed bottom-24 right-4 z-[94] flex size-11 !rounded-xl items-center justify-center p-0 md:bottom-10 md:right-24"
          aria-label="Back to top"
          whileHover={reduce ? undefined : { scale: 1.08 }}
          whileTap={reduce ? undefined : { scale: 0.95 }}
        >
          <ArrowUp size={18} />
        </motion.button>
      ) : null}
    </>
  );
}
