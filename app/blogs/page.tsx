import type { Metadata } from "next";

import BlogCard from "@/components/blog/BlogCard";
import BlogHero from "@/components/blog/BlogHero";
import { brand } from "@/lib/brand";
import { getSortedPosts } from "@/components/blog/blogData";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert articles on physiotherapy, Pilates, yoga, and holistic wellness — from Physio Pilates in Delhi NCR.",
};

export default function BlogsPage() {
  const posts = getSortedPosts();

  return (
    <>
      <BlogHero variant="listing" />
      <section className="bg-white px-4 pb-24 pt-12 md:pb-28 md:pt-16">
        <p
          className="mx-auto max-w-4xl px-2 text-center text-[15px] leading-relaxed md:text-[16px]"
          style={{ color: brand.textBody }}
        >
          Explore our collection of expert articles covering physiotherapy, pilates, yoga, and holistic wellness. Learn
          from professionals and stay ahead in your health journey.
        </p>

        <div className="mx-auto mt-14 grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:gap-10">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
