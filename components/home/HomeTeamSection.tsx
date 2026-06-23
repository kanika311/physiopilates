import Image from "next/image";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";
import { THUMB } from "@/lib/siteImages";

const EXPERTS = [
  {
    name: "Dr. Surbhi Silori",
    role: "Lead Physiotherapist & Founder",
    bio: "Specialist in musculoskeletal rehab, clinical Pilates integration, and postural correction.",
    image: THUMB.phyDetail,
  },
  {
    name: "Senior Pilates Instructor",
    role: "Certified Reformer Specialist",
    bio: "Expert in reformer programming, core stability, and athletic performance conditioning.",
    image: THUMB.pilatesDetail,
  },
  {
    name: "Wellness & Yoga Lead",
    role: "Holistic Movement Coach",
    bio: "Guiding breath-led yoga and mobility sessions for balance, flexibility, and recovery.",
    image: THUMB.yogaDetail,
  },
];

export default function HomeTeamSection() {
  return (
    <section className="luxury-section px-5 sm:px-8" style={{ backgroundColor: brand.surfaceMuted }}>
      <div className={`mx-auto ${SECTION_MAX}`}>
        <Reveal>
          <SectionHeading
            eyebrow="Our experts"
            goldEyebrow
            title="Meet the Team Behind Your Recovery"
            description="Certified clinicians and movement specialists dedicated to premium, personalised care."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid gap-8 md:grid-cols-3">
          {EXPERTS.map((expert, i) => (
            <Reveal key={expert.name} delay={0.1 * i}>
              <article className="luxury-card overflow-hidden">
                <div className="relative aspect-[4/5] w-full">
                  <Image src={expert.image} alt={expert.name} fill className="object-cover" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12344D]/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em]" style={{ color: brand.gold }}>
                      Expert
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{expert.name}</h3>
                    <p className="mt-1 text-sm text-white/85">{expert.role}</p>
                  </div>
                </div>
                <p className="p-6 text-[14px] leading-relaxed" style={{ color: brand.textMuted }}>
                  {expert.bio}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
