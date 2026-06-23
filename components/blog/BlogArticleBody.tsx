"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ArticleBlock } from "@/components/blog/blogData";
import { brand } from "@/lib/brand";

type Props = {
  blocks: ArticleBlock[];
};

const EASE = [0.22, 1, 0.36, 1] as const;

const wordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.032, delayChildren: 0.04 },
  },
};

const wordItem: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.48, ease: EASE },
  },
};

const headingWordContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: 0.06 },
  },
};

const headingWordItem: Variants = {
  hidden: { opacity: 0, y: 22, rotateX: 40 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

function AnimatedWords({
  text,
  className,
  stagger = "normal",
}: {
  text: string;
  className?: string;
  stagger?: "normal" | "heading";
}) {
  const reduce = useReducedMotion();
  const tokens = text.split(/(\s+)/);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const container = stagger === "heading" ? headingWordContainer : wordContainer;
  const item = stagger === "heading" ? headingWordItem : wordItem;

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={container}
      style={{ perspective: 800 }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={`${i}-${token.slice(0, 12)}`}
          variants={item}
          className="inline"
          style={{ transformOrigin: "bottom center" }}
        >
          {token}
        </motion.span>
      ))}
    </motion.span>
  );
}

function AnimatedParagraph({ text, index }: { text: string; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.p
      className="body-text overflow-hidden text-left !text-[17px] leading-[1.85]"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2), ease: EASE }}
    >
      <AnimatedWords text={text} />
    </motion.p>
  );
}

function AnimatedHeading({ text }: { text: string }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="pt-4 md:pt-6"
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.4 }}
    >
      <h2
        className="!text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-snug"
        style={{ color: brand.navy }}
      >
        <AnimatedWords text={text} stagger="heading" />
      </h2>
      <motion.div
        className="mt-3 h-[2px] origin-left rounded-full"
        style={{ backgroundColor: brand.gold }}
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.25, ease: EASE }}
      />
    </motion.div>
  );
}

function AnimatedSubheading({ text, index }: { text: string; index: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.h3
      className="overflow-hidden pt-2 text-left !text-xl font-semibold leading-snug md:pt-4"
      style={{ color: brand.primary }}
      initial={reduce ? false : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.03, 0.15), ease: EASE }}
    >
      <AnimatedWords text={text} stagger="heading" />
    </motion.h3>
  );
}

function AnimatedBlock({ block, index }: { block: ArticleBlock; index: number }) {
  if (block.type === "paragraph") {
    return <AnimatedParagraph text={block.text} index={index} />;
  }
  if (block.type === "heading") {
    return <AnimatedHeading text={block.text} />;
  }
  if (block.type === "subheading") {
    return <AnimatedSubheading text={block.text} index={index} />;
  }
  return null;
}

export default function BlogArticleBody({ blocks }: Props) {
  const reduce = useReducedMotion();

  return (
    <article className="luxury-section bg-white px-4 sm:px-6">
      <motion.div
        className="mx-auto max-w-3xl space-y-6"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        {blocks.map((block, i) => (
          <AnimatedBlock key={`${block.type}-${i}`} block={block} index={i} />
        ))}
      </motion.div>
    </article>
  );
}
