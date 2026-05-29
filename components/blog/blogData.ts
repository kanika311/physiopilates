import { THUMB } from "@/lib/siteImages";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date for sorting */
  date: string;
  /** Visible date e.g. "October 25, 2025" */
  dateDisplay: string;
  author: string;
  /** Detail hero background */
  heroImage: string;
  /** Card thumbnail (defaults to hero if omitted) */
  cardImage?: string;
  sections: ArticleBlock[];
};

/** Placeholder excerpt length for cards — ellipsis handled in CSS via line-clamp */
export const blogPosts: readonly BlogPost[] = [
  {
    slug: "pilates-certification-courses-master-teaching-india",
    title: "Best Pilates Certification Courses to Master Teaching in India",
    excerpt:
      "Discover the top Pilates certification programs in India to help you become a confident and skilled instructor.",
    date: "2025-10-25",
    dateDisplay: "October 25, 2025",
    author: "Shivam Mehta",
    heroImage: THUMB.blogPilates,
    sections: [
      {
        type: "paragraph",
        text:
          "The early morning sun filters through your studio window as you guide a client through a perfectly executed teaser on the reformer. Your cues are precise, your hands-on adjustments intuitive, and you watch transformation happen in real-time.",
      },
      {
        type: "paragraph",
        text:
          "If you're a fitness professional looking to expand your expertise, choosing the right Pilates instructor course can feel overwhelming. India now offers credible pathways—from classical mat certifications to contemporary reformer and apparatus training—that align with global standards.",
      },
      {
        type: "heading",
        text: "What Makes a Pilates Certification Worth Your Time?",
      },
      {
        type: "paragraph",
        text:
          "A rigorous program should combine anatomy education, cueing methodologies, spotting and modifications, ethics, and teaching practice. Employers and boutique studios alike look for certifications that emphasize safe progression and individualized programming.",
      },
      {
        type: "paragraph",
        text:
          "Courses backed by mentorship hours or supervised clinic practice stand out—they translate theory into muscle memory you'll lean on daily in studio settings across Delhi NCR and beyond.",
      },
      {
        type: "heading",
        text: "Comprehensive Pilates Training: What Should Be Included?",
      },
      {
        type: "paragraph",
        text:
          "Seek curricula that dedicate time to pelvic-lumbar stabilization, breathing integration, apparatus safety, contraindications, and sequencing for beginner through advanced clients.",
      },
      {
        type: "paragraph",
        text:
          "Mat Pilates remains the cornerstone of the method—you'll learn layering progressions clients can practise at home—but reformer mechanics and Cadillac work distinguish instructors who confidently serve therapeutic as well as performance-oriented goals.",
      },
      {
        type: "subheading",
        text: "What qualifications do I need before starting a Pilates instructor course?",
      },
      {
        type: "paragraph",
        text:
          "Most programs recommend 6–12 months of Pilates practice and some experience in yoga, fitness, or physiotherapy.",
      },
    ],
  },
  {
    slug: "holistic-wellness-movement-delhi-ncr",
    title: "Why Physiotherapy and Pilates Pair So Well",
    excerpt:
      "Understand how clinically guided Pilates bridges rehab and lifelong strength for clients across Delhi NCR.",
    date: "2025-09-12",
    dateDisplay: "September 12, 2025",
    author: "Physio Pilates Team",
    heroImage: THUMB.collageA,
    cardImage: THUMB.blogWellnessCard,
    sections: [
      {
        type: "paragraph",
        text:
          "Movement heals best when posture, load management, and breath are coordinated deliberately. Combining physiotherapy-led assessment with structured Pilates reinforces motor patterns safely after injury.",
      },
      {
        type: "heading",
        text: "A Shared Focus on Stability",
      },
      {
        type: "paragraph",
        text:
          "Physios address pain drivers and biomechanics; Pilates builds the repetitive, low-impact volume that preserves those corrections. Clients leave sessions understanding both why they hurt and how to reinforce change daily.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getSortedPosts(): readonly BlogPost[] {
  return [...blogPosts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
