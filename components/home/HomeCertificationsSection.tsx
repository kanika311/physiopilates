import { FiCheck } from "react-icons/fi";
import { TbTrophy, TbUsers } from "react-icons/tb";
import { MdOutlineSchool, MdOutlineMenuBook } from "react-icons/md";
import Reveal from "@/components/luxury/Reveal";
import SectionHeading from "@/components/luxury/SectionHeading";
import { StaggerGrid, StaggerItem } from "@/components/luxury/Stagger";
import { brand, SECTION_MAX } from "@/lib/brand";

const TAGS = ["Experienced Faculty", "Practical Learning", "Lifetime Support"];

const STATS = [
  { Icon: TbTrophy, value: "100%", label: "Certification Success" },
  { Icon: TbUsers, value: "5000+", label: "Trained Students" },
  { Icon: MdOutlineSchool, value: "10+ Years", label: "Training Experience" },
  { Icon: MdOutlineMenuBook, value: "25+", label: "Professional Programs" },
];

export default function HomeCertificationsSection() {
  return (
    <section className="luxury-section bg-white px-5 sm:px-8">
      <div className={`mx-auto ${SECTION_MAX} text-center`}>
        <Reveal>
          <SectionHeading
            eyebrow="Certifications"
            title="Certified & Trusted Training"
            description="Professional programs designed to build practical skills, clinical confidence, and career-ready expertise."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {TAGS.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-2 rounded-full border bg-white px-5 py-2.5 text-[13px] font-medium shadow-sm"
                style={{ borderColor: brand.border, color: brand.navy }}
              >
                <FiCheck style={{ color: brand.primary }} aria-hidden /> {t}
              </span>
            ))}
          </div>
        </Reveal>

        <StaggerGrid className="mx-auto mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {STATS.map(({ Icon, value, label }) => (
            <StaggerItem key={label}>
              <div className="luxury-card flex flex-col items-center px-6 py-10">
                <div
                  className="flex size-16 items-center justify-center rounded-[14px] text-white"
                  style={{ backgroundColor: brand.primary }}
                >
                  <Icon className="text-3xl" aria-hidden />
                </div>
                <p className="mt-8 text-2xl font-bold" style={{ color: brand.navy }}>
                  {value}
                </p>
                <p className="mt-2 text-center text-sm" style={{ color: brand.textMuted }}>
                  {label}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
