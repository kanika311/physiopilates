import AboutImageCollage from "@/components/AboutImageCollage";
import { brand } from "@/lib/brand";

const SERIF = 'var(--font-playfair), "Georgia", serif';

export default function HomeAboutIntro() {
  const GOLD = brand.goldHeading;

  const stats = [
    { num: "800+", label: "Happy Patients" },
    { num: "20+", label: "Certified Experts" },
    { num: "10+", label: "Years Experience" },
  ];

  return (
    <section id="home-about" className="bg-[#f0f9f9] px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/85 bg-white/70 px-4 py-1.5 shadow-sm backdrop-blur-sm">
            <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: GOLD }} aria-hidden />
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
              About us
            </span>
          </div>

          <h2
            className="mt-6 text-[1.95rem] font-semibold leading-tight md:text-[2.45rem]"
            style={{ fontFamily: SERIF, color: GOLD }}
          >
            Physio • Pilates • Wellness Redefined
          </h2>

          <div
            className="mt-8 rounded-[1.35rem] border border-neutral-100/90 bg-white p-6 shadow-[0_22px_50px_-24px_rgba(0,0,0,0.14)] sm:rounded-[1.5rem] sm:p-7"
            style={{ color: brand.textBody }}
          >
            <p className="text-[15px] leading-relaxed md:text-[16px]">
              Welcome to Physio Pilates —{" "}
              <em className="font-normal italic text-neutral-700">
                &ldquo;The only centre in Delhi which provides combination of physiotherapy and pilates for the
                treatment.&rdquo;
              </em>
            </p>
          </div>

          <p className="mt-6 text-[15px] leading-relaxed md:text-[16px]" style={{ color: brand.textBody }}>
            We specialize in{" "}
            <strong className="font-semibold text-neutral-800">
              Physiotherapy, Pilates, Yoga, Dry Needling &amp; Cupping Therapy
            </strong>
            , offering personalised recovery &amp; posture correction programs.
          </p>

          <div
            className="mt-6 rounded-[1.35rem] border border-neutral-100/90 bg-white p-6 shadow-[0_22px_50px_-24px_rgba(0,0,0,0.14)] sm:rounded-[1.5rem] sm:p-7"
          >
            <p className="text-[15px] leading-relaxed md:text-[16px]" style={{ color: brand.textBody }}>
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
                className="rounded-2xl border border-neutral-100 bg-white px-3 py-4 text-center shadow-[0_12px_30px_-16px_rgba(0,0,0,0.1)] sm:py-5"
              >
                <p className="text-xl font-bold sm:text-2xl" style={{ color: GOLD }}>
                  {num}
                </p>
                <p className="mt-1 text-[11px] font-medium leading-tight text-neutral-600 sm:text-xs">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <AboutImageCollage />
      </div>
    </section>
  );
}
