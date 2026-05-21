import Image from "next/image";

/**
 * Overlapping photo stack for the home about strip.
 * Desktop/tablet: layered reformer + yoga + floor (md and up).
 * Mobile: hero + two thumbnails (below md).
 */
export default function AboutImageCollage() {
  return (
    <div className="w-full min-w-0">
      {/* ≥md: collage (must not use `hidden` alone without min-w-0 on grid parent) */}
      <div className="relative mx-auto hidden min-h-[min(520px,78vw)] w-full max-w-xl md:block lg:max-w-none">
        {/* Mint plate behind stack */}
        <div
          className="pointer-events-none absolute left-[6%] top-[10%] z-[5] h-[78%] w-[74%] rounded-[1.85rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] sm:rounded-[2rem]"
          style={{ backgroundColor: "#e8f7f7" }}
          aria-hidden
        />

        <div className="absolute left-[-20] top-[-50px] z-30 h-[38%] w-[32%] overflow-hidden rounded-[10px] bg-neutral-200/40 40px   sm:rounded-3xl ">
          <Image
            src="/index3.webp"
            alt="Group yoga and Pilates class from above"
            fill
            sizes="(max-width: 768px) 40vw, 260px"
            className="object-cover object-center"
          />
        </div>
        <div className="relative z-20 mx-auto mt-10 h-[min(380px,55vw)] min-h-[220px] w-[78%] overflow-hidden rounded-3xl bg-neutral-200/40  lg:mx-0 lg:ml-[8%]">
          <Image
            src="/index2.jpg"
            alt="Instructor guiding client on Pilates reformer"
            fill
            sizes="(max-width: 1024px) 70vw, 420px"
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute bottom-8 right-0 z-40 h-[38%] w-[32%] overflow-hidden rounded-[10px] bg-neutral-200/40  sm:rounded-2xl">
          <Image
            src="/phy6.jpg"
            alt="Client doing guided floor exercise with physiotherapy props"
            fill
            sizes="(max-width: 768px) 45vw, 280px"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* &lt;md: stacked strip */}
      <div className="relative mt-10 flex w-full flex-col gap-4 md:mt-0 md:hidden">
        <div className="relative mx-auto aspect-[16/11] w-full max-w-lg overflow-hidden rounded-2xl bg-neutral-200/40 shadow-[0_16px_40px_-14px_rgba(0,0,0,0.2)] sm:rounded-3xl">
          <Image
            src="/index2.jpg"
            alt="Physio Pilates studio reformer session"
            fill
            className="object-cover"
            sizes="95vw"
            priority
          />
        </div>
        <div className="flex gap-3">
          <div className="relative aspect-video min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-200/40 shadow-md sm:rounded-2xl">
            <Image
              src="/index3.webp"
              alt="Wellness movement class"
              fill
              className="object-cover object-center"
              sizes="45vw"
            />
          </div>
          <div className="relative aspect-video min-h-0 flex-1 overflow-hidden rounded-xl bg-neutral-200/40 shadow-md sm:rounded-2xl">
            <Image
              src="/phy6.jpg"
              alt="Physiotherapy-guided movement session"
              fill
              className="object-cover object-center"
              sizes="45vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
