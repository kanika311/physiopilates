import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiClock, FiPhone } from "react-icons/fi";

import { brand } from "@/lib/brand";

const GOLD_CARD = "#b89b72";
const BG = "#faf8f4";

type Program = {
  title: string;
  image: string;
  imageAlt: string;
  duration: string;
  description: string;
  features: string[];
  price: string;
};

const programs: readonly Program[] = [
  {
    title: "200-Hour Pilates Teacher Training",
    image: "/courses2.jpg",
    imageAlt: "Group Pilates teacher training studio session",
    duration: "8 Weeks • Beginner to Intermediate",
    description:
      "Master mindful movement, anatomy, and teaching methodology — the foundation for aspiring instructors stepping into certification.",
    features: [
      "Comprehensive anatomy modules",
      "Live sessions with senior mentors",
      "Internationally recognized certification",
    ],
    price: "₹49,999",
  },
  {
    title: "300-Hour Advanced Pilates Training",
    image: "/phy4.jpg",
    imageAlt: "Advanced Pilates technique on equipment",
    duration: "12 Weeks • Advanced Level",
    description:
      "Advance biomechanics, reformer skills, and therapeutic Pilates sequences with deeper cueing confidence.",
    features: ["Advanced teaching methodology", "Client-specific correction techniques", "Hands-on mentorship & evaluation"],
    price: "₹74,999",
  },
  {
    title: "Holistic Body Conditioning Program",
    image: "/phy3.jpg",
    imageAlt: "Holistic physiotherapy-informed conditioning session",
    duration: "6 Weeks • All Levels",
    description:
      "Physiotherapy, Pilates, and mobility in one continuum — strength, flexibility, and injury prevention together.",
    features: [
      "Personalized assessment and guidance",
      "Strength & flexibility balance focus",
      "Ideal for fitness professionals & enthusiasts",
    ],
    price: "₹34,999",
  },
  {
    title: "Reformer & Equipment Masterclass",
    image: "/index3.webp",
    imageAlt: "Reformer Pilates equipment coaching",
    duration: "10 Weeks • Intermediate to Advanced",
    description:
      "Teach reformer, chair, and Cadillac work with grounded safety standards and purposeful sequencing.",
    features: ["Practical hands-on sessions", "Postural correction principles", "Advanced movement sequencing"],
    price: "₹59,999",
  },
];

export default function CoursesProgramsSection() {
  return (
    <section
      id="courses-programs"
      className="px-4 py-16 md:py-24 lg:py-28"
      style={{ backgroundColor: BG }}
      aria-labelledby="courses-programs-heading"
    >
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border px-5 py-1.5 uppercase" style={{ borderColor: "rgba(184,155,114,0.55)", backgroundColor: "rgba(184,155,114,0.06)" }}>
            <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD_CARD }} aria-hidden />
            <span className="text-[10px] font-semibold tracking-[0.26em]" style={{ color: GOLD_CARD }}>
              Our courses
            </span>
          </div>
          <h2
            id="courses-programs-heading"
            className="mx-auto mt-7 max-w-3xl font-[family-name:var(--font-playfair)] text-[2rem] font-bold tracking-tight sm:text-4xl md:text-[2.4rem]"
            style={{ color: GOLD_CARD }}
          >
            Explore Our Teacher Training Programs
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed" style={{ color: brand.textMuted }}>
            Gain the knowledge, confidence, and guidance to become a certified instructor — or enhance your wellness
            journey through movement and science.
          </p>
        </header>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.title}
              className="flex flex-col overflow-hidden rounded-[1.75rem] border border-neutral-100/90 bg-white shadow-[0_20px_50px_-32px_rgba(0,0,0,0.18)]"
            >
              <div className="relative aspect-[16/10] w-full shrink-0">
                <Image src={program.image} alt={program.imageAlt} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="flex flex-1 flex-col px-6 pb-8 pt-7 md:px-8">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold leading-snug md:text-[1.35rem]" style={{ color: GOLD_CARD }}>
                  {program.title}
                </h3>
                <p className="mt-3 flex items-center gap-2 text-[14px] font-medium" style={{ color: brand.tealIcon }}>
                  <FiClock className="size-4 shrink-0 opacity-90" aria-hidden />
                  <span>{program.duration}</span>
                </p>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#718096" }}>
                  {program.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {program.features.map((line) => (
                    <li key={line} className="flex items-start gap-2.5 text-[14px]" style={{ color: "#718096" }}>
                      <FiCheck className="mt-0.5 shrink-0 text-base" style={{ color: brand.tealIcon }} aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-neutral-100 pt-7">
                  <p className="font-[family-name:var(--font-playfair)] text-2xl font-bold" style={{ color: GOLD_CARD }}>
                    {program.price}
                  </p>
                  <Link
                    href="tel:+919717505326"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-semibold text-white shadow-md"
                    style={{ backgroundColor: brand.teal }}
                  >
                    <FiPhone className="size-4" aria-hidden />
                    Call Now
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
