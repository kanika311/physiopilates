import Image from "next/image";
import { THUMB } from "@/lib/siteImages";

export default function AboutImageCollage() {
  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div
        className="pointer-events-none absolute -inset-3 rounded-[24px] opacity-60"
        style={{ background: "linear-gradient(135deg, rgb(15 109 109 / 0.08), transparent)" }}
        aria-hidden
      />
      <div className="relative aspect-[4/5] min-h-[320px] w-full md:min-h-[440px]">
        <div className="absolute left-0 top-[8%] z-20 h-[38%] w-[40%] overflow-hidden rounded-[18px] shadow-[var(--luxury-shadow)]">
          <Image src={THUMB.collageB} alt="Pilates class" fill className="object-cover" sizes="40vw" />
        </div>
        <div className="absolute left-[12%] top-[12%] z-10 h-[76%] w-[76%] overflow-hidden rounded-[20px] shadow-[0_20px_50px_-20px_rgb(18_52_77_/_0.25)]">
          <Image src={THUMB.collageA} alt="Reformer session" fill priority className="object-cover" sizes="70vw" />
        </div>
        <div className="absolute bottom-0 right-0 z-30 h-[36%] w-[38%] overflow-hidden rounded-[18px] shadow-[var(--luxury-shadow)]">
          <Image src={THUMB.collageC} alt="Physiotherapy care" fill className="object-cover" sizes="38vw" />
        </div>
      </div>
    </div>
  );
}
