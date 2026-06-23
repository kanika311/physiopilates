import AboutImageCollage from "@/components/AboutImageCollage";
import AnimatedStatCards from "@/components/home/AnimatedStatCards";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { brand, SECTION_MAX } from "@/lib/brand";

const STAT_SPECS = [
  { label: "Happy Patients", value: 800, suffix: "+" },
  { label: "Certified Experts", value: 20, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
] as const;

export default function HomeAboutIntro() {
  return (
    <section id="home-about" className="luxury-section bg-white px-5 sm:px-8">
      <div className={`mx-auto grid ${SECTION_MAX} items-center gap-10 lg:grid-cols-2 lg:gap-14`}>
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="About the studio"
            title="Physio • Pilates • Wellness Redefined"
            description="The only centre in Delhi combining physiotherapy and Pilates for integrated treatment — personalised programs for recovery, posture, and lasting strength."
          />

          <div
            className="mt-8 rounded-[18px] border p-6 md:p-7"
            style={{ borderColor: brand.border, backgroundColor: brand.mintBg }}
          >
            <p className="body-text font-medium" style={{ color: brand.navy }}>
              We specialise in{" "}
              <strong className="font-semibold" style={{ color: brand.primary }}>
                Physiotherapy, Pilates, Yoga, Dry Needling & Cupping Therapy
              </strong>
              — evidence-based care in a calm, premium studio environment.
            </p>
          </div>

          <p className="body-text mt-6">
            With expert clinicians and certified instructors, we help you feel better, move better, and live better —
            every session tailored to your body and goals.
          </p>

          <div className="mt-10">
            <AnimatedStatCards specs={STAT_SPECS} />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <AboutImageCollage />
        </Reveal>
      </div>
    </section>
  );
}
