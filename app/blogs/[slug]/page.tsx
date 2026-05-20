import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogArticleBody from "@/components/blog/BlogArticleBody";
import BlogHero from "@/components/blog/BlogHero";
import { getPostBySlug, blogPosts } from "@/components/blog/blogData";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const subtitle = `By ${post.author} • ${post.dateDisplay}`;

  return (
    <>
      <BlogHero
        variant="post"
        title={post.title}
        subtitle={subtitle}
        imageSrc={post.heroImage}
        imageAlt={`${post.title} — hero`}
      />
      <BlogArticleBody blocks={post.sections} />
    </>
  );
}
