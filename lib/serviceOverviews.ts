import { THUMB } from "@/lib/siteImages";

export type ServiceOverviewConfig = {
  page: string;
  label: string;
  sectionClassName: string;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  bullets: string[];
  levels: string[];
  learnMoreHref: string;
  quoteService: string;
};

export const SERVICE_OVERVIEWS: Record<string, ServiceOverviewConfig> = {
  physiotherapy: {
    page: "physiotherapy",
    label: "Physiotherapy",
    sectionClassName: "bg-[#f8f8f8] dark:bg-[#0f172a]",
    image: THUMB.phyDetail,
    imageAlt:
      "Physiotherapy treatment session focusing on leg and knee rehabilitation",
    title: "Physiotherapy",
    description:
      "Our physiotherapy sessions are designed to restore your physical health, relieve pain, and enhance movement using scientifically proven therapeutic techniques. We focus on long-term recovery, not just temporary relief, ensuring your body regains its full potential.",
    bullets: [
      "Personalized treatment plans for sports injuries, joint pain, post-surgical rehabilitation, and mobility issues.",
      "Combination of manual therapy, electrotherapy, and exercise rehabilitation tailored to your condition.",
      "Focus on correcting posture, improving strength, and rebuilding functional movement patterns.",
      "Our physiotherapists work closely with you to track progress and prevent future injuries.",
    ],
    levels: ["Beginner", "Intermediate", "Expert"],
    learnMoreHref: "/contact",
    quoteService: "Physiotherapy",
  },
  pilates: {
    page: "pilates",
    label: "Pilates",
    sectionClassName: "bg-white dark:bg-[#0f172a]",
    image: THUMB.pilatesDetail,
    imageAlt: "Pilates reformer session guided by an instructor",
    title: "Pilates",
    description:
      "Pilates is a low-impact, full-body workout that enhances flexibility, strengthens core muscles, and improves posture. Our classes are guided by trained instructors who ensure each session aligns your body and mind for optimal performance and balance.",
    bullets: [
      "Focus on developing a strong, stable core through controlled breathing and precise movement.",
      "Rehabilitation-based Pilates designed for pain management, injury prevention, and improved mobility.",
      "Enhances coordination, posture, and balance while promoting relaxation and body awareness.",
      "Suitable for all ages and fitness levels — from beginners to professional athletes.",
    ],
    levels: ["Beginner", "Intermediate", "Expert"],
    learnMoreHref: "#pilates-gallery",
    quoteService: "Pilates",
  },
  yoga: {
    page: "yoga",
    label: "Yoga",
    sectionClassName: "bg-[#f9f9f9] dark:bg-[#0f172a]",
    image: THUMB.yogaDetail,
    imageAlt: "Yoga practice — mindful movement and breath",
    title: "Yoga",
    description:
      "Our yoga sessions combine traditional practices with modern science to bring balance to your body, mind, and spirit. From beginners seeking flexibility to advanced practitioners looking for mindfulness, each class helps you cultivate inner peace and physical strength.",
    bullets: [
      "Guided sessions including Hatha, Vinyasa, and restorative yoga styles suited to all levels.",
      "Incorporates breathing techniques (Pranayama) and meditation to promote relaxation and focus.",
      "Helps improve flexibility, stability, and muscle tone while reducing anxiety and fatigue.",
      "Experience the benefits of holistic healing through movement, breath, and mindfulness.",
    ],
    levels: ["Beginner", "Intermediate", "Expert"],
    learnMoreHref: "#yoga-gallery",
    quoteService: "Yoga",
  },
  therapy: {
    page: "therapy",
    label: "Dry Needling & Cup Therapy",
    sectionClassName: "bg-[#f9f9f9] dark:bg-[#0f172a]",
    image: THUMB.therapyDetail,
    imageAlt: "Dry needling and cupping therapy — hands-on clinical care",
    title: "Dry Needling & Cup Therapy",
    description:
      "Our Dry Needling and Cupping Therapy sessions are advanced treatment methods aimed at relieving chronic pain, muscle stiffness, and tension. These therapies promote deep tissue healing, better circulation, and quicker recovery from physical stress or injury.",
    bullets: [
      "Dry needling targets trigger points to release muscle knots and improve functional movement.",
      "Cupping therapy enhances blood flow, reduces inflammation, and relieves soreness naturally.",
      "Recommended for athletes, active individuals, and patients with long-standing pain or tightness.",
      "These treatments complement physiotherapy for faster healing and better overall recovery.",
    ],
    levels: ["Beginner", "Intermediate", "Expert"],
    learnMoreHref: "#therapy-gallery",
    quoteService: "Dry Needling & Cup Therapy",
  },
};

export const SERVICE_OVERVIEW_LIST: ServiceOverviewConfig[] =
  Object.values(SERVICE_OVERVIEWS);
