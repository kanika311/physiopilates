import { GALLERY_UNSPASH_TILES } from "@/lib/siteImages";

/** Categories used by gallery filters (matches route/service naming). */
export type GalleryCategoryId = "physiotherapy" | "pilates" | "yoga" | "therapy";

export type GalleryImageItem = {
  src: string;
  alt: string;
  /** Image appears when any of these filters is selected */
  categories: GalleryCategoryId[];
  /** Small pill on tile (optional) */
  badge?: string;
};

const [g0, g1, g2, g3, g4, g5, g6, g7] = GALLERY_UNSPASH_TILES;

export const galleryImages: readonly GalleryImageItem[] = [
  {
    src: g0,
    alt: "Physiotherapy — agility ladder footwork drill",
    categories: ["physiotherapy"],
    badge: "Physiotherapy",
  },
  {
    src: g1,
    alt: "Physiotherapy — gait training with walking support",
    categories: ["physiotherapy"],
    badge: "Physiotherapy",
  },
  {
    src: g2,
    alt: "Physiotherapy — knee rehabilitation with therapeutic supports",
    categories: ["physiotherapy"],
    badge: "Physiotherapy",
  },
  {
    src: g3,
    alt: "Therapy session focused on muscle release",
    categories: ["therapy"],
    badge: "Dry Needling",
  },
  {
    src: g4,
    alt: "Therapy — precision treatment and supportive care",
    categories: ["therapy"],
    badge: "Cup Therapy",
  },
  {
    src: g5,
    alt: "Pilates reformer conditioning in studio",
    categories: ["pilates"],
    badge: "Pilates",
  },
  {
    src: g6,
    alt: "Pilates studio — mindful movement class",
    categories: ["pilates"],
    badge: "Pilates",
  },
  {
    src: g7,
    alt: "Yoga flow — flexibility and breath-led movement",
    categories: ["yoga"],
    badge: "Yoga",
  },
];
