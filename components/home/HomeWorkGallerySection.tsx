"use client";

import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

const IMAGES = [
  { src: "/phy5.jpg", alt: "Pilates equipment and strengthening session in studio" },
  { src: "/phy3.jpg", alt: "Therapeutic intervention and clinician care" },
  { src: "/phy6.jpg", alt: "Rehabilitation and controlled movement drills" },
  { src: "/phy4.jpg", alt: "Clinical therapy precision and supportive care" },
  { src: "/index2.jpg", alt: "Group movement and reformer-focused training" },
  { src: "/phy2.jpg", alt: "Physiotherapy footwork and conditioning" },
];

export default function HomeWorkGallerySection() {
  const GOLD = brand.goldHeading;

  return (
    <section className="px-4 py-16 md:py-20" style={{ backgroundColor: "#f0fafb" }}>
      <div className="mx-auto max-w-6xl text-center">
        <h2
          className="text-[1.95rem] font-semibold md:text-[2.35rem]"
          style={{ fontFamily: 'var(--font-playfair), "Georgia", serif', color: GOLD }}
        >
          Our Physiotherapy Work
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[15px] text-neutral-600">
          Great treatments, movements &amp; recovery moments from our centre.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
          {IMAGES.map((img) => (
            <figure
              key={img.src}
              className="group relative aspect-[4/3] overflow-hidden rounded-[1.15rem] bg-neutral-200 shadow-[0_12px_36px_-20px_rgba(0,0,0,0.2)] motion-safe:transition-shadow motion-safe:duration-300 motion-safe:hover:shadow-[0_16px_44px_-18px_rgba(0,0,0,0.24)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-center motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:scale-[1.03]"
                sizes="(max-width:768px) 45vw, 30vw"
              />
            </figure>
          ))}
        </div>

        <Link
          href="/gallery"
          className="mt-12 inline-flex rounded-full px-12 py-3.5 text-[15px] font-bold text-white shadow-md transition-opacity hover:opacity-92"
          style={{ backgroundColor: brand.goldButton }}
        >
          View More
        </Link>
      </div>
    </section>
  );
}
