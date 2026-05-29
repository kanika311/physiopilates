import AboutImageCollage from "@/components/AboutImageCollage";
import AnimatedStatCards from "@/components/home/AnimatedStatCards";
import TrustMarquee from "@/components/home/TrustMarquee";
import { brand } from "@/lib/brand";

const SERIF = 'var(--font-playfair), "Georgia", serif';

const STAT_SPECS = [
  { label: "Happy Patients", value: 800, suffix: "+" },
  { label: "Certified Experts", value: 20, suffix: "+" },
  { label: "Years Experience", value: 10, suffix: "+" },
] as const;

export default function HomeAboutIntro() {
  const GOLD = brand.sage;

  return (
    <section id="home-about" className="bg-[#f7fcfc] px-4 py-16 dark:bg-[#0f172a] md:py-24">
      {/* md: two columns (matches collage `md:block`); min-w-0 lets the image column shrink/wrap in grid */}
      <div className="mx-auto grid max-w-6xl items-start gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
        <div className="min-w-0">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-[11px]"
            style={{ color: GOLD }}
          >
            About us
          </p>

          <h2
            className="mt-3 text-[1.85rem] font-bold leading-tight tracking-tight sm:text-[2.15rem] md:text-[2.55rem] lg:text-[2.65rem]"
            style={{ fontFamily: SERIF, color: GOLD }}
          >
            Physio • Pilates • Wellness Redefined
          </h2>

          <div
            className="mt-8 rounded-[1.35rem] border border-white/80 bg-white p-6 text-[#4a4a4a] shadow-[0_20px_45px_-28px_rgba(0,0,0,0.14)] dark:border-[#334155] dark:bg-[#1e293b] dark:text-slate-200 sm:rounded-[1.5rem] sm:p-7"
          >
            <p className="text-[15px] leading-relaxed md:text-[16px]">
              Welcome to Physio Pilates —{" "}
              <em className="font-normal italic text-neutral-700 dark:text-slate-300">
                &ldquo;The only centre in Delhi which provides combination of physiotherapy and pilates for the
                treatment.&rdquo;
              </em>
            </p>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed text-[#4a4a4a] dark:text-slate-200 md:text-[16px]">
            We specialize in{" "}
            <strong className="font-semibold text-neutral-800 dark:text-teal-100">
              Physiotherapy, Pilates, Yoga, Dry Needling &amp; Cupping Therapy
            </strong>
            , offering personalised recovery &amp; posture correction programs.
          </p>

          <div className="mt-6 rounded-[1.35rem] border border-[rgba(73,207,203,0.22)] bg-[#e8f7f7] p-6 shadow-[0_18px_40px_-26px_rgba(56,120,120,0.22)] dark:border-teal-500/25 dark:bg-slate-800/95 sm:rounded-[1.5rem] sm:p-7">
            <p className="text-[15px] leading-relaxed text-[#4a4a4a] dark:text-slate-100 md:text-[16px]">
              With expert care, we help you{" "}
              <strong className="font-semibold text-[#6B8F71] dark:text-emerald-200">
                feel better, move better &amp; live better.
              </strong>
            </p>
          </div>

          <div className="mt-10">
            <TrustMarquee className="shadow-[0_12px_32px_-24px_rgba(0,0,0,0.12)]" />
          </div>

          <div className="mt-8">
            <AnimatedStatCards specs={STAT_SPECS} />
          </div>
        </div>

        <div className="min-w-0 w-full">
          <AboutImageCollage />
        </div>
      </div>
    </section>
  );
}
