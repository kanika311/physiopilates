import type { ArticleBlock } from "@/components/blog/blogData";

type Props = {
  blocks: ArticleBlock[];
};

export default function BlogArticleBody({ blocks }: Props) {
  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 py-14 text-center text-neutral-700 dark:text-slate-300 sm:px-6 md:py-20">
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="text-[15px] leading-[1.85] md:text-[16px] md:leading-[1.9]">
              {block.text}
            </p>
          );
        }
        if (block.type === "heading") {
          return (
            <h2
              key={i}
              className="pt-4 text-center text-xl font-bold leading-snug text-[#b39359] dark:text-slate-100 sm:text-2xl md:pt-6"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "subheading") {
          return (
            <h3
              key={i}
              className="pt-2 text-center text-lg font-bold leading-snug text-[#b39359] dark:text-slate-100 sm:text-xl md:pt-4"
            >
              {block.text}
            </h3>
          );
        }
        return null;
      })}
    </div>
  );
}
