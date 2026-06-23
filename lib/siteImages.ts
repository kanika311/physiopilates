/**
 * Unsplash-only image URLs (logo /logo.png is separate — never defined here).
 * All photo ids below return HTTP 200 from images.unsplash.com (verified).
 */

/** Verified working Unsplash photo ids — do not use ids outside this set */
const PHOTO = {
  pilatesReformer: "1571019614242-c5c5dee9f50b",
  yogaGroup: "1518611012118-696072aa579a",
  physioSession: "1545389336-cf090694435e",
  studioInterior: "1571902943202-507ec2618e8f",
  wellnessStretch: "1544367567-0f2fcb009e0b",
  calmWellness: "1506126613408-eca07ce68773",
  fitnessTraining: "1545389336-cf090694435e",
} as const;

const heroBanner = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1920&h=1080&fit=crop&q=85&auto=format`;

const sectionBg = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1600&h=900&fit=crop&q=80&auto=format`;

const cardThumb = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=800&h=600&fit=crop&q=80&auto=format`;

const aboutSized = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1000&h=800&fit=crop&q=80&auto=format`;

const galleryTile = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&q=75&auto=format`;

const P = PHOTO;

/** Home heroes — order matches HeroSection slides */
export const HERO_HOME = [
  heroBanner(P.fitnessTraining), // Certified trainer / courses
  heroBanner(P.pilatesReformer), // Strength Through Pilates
  heroBanner(P.yogaGroup), // Yoga For Body & Mind
  heroBanner(P.physioSession), // Recover with Expert Care
] as const;

export const HERO_ABOUT = sectionBg(P.studioInterior);
export const HERO_CONTACT = sectionBg(P.studioInterior);
export const HERO_BLOG_LIST = sectionBg(P.wellnessStretch);
export const HERO_GALLERY = heroBanner(P.pilatesReformer);
export const HERO_PHYSIO = heroBanner(P.physioSession);
export const HERO_PILATES = heroBanner(P.pilatesReformer);
export const HERO_YOGA = heroBanner(P.yogaGroup);
export const HERO_THERAPY = heroBanner(P.calmWellness);
export const HERO_COURSES = heroBanner(P.fitnessTraining);

/** Cards, collages, inline sections — 800×600 */
export const THUMB = {
  collageA: cardThumb(P.pilatesReformer),
  collageB: cardThumb(P.yogaGroup),
  collageC: cardThumb(P.physioSession),
  story: aboutSized(P.studioInterior),
  coursesOv: cardThumb(P.fitnessTraining),
  coursesWhy: cardThumb(P.wellnessStretch),
  book: sectionBg(P.studioInterior),
  phyDetail: cardThumb(P.physioSession),
  pilatesDetail: cardThumb(P.pilatesReformer),
  yogaDetail: cardThumb(P.yogaGroup),
  therapyDetail: cardThumb(P.calmWellness),
  blogPilates: cardThumb(P.fitnessTraining),
  blogWellnessCard: cardThumb(P.pilatesReformer),
} as const;

/** Gallery page grid tiles — 600×600 */
export const GALLERY_UNSPASH_TILES = [
  galleryTile(P.pilatesReformer),
  galleryTile(P.physioSession),
  galleryTile(P.pilatesReformer),
  galleryTile(P.calmWellness),
  galleryTile(P.yogaGroup),
  galleryTile(P.studioInterior),
  galleryTile(P.wellnessStretch),
  galleryTile(P.yogaGroup),
] as const;

/** Pilates page carousel */
export const PILATES_TILES = [
  ...GALLERY_UNSPASH_TILES,
  galleryTile(P.pilatesReformer),
] as const;

/** Yoga page carousel */
export const YOGA_TILES = [
  galleryTile(P.yogaGroup),
  galleryTile(P.yogaGroup),
  galleryTile(P.pilatesReformer),
  galleryTile(P.wellnessStretch),
  galleryTile(P.physioSession),
  galleryTile(P.studioInterior),
  galleryTile(P.pilatesReformer),
  galleryTile(P.calmWellness),
  galleryTile(P.fitnessTraining),
] as const;

/** Physio mosaic sources */
export const PHYSIO_TILES = [
  ...GALLERY_UNSPASH_TILES,
  galleryTile(P.studioInterior),
  galleryTile(P.fitnessTraining),
  galleryTile(P.pilatesReformer),
] as const;

export const PHYSIO_GALLERY_IMAGES15 = [...PHYSIO_TILES, ...GALLERY_UNSPASH_TILES.slice(0, 4)] as const;

/** Therapy / dry needling / cupping visuals */
export const THERAPY_TILES = [
  galleryTile(P.calmWellness),
  galleryTile(P.physioSession),
  galleryTile(P.wellnessStretch),
  galleryTile(P.pilatesReformer),
  galleryTile(P.pilatesReformer),
  galleryTile(P.fitnessTraining),
  galleryTile(P.studioInterior),
  galleryTile(P.studioInterior),
  galleryTile(P.calmWellness),
] as const;

/** Home “Physiotherapy work” masonry mix */
export const HOME_WORK_GRID = [
  THUMB.collageC,
  galleryTile(P.pilatesReformer),
  galleryTile(P.calmWellness),
  galleryTile(P.physioSession),
  galleryTile(P.yogaGroup),
  galleryTile(P.wellnessStretch),
] as const;

/** Courses programme cards */
export const COURSES_PROGRAM_IMAGES = [
  THUMB.coursesOv,
  THUMB.collageC,
  galleryTile(P.calmWellness),
  THUMB.collageA,
] as const;
