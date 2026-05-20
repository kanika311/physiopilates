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

export const galleryImages: readonly GalleryImageItem[] = [
  {
    src: "/phy2.jpg",
    alt: "Physiotherapy — agility ladder footwork drill",
    categories: ["physiotherapy"],
    badge: "Physiotherapy",
  },
  {
    src: "/phy5.jpg",
    alt: "Physiotherapy — gait training with walking support",
    categories: ["physiotherapy"],
    badge: "Physiotherapy",
  },
  {
    src: "/phy6.jpg",
    alt: "Physiotherapy — knee rehabilitation with therapeutic supports",
    categories: ["physiotherapy"],
    badge: "Physiotherapy",
  },
  {
    src: "/phy3.jpg",
    alt: "Dry needling session focused on muscle release",
    categories: ["therapy"],
    badge: "Dry Needling",
  },
  {
    src: "/phy4.jpg",
    alt: "Dry needling — precision needle placement along the arm",
    categories: ["therapy"],
    badge: "Cup Therapy",
  },
  {
    src: "/index2.jpg",
    alt: "Pilates reformer conditioning in studio",
    categories: ["pilates"],
    badge: "Pilates",
  },
  {
    src: "/index1.webp",
    alt: "Pilates studio — mindful movement class",
    categories: ["pilates"],
    badge: "Pilates",
  },
  {
    src: "/index3.webp",
    alt: "Yoga flow — flexibility and breath-led movement",
    categories: ["yoga"],
    badge: "Yoga",
  },
];
