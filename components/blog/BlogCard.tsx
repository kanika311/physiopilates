import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiUser } from "react-icons/fi";

import type { BlogPost } from "@/components/blog/blogData";
import { brand } from "@/lib/brand";

const TEAL_LIGHT = "#4fd1ed";
const TEAL_DEEP = "#29b6f6";

type Props = {
  post: BlogPost;
};

export default function BlogCard({ post }: Props) {
  const thumb = post.cardImage ?? post.heroImage;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_14px_40px_-24px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_20px_48px_-22px_rgba(0,0,0,0.2)]">
      <Link href={`/blogs/${post.slug}`} className="relative block aspect-[16/11] shrink-0 overflow-hidden rounded-t-2xl">
        <Image
          src={thumb}
          alt={post.title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px]" style={{ color: brand.textMuted }}>
          <span className="inline-flex items-center gap-2">
            <FiCalendar className="text-[15px]" aria-hidden />
            <time dateTime={post.date}>{post.dateDisplay}</time>
          </span>
          <span className="inline-flex items-center gap-2">
            <FiUser className="text-[15px]" aria-hidden />
            <span>{post.author}</span>
          </span>
        </div>

        <h2 className="line-clamp-2 text-lg font-bold leading-snug text-neutral-900 sm:text-xl">
          <Link href={`/blogs/${post.slug}`} className="no-underline hover:text-neutral-700">
            {post.title}
          </Link>
        </h2>

        <p className="line-clamp-3 flex-1 text-[15px] leading-relaxed" style={{ color: brand.textBody }}>
          {post.excerpt}
        </p>

        <Link
          href={`/blogs/${post.slug}`}
          className="inline-flex w-fit items-center rounded-full px-8 py-2.5 text-[13px] font-semibold text-white no-underline shadow-md transition-opacity hover:opacity-92"
          style={{ background: `linear-gradient(90deg, ${TEAL_LIGHT} 0%, ${TEAL_DEEP} 100%)` }}
        >
          Read More
        </Link>
      </div>
    </article>
  );
}
