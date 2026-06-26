"use client";

import BlogCard from "@/components/blog/BlogCard";
import type { BlogPost } from "@/components/blog/blogData";
import { StaggerGrid, StaggerItem } from "@/components/luxury/Stagger";

export default function BlogGrid({ posts }: { posts: readonly BlogPost[] }) {
  return (
    <StaggerGrid className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
      {posts.map((post) => (
        <StaggerItem key={post.slug}>
          <BlogCard post={post} />
        </StaggerItem>
      ))}
    </StaggerGrid>
  );
}
