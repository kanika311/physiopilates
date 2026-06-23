import type { Metadata } from "next";

import BlogGrid from "@/components/blog/BlogGrid";
import BlogHero from "@/components/blog/BlogHero";
import { getSortedPosts } from "@/components/blog/blogData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/luxury/Reveal";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert articles on physiotherapy, Pilates, yoga, and holistic wellness — from Physio Pilates in Delhi NCR.",
};

export default function BlogsPage() {
  const posts = getSortedPosts();

  return (
    <>
      <Navbar />
      <BlogHero variant="listing" />
      <section className="luxury-section bg-white px-4 sm:px-6">
        <Reveal>
          <p className="subtitle-text mx-auto max-w-3xl text-center">
            Explore our collection of expert articles covering physiotherapy, pilates, yoga, and holistic wellness.
            Learn from professionals and stay ahead in your health journey.
          </p>
        </Reveal>

        <BlogGrid posts={posts} />
      </section>
      <Footer />
    </>
  );
}
