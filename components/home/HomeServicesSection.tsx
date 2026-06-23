import Link from "next/link";
import type { IconType } from "react-icons";
import { FiActivity, FiHeart, FiDroplet } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";

type Card = { title: string; text: string; href: string; Icon: IconType };

const CARDS: Card[] = [
  {
    title: "Physiotherapy & Rehabilitation",
    text: "Advanced physiotherapy to heal pain, correct posture, and rebuild strength — from injury recovery to post-surgery rehab.",
    href: "/physiotherapy",
    Icon: FiActivity,
  },
  {
    title: "Pilates Training",
    text: "Personalised reformer and mat Pilates for core strength, balance, and long-term movement quality.",
    href: "/pilates",
    Icon: FiHeart,
  },
  {
    title: "Dry Needling & Cupping",
    text: "Targeted relief for muscle knots, stiffness, and inflammation with evidence-based manual therapy.",
    href: "/therapy",
    Icon: FiDroplet,
  },
  {
    title: "Yoga Sessions",
    text: "Guided yoga for flexibility, breath, and mental clarity — suitable for every level.",
    href: "/yoga",
    Icon: IoSparklesOutline,
  },
];

function ServiceCard({ title, text, href, Icon }: Card) {
  return (
    <article className="luxury-card flex flex-col p-8 md:p-9">
      <div
        className="flex size-14 items-center justify-center rounded-[14px] text-white"
        style={{ backgroundColor: brand.primary }}
      >
        <Icon className="text-2xl" aria-hidden />
      </div>
      <h3 className="mt-6 text-xl font-semibold" style={{ color: brand.navy }}>
        {title}
      </h3>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed" style={{ color: brand.textMuted }}>
        {text}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold transition hover:gap-3"
        style={{ color: brand.primary }}
      >
        Explore service <span aria-hidden>→</span>
      </Link>
    </article>
  );
}

export default function HomeServicesSection() {
  return (
    <section className="luxury-section px-5 sm:px-8" style={{ backgroundColor: brand.surfaceMuted }}>
      <div className={`mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Our services"
            title="Care Designed For Your Wellness"
            description="Science-based treatments to enhance strength, posture, and recovery — delivered with clinical precision and spa-like calm."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <ServiceCard {...c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
