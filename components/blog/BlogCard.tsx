"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FiCalendar, FiUser } from "react-icons/fi";

import type { BlogPost } from "@/components/blog/blogData";
import PremiumButton from "@/components/luxury/PremiumButton";
import { brand } from "@/lib/brand";

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  const reduce = useReducedMotion();
  const thumb = post.cardImage ?? post.heroImage;

  return (
    <motion.article
      className="luxury-card flex h-full flex-col overflow-hidden"
      whileHover={reduce ? undefined : { y: -6, scale: 1.02 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blogs/${post.slug}`}
        className="relative block aspect-[16/11] shrink-0 overflow-hidden"
      >
        <Image
          src={thumb}
          alt={post.title}
          fill
          className="object-cover object-center transition duration-700 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100"
          style={{ background: "linear-gradient(to top, rgb(15 109 109 / 0.35), transparent)" }}
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] font-medium"
          style={{ color: brand.textSubtitle }}
        >
          <span className="inline-flex items-center gap-2">
            <FiCalendar className="text-[15px]" style={{ color: brand.primary }} aria-hidden />
            <time dateTime={post.date}>{post.dateDisplay}</time>
          </span>
          <span className="inline-flex items-center gap-2">
            <FiUser className="text-[15px]" style={{ color: brand.primary }} aria-hidden />
            <span>{post.author}</span>
          </span>
        </div>

        <h2 className="!text-[1.35rem] !leading-snug font-semibold" style={{ color: brand.navy }}>
          <Link
            href={`/blogs/${post.slug}`}
            className="no-underline transition-colors hover:text-[#0F6D6D]"
          >
            {post.title}
          </Link>
        </h2>

        <p className="body-text flex-1 !text-[17px] line-clamp-4">{post.excerpt}</p>

        <PremiumButton href={`/blogs/${post.slug}`} className="mt-2 px-8 py-2.5 text-[14px]">
          Read More
        </PremiumButton>
      </div>
    </motion.article>
  );
}
