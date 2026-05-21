import Image from "next/image";

/**
 * Shared overlapping photo stack — home “About” strip and `/about` Our Story section.
 */
export default function AboutImageCollage() {
  return (
    <>
      <div className="relative mx-auto hidden h-[min(520px,75vw)] max-w-xl md:block lg:max-w-none">
        <div
          className="pointer-events-none absolute left-[6%] top-[10%] z-[5] h-[78%] w-[74%] rounded-[1.85rem] sm:rounded-[2rem]"
          style={{ backgroundColor: "rgba(72, 199, 196, 0.18)" }}
          aria-hidden
        />

        <div className="absolute left-0 top-6 z-30 h-32 w-[42%] overflow-hidden rounded-2xl shadow-[0_16px_40px_-12px_rgba(0,0,0,0.25)] ring-4 ring-white/95 sm:rounded-3xl md:h-36">
          <Image
            src="/index3.webp"
            alt="Group yoga and Pilates class from above"
            fill
            className="object-cover object-center"
            sizes="260px"
          />
        </div>
        <div className="relative z-20 mx-auto mt-10 h-[min(380px,55vw)] w-[78%] overflow-hidden rounded-3xl shadow-[0_24px_50px_-14px_rgba(0,0,0,0.28)] ring-4 ring-white/95 lg:mx-0 lg:ml-[8%]">
          <Image
            src="/index2.jpg"
            alt="Instructor guiding client on Pilates reformer"
            fill
            className="object-cover object-center"
            sizes="(max-width:1024px) 70vw, 420px"
          />
        </div>
        <div className="absolute bottom-8 right-0 z-40 h-[30%] w-[48%] overflow-hidden rounded-2xl shadow-[0_18px_44px_-12px_rgba(0,0,0,0.26)] ring-4 ring-white/95 sm:rounded-3xl">
          <Image
            src="/phy6.jpg"
            alt="Client doing guided floor exercise with physiotherapy props"
            fill
            className="object-cover object-center"
            sizes="280px"
          />
        </div>
      </div>

      <div className="relative mt-8 flex flex-col gap-4 md:hidden">
        <div className="relative mx-auto aspect-[16/11] w-full max-w-lg overflow-hidden rounded-2xl shadow-[0_16px_40px_-14px_rgba(0,0,0,0.2)] sm:rounded-3xl">
          <Image src="/index2.jpg" alt="Physio Pilates studio reformer session" fill className="object-cover" sizes="95vw" />
        </div>
        <div className="flex gap-3">
          <div className="relative aspect-video flex-1 overflow-hidden rounded-xl shadow-md sm:rounded-2xl">
            <Image src="/index3.webp" alt="Wellness movement class" fill className="object-cover object-center" sizes="45vw" />
          </div>
          <div className="relative aspect-video flex-1 overflow-hidden rounded-xl shadow-md sm:rounded-2xl">
            <Image src="/phy6.jpg" alt="Physiotherapy-guided movement session" fill className="object-cover object-center" sizes="45vw" />
          </div>
        </div>
      </div>
    </>
  );
}
