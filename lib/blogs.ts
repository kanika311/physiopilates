import connectDB from "@/lib/mongodb";
import BlogModel from "@/models/Blog";
import {
  blogPosts as staticPosts,
  type BlogPost,
  type ArticleBlock,
} from "@/components/blog/blogData";

function normalizeSections(sections: any): ArticleBlock[] {
  if (!Array.isArray(sections)) return [];
  return sections
    .filter((s) => s && typeof s.text === "string")
    .map((s) => ({
      type: ["paragraph", "heading", "subheading"].includes(s.type)
        ? s.type
        : "paragraph",
      text: s.text,
    })) as ArticleBlock[];
}

function toBlogPost(doc: any): BlogPost {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    date: doc.date || new Date(doc.createdAt || Date.now()).toISOString(),
    dateDisplay: doc.dateDisplay || "",
    author: doc.author,
    heroImage: doc.heroImage,
    cardImage: doc.cardImage || doc.heroImage,
    sections: normalizeSections(doc.sections),
  };
}

async function getDbPosts(): Promise<BlogPost[]> {
  try {
    await connectDB();
    const docs = await BlogModel.find().sort({ createdAt: -1 }).lean();
    return docs.map(toBlogPost);
  } catch (error) {
    console.log("Blog DB error:", error);
    return [];
  }
}

export async function getSortedPosts(): Promise<BlogPost[]> {
  const dbPosts = await getDbPosts();
  const dbSlugs = new Set(dbPosts.map((p) => p.slug));
  const merged = [
    ...dbPosts,
    ...staticPosts.filter((p) => !dbSlugs.has(p.slug)),
  ];
  return merged.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  const dbPosts = await getDbPosts();
  const dbMatch = dbPosts.find((p) => p.slug === slug);
  if (dbMatch) return dbMatch;
  return staticPosts.find((p) => p.slug === slug);
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getSortedPosts();
  return posts.map((p) => p.slug);
}
