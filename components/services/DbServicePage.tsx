import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import connectDB from "@/lib/mongodb";
import Service from "@/models/Service";
import Gallery from "@/models/Gallary";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServicePageHero from "@/components/services/ServicePageHero";
import GetQuoteForm from "@/components/quote/GetQuoteForm";
import { brand } from "@/lib/brand";
import { HERO_PHYSIO } from "@/lib/siteImages";
import { FiCheck } from "react-icons/fi";

const GOLD = brand.sage;

export default async function DbServicePage({ slug }: { slug: string }) {
  await connectDB();

  const service = await Service.findOne({ slug, status: true }).lean<any>();

  if (!service) {
    notFound();
  }

  // Gallery images tagged with this service. Match case-insensitively against
  // both the slug and name so admin-tagged images always show up here.
  const matchKeys = new Set(
    [service.slug, service.name]
      .filter(Boolean)
      .map((v: string) => v.toLowerCase().trim())
  );
  const activeGallery = await Gallery.find({ isActive: { $ne: false } })
    .sort({ createdAt: -1 })
    .lean<any[]>();
  const taggedGallery = activeGallery.filter((g) =>
    Array.isArray(g.categories) &&
    g.categories.some(
      (c: string) => typeof c === "string" && matchKeys.has(c.toLowerCase().trim())
    )
  );

  const isData = (src: string) => typeof src === "string" && src.startsWith("data:");

  // Hero banner — explicit hero fields fall back to the core service fields.
  const heroImage = service.heroImage || service.image || HERO_PHYSIO;
  const heroEyebrow = service.heroEyebrow || "Our service";
  const heroTitle = service.heroTitle || service.name;
  const heroDescription =
    service.heroDescription || service.shortDescription || service.description || "";

  // Overview section — explicit overview fields fall back to the core fields.
  const overviewImage =
    service.overviewImage || service.image || heroImage;
  const overviewTitle = service.overviewTitle || service.name;
  const overviewDescription =
    service.overviewDescription || service.description || service.shortDescription || "";
  const overviewBullets: string[] = Array.isArray(service.overviewBullets)
    ? service.overviewBullets.filter(Boolean)
    : [];
  const overviewLevels: string[] = Array.isArray(service.overviewLevels)
    ? service.overviewLevels.filter(Boolean)
    : [];

  // Combine the service's own uploaded gallery with tagged Gallery-manager images.
  const seen = new Set<string>();
  const gallerySlides: { src: string; alt: string }[] = [];
  for (const src of Array.isArray(service.gallery) ? service.gallery : []) {
    if (src && !seen.has(src)) {
      seen.add(src);
      gallerySlides.push({ src, alt: service.name });
    }
  }
  for (const g of taggedGallery) {
    if (g.image && !seen.has(g.image)) {
      seen.add(g.image);
      gallerySlides.push({ src: g.image, alt: g.alt || service.name });
    }
  }

  // Fallback: if this service has no images of its own, show the studio's
  // general gallery so the page always has a gallery section.
  if (gallerySlides.length === 0) {
    for (const g of activeGallery) {
      if (g.image && !seen.has(g.image)) {
        seen.add(g.image);
        gallerySlides.push({ src: g.image, alt: g.alt || g.title || service.name });
      }
    }
  }

  return (
    <>
      <Navbar />
      <ServicePageHero
        id="db-service-hero"
        image={heroImage}
        imageAlt={heroTitle}
        eyebrow={heroEyebrow}
        title={heroTitle}
        description={heroDescription}
        unoptimized={isData(heroImage)}
      />

      <section className="bg-white px-4 py-16 md:py-24 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] lg:max-h-[460px]">
              <Image
                src={overviewImage}
                alt={overviewTitle}
                fill
                unoptimized={isData(overviewImage)}
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {overviewLevels.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                {overviewLevels.map((level) => (
                  <div
                    key={level}
                    className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium sm:text-[14px]"
                    style={{
                      borderColor: GOLD,
                      backgroundColor: "rgba(107,143,113,0.1)",
                      color: GOLD,
                    }}
                  >
                    <FiCheck className="shrink-0 text-[15px]" style={{ color: GOLD }} aria-hidden />
                    {level}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-[2.35rem] md:leading-tight">
              {overviewTitle}
            </h2>
            <p className="mt-4 whitespace-pre-line text-[16px] leading-relaxed text-neutral-600 md:text-[17px]">
              {overviewDescription}
            </p>

            {overviewBullets.length > 0 && (
              <ul className="mt-6 space-y-5 border-l-[3px] border-[rgba(107,143,113,0.4)] pl-7">
                {overviewBullets.map((text) => (
                  <li
                    key={text}
                    className="relative text-[15px] leading-relaxed text-neutral-700"
                  >
                    <span
                      className="absolute -left-7 top-2.5 block size-1.5 shrink-0 rounded-full bg-neutral-600"
                      aria-hidden
                    />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-full px-10 py-3.5 text-[15px] font-semibold text-white shadow-md transition-[filter] hover:brightness-[1.05]"
                style={{ backgroundColor: GOLD }}
              >
                Contact Us
              </Link>
              <GetQuoteForm service={service.name} className="!py-3.5" />
            </div>
          </div>
        </div>
      </section>

      {gallerySlides.length > 0 && (
        <section
          id="db-service-gallery"
          className="bg-white px-4 pb-24 pt-16 md:pb-28 md:pt-20"
          aria-labelledby="db-service-gallery-heading"
        >
          <div className="mx-auto max-w-6xl">
            <header className="text-center">
              <h2
                id="db-service-gallery-heading"
                className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl md:text-[2.15rem]"
              >
                {service.name} Gallery
              </h2>
              <div
                className="mx-auto mt-4 h-0.5 w-14 rounded-full sm:h-[3px] sm:w-[4.25rem]"
                style={{ backgroundColor: GOLD }}
                aria-hidden
              />
            </header>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {gallerySlides.map((img, i) => (
                <figure
                  key={`${img.src.slice(0, 24)}-${i}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.22)] sm:aspect-[5/4]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    unoptimized
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
