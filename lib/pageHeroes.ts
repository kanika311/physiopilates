import {
  HERO_PHYSIO,
  HERO_PILATES,
  HERO_YOGA,
  HERO_THERAPY,
  HERO_GALLERY,
  HERO_COURSES,
  HERO_ABOUT,
  HERO_CONTACT,
} from "@/lib/siteImages";

export type PageHeroConfig = {
  page: string;
  label: string;
  id: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  eyebrow: string;
  title: string;
  description: string;
  minHeightClass?: string;
  contentPaddingClass?: string;
};

export const PAGE_HEROES: Record<string, PageHeroConfig> = {
  physiotherapy: {
    page: "physiotherapy",
    label: "Physiotherapy",
    id: "physio-hero-heading",
    image: HERO_PHYSIO,
    imageAlt: "Physiotherapy rehabilitation and movement therapy session",
    imageClassName: "object-cover object-center scale-105",
    eyebrow: "Our service",
    title: "Physiotherapy",
    description:
      "Rebuild strength, restore movement, and relieve pain through expert physiotherapy tailored to your body's needs.",
  },
  pilates: {
    page: "pilates",
    label: "Pilates",
    id: "pilates-hero-heading",
    image: HERO_PILATES,
    imageAlt: "Client practising Pilates on a reformer machine",
    imageClassName: "object-cover object-[center_45%]",
    eyebrow: "Our service",
    title: "Pilates",
    description:
      "Build strength, flexibility, and balance with Pilates — a mindful movement practice for every body.",
    minHeightClass: "min-h-[max(480px,min(860px,82dvh))]",
  },
  yoga: {
    page: "yoga",
    label: "Yoga",
    id: "yoga-hero-heading",
    image: HERO_YOGA,
    imageAlt: "Yoga practice — mindful movement and breath",
    imageClassName: "object-cover object-[center_50%]",
    eyebrow: "Our service",
    title: "Yoga",
    description:
      "Discover peace, flexibility, and inner strength through yoga — where body, breath, and mind unite.",
    minHeightClass: "min-h-[max(480px,min(860px,82dvh))]",
  },
  therapy: {
    page: "therapy",
    label: "Dry Needling & Cup Therapy",
    id: "therapy-hero-heading",
    image: HERO_THERAPY,
    imageAlt: "Dry needling and cupping therapy session",
    imageClassName: "object-cover object-[center_42%]",
    eyebrow: "Our service",
    title: "Dry Needling & Cup Therapy",
    description:
      "Unlock deep muscle relief and restore circulation with our advanced dry needling and cupping therapies.",
    minHeightClass: "min-h-[max(480px,min(820px,80dvh))]",
  },
  gallery: {
    page: "gallery",
    label: "Gallery",
    id: "gallery-hero-heading",
    image: HERO_GALLERY,
    imageAlt: "Physio Pilates studio — therapy and movement sessions",
    imageClassName: "object-cover object-[center_38%]",
    eyebrow: "Gallery",
    title: "Our Gallery",
    description:
      "Moments that capture healing, strength, and transformation — from physiotherapy, Pilates, and wellness sessions.",
    minHeightClass: "min-h-[max(460px,min(760px,72dvh))]",
  },
  courses: {
    page: "courses",
    label: "Courses",
    id: "courses-hero-heading",
    image: HERO_COURSES,
    imageAlt: "Teacher training workshop — movement and Pilates education",
    imageClassName: "object-cover object-[center_40%]",
    eyebrow: "Courses",
    title: "Teacher Training, Workshops & Courses",
    description:
      "Join our immersive professional teacher training courses — empowering educators with practical skills, hands-on workshops, and transformative learning experiences.",
    minHeightClass: "min-h-[max(480px,min(820px,80dvh))]",
  },
  about: {
    page: "about",
    label: "About",
    id: "about-hero-heading",
    image: HERO_ABOUT,
    imageAlt: "Physio Pilates studio — reformer and movement therapy",
    imageClassName: "object-cover object-[center_32%]",
    eyebrow: "About us",
    title: "Building Strength, Balance & Wellness — Together",
    description:
      "PhysioPilates — the only centre in Delhi NCR that provides a unique combination of physiotherapy and Pilates for treatment.",
    minHeightClass: "min-h-[max(460px,min(720px,72dvh))]",
  },
  contact: {
    page: "contact",
    label: "Contact",
    id: "contact-hero-heading",
    image: HERO_CONTACT,
    imageAlt: "Physio Pilates studio — wellness and movement",
    imageClassName: "object-cover object-[center_42%]",
    eyebrow: "Get in touch",
    title: "Contact Us",
    description:
      "Get in touch with our physiotherapy & wellness team — we're here to help you heal, move, and feel your best.",
    minHeightClass: "min-h-[max(300px,min(420px,42dvh))]",
    contentPaddingClass: "py-10 sm:py-12",
  },
};

export const PAGE_HERO_LIST: PageHeroConfig[] = Object.values(PAGE_HEROES);
