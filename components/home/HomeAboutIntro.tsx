import AboutImageCollage from "@/components/AboutImageCollage";
import { brand } from "@/lib/brand";

const SERIF = 'var(--font-playfair), "Georgia", serif';

/** Reference palette: page shell + body */
const PAGE_BG = "#f7fcfc";
const BODY = "#4a4a4a";
/** Closing card — light mint panel (not white) */
const MINT_CARD = "#e8f7f7";
const MINT_CARD_BORDER = "rgba(73, 207, 203, 0.22)";

export default function HomeAboutIntro() {
  const GOLD = brand.goldHeading;

  const stats = [
    { num: "800+", label: "Happy Patients" },
    { num: "20+", label: "Certified Experts" },
    { num: "10+", label: "Years Experience" },
  ];

  return (
    <section id="home-about" className="px-4 py-16 md:py-24" style={{ backgroundColor: PAGE_BG }}>
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
            className="mt-8 rounded-[1.35rem] border border-white/80 bg-white p-6 shadow-[0_20px_45px_-28px_rgba(0,0,0,0.14)] sm:rounded-[1.5rem] sm:p-7"
            style={{ color: BODY }}
          >
            <p className="text-[15px] leading-relaxed md:text-[16px]">
              Welcome to Physio Pilates —{" "}
              <em className="font-normal italic text-neutral-700">
                &ldquo;The only centre in Delhi which provides combination of physiotherapy and pilates for the
                treatment.&rdquo;
              </em>
            </p>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed md:text-[16px]" style={{ color: BODY }}>
            We specialize in{" "}
            <strong className="font-semibold text-neutral-800">
              Physiotherapy, Pilates, Yoga, Dry Needling &amp; Cupping Therapy
            </strong>
            , offering personalised recovery &amp; posture correction programs.
          </p>

          <div
            className="mt-6 rounded-[1.35rem] border p-6 shadow-[0_18px_40px_-26px_rgba(56,120,120,0.22)] sm:rounded-[1.5rem] sm:p-7"
            style={{
              backgroundColor: MINT_CARD,
              borderColor: MINT_CARD_BORDER,
            }}
          >
            <p className="text-[15px] leading-relaxed md:text-[16px]" style={{ color: BODY }}>
              With expert care, we help you{" "}
              <strong className="font-semibold" style={{ color: GOLD }}>
                feel better, move better &amp; live better.
              </strong>
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map(({ num, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/90 bg-white/95 px-3 py-4 text-center shadow-[0_14px_34px_-20px_rgba(0,0,0,0.12)] backdrop-blur-[2px] sm:py-5"
              >
                <p className="text-xl font-bold sm:text-2xl" style={{ color: GOLD }}>
                  {num}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-tight text-neutral-600 sm:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="min-w-0 w-full">
          <AboutImageCollage />
        </div>
      </div>
    </section>
  );
}
